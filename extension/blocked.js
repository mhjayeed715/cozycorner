// Read the attempted URL from the referrer or query param
const params = new URLSearchParams(window.location.search);
const attemptedUrl = params.get("url") || document.referrer || "";
const attemptedHost = (() => {
  try { return attemptedUrl ? new URL(attemptedUrl).hostname : ""; } catch { return attemptedUrl; }
})();

const domainEl = document.getElementById("blocked-domain-text");
if (domainEl && attemptedHost) {
  domainEl.textContent = attemptedHost;
}

// Log distraction event
try {
  chrome.runtime.sendMessage({
    action: "blockAttempt",
    type: "navigation_blocked",
    url: attemptedUrl || window.location.href,
  });
} catch {}

let countdown = 3;
const badge = document.getElementById("countdown-badge");

const tick = setInterval(() => {
  countdown--;
  if (badge && countdown > 0) {
    badge.textContent = `🌸 Return to Cozy Sanctuary (${countdown}s)...`;
  }
}, 1000);

function returnToApp() {
  clearInterval(tick);
  try {
    chrome.runtime.sendMessage({ action: "redirectOrCloseBlockedTab" }, (res) => {
      if (chrome.runtime.lastError || !res) {
        window.location.href = "https://cozyycorner.vercel.app/";
      }
    });
  } catch {
    window.location.href = "https://cozyycorner.vercel.app/";
  }
}

badge?.addEventListener("click", returnToApp);

setTimeout(returnToApp, 3000);
