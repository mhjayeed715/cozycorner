// src/content/overlay.ts
(function() {
  function isCozyAppPage() {
    if (typeof window === "undefined" || !window.location) return false;
    const href = (window.location.href || "").toLowerCase();
    const host = (window.location.hostname || "").toLowerCase().replace(/^www\./, "");
    const proto = (window.location.protocol || "").toLowerCase();
    if (proto === "file:" && (href.includes("cozyplay") || href.includes("cozy") || href.includes("index.html"))) {
      return true;
    }
    if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host === "[::1]") {
      return true;
    }
    if (host.includes("vercel.app") || host.includes("cozyycorner") || host.includes("cozyplay") || host.includes("cozycorner")) {
      return true;
    }
    if (typeof document !== "undefined") {
      if (document.getElementById("cozylock-status-badge") || document.getElementById("nav-download-extension-btn") || document.getElementById("settings-drawer-overlay") || document.querySelector(".corner-title") || document.querySelector(".sanctuary-app")) {
        return true;
      }
      if (document.title && document.title.toLowerCase().includes("cozy")) {
        return true;
      }
    }
    return false;
  }
  const isApp = isCozyAppPage();
  const currentHost = window.location.hostname.toLowerCase().replace(/^www\./, "");
  const syncChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("COZYLOCK_SYNC_CHANNEL") : null;
  function safeSendMessage(message, callback) {
    try {
      if (typeof chrome === "undefined" || !chrome.runtime || !chrome.runtime.id) return;
      chrome.runtime.sendMessage(message, (res) => {
        if (chrome.runtime.lastError) return;
        if (callback) callback(res);
      });
    } catch {
    }
  }
  if (isApp) {
    let postStateToWebApp2 = function(state) {
      if (!state) return;
      const payload = {
        type: "COZYLOCK_EXTENSION_STATE",
        isInstalled: true,
        state: {
          ...state,
          active: Boolean(state.active || state.isActive),
          isActive: Boolean(state.active || state.isActive),
          focusStartTime: state.focusStartTime || null,
          focusDuration: state.focusDuration || null,
          focusPIN: state.focusPIN || state.pin || "",
          allowedUrls: state.allowedUrls || [],
          remainingTime: state.remainingTime,
          remainingSeconds: state.remainingSeconds
        },
        version: "2.0.0",
        timestamp: Date.now()
      };
      window.postMessage(payload, "*");
      if (syncChannel) {
        try {
          syncChannel.postMessage(payload);
        } catch {
        }
      }
      try {
        localStorage.setItem("cozylock_shared_timer_state", JSON.stringify({
          active: Boolean(state.active || state.isActive),
          focusStartTime: state.focusStartTime || null,
          focusDuration: state.focusDuration || null,
          pin: state.focusPIN || state.pin || "",
          allowedUrls: state.allowedUrls || [],
          timestamp: Date.now()
        }));
      } catch {
      }
    }, refreshStatus2 = function() {
      safeSendMessage({ action: "getStatus" }, postStateToWebApp2);
    };
    var postStateToWebApp = postStateToWebApp2, refreshStatus = refreshStatus2;
    try {
      document.documentElement.setAttribute("data-cozylock-extension", "true");
      window.__COZYLOCK_INSTALLED__ = true;
    } catch {
    }
    refreshStatus2();
    setInterval(refreshStatus2, 1e3);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) refreshStatus2();
    });
    try {
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg.action === "focusStateChanged" || msg.type === "focusStateChanged") {
          if (msg.isActive !== void 0 || msg.active !== void 0) {
            postStateToWebApp2(msg);
          } else {
            refreshStatus2();
          }
        }
      });
    } catch {
    }
    try {
      chrome.storage?.onChanged?.addListener((changes, areaName) => {
        if (areaName === "local" && changes.focusState?.newValue) {
          postStateToWebApp2(changes.focusState.newValue);
        }
      });
    } catch {
    }
    window.addEventListener("message", (event) => {
      if (!event.data) return;
      const type = event.data.type;
      if (type !== "COZYLOCK_WEB_APP_ACTION" && type !== "FOCUSNYX_WEB_APP_ACTION") return;
      const { action } = event.data;
      const durationMins = event.data.durationMinutes || 25;
      const durationMs = event.data.duration || durationMins * 60 * 1e3;
      const pin = event.data.pin !== void 0 ? String(event.data.pin).replace(/\D/g, "").slice(0, 4) : void 0;
      const allowed = event.data.allowedUrls || [];
      const focusStartTime = event.data.focusStartTime || Date.now();
      if (action === "startFocus") {
        safeSendMessage({
          action: "startFocus",
          duration: durationMs,
          durationMinutes: durationMins,
          allowedUrls: allowed,
          pin,
          focusStartTime
        }, (res) => {
          if (res && res.success) {
            postStateToWebApp2({
              active: true,
              isActive: true,
              focusStartTime,
              focusDuration: durationMs,
              focusPIN: pin,
              allowedUrls: allowed
            });
          }
          refreshStatus2();
        });
      } else if (action === "endFocus" || action === "pauseFocus") {
        safeSendMessage({ action: "endFocus", pin }, (res) => {
          if (res) {
            window.postMessage({ type: "COZYLOCK_ACTION_RESPONSE", action, result: res }, "*");
            if (res.success) {
              postStateToWebApp2({
                active: false,
                isActive: false,
                focusStartTime: null,
                focusDuration: null,
                focusPIN: pin,
                allowedUrls: allowed
              });
            }
            refreshStatus2();
          }
        });
      } else if (action === "getStatus" || action === "checkStatus") {
        refreshStatus2();
      } else if (action === "updateWhitelist") {
        safeSendMessage({ action: "updateWhitelist", allowedUrls: allowed }, () => refreshStatus2());
      } else if (action === "syncPin") {
        safeSendMessage({ action: "syncPin", pin }, () => refreshStatus2());
      }
    });
    if (syncChannel) {
      syncChannel.onmessage = (event) => {
        if (!event.data) return;
        const { action } = event.data;
        if (action === "startFocus") {
          const durationMins = event.data.durationMinutes || 25;
          safeSendMessage({
            action: "startFocus",
            duration: durationMins * 60 * 1e3,
            allowedUrls: event.data.allowedUrls || [],
            pin: event.data.pin || "",
            focusStartTime: event.data.focusStartTime || Date.now()
          }, () => refreshStatus2());
        } else if (action === "endFocus" || action === "pauseFocus") {
          safeSendMessage({ action: "endFocus", pin: event.data.pin || "" }, () => refreshStatus2());
        }
      };
    }
    return;
  }
  let overlayEl = null;
  let inputBlockingActive = false;
  function normHost(raw) {
    return raw.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/:.*$/, "").replace(/\/.*$/, "").trim();
  }
  function isSiteAllowed(state) {
    const allowedUrls = state?.allowedUrls || [];
    const systemAllowed = [
      "cozyycorner.vercel.app",
      "localhost",
      "127.0.0.1",
      "fonts.googleapis.com",
      "fonts.gstatic.com",
      "unpkg.com",
      "youtube.com",
      "www.youtube.com",
      "i.ytimg.com",
      "ytimg.com",
      "youtube-nocookie.com"
    ];
    return [...systemAllowed, ...allowedUrls].some((d) => {
      const clean = normHost(d);
      return clean && (currentHost === clean || currentHost.endsWith("." + clean));
    });
  }
  function createOverlay() {
    if (overlayEl) return;
    overlayEl = document.createElement("div");
    overlayEl.id = "cozylock-block-overlay";
    overlayEl.style.cssText = `
      position: fixed !important; top: 0 !important; left: 0 !important;
      width: 100vw !important; height: 100vh !important;
      z-index: 2147483647 !important;
      background: radial-gradient(circle at center, #1a1024 0%, #0a060d 100%) !important;
      display: flex !important; flex-direction: column !important;
      align-items: center !important; justify-content: center !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      color: #fdf4f8 !important; cursor: not-allowed !important;
      user-select: none !important; -webkit-user-select: none !important;
    `;
    overlayEl.innerHTML = `
      <div style="text-align:center;max-width:440px;padding:36px 30px;background:rgba(26,16,34,0.85);backdrop-filter:blur(24px);border:1px solid rgba(244,114,182,0.3);border-radius:24px;box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(244,114,182,0.2);">
        <div style="font-size:52px;margin-bottom:12px;filter:drop-shadow(0 0 16px rgba(244,114,182,0.6));">\u{1F512}</div>
        <h1 style="font-size:24px;font-weight:800;margin:0 0 8px 0;color:#fdf4f8;letter-spacing:-0.5px;">CozyLock Active</h1>
        <p style="font-size:14px;color:#b8a6c4;margin:0 0 20px 0;line-height:1.5;">
          This domain is blocked during your Cozy Corner study session.<br/>Keep your focus and gentle flow! \u2728
        </p>
        <div style="background:rgba(14,9,20,0.6);border:1px solid rgba(244,114,182,0.2);border-radius:14px;padding:12px 18px;margin-bottom:22px;">
          <p style="font-size:11px;color:#786684;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:1px;">Blocked Domain</p>
          <p style="font-size:15px;font-weight:700;color:#fda4af;margin:0;word-break:break-all;">${currentHost || window.location.href}</p>
        </div>
        <button id="cozylock-return-btn" style="
          background:linear-gradient(135deg,#f472b6 0%,#db2777 100%);
          border:1px solid rgba(255,255,255,0.3);
          box-shadow:0 0 20px rgba(244,114,182,0.4);
          color:white;font-size:13px;font-weight:700;padding:12px 28px;border-radius:9999px;
          cursor:pointer;letter-spacing:0.5px;transition:transform 0.2s ease;">\u2190 Return to Cozy Sanctuary</button>
      </div>
    `;
    document.documentElement.appendChild(overlayEl);
    const btn = document.getElementById("cozylock-return-btn");
    if (btn) {
      btn.addEventListener("mousedown", (e) => {
        e.stopImmediatePropagation();
        safeSendMessage({ action: "closeBlockedTab" });
      }, { capture: true });
    }
  }
  function removeOverlay() {
    if (overlayEl) {
      overlayEl.remove();
      overlayEl = null;
    }
  }
  function blockInput(e) {
    const target = e.target;
    if (target?.id === "cozylock-return-btn") return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
  const BLOCK_EVENTS = [
    "keydown",
    "keyup",
    "keypress",
    "mousedown",
    "mouseup",
    "click",
    "dblclick",
    "contextmenu",
    "wheel",
    "input",
    "change",
    "paste",
    "cut",
    "copy",
    "dragstart",
    "drop",
    "touchstart",
    "touchmove",
    "touchend"
  ];
  function enableInputBlocking() {
    if (inputBlockingActive) return;
    inputBlockingActive = true;
    BLOCK_EVENTS.forEach(
      (evt) => document.addEventListener(evt, blockInput, { capture: true, passive: false })
    );
    document.querySelectorAll("input, textarea, select, [contenteditable]").forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.blur();
    });
  }
  function disableInputBlocking() {
    if (!inputBlockingActive) return;
    inputBlockingActive = false;
    BLOCK_EVENTS.forEach(
      (evt) => document.removeEventListener(evt, blockInput, { capture: true })
    );
  }
  function applyFocusState(state) {
    if (!state) return;
    const active = Boolean(state.isActive ?? state.active);
    if (!active) {
      removeOverlay();
      disableInputBlocking();
      return;
    }
    if (isSiteAllowed(state)) {
      removeOverlay();
      disableInputBlocking();
    } else {
      createOverlay();
      enableInputBlocking();
    }
  }
  safeSendMessage({ action: "getStatus" }, applyFocusState);
  try {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.action === "focusStateChanged" || msg.type === "focusStateChanged")
        safeSendMessage({ action: "getStatus" }, applyFocusState);
    });
  } catch {
  }
  try {
    chrome.storage?.onChanged?.addListener((changes, area) => {
      if (area === "local" && changes.focusState)
        applyFocusState(changes.focusState.newValue);
    });
  } catch {
  }
  setInterval(() => safeSendMessage({ action: "getStatus" }, applyFocusState), 1500);
  const observer = new MutationObserver(() => {
    if (overlayEl && overlayEl.parentElement !== document.documentElement)
      document.documentElement.appendChild(overlayEl);
    if (inputBlockingActive) {
      document.querySelectorAll("input, textarea, select, [contenteditable]").forEach((el) => {
        el.setAttribute("tabindex", "-1");
        el.blur();
      });
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
