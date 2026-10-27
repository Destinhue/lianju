/* ============================================================
   core/speech.js — 朗读（浏览器内置 Web Speech API，零成本零依赖）
   不可用时静默降级：隐藏按钮，绝不报错。
   ============================================================ */
window.SF = window.SF || {};
(function (SF) {
  'use strict';

  function supported() {
    return typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof window.SpeechSynthesisUtterance === 'function';
  }

  var cachedVoice = null;
  function pickVoice() {
    if (cachedVoice) return cachedVoice;
    try {
      var voices = window.speechSynthesis.getVoices() || [];
      var prefer = ['en-US', 'en-GB', 'en_AU', 'en'];
      for (var p = 0; p < prefer.length; p++) {
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].lang && voices[i].lang.replace('_', '-').indexOf(prefer[p]) === 0) {
            cachedVoice = voices[i];
            return cachedVoice;
          }
        }
      }
    } catch (e) { }
    return null;
  }

  function speak(text, rate) {
    if (!supported() || !text) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(String(text));
      u.lang = 'en-US';
      u.rate = rate || 0.92;
      u.pitch = 1;
      var v = pickVoice();
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function stop() {
    if (!supported()) return;
    try { window.speechSynthesis.cancel(); } catch (e) { }
  }

  // 某些浏览器 voices 是异步加载的，预热一次
  if (supported()) {
    try { window.speechSynthesis.onvoiceschanged = function () { cachedVoice = null; pickVoice(); }; } catch (e) { }
  }

  SF.speech = { supported: supported, speak: speak, stop: stop };
})(window.SF);
