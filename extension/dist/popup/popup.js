// src/popup/popup.ts
var selectedDuration = 25 * 60 * 1e3;
var allowedUrls = [
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
var focusActive = false;
var timerInterval = null;
var savedEmergencyPin = "";
var currentStartTime = null;
var currentDuration = 25 * 60 * 1e3;
var tabFocusBtn = document.getElementById("tabFocusBtn");
var tabSettingsBtn = document.getElementById("tabSettingsBtn");
var tabFocus = document.getElementById("tabFocus");
var tabSettings = document.getElementById("tabSettings");
var statusDot = document.getElementById("statusDot");
var statusText = document.getElementById("statusText");
var timerDisplay = document.getElementById("timerDisplay");
var timerText = document.getElementById("timerText");
var statsDisplay = document.getElementById("statsDisplay");
var blockCount = document.getElementById("blockCount");
var allowedCount = document.getElementById("allowedCount");
var durationBtns = document.querySelectorAll(".duration-btn");
var durationSection = document.getElementById("durationSection");
var manualDurationInput = document.getElementById("manualDurationInput");
var focusBtn = document.getElementById("focusBtn");
var stopFocusBtn = document.getElementById("stopFocusBtn");
var openAppBtn = document.getElementById("openAppBtn");
var whitelistTagsPreview = document.getElementById("whitelistTagsPreview");
var pinInput = document.getElementById("pinInput");
var savePinBtn = document.getElementById("savePinBtn");
var pinStatusText = document.getElementById("pinStatusText");
function init() {
  setupTabs();
  setupEventListeners();
  loadSavedSettings();
  startStatusPolling();
}
function setupTabs() {
  tabFocusBtn?.addEventListener("click", () => {
    tabFocusBtn.classList.add("active");
    tabSettingsBtn.classList.remove("active");
    tabFocus.classList.add("active");
    tabSettings.classList.remove("active");
  });
  tabSettingsBtn?.addEventListener("click", () => {
    tabSettingsBtn.classList.add("active");
    tabFocusBtn.classList.remove("active");
    tabSettings.classList.add("active");
    tabFocus.classList.remove("active");
    renderWhitelistPreview();
  });
}
function setupEventListeners() {
  durationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      durationBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (manualDurationInput) manualDurationInput.value = "";
      const mins = parseInt(btn.dataset.minutes || "25", 10);
      selectedDuration = mins * 60 * 1e3;
    });
  });
  manualDurationInput?.addEventListener("input", () => {
    const val = parseInt(manualDurationInput.value, 10);
    if (!isNaN(val) && val > 0 && val <= 180) {
      durationBtns.forEach((b) => b.classList.remove("active"));
      selectedDuration = val * 60 * 1e3;
    }
  });
  focusBtn?.addEventListener("click", startFocus);
  stopFocusBtn?.addEventListener("click", stopFocus);
  openAppBtn?.addEventListener("click", openCozyCornerTab);
  pinInput?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
  });
  savePinBtn?.addEventListener("click", () => {
    const pin = (pinInput?.value || "").replace(/\D/g, "").slice(0, 4);
    if (pin.length === 4) {
      savedEmergencyPin = pin;
      chrome.storage.local.set({ pin });
      chrome.runtime.sendMessage({ action: "syncPin", pin });
      pinStatusText.textContent = "\u2713 4-digit Safety PIN saved";
      pinStatusText.style.color = "#34d399";
      setTimeout(() => {
        pinStatusText.textContent = "";
      }, 2500);
    } else {
      pinStatusText.textContent = "Please enter exactly 4 numeric digits";
      pinStatusText.style.color = "#fda4af";
      setTimeout(() => {
        pinStatusText.textContent = "";
      }, 2500);
    }
  });
}
function loadSavedSettings() {
  chrome.storage.local.get(["focusState", "pin", "cozylockWhitelist", "pendingEvents"], (result) => {
    if (result.pin) {
      savedEmergencyPin = String(result.pin).replace(/\D/g, "").slice(0, 4);
      if (pinInput) pinInput.value = savedEmergencyPin;
    } else if (result.focusState?.focusPIN) {
      savedEmergencyPin = String(result.focusState.focusPIN).replace(/\D/g, "").slice(0, 4);
      if (pinInput) pinInput.value = savedEmergencyPin;
    }
    if (result.cozylockWhitelist && Array.isArray(result.cozylockWhitelist)) {
      allowedUrls = result.cozylockWhitelist;
    } else if (result.focusState?.allowedUrls && Array.isArray(result.focusState.allowedUrls)) {
      allowedUrls = result.focusState.allowedUrls;
    }
    if (allowedCount) allowedCount.textContent = String(allowedUrls.length);
    renderWhitelistPreview();
    if (result.pendingEvents && blockCount) {
      blockCount.textContent = String(result.pendingEvents.length);
    }
    const state = result.focusState;
    if (state && (state.active || state.isActive)) {
      currentStartTime = state.focusStartTime || Date.now();
      currentDuration = state.focusDuration || selectedDuration;
      const elapsed = Date.now() - currentStartTime;
      const remainingMs = Math.max(0, currentDuration - elapsed);
      if (remainingMs > 0) {
        focusActive = true;
        updateUIForActive(remainingMs);
      } else {
        focusActive = false;
        updateUIForInactive();
      }
    } else {
      focusActive = false;
      updateUIForInactive();
    }
  });
}
function renderWhitelistPreview() {
  if (!whitelistTagsPreview) return;
  whitelistTagsPreview.innerHTML = "";
  allowedUrls.forEach((site) => {
    const chip = document.createElement("span");
    chip.className = "whitelist-chip";
    chip.textContent = site;
    whitelistTagsPreview.appendChild(chip);
  });
}
function checkFocusStatus() {
  chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
    if (chrome.runtime.lastError || !response) return;
    if (response.isActive || response.active) {
      focusActive = true;
      if (response.focusPIN) savedEmergencyPin = String(response.focusPIN).replace(/\D/g, "").slice(0, 4);
      currentStartTime = response.focusStartTime || currentStartTime || Date.now();
      currentDuration = response.focusDuration || currentDuration || selectedDuration;
      const elapsed = Date.now() - currentStartTime;
      const remainingMs = Math.max(0, currentDuration - elapsed);
      updateUIForActive(remainingMs);
    } else {
      focusActive = false;
      updateUIForInactive();
    }
  });
}
var statusPollInterval = null;
function startStatusPolling() {
  if (statusPollInterval) clearInterval(statusPollInterval);
  statusPollInterval = setInterval(checkFocusStatus, 1e3);
}
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.pin?.newValue) {
    savedEmergencyPin = String(changes.pin.newValue).replace(/\D/g, "").slice(0, 4);
    if (pinInput) pinInput.value = savedEmergencyPin;
  }
  if (changes.cozylockWhitelist?.newValue) {
    allowedUrls = changes.cozylockWhitelist.newValue;
    if (allowedCount) allowedCount.textContent = String(allowedUrls.length);
    renderWhitelistPreview();
  }
  if (changes.focusState) {
    const newState = changes.focusState.newValue;
    if (newState && (newState.active || newState.isActive)) {
      focusActive = true;
      currentStartTime = newState.focusStartTime || Date.now();
      currentDuration = newState.focusDuration || selectedDuration;
      if (newState.focusPIN) savedEmergencyPin = String(newState.focusPIN).replace(/\D/g, "").slice(0, 4);
      const remainingMs = Math.max(0, currentDuration - (Date.now() - currentStartTime));
      updateUIForActive(remainingMs);
    } else {
      focusActive = false;
      updateUIForInactive();
    }
  }
});
function updateUIForActive(remainingMs) {
  statusDot.className = "status-dot active";
  statusText.textContent = "Cozy Focus Active";
  focusBtn.style.display = "none";
  stopFocusBtn.style.display = "block";
  timerDisplay.style.display = "block";
  statsDisplay.style.display = "grid";
  durationSection.style.display = "none";
  startTimerTick();
}
function updateUIForInactive() {
  statusDot.className = "status-dot idle";
  statusText.textContent = "Ready / Inactive";
  focusBtn.style.display = "block";
  stopFocusBtn.style.display = "none";
  timerDisplay.style.display = "none";
  statsDisplay.style.display = "none";
  durationSection.style.display = "flex";
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  currentStartTime = null;
}
function startTimerTick() {
  if (timerInterval) clearInterval(timerInterval);
  function tick() {
    if (!currentStartTime) return;
    const elapsed = Date.now() - currentStartTime;
    const remainingMs = Math.max(0, currentDuration - elapsed);
    if (remainingMs <= 0) {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = null;
      updateUIForInactive();
      return;
    }
    const totalSeconds = Math.floor(remainingMs / 1e3);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (timerText) {
      timerText.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  }
  tick();
  timerInterval = setInterval(tick, 500);
}
function startFocus() {
  const startTime = Date.now();
  currentStartTime = startTime;
  currentDuration = selectedDuration;
  chrome.runtime.sendMessage(
    {
      action: "startFocus",
      duration: selectedDuration,
      allowedUrls,
      pin: savedEmergencyPin,
      focusStartTime: startTime
    },
    (res) => {
      if (chrome.runtime.lastError) return;
      if (res && res.success) {
        focusActive = true;
        updateUIForActive(selectedDuration);
        openCozyCornerTab();
      }
    }
  );
}
function stopFocus() {
  if (savedEmergencyPin && savedEmergencyPin.trim().length === 4) {
    const entered = prompt("Enter your 4-digit Safety PIN to release Focus Lock early:");
    if (!entered) return;
    const cleanPin = entered.replace(/\D/g, "").slice(0, 4);
    if (cleanPin !== savedEmergencyPin) {
      alert("Incorrect PIN. Focus session cannot be stopped without the 4-digit PIN.");
      return;
    }
  }
  chrome.runtime.sendMessage(
    {
      action: "endFocus",
      pin: savedEmergencyPin
    },
    (res) => {
      if (res && res.success) {
        focusActive = false;
        updateUIForInactive();
      } else {
        alert(res?.message || "Failed to release focus lock.");
      }
    }
  );
}
function openCozyCornerTab() {
  const targetHost = "https://cozyycorner.vercel.app/";
  chrome.tabs.query({}, (tabs) => {
    const existing = tabs.find(
      (t) => t.url && (t.url.includes("cozyycorner.vercel.app") || t.url.includes("localhost") || t.url.includes("127.0.0.1"))
    );
    if (existing?.id) {
      chrome.tabs.update(existing.id, { active: true });
    } else {
      chrome.tabs.create({ url: targetHost });
    }
  });
}
init();
