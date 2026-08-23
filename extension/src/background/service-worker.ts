import type { FocusState, BlockEvent } from "../shared/types";
import { syncBlockEvent } from "../shared/api";

const COZY_APP_DOMAINS = [
  "cozyycorner.vercel.app",
  "localhost",
  "127.0.0.1",
  "cozyplay"
];

// These infrastructure domains are ALWAYS allowed so the app, player & styles work seamlessly
const ALWAYS_ALLOWED_DOMAINS = [
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

const DEFAULT_WHITELISTED_DOMAINS = [
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

// Single source of truth — kept synchronized with chrome.storage.local
let _state: FocusState = {
  active: false,
  sessionId: null,
  blocklist: [],
  allowedUrls: [...DEFAULT_WHITELISTED_DOMAINS],
  userId: null,
  token: null,
  focusStartTime: null,
  focusDuration: 25 * 60 * 1000,
  focusPIN: "",
};

function normalizeDomain(raw: string): string {
  if (!raw) return "";
  return raw.toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/:.*$/, "")
    .replace(/\/.*$/, "")
    .trim();
}

function isCozyTab(url: string): boolean {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return COZY_APP_DOMAINS.some((d) => h === d || h.endsWith("." + d));
  } catch { return false; }
}

// Full allowed list: essential system domains + active user whitelist
function buildAllowedList(allowedUrls: string[]): string[] {
  const custom = (allowedUrls && allowedUrls.length > 0) ? allowedUrls : DEFAULT_WHITELISTED_DOMAINS;
  return [...ALWAYS_ALLOWED_DOMAINS, ...custom].map(normalizeDomain).filter(Boolean);
}

// Returns true if this URL should be redirected to blocked.html
function shouldBlock(url: string): boolean {
  if (!_state.active || !url) return false;
  if (
    url.startsWith("chrome-extension://") ||
    url.startsWith("chrome://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("file://")
  ) return false;

  let hostname = "";
  try {
    hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "").replace(/:.*$/, "");
  } catch { return false; }

  const allowedList = buildAllowedList(_state.allowedUrls || []);
  const isAllowed = allowedList.some((clean) => clean && (hostname === clean || hostname.endsWith("." + clean)));
  
  if (!isAllowed) {
    console.log("[CozyLock SW] Blocked distracting domain:", hostname);
  }
  return !isAllowed;
}

// Persist state to storage and notify all tabs
async function persistState(): Promise<void> {
  await chrome.storage.local.set({ focusState: { ..._state }, pin: _state.focusPIN });
  notifyAllTabs(_state.active);
}

// Load state from storage into _state
async function loadState(): Promise<void> {
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

      // Auto-unlock if timer already expired
      if (_state.active && _state.focusStartTime && _state.focusDuration) {
        const durationMs = _state.focusDuration <= 1440
          ? _state.focusDuration * 60 * 1000
          : _state.focusDuration;
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

function notifyAllTabs(isActive: boolean) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id && tab.url &&
        !tab.url.startsWith("chrome://") &&
        !tab.url.startsWith("edge://") &&
        !tab.url.startsWith("about:")) {
        chrome.tabs.sendMessage(tab.id, {
          action: "focusStateChanged",
          isActive,
          active: isActive,
          focusStartTime: _state.focusStartTime,
          focusDuration: _state.focusDuration,
          focusPIN: _state.focusPIN,
          allowedUrls: _state.allowedUrls
        }, () => {
          if (chrome.runtime.lastError) {}
        });
      }
    });
  });
}

async function logDistraction(data: Partial<BlockEvent>) {
  const rawUrl = data.url || "";
  let domain = "";
  try { domain = new URL(rawUrl).hostname; } catch { domain = rawUrl || "unknown"; }

  const sessionId = _state.sessionId || `session-${Date.now()}`;
  const event: BlockEvent = {
    type: data.type || "navigation_blocked",
    url: rawUrl,
    timestamp: Date.now(),
    sessionId,
  };

  const pending: BlockEvent[] = await new Promise((res) =>
    chrome.storage.local.get("pendingEvents", (d) => res(d.pendingEvents ?? []))
  );
  await chrome.storage.local.set({ pendingEvents: [...pending, event] });

  if (_state.token) {
    await syncBlockEvent(_state.token, sessionId, rawUrl, event.type, domain, {
      url: rawUrl, domain, source: "cozylock_extension",
      timestamp: new Date(event.timestamp).toISOString(),
    });
  }
}

// ── Interception & Blocking Listeners ──

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
    chrome.tabs.update(tab.id!, { url: blockedUrl });
    logDistraction({ type: "tab_switch_blocked", url: tab.url });
  } catch {}
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
    } catch {}
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

// ── Universal Message Handler ──

function handleMessage(request: any, sender: any, sendResponse: (response?: any) => void) {
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
      if (request.pin !== undefined) {
        _state.focusPIN = String(request.pin).trim();
        await chrome.storage.local.set({ pin: _state.focusPIN, focusState: { ..._state } });
      }
      sendResponse({ ok: true, success: true, pin: _state.focusPIN });
    })();
    return true;
  }

  if (request.action === "startFocus" || request.type === "START_SESSION") {
    (async () => {
      let duration = request.duration || (request.durationMinutes ? request.durationMinutes * 60 * 1000 : 25 * 60 * 1000);
      if (duration > 0 && duration <= 1440) duration = duration * 60 * 1000;

      const incoming: string[] = Array.isArray(request.allowedUrls)
        ? request.allowedUrls
        : (Array.isArray(request.whitelistedSites) ? request.whitelistedSites : (_state.allowedUrls || DEFAULT_WHITELISTED_DOMAINS));

      const allowedUrls = Array.from(new Set(
        [...COZY_APP_DOMAINS, ...incoming].map((v) => normalizeDomain(String(v || ""))).filter(Boolean)
      ));

      const pin = request.pin !== undefined ? String(request.pin).trim() : (_state.focusPIN || "");
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
        focusPIN: pin,
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
      const incomingPin = request.pin !== undefined ? String(request.pin).trim() : "";

      // If a PIN is configured, enforce that incomingPin matches storedPin
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
      const incoming: string[] = Array.isArray(request.allowedUrls)
        ? request.allowedUrls
        : (Array.isArray(request.whitelistedSites) ? request.whitelistedSites : []);
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
    const elapsed = _state.focusStartTime ? (Date.now() - _state.focusStartTime) : 0;
    const remaining = _state.focusStartTime && _state.active
      ? Math.max(0, _state.focusDuration - elapsed)
      : 0;
    sendResponse({
      ..._state,
      active: _state.active,
      isActive: _state.active,
      remainingTime: remaining,
      remainingSeconds: Math.floor(remaining / 1000),
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
        chrome.tabs.update(cozyTab.id, { active: true }, () => { if (chrome.runtime.lastError) {} });
        if (sender.tab?.id) {
          if (tabs.length > 1) {
            chrome.tabs.remove(sender.tab.id, () => { if (chrome.runtime.lastError) {} });
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

export {};
