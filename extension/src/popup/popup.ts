declare const chrome: any;

import type { FocusState } from "../shared/types";

let selectedDuration = 25 * 60 * 1000;
let allowedUrls: string[] = [
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

let focusActive = false;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let savedEmergencyPin = "";
let currentStartTime: number | null = null;
let currentDuration: number = 25 * 60 * 1000;

// DOM Elements
const tabFocusBtn = document.getElementById("tabFocusBtn") as HTMLButtonElement;
const tabSettingsBtn = document.getElementById("tabSettingsBtn") as HTMLButtonElement;
const tabFocus = document.getElementById("tabFocus")!;
const tabSettings = document.getElementById("tabSettings")!;

const statusDot = document.getElementById("statusDot")!;
const statusText = document.getElementById("statusText")!;
const timerDisplay = document.getElementById("timerDisplay")!;
const timerText = document.getElementById("timerText")!;
const statsDisplay = document.getElementById("statsDisplay")!;
const blockCount = document.getElementById("blockCount")!;
const allowedCount = document.getElementById("allowedCount")!;

const durationBtns = document.querySelectorAll<HTMLButtonElement>(".duration-btn");
const durationSection = document.getElementById("durationSection")!;
const manualDurationInput = document.getElementById("manualDurationInput") as HTMLInputElement;

const focusBtn = document.getElementById("focusBtn") as HTMLButtonElement;
const stopFocusBtn = document.getElementById("stopFocusBtn") as HTMLButtonElement;
const openAppBtn = document.getElementById("openAppBtn") as HTMLButtonElement;

const whitelistTagsPreview = document.getElementById("whitelistTagsPreview")!;
const pinInput = document.getElementById("pinInput") as HTMLInputElement;
const savePinBtn = document.getElementById("savePinBtn") as HTMLButtonElement;
const pinStatusText = document.getElementById("pinStatusText")!;

function init() {
  setupTabs();
  setupEventListeners();

  // Instant 0ms cache-first rendering
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
  // Duration selector pills
  durationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      durationBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (manualDurationInput) manualDurationInput.value = "";
      const mins = parseInt(btn.dataset.minutes || "25", 10);
      selectedDuration = mins * 60 * 1000;
    });
  });

  manualDurationInput?.addEventListener("input", () => {
    const val = parseInt(manualDurationInput.value, 10);
    if (!isNaN(val) && val > 0 && val <= 180) {
      durationBtns.forEach((b) => b.classList.remove("active"));
      selectedDuration = val * 60 * 1000;
    }
  });

  focusBtn?.addEventListener("click", startFocus);
  stopFocusBtn?.addEventListener("click", stopFocus);
  openAppBtn?.addEventListener("click", openCozyCornerTab);

  // Strict 4-digit PIN input sanitization
  pinInput?.addEventListener("input", (e: any) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
  });

  savePinBtn?.addEventListener("click", () => {
    const pin = (pinInput?.value || "").replace(/\D/g, "").slice(0, 4);
    if (pin.length === 4) {
      savedEmergencyPin = pin;
      chrome.storage.local.set({ pin });
      chrome.runtime.sendMessage({ action: "syncPin", pin });
      pinStatusText.textContent = "✓ 4-digit Safety PIN saved";
      pinStatusText.style.color = "#34d399";
      setTimeout(() => { pinStatusText.textContent = ""; }, 2500);
    } else {
      pinStatusText.textContent = "Please enter exactly 4 numeric digits";
      pinStatusText.style.color = "#fda4af";
      setTimeout(() => { pinStatusText.textContent = ""; }, 2500);
    }
  });
}

function loadSavedSettings() {
  // Read local storage immediately for 0ms render
  chrome.storage.local.get(["focusState", "pin", "cozylockWhitelist", "pendingEvents"], (result: any) => {
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
      const elapsed = Date.now() - currentStartTime!;
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
  chrome.runtime.sendMessage({ action: "getStatus" }, (response: FocusState & { isActive?: boolean; remainingTime?: number }) => {
    if (chrome.runtime.lastError || !response) return;
    if (response.isActive || response.active) {
      focusActive = true;
      if (response.focusPIN) savedEmergencyPin = String(response.focusPIN).replace(/\D/g, "").slice(0, 4);
      currentStartTime = response.focusStartTime || currentStartTime || Date.now();
      currentDuration = response.focusDuration || currentDuration || selectedDuration;
      const elapsed = Date.now() - currentStartTime!;
      const remainingMs = Math.max(0, currentDuration - elapsed);
      updateUIForActive(remainingMs);
    } else {
      focusActive = false;
      updateUIForInactive();
    }
  });
}

let statusPollInterval: ReturnType<typeof setInterval> | null = null;
function startStatusPolling() {
  if (statusPollInterval) clearInterval(statusPollInterval);
  statusPollInterval = setInterval(checkFocusStatus, 1000);
}

chrome.storage.onChanged.addListener((changes: any, area: string) => {
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
      const remainingMs = Math.max(0, currentDuration - (Date.now() - currentStartTime!));
      updateUIForActive(remainingMs);
    } else {
      focusActive = false;
      updateUIForInactive();
    }
  }
});

function updateUIForActive(remainingMs: number) {
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

    const totalSeconds = Math.floor(remainingMs / 1000);
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
      focusStartTime: startTime,
    },
    (res: any) => {
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
      pin: savedEmergencyPin,
    },
    (res: any) => {
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
  chrome.tabs.query({}, (tabs: any[]) => {
    const existing = tabs.find((t) =>
      t.url && (t.url.includes("cozyycorner.vercel.app") || t.url.includes("localhost") || t.url.includes("127.0.0.1"))
    );
    if (existing?.id) {
      chrome.tabs.update(existing.id, { active: true });
    } else {
      chrome.tabs.create({ url: targetHost });
    }
  });
}

init();
