/* ============================================================
   core/util.js — 通用工具（纯函数优先）
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';

  /* ---------- 日期（一律用本地日期，避免 UTC 时区错位） ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function dateStr(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function parseDate(s) {
    // 'YYYY-MM-DD' -> 本地时间当日 00:00
    var p = String(s).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function addDays(s, n) {
    var d = parseDate(s);
    d.setDate(d.getDate() + n);
    return dateStr(d);
  }

  /** b - a，单位天。同一日 = 0 */
  function diffDays(a, b) {
    var MS = 86400000;
    return Math.round((parseDate(b).getTime() - parseDate(a).getTime()) / MS);
  }

  function today() { return dateStr(new Date()); }

  /* ---------- 确定性伪随机（同一日期 → 同一套题） ---------- */
  function seedFrom(str) {
    var h = 1779033703 ^ String(str).length;
    for (var i = 0; i < String(str).length; i++) {
      h = Math.imul(h ^ String(str).charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }

  /** 用种子洗牌，返回新数组（不修改入参） */
  function shuffleSeed(arr, seedStr) {
    var out = arr.slice();
    var rnd = seedFrom(seedStr);
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  function hash(str) {
    var rnd = seedFrom(str);
    var v = Math.floor(rnd() * 4294967296).toString(36);
    return v + Math.floor(rnd() * 4294967296).toString(36);
  }

  /* ---------- DOM ---------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function h(html) {
    var t = document.createElement('template');
    t.innerHTML = String(html).trim();
    return t.content.firstElementChild;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function stars(n) {
    n = Math.max(1, Math.min(5, Number(n) || 1));
    return new Array(n + 1).join('★') + new Array(6 - n).join('☆');
  }

  var toastTimer = null;
  function toast(msg, ms) {
    var old = $('.toast');
    if (old) old.remove();
    var t = h('<div class="toast">' + esc(msg) + '</div>');
    document.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { if (t.parentNode) t.remove(); }, ms || 1900);
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* ---------- 导出文本：优先剪贴板，失败则下载文件 ---------- */
  function download(text, filename) {
    try {
      var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
      toast('已下载 ' + filename);
      return true;
    } catch (e) { toast('导出失败：' + e.message); return false; }
  }

  function copyOrDownload(text, filename) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        toast('已复制到剪贴板（可粘贴到备忘录或微信收藏）');
      }).catch(function () { download(text, filename); });
    } else {
      download(text, filename);
    }
  }

  /** 归一化中文题干，用于去重比较 */
  function normalizeCn(s) {
    return String(s || '')
      .replace(/[\s\u3000]/g, '')
      .replace(/[，。、；：""''？！,.;:!?"']/g, '');
  }

  SF.util = {
    pad: pad, dateStr: dateStr, parseDate: parseDate, addDays: addDays,
    diffDays: diffDays, today: today, seedFrom: seedFrom, shuffleSeed: shuffleSeed,
    hash: hash, esc: esc, h: h, $: $, $$: $$, stars: stars, toast: toast,
    clamp: clamp, normalizeCn: normalizeCn,
    download: download, copyOrDownload: copyOrDownload
  };
})(window.SF);
