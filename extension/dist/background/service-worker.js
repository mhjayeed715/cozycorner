// src/shared/api.ts
var SUPABASE_URL = "https://vavppeevglpvyfoorfje.supabase.co";
var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdnBwZWV2Z2xwdnlmb29yZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODEwNTksImV4cCI6MjA5MjQ1NzA1OX0.3PI_2nJsIHaJUzvEc_cNggcwbv147Q2aGlRhVdBncuA";
async function refreshAccessToken() {
  try {
    const stored = await new Promise(
      (res2) => chrome.storage.local.get("userAuth", (d) => res2(d.userAuth ?? {}))
    );
    const refreshToken = stored.refreshToken;
    if (!refreshToken) return null;
    const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    if (!res.ok) return null;
    const data = await res.json();
    const newToken = data.access_token;
    const newRefresh = data.refresh_token;
    if (newToken) {
      await chrome.storage.local.set({
        userAuth: { ...stored, token: newToken, refreshToken: newRefresh ?? refreshToken }
      });
    }
    return newToken ?? null;
  } catch {
    return null;
  }
}
async function getValidToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const pad = base64.length % 4;
      const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
      const payload = JSON.parse(atob(padded));
      if (payload.exp && payload.exp - Date.now() / 1e3 < 60) {
        return await refreshAccessToken() ?? token;
      }
    }
  } catch {
  }
  return token;
}
async function syncBlockEvent(token, sessionId, url, type = "navigation_blocked", domain, details) {
  if (!token) {
    console.warn("[CozyLock Extension] syncBlockEvent skipped: no auth token available");
    return;
  }
  token = await getValidToken(token) ?? token;
  let userId = null;
  try {
    const base64Url = token.split(".")[1];
    if (base64Url) {
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const pad = base64.length % 4;
      const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
      const jsonPayload = decodeURIComponent(
        atob(padded).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
      );
      const parsed = JSON.parse(jsonPayload);
      userId = parsed.sub || parsed.user_id || null;
    }
  } catch (e) {
    console.warn("[CozyLock Extension] JWT decode warning:", e);
  }
  if (!userId) {
    console.warn("[CozyLock Extension] syncBlockEvent skipped: could not extract user_id from JWT");
    return;
  }
  const resolvedDomain = domain || (url ? (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })() : "unknown");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  console.log("[CozyLock Extension] Logging distraction:", { type, domain: resolvedDomain, url });
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/distraction_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${token}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        user_id: userId,
        type,
        domain: resolvedDomain,
        blocked_at: now,
        timestamp: now,
        details: details || { url, timestamp: now }
      })
    });
    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("[CozyLock Extension] Failed to insert distraction_log:", res.status, errBody);
    } else {
      console.log("[CozyLock Extension] Distraction log saved successfully for:", resolvedDomain);
    }
  } catch (err) {
    console.warn("[CozyLock Extension] Failed to sync block event:", err);
  }
}

// src/background/service-worker.ts
var COZY_APP_DOMAINS = [
  "cozyycorner.vercel.app",
  "localhost",
  "127.0.0.1",
  "cozyplay"
];
var ALWAYS_ALLOWED_DOMAINS = [
  "cozyycorner.vercel.app",
  "localhost",
  "127.0.0.1",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "unpkg.com",
  "www.youtube.com",
  "youtube.com",
  "i.ytimg.com",
  "ytimg.com",
  "youtube-nocookie.com",
  "vavppeevglpvyfoorfje.supabase.co",
  "supabase.co"
];
var DEFAULT_WHITELISTED_DOMAINS = [
  "github.com",
  "stackoverflow.com",
  "wikipedia.org",
  "notion.so",
  "docs.google.com",
  "chatgpt.com",
  "claude.ai",
  "figma.com",
  "canvas.instructure.com",
  "google.com",
  "youtube.com"
];
var _state = {
  active: false,
  sessionId: null,
  blocklist: [],
  allowedUrls: [...DEFAULT_WHITELISTED_DOMAINS],
  userId: null,
  token: null,
  focusStartTime: null,
  focusDuration: 25 * 60 * 1e3,
  focusPIN: ""
};
function normalizeDomain(raw) {
  if (!raw) return "";
  return raw.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/:.*$/, "").replace(/\/.*$/, "").trim();
}
function isCozyTab(url) {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return COZY_APP_DOMAINS.some((d) => h === d || h.endsWith("." + d));
  } catch {
    return false;
  }
}
function buildAllowedList(allowedUrls) {
  const custom = allowedUrls && allowedUrls.length > 0 ? allowedUrls : DEFAULT_WHITELISTED_DOMAINS;
  return [...ALWAYS_ALLOWED_DOMAINS, ...custom].map(normalizeDomain).filter(Boolean);
}
function shouldBlock(url) {
  if (!_state.active || !url) return false;
  if (url.startsWith("chrome-extension://") || url.startsWith("chrome://") || url.startsWith("edge://") || url.startsWith("about:") || url.startsWith("file://")) return false;
  let hostname = "";
  try {
    hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "").replace(/:.*$/, "");
  } catch {
    return false;
  }
  const allowedList = buildAllowedList(_state.allowedUrls || []);
  const isAllowed = allowedList.some((clean) => clean && (hostname === clean || hostname.endsWith("." + clean)));
  if (!isAllowed) {
    console.log("[CozyLock SW] Blocked distracting domain:", hostname);
  }
  return !isAllowed;
}
async function persistState() {
  await chrome.storage.local.set({ focusState: { ..._state }, pin: _state.focusPIN });
  notifyAllTabs(_state.active);
}
async function loadState() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["focusState", "pin", "userAuth", "cozylockWhitelist"], (data) => {
      if (data.focusState) {
        _state = { ..._state, ...data.focusState };
        if (!Array.isArray(_state.allowedUrls) || _state.allowedUrls.length === 0) {
          _state.allowedUrls = data.cozylockWhitelist || [...DEFAULT_WHITELISTED_DOMAINS];
        }
      } else if (data.cozylockWhitelist) {
        _state.allowedUrls = data.cozylockWhitelist;
      }
      if (data.pin) _state.focusPIN = String(data.pin);
      if (data.userAuth?.token) {
        _state.token = data.userAuth.token;
        _state.userId = data.userAuth.email || data.userAuth.userId || _state.userId;
      }
      if (_state.active && _state.focusStartTime && _state.focusDuration) {
        const durationMs = _state.focusDuration <= 1440 ? _state.focusDuration * 60 * 1e3 : _state.focusDuration;
        if (Date.now() - _state.focusStartTime >= durationMs) {
          _state.active = false;
          _state.focusStartTime = null;
          chrome.storage.local.set({ focusState: { ..._state } });
          notifyAllTabs(false);
          chrome.alarms.clear("autoUnlockFocus");
        }
      }
      resolve();
    });
  });
}
function notifyAllTabs(isActive) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id && tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://") && !tab.url.startsWith("about:")) {
        chrome.tabs.sendMessage(tab.id, {
          action: "focusStateChanged",
          isActive,
          active: isActive,
          focusStartTime: _state.focusStartTime,
          focusDuration: _state.focusDuration,
          focusPIN: _state.focusPIN,
          allowedUrls: _state.allowedUrls
        }, () => {
          if (chrome.runtime.lastError) {
          }
        });
      }
    });
  });
}
async function logDistraction(data) {
  const rawUrl = data.url || "";
  let domain = "";
  try {
    domain = new URL(rawUrl).hostname;
  } catch {
    domain = rawUrl || "unknown";
  }
  const sessionId = _state.sessionId || `session-${Date.now()}`;
  const event = {
    type: data.type || "navigation_blocked",
    url: rawUrl,
    timestamp: Date.now(),
    sessionId
  };
  const pending = await new Promise(
    (res) => chrome.storage.local.get("pendingEvents", (d) => res(d.pendingEvents ?? []))
  );
  await chrome.storage.local.set({ pendingEvents: [...pending, event] });
  if (_state.token) {
    await syncBlockEvent(_state.token, sessionId, rawUrl, event.type, domain, {
      url: rawUrl,
      domain,
      source: "cozylock_extension",
      timestamp: new Date(event.timestamp).toISOString()
    });
  }
}
chrome.webNavigation?.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;
  if (!shouldBlock(details.url)) return;
  const blockedUrl = chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(details.url);
  chrome.tabs.update(details.tabId, { url: blockedUrl });
  logDistraction({ type: "navigation_blocked", url: details.url });
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url || !shouldBlock(changeInfo.url)) return;
  const blockedUrl = chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(changeInfo.url);
  chrome.tabs.update(tabId, { url: blockedUrl });
  logDistraction({ type: "navigation_blocked", url: changeInfo.url });
});
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (!_state.active) return;
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (!tab?.url || !shouldBlock(tab.url)) return;
    const blockedUrl = chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(tab.url);
    chrome.tabs.update(tab.id, { url: blockedUrl });
    logDistraction({ type: "tab_switch_blocked", url: tab.url });
  } catch {
  }
});
chrome.tabs.onCreated.addListener((tab) => {
  if (!_state.active) return;
  setTimeout(async () => {
    try {
      if (!tab.id) return;
      const current = await chrome.tabs.get(tab.id);
      const url = current.url || current.pendingUrl || "";
      if (!shouldBlock(url)) return;
      const blockedUrl = chrome.runtime.getURL("blocked.html") + "?url=" + encodeURIComponent(url);
      chrome.tabs.update(tab.id, { url: blockedUrl });
      logDistraction({ type: "new_tab_blocked", url });
    } catch {
    }
  }, 250);
});
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "autoUnlockFocus" && _state.active) {
    _state.active = false;
    _state.focusStartTime = null;
    _state.sessionId = null;
    await persistState();
  }
});
chrome.webNavigation?.onErrorOccurred.addListener((details) => {
  if (details.error !== "net::ERR_BLOCKED_BY_CLIENT") return;
  if (_state.active) logDistraction({ type: "navigation_blocked", url: details.url });
});
function handleMessage(request, sender, sendResponse) {
  if (!request) return;
  if (request.action === "syncAuth") {
    (async () => {
      const nextToken = request.token || _state.token;
      const nextUserId = request.userId || _state.userId;
      _state.token = nextToken;
      _state.userId = nextUserId;
      await chrome.storage.local.set({
        userAuth: { token: nextToken, userId: nextUserId, email: request.email || nextUserId }
      });
      if (request.pin) {
        _state.focusPIN = String(request.pin);
        await chrome.storage.local.set({ pin: _state.focusPIN });
      }
      await persistState();
      sendResponse({ ok: true, success: true });
    })();
    return true;
  }
  if (request.action === "syncPin") {
    (async () => {
      if (request.pin !== void 0) {
        _state.focusPIN = String(request.pin).trim();
        await chrome.storage.local.set({ pin: _state.focusPIN, focusState: { ..._state } });
      }
      sendResponse({ ok: true, success: true, pin: _state.focusPIN });
    })();
    return true;
  }
  if (request.action === "startFocus" || request.type === "START_SESSION") {
    (async () => {
      let duration = request.duration || (request.durationMinutes ? request.durationMinutes * 60 * 1e3 : 25 * 60 * 1e3);
      if (duration > 0 && duration <= 1440) duration = duration * 60 * 1e3;
      const incoming = Array.isArray(request.allowedUrls) ? request.allowedUrls : Array.isArray(request.whitelistedSites) ? request.whitelistedSites : _state.allowedUrls || DEFAULT_WHITELISTED_DOMAINS;
      const allowedUrls = Array.from(new Set(
        [...COZY_APP_DOMAINS, ...incoming].map((v) => normalizeDomain(String(v || ""))).filter(Boolean)
      ));
      const pin = request.pin !== void 0 ? String(request.pin).trim() : _state.focusPIN || "";
      const token = request.token || _state.token;
      const sessionId = request.sessionId || `session-${Date.now()}`;
      const userId = request.userId || _state.userId;
      const startTime = request.focusStartTime || Date.now();
      _state = {
        active: true,
        sessionId,
        token,
        userId,
        blocklist: [],
        allowedUrls,
        focusStartTime: startTime,
        focusDuration: duration,
        focusPIN: pin
      };
      chrome.alarms.create("autoUnlockFocus", { when: startTime + duration });
      await chrome.storage.local.set({ focusState: { ..._state }, cozylockWhitelist: allowedUrls, pin });
      notifyAllTabs(true);
      console.log("[CozyLock SW] Focus Lock Active. Allowed sites:", allowedUrls, "PIN set:", Boolean(pin));
      sendResponse({
        ok: true,
        success: true,
        message: "CozyLock Active",
        focusStartTime: startTime,
        focusDuration: duration,
        focusPIN: pin
      });
    })();
    return true;
  }
  if (request.action === "endFocus" || request.action === "pauseFocus" || request.type === "STOP_SESSION") {
    (async () => {
      const storedPin = _state.focusPIN ? String(_state.focusPIN).trim() : "";
      const incomingPin = request.pin !== void 0 ? String(request.pin).trim() : "";
      if (storedPin && storedPin.length > 0) {
        if (incomingPin !== storedPin) {
          sendResponse({
            ok: false,
            success: false,
            message: "Incorrect 4-digit PIN. Focus lock cannot be stopped without the safety PIN."
          });
          return;
        }
      }
      chrome.alarms.clear("autoUnlockFocus");
      _state.active = false;
      _state.focusStartTime = null;
      _state.sessionId = null;
      await persistState();
      sendResponse({ ok: true, success: true, message: "CozyLock Released" });
    })();
    return true;
  }
  if (request.action === "updateWhitelist" || request.action === "syncBlocklist") {
    (async () => {
      const incoming = Array.isArray(request.allowedUrls) ? request.allowedUrls : Array.isArray(request.whitelistedSites) ? request.whitelistedSites : [];
      _state.allowedUrls = Array.from(new Set(
        [...COZY_APP_DOMAINS, ...incoming].map((d) => normalizeDomain(d)).filter(Boolean)
      ));
      await chrome.storage.local.set({ cozylockWhitelist: _state.allowedUrls, focusState: { ..._state } });
      console.log("[CozyLock SW] Whitelist updated:", _state.allowedUrls);
      sendResponse({ ok: true, success: true });
    })();
    return true;
  }
  if (request.action === "getStatus" || request.type === "GET_STATE") {
    const elapsed = _state.focusStartTime ? Date.now() - _state.focusStartTime : 0;
    const remaining = _state.focusStartTime && _state.active ? Math.max(0, _state.focusDuration - elapsed) : 0;
    sendResponse({
      ..._state,
      active: _state.active,
      isActive: _state.active,
      remainingTime: remaining,
      remainingSeconds: Math.floor(remaining / 1e3),
      focusStartTime: _state.focusStartTime,
      focusDuration: _state.focusDuration,
      focusPIN: _state.focusPIN,
      allowedUrls: _state.allowedUrls
    });
    return true;
  }
  if (request.action === "closeBlockedTab" || request.action === "redirectOrCloseBlockedTab") {
    (async () => {
      const tabs = await chrome.tabs.query({});
      const cozyTab = tabs.find((t) => t.url && isCozyTab(t.url));
      const defaultAppUrl = "https://cozyycorner.vercel.app/";
      if (cozyTab?.id) {
        chrome.tabs.update(cozyTab.id, { active: true }, () => {
          if (chrome.runtime.lastError) {
          }
        });
        if (sender.tab?.id) {
          if (tabs.length > 1) {
            chrome.tabs.remove(sender.tab.id, () => {
              if (chrome.runtime.lastError) {
              }
            });
          } else {
            chrome.tabs.update(sender.tab.id, { url: defaultAppUrl });
          }
        }
      } else if (sender.tab?.id) {
        chrome.tabs.update(sender.tab.id, { url: defaultAppUrl });
      }
      sendResponse({ ok: true });
    })();
    return true;
  }
  if (request.action === "blockAttempt") {
    logDistraction({ type: request.type || "blockAttempt", url: request.url });
    sendResponse({ logged: true });
    return true;
  }
}
chrome.runtime.onMessage.addListener(handleMessage);
if (chrome.runtime.onMessageExternal) {
  chrome.runtime.onMessageExternal.addListener(handleMessage);
}
chrome.runtime.onInstalled.addListener(() => loadState());
chrome.runtime.onStartup.addListener(() => loadState());
loadState().then(() => {
  console.log("[CozyLock SW] Initialized. active:", _state.active, "allowedUrls:", _state.allowedUrls);
});
