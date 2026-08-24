# CozyLock — Cozy Corner Browser Extension (v2.0)

Official browser-level focus lock companion extension for [Cozy Corner](https://cozyycorner.vercel.app/).

---

## 🔒 Capabilities

- **Bidirectional 0ms Real-Time Timer Sync**: Seamless two-way synchronization with the Cozy Corner web app study timer via `window.postMessage`, `BroadcastChannel`, and `chrome.storage`.
- **Browser-Wide Focus Lock**: Intercepts and blocks non-whitelisted distracting websites across all active tabs and new navigations.
- **Immediate Open Tab Redirection**: Existing tabs on distracting domains are instantly redirected to `blocked.html` upon starting a focus session.
- **Custom Whitelist Management**: Fully customizable allowed domains synced live with the Cozy Corner Settings Drawer.
- **4-Digit Safety PIN Early Unlock**: Enforces discipline by requiring a 4-digit Safety PIN entered in a sleek, in-popup modal (zero native browser alerts/prompts).
- **Atmospheric Block Screen**: Cozy ambient block screen with automatic redirect countdown back to Cozy Corner.

---

## 🛠️ Development & Building

```bash
# Install dependencies
npm install

# Build extension bundles & release ZIPs
npm run build

# Watch mode for live development
npm run dev
```

The build script compiles TypeScript entry points with `esbuild` into `dist/` and automatically generates `CozyLock-Chrome-Extension.zip` in the root workspace.

---

## 📦 Loading in Chrome

1. Navigate to `chrome://extensions/`.
2. Turn on **Developer mode** in the top right.
3. Click **Load unpacked** and choose this `extension` directory (or the extracted `CozyLock-Chrome-Extension.zip`).
