# Cozy Corner ✦ Intimate Atmospheric Ambient Sanctuary

A warm, romantic study & relaxation space featuring pixel-aligned video backdrops, visual weather physics, customizable lamp shaders, procedural ambient soundscapes, official studio music discographies, and the **CozyLock Browser Focus Companion Extension**.

---

## ✨ Features

### 🌸 Cozy Dual Rooms
- Seamlessly toggle between **Cozy Haven** (Girl Room) and **Loft Studio** (Boy Room) with smooth video crossfades.

### 🎵 Official Studio Discographies & Music Engine
- **The Weeknd**: 18 tracks ranked by global streams (*Blinding Lights*, *Starboy*, *The Hills*, *Save Your Tears*, *Can't Feel My Face*, etc.).
- **One Direction**: 17 complete tracks (*What Makes You Beautiful*, *Story of My Life*, *Night Changes*, *Drag Me Down*, *Perfect*, etc.).
- **Linkin Park**: Complete studio hits (*Numb*, *In The End*, *Somewhere I Belong*, *Faint*, *Crawling*, *Lost*, etc.).
- **Metallica**: Complete studio hits (*Nothing Else Matters*, *The Unforgiven*, *Fade To Black*, *Master of Puppets*, *Enter Sandman*, etc.).
- **Soft Lo-Fi**: 24/7 study beats, coffee shop piano, and relaxing melodies.
- **Custom Stream Engine**: Paste any YouTube video/playlist link or direct audio stream URL.

### ⚡ 1-Click Instant Quick Controls
- **1-Click Playlist Switcher**: Instantly cycle playlists and matching aesthetic color palettes with one click.
- **1-Click Ambient Sound Layering**: Procedural Rain, Calming White Noise, Analog Vinyl Crackle, and Night Breeze.
- **1-Click Lamp Glow Shaders**: Amber, Rose Quartz, Cyber Cyan, Moonlight, and Candle Flame.
- **1-Click Window Weather Simulator**: Rain, Storm & Lightning, Snowfall, Firefly Motes, Fog, and Clear skies.
- **Wholesome Fullscreen Zen Mode**: Press `F` or `Z` to hide all UI elements for distraction-free immersion.

---

## 🔒 CozyLock Chrome Extension (v2.0)

**CozyLock** is the official companion extension for Cozy Corner that enforces browser-level distraction blocking during your focus sessions.

### 🌟 Key Extension Capabilities:
- **Instant Bidirectional Real-Time Sync**: Starting, pausing, or resetting the timer from either the **Web App** or the **Extension Popup** synchronizes both countdowns and status indicators instantaneously.
- **Strict Domain Whitelisting**: Blocks distracting websites across all tabs, allowing only domains in your study whitelist (customizable directly in the Cozy Corner Settings Drawer).
- **Immediate Open-Tab Interception**: When focus starts, existing open tabs with distracting websites are redirected immediately to the cozy blocked sanctuary screen.
- **Atmospheric Block Screen & Overlay**: Distracting domains display a cozy gradient screen with a countdown to return to Cozy Corner.
- **4-Digit Safety PIN Security**: Protects against early session cancellations. Releasing the focus session early requires entering your 4-digit PIN in a custom in-popup glassmorphism modal (no ugly browser alert popups).
- **Direct 1-Click Download**: Pre-packaged release archive (`CozyLock-Chrome-Extension.zip`) available directly from the Cozy Corner navigation bar and settings drawer.

---

## 📦 How to Install CozyLock Extension

### Method 1: Using the Pre-Built Release ZIP (Easiest)
1. In the Cozy Corner web app, click **Download CozyLock Extension** (or grab `CozyLock-Chrome-Extension.zip` from the project root).
2. Extract the `.zip` archive to a folder on your computer.
3. Open Google Chrome (or any Chromium browser like Brave / Edge / Opera) and navigate to `chrome://extensions`.
4. Enable **Developer mode** in the top-right corner.
5. Click **Load unpacked** and select the unzipped extension folder.

### Method 2: Building from Source
```bash
cd extension
npm install
npm run build
```
Then load the `extension/` directory via `chrome://extensions` > **Load unpacked**.

---

## 🚀 How to Run the Cozy Corner Web App

### Method 1: Using NPM (Recommended)
```bash
npm start
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Method 2: Using Python Local Server
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### Method 3: Direct Open
Open `index.html` directly in any modern browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Space` | Play / Pause Music |
| `Left / Right Arrow` | Seek -10s / +10s |
| `Shift + Left / Right` | Previous / Next Track |
| `L` | Cycle Room Lamp Color |
| `W` | Cycle Window Weather Physics |
| `F` / `Z` | Toggle Fullscreen Study Mode |
| `Esc` | Exit Fullscreen Mode |

---

## 📄 License
MIT License. Built with love for deep work, cozy study sessions, and gentle flow. 🌸
