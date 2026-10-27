/* ============================================================
   core/api.js — DeepSeek 客户端
   - 超时 / 退避重试 / JSON 解析 / 用量统计 / 单日调用上限
   - 实测：api.deepseek.com 支持 CORS，含 Origin: null（file:// 页面），
     因此纯静态页面可以直连，不需要服务器代理。
   - 测试注入：SF.api.__setFetch(fn) 可替换底层 fetch（便于无 Key 联调）
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';
  var U = SF.util;

  var ENDPOINT = 'https://api.deepseek.com/chat/completions';
  var DEFAULT_TIMEOUT = 60000;
  var RETRIES = 2;

  var nativeFetch = (typeof fetch === 'function') ? fetch.bind(window) : null;
  var fetchImpl = nativeFetch;

  function err(code, message, extra) {
    var e = new Error(message);
    e.code = code;
    if (extra) for (var k in extra) e[k] = extra[k];
    return e;
  }

  function key() {
    return (SF.store.state.settings.apiKey || '').trim();
  }

  function isConfigured() {
    var k = key();
    return k.length > 8 && k.indexOf('sk-') === 0;
  }

  function maskKey(k) {
    k = k || key();
    if (!k) return '';
    if (k.length <= 8) return '****';
    return k.slice(0, 5) + '****' + k.slice(-4);
  }

  /* ---------- 用量与限额 ---------- */
  function bumpUsage(usage) {
    var st = SF.store.state;
    var today = U.today();
    if (st.usage.day !== today) {
      st.usage.day = today;
      st.usage.todayCalls = 0;
    }
    st.usage.calls = (st.usage.calls || 0) + 1;
    st.usage.todayCalls = (st.usage.todayCalls || 0) + 1;
    if (usage) {
      st.usage.tokensIn = (st.usage.tokensIn || 0) + (usage.prompt_tokens || 0);
      st.usage.tokensOut = (st.usage.tokensOut || 0) + (usage.completion_tokens || 0);
    }
    SF.store.save();
  }

  function todayCalls() {
    var st = SF.store.state;
    if (st.usage.day !== U.today()) return 0;
    return st.usage.todayCalls || 0;
  }

  function checkDailyCap() {
    var cap = Number(SF.store.state.settings.dailyGenCap || 0);
    if (cap > 0 && todayCalls() >= cap) {
      throw err('daily_cap', '今天已用满 ' + cap + ' 次生成额度（可在设置里调整），明天再来或先用现有题库练习。');
    }
  }

  /* ---------- 错误翻译成人话 ---------- */
  function friendly(status, body) {
    var msg = '';
    try { msg = (body && body.error && body.error.message) || ''; } catch (e) { }
    if (status === 401) return err('auth', 'API Key 无效或已失效，请到设置里重新填写。');
    if (status === 402) return err('balance', 'DeepSeek 账户余额不足，请先充值。');
    if (status === 429) return err('rate', '请求太频繁或触发了限流，稍等一会儿再试。');
    if (status === 400) return err('bad_request', '请求被拒绝：' + (msg || '参数有问题'));
    if (status >= 500) return err('server', 'DeepSeek 服务端错误（' + status + '），稍后重试。');
    return err('http', '请求失败（HTTP ' + status + '）' + (msg ? '：' + msg : ''));
  }

  /* ---------- 底层请求 ---------- */
  function rawChat(messages, opt) {
    opt = opt || {};
    var k = key();
    if (!k) return Promise.reject(err('no_key', '还没填写 API Key'));

    var body = {
      model: opt.model || SF.store.state.settings.model || 'deepseek-chat',
      messages: messages,
      stream: false,
      max_tokens: opt.maxTokens || 8000
    };
    var temp = (opt.temperature == null)
      ? Number(SF.store.state.settings.temperature)
      : Number(opt.temperature);
    if (!isNaN(temp)) body.temperature = temp;
    if (opt.json) body.response_format = { type: 'json_object' };

    var ctl = (typeof AbortController === 'function') ? new AbortController() : null;
    var timer = null;
    if (ctl) timer = setTimeout(function () { ctl.abort(); }, opt.timeoutMs || DEFAULT_TIMEOUT);

    return fetchImpl(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + k
      },
      body: JSON.stringify(body),
      signal: ctl ? ctl.signal : undefined
    }).then(function (res) {
      if (timer) clearTimeout(timer);
      return res.text().then(function (text) {
        var parsed = null;
        try { parsed = text ? JSON.parse(text) : null; } catch (e) { }
        if (!res.ok) throw friendly(res.status, parsed);
        if (!parsed || !parsed.choices || !parsed.choices.length) {
          throw err('empty', '模型没有返回内容');
        }
        var choice = parsed.choices[0];
        var content = (choice.message && choice.message.content) || '';
        // 输出被截断时，JSON 一定不完整，早点给出人话提示而不是抛"解析失败"
        if (choice.finish_reason === 'length') {
          throw err('truncated',
            '模型输出被长度上限截断了（一次出的题太多或题目太长）。请在设置里减少批量题量，或改用 deepseek-chat。');
        }
        return {
          content: content,
          usage: parsed.usage || null,
          finishReason: choice.finish_reason || '',
          model: parsed.model || body.model
        };
      });
    }).catch(function (e) {
      if (timer) clearTimeout(timer);
      if (e && e.code) throw e;
      if (e && (e.name === 'AbortError' || e.name === 'TimeoutError')) {
        throw err('timeout', '请求超时（' + Math.round((opt.timeoutMs || DEFAULT_TIMEOUT) / 1000) + ' 秒），网络可能不稳。');
      }
      throw err('network', '网络请求失败：' + ((e && e.message) || '未知错误') + '。检查网络或稍后再试。');
    });
  }

  /** 带退避重试；只对"可重试"的错误重试 */
  function retryable(e) {
    return e && ['network', 'timeout', 'server', 'rate', 'empty'].indexOf(e.code) >= 0;
  }

  function chat(messages, opt) {
    opt = opt || {};
    var attempt = 0;
    function once() {
      return rawChat(messages, opt).catch(function (e) {
        if (attempt < RETRIES && retryable(e)) {
          attempt += 1;
          var wait = 600 * Math.pow(2, attempt - 1);
          return new Promise(function (r) { setTimeout(r, wait); }).then(once);
        }
        throw e;
      });
    }
    return Promise.resolve().then(checkDailyCap).then(once).then(function (res) {
      bumpUsage(res.usage);
      return res;
    });
  }

  /**
   * 部分模型（如 deepseek-reasoner 的某些版本）不支持 response_format=json_object，
   * 会直接返回 400。这种情况下降级为"只靠提示词约束 + 客户端提取 JSON"再来一次，
   * 而不是让用户对着一个看不懂的报错卡住。
   */
  var jsonModeUnsupported = false;

  function chatJSON(system, user, opt) {
    var messages = [];
    if (system) messages.push({ role: 'system', content: system });
    messages.push({ role: 'user', content: user });

    function attempt(useJsonMode) {
      var o = {};
      for (var k in (opt || {})) o[k] = opt[k];
      if (useJsonMode) o.json = true;
      return chat(messages, o);
    }

    var wantJsonMode = !jsonModeUnsupported;
    return attempt(wantJsonMode).catch(function (e) {
      // 只在"参数被拒"时降级；其余错误原样抛出
      var paramRejected = (e && e.code === 'bad_request');
      if (wantJsonMode && paramRejected) {
        jsonModeUnsupported = true;
        return attempt(false);
      }
      throw e;
    }).then(function (res) {
      return { data: extractJSON(res.content), usage: res.usage, content: res.content };
    });
  }

  /* ---------- JSON 提取（模型偶尔会裹 markdown 围栏） ---------- */
  function extractJSON(text) {
    var t = String(text || '').trim();
    if (!t) throw err('empty', '模型返回了空内容');
    var fence = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(t);
    if (fence) t = fence[1].trim();
    try { return JSON.parse(t); } catch (e) { }
    var i = t.indexOf('{'), j = t.lastIndexOf('}');
    if (i >= 0 && j > i) {
      try { return JSON.parse(t.slice(i, j + 1)); } catch (e) { }
    }
    throw err('parse', '模型返回的不是合法 JSON（前 120 字：' + t.slice(0, 120) + '）');
  }

  /* ---------- 连接测试 ---------- */
  function test() {
    if (!key()) return Promise.resolve({ ok: false, message: '还没填写 API Key' });
    return chat([{ role: 'user', content: '回复两个字：可用' }], { maxTokens: 16, timeoutMs: 30000 })
      .then(function (res) {
        return {
          ok: true,
          message: '连接正常（模型 ' + res.model + '，返回：「' + String(res.content).trim().slice(0, 20) + '」）',
          usage: res.usage
        };
      })
      .catch(function (e) {
        return { ok: false, message: e.message || '连接失败', code: e.code };
      });
  }

  SF.api = {
    ENDPOINT: ENDPOINT,
    isConfigured: isConfigured,
    maskKey: maskKey,
    key: key,
    rawChat: rawChat,
    chat: chat,
    chatJSON: chatJSON,
    extractJSON: extractJSON,
    test: test,
    todayCalls: todayCalls,
    friendly: friendly,
    /** 仅供测试：注入假的 fetch */
    __setFetch: function (fn) { fetchImpl = fn || nativeFetch; },
    __hasNativeFetch: function () { return !!nativeFetch; },
    __resetJsonMode: function () { jsonModeUnsupported = false; },
    __jsonModeUnsupported: function () { return jsonModeUnsupported; }
  };
})(window.SF);
