/**
 * Our Corner — Intimate Ambient Sanctuary
 * Clean Lo-Fi Video Canvas • Precision Dual Lamp Shaders • Window Weather Simulator
 * Slim Player Dock • Full Linkin Park & Metallica Playlists • Multi-Ambient Sounds • Quick Focus
 */

// ==========================================================================
// 1. STATE & COMPREHENSIVE PLAYLISTS
// ==========================================================================

const SOUNDTRACK_PLAYLISTS = {
  'linkin-park': {
    name: 'Linkin Park — Official Studio Discography',
    tracks: [
      { title: 'Linkin Park — Numb', artist: 'Meteora • Official Studio', duration: 188, ytId: 'kXYiU_JCYtU' },
      { title: 'Linkin Park — In The End', artist: 'Hybrid Theory • Official Studio', duration: 216, ytId: 'eVTXPUF4Oz4' },
      { title: 'Linkin Park — Somewhere I Belong', artist: 'Meteora • Official Studio', duration: 213, ytId: 'gcs5PRxEXq4' },
      { title: 'Linkin Park — Leave Out All The Rest', artist: 'Minutes to Midnight • Official Studio', duration: 209, ytId: 'yZIummTz9mM' },
      { title: 'Linkin Park — Crawling', artist: 'Hybrid Theory • Official Studio', duration: 209, ytId: 'Gd9OhYroLN0' },
      { title: 'Linkin Park — Faint', artist: 'Meteora • Official Studio', duration: 162, ytId: 'LYU-8IFcDPw' },
      { title: 'Linkin Park — Breaking The Habit', artist: 'Meteora • Official Studio', duration: 196, ytId: 'v2H4l9RpkwM' },
      { title: 'Linkin Park — What I\'ve Done', artist: 'Minutes to Midnight • Official Studio', duration: 205, ytId: '8sgycukafqQ' },
      { title: 'Linkin Park — Waiting For The End', artist: 'A Thousand Suns • Official Studio', duration: 231, ytId: '5qF_qBaWt3Q' },
      { title: 'Linkin Park — Castle of Glass', artist: 'Living Things • Official Studio', duration: 205, ytId: 'ScNNfyq3d_w' },
      { title: 'Linkin Park — One More Light', artist: 'One More Light • Official Studio', duration: 255, ytId: '3kaUvGSLMew' },
      { title: 'Linkin Park — Shadow of the Day', artist: 'Minutes to Midnight • Official Studio', duration: 290, ytId: 'kPhpHvnnn0Q' },
      { title: 'Linkin Park — Papercut', artist: 'Hybrid Theory • Official Studio', duration: 185, ytId: 'vjVkXlxsO8Q' },
      { title: 'Linkin Park — Lost', artist: 'Meteora 20th • Official Studio', duration: 199, ytId: '7NK_JOkuSVY' }
    ]
  },
  'the-weeknd': {
    name: 'The Weeknd — Complete Discography (Ranked by Popularity)',
    tracks: [
      { title: 'The Weeknd — Blinding Lights', artist: 'After Hours • #1 Most Streamed (4.5B+)', duration: 200, ytId: '4NRXx6U8ABQ' },
      { title: 'The Weeknd — Starboy (feat. Daft Punk)', artist: 'Starboy • Global Smash Hit', duration: 230, ytId: '34Na4j8AVgA' },
      { title: 'The Weeknd — The Hills', artist: 'Beauty Behind The Madness • Diamond Hit', duration: 242, ytId: 'yzTuBuRdAyA' },
      { title: 'The Weeknd — Save Your Tears', artist: 'After Hours • Multi-Platinum', duration: 215, ytId: 'XXYlFuWEuKI' },
      { title: 'The Weeknd — Can\'t Feel My Face', artist: 'Beauty Behind The Madness • Pop Classic', duration: 215, ytId: 'dqt8Z1k0oWQ' },
      { title: 'The Weeknd — Die For You', artist: 'Starboy • Viral Sensation', duration: 260, ytId: 'uPD0QOGUx08' },
      { title: 'The Weeknd — I Feel It Coming (feat. Daft Punk)', artist: 'Starboy • Retro Synth Vibe', duration: 269, ytId: 'qFLhGq0060w' },
      { title: 'The Weeknd — Earned It', artist: 'Fifty Shades • Grammy Winner', duration: 277, ytId: 'waU75jdUnYw' },
      { title: 'The Weeknd — Call Out My Name', artist: 'My Dear Melancholy • Emotional Ballad', duration: 228, ytId: 'M4ZoCHID9GI' },
      { title: 'Metro Boomin, The Weeknd — Creepin\'', artist: 'Heroes & Villains • Global #1 R&B', duration: 221, ytId: '61ymOWwOwuk' },
      { title: 'The Weeknd — Often', artist: 'Beauty Behind The Madness • Dark R&B', duration: 249, ytId: 'JPIhUaONiLU' },
      { title: 'The Weeknd — Out of Time', artist: 'Dawn FM • City Pop Retro', duration: 214, ytId: '2fDzCW5V2ik' },
      { title: 'The Weeknd — In Your Eyes', artist: 'After Hours • 80s Sax Synthpop', duration: 237, ytId: 'dqRZDebPIGs' },
      { title: 'The Weeknd — Take My Breath', artist: 'Dawn FM • Disco Electro-Funk', duration: 220, ytId: 'rhTl_OyehF8' },
      { title: 'The Weeknd — Wicked Games', artist: 'Trilogy • Iconic Dark Classic', duration: 283, ytId: 'O1OTWCd40bo' },
      { title: 'The Weeknd — Sacrifice', artist: 'Dawn FM • Swedish House Mafia Groove', duration: 183, ytId: 'VafTMsrnSTU' },
      { title: 'The Weeknd — After Hours', artist: 'After Hours • Midnight Moodscape', duration: 361, ytId: 'ygTZZpVkm3o' },
      { title: 'The Weeknd — Heartless', artist: 'After Hours • Metro Boomin Trap', duration: 201, ytId: '1DpH-icPPl0' }
    ]
  },
  'one-direction': {
    name: 'One Direction — Complete Discography (Ranked by Popularity)',
    tracks: [
      { title: 'One Direction — What Makes You Beautiful', artist: 'Up All Night • #1 Global Breakthrough', duration: 200, ytId: 'QJO3ROT-A4E' },
      { title: 'One Direction — Story of My Life', artist: 'Midnight Memories • Folk-Pop Classic', duration: 245, ytId: 'W-TE_Ys4iwM' },
      { title: 'One Direction — Night Changes', artist: 'Four • Emotional Nostalgia', duration: 226, ytId: 'syFZfO_wfMQ' },
      { title: 'One Direction — Drag Me Down', artist: 'Made in the A.M. • Pop-Rock Energy', duration: 192, ytId: 'Jwgf3wmiA04' },
      { title: 'One Direction — Steal My Girl', artist: 'Four • Stadium Pop Anthem', duration: 318, ytId: 'UpsKGvPjAgw' },
      { title: 'One Direction — Best Song Ever', artist: 'Midnight Memories • High-Energy Pop', duration: 313, ytId: 'o_v9MY_FMcw' },
      { title: 'One Direction — Live While We\'re Young', artist: 'Take Me Home • Summer Feel-Good', duration: 200, ytId: 'AbPED9bisSc' },
      { title: 'One Direction — Perfect', artist: 'Made in the A.M. • Synth-Pop Romance', duration: 230, ytId: 'Ho32Oh6b4gw' },
      { title: 'One Direction — History', artist: 'Made in the A.M. • Singalong Farewell', duration: 195, ytId: 'yjmp8CoZBIo' },
      { title: 'One Direction — Kiss You', artist: 'Take Me Home • Upbeat Pop-Punk', duration: 190, ytId: 'T4cdfRohhcg' },
      { title: 'One Direction — Little Things', artist: 'Take Me Home • Ed Sheeran Acoustic', duration: 219, ytId: 'xGPeNN946tc' },
      { title: 'One Direction — One Thing', artist: 'Up All Night • Pure Pop Nostalgia', duration: 197, ytId: 'Y1xs_xPb46M' },
      { title: 'One Direction — You & I', artist: 'Midnight Memories • Soft Rock Ballad', duration: 245, ytId: '_kqQDCxRCzM' },
      { title: 'One Direction — Midnight Memories', artist: 'Midnight Memories • 80s Rock Groove', duration: 176, ytId: 'bkx9kCdaaMg' },
      { title: 'One Direction — Gotta Be You', artist: 'Up All Night • Orchestral Pop', duration: 236, ytId: 'Nvq2w23Y29w' },
      { title: 'One Direction — 18', artist: 'Four • Warm Acoustic Melancholy', duration: 248, ytId: 'n0Y5jB6L65A' },
      { title: 'One Direction — Infinity', artist: 'Made in the A.M. • Dreamy Arena Ballad', duration: 249, ytId: 'vsmPZ4q2Ue8' }
    ]
  },
  'metallica': {
    name: 'Metallica — Official Studio Discography',
    tracks: [
      { title: 'Metallica — Nothing Else Matters', artist: 'The Black Album • Official Studio', duration: 388, ytId: 'tAGnKpE4NCI' },
      { title: 'Metallica — The Unforgiven', artist: 'The Black Album • Official Studio', duration: 387, ytId: 'Ckom3gf5b8c' },
      { title: 'Metallica — Fade To Black', artist: 'Ride the Lightning • Official Studio', duration: 417, ytId: 'Nu4CrXU4F4M' },
      { title: 'Metallica — Master of Puppets', artist: 'Master of Puppets • Official Studio', duration: 515, ytId: 'xnKhsTXoKmg' },
      { title: 'Metallica — Enter Sandman', artist: 'The Black Album • Official Studio', duration: 331, ytId: 'CD-E-LDc384' },
      { title: 'Metallica — One', artist: '...And Justice for All • Official Studio', duration: 446, ytId: 'WM8bTdBs-cw' },
      { title: 'Metallica — The Day That Never Comes', artist: 'Death Magnetic • Official Studio', duration: 476, ytId: 'dkNfNR1WYWA' },
      { title: 'Metallica — Welcome Home (Sanitarium)', artist: 'Master of Puppets • Official Studio', duration: 387, ytId: 'V6Dfo4zD6-U' },
      { title: 'Metallica — Whiskey In The Jar', artist: 'Garage Inc. • Official Studio', duration: 304, ytId: 'boanuwvl48U' },
      { title: 'Metallica — Low Man\'s Lyric', artist: 'Reload • Official Studio', duration: 457, ytId: 'wF2eXlF9V8I' },
      { title: 'Metallica — Until It Sleeps', artist: 'Load • Official Studio', duration: 270, ytId: 'o1IeU8T2U9M' }
    ]
  },
  'soft-lofi': {
    name: 'Soft Lo-Fi & Study Sanctuary Beats',
    tracks: [
      { title: 'Lofi Hip Hop Radio • 24/7 Study', artist: 'Lofi Girl • Chill Sanctuary', duration: 180, ytId: 'jfKfPfyJRdk' },
      { title: 'Chillhop Essentials • Sunset Solitude', artist: 'Chillhop Music • Study Beats', duration: 165, ytId: '5qap5aO4i9A' },
      { title: 'Peaceful Piano • Midnight Rest', artist: 'Gentle Nocturne Beats • Pure Focus', duration: 184, ytId: 'lTRiuFIWV54' },
      { title: 'Coffee Shop Ambience & Rainy Beats', artist: 'Late Night Coffee • Rainy Solitude', duration: 210, ytId: '81W9Lw_Jj7I' },
      { title: 'Quiet Evening Starlight & Warm Vinyl', artist: 'Dusk Beats • Candlelight Echoes', duration: 215, ytId: 'e3L1PIY1pN8' },
      { title: 'Rainy Streetlights & Lo-Fi Piano', artist: 'Rainy Streetlights • Pure Study', duration: 202, ytId: 'TURbeWK2wwg' },
      { title: 'Lavender Skies & Soft Dreams', artist: 'Soft Rhodes & Vinyl Warmth', duration: 178, ytId: 'DWcJFNfaw9c' }
    ]
  },
  'custom': {
    name: 'Custom Added Tracks & Streams',
    tracks: []
  }
};

const LAMP_PRESETS = [
  { name: 'Warm Amber', color: '#ffb347', rgb: '255, 179, 71', brightness: 0.85, label: 'Amber' },
  { name: 'Rose Quartz', color: '#f472b6', rgb: '244, 114, 182', brightness: 0.80, label: 'Rose' },
  { name: 'Cyber Cyan', color: '#38bdf8', rgb: '56, 189, 248', brightness: 0.75, label: 'Cyan' },
  { name: 'Moonlight', color: '#c084fc', rgb: '192, 132, 252', brightness: 0.85, label: 'Moonlight' },
  { name: 'Candle Flame', color: '#f59e0b', rgb: '245, 158, 11', brightness: 0.65, label: 'Candle' },
  { name: 'Off', color: '#2a1e35', rgb: '42, 30, 53', brightness: 0.0, label: 'Lamp Off' }
];

const WEATHER_MODES = [
  { key: 'rain', name: 'Window: Rain' },
  { key: 'storm', name: 'Window: Storm' },
  { key: 'snow', name: 'Window: Snow' },
  { key: 'motes', name: 'Window: Motes' },
  { key: 'fog', name: 'Window: Fog' },
  { key: 'clear', name: 'Window: Clear' }
];

const appState = {
  currentVibe: 'girl',
  currentTheme: 'linkin-park',
  currentPlaylist: 'linkin-park',
  currentTrackIndex: 0,
  currentWeatherIndex: 0,
  currentLampIndex: 0,
  zenActive: false,
  lamp: {
    power: true,
    brightness: 0.85,
    warmth: 35,
    color: '#ffb347',
    colorName: 'Warm Amber',
    rgb: '255, 179, 71'
  },
  weather: {
    mode: 'rain',
    intensity: 0.6,
    condensation: true
  },
  soundtrack: {
    isPlaying: false,
    currentTime: 0,
    duration: 188,
    timerId: null,
    volume: 0.65
  },
  ambientSounds: {
    rain: { active: false, volume: 0.4 },
    whiteNoise: { active: false, volume: 0.35 },
    vinyl: { active: false, volume: 0.25 },
    wind: { active: false, volume: 0.2 }
  },
  quickFocus: {
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    isRunning: false,
    intervalId: null
  }
};

// ==========================================================================
// 2. LENIS SMOOTH SCROLLING
// ==========================================================================
let lenis = null;

function initLenisScroll() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true, autoRaf: true });
  }
}

// ==========================================================================
// 3. DUAL VIDEO BACKGROUND MANAGER (GIRL & BOY ROOMS)
// ==========================================================================
class VideoBackgroundManager {
  constructor() {
    this.videoGirl = document.getElementById('bg-video-girl');
    this.videoBoy = document.getElementById('bg-video-boy');
    this.vibeGirlBtn = document.getElementById('vibe-girl-btn');
    this.vibeBoyBtn = document.getElementById('vibe-boy-btn');
    this.init();
  }

  init() {
    [this.videoGirl, this.videoBoy].forEach(video => {
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.play().catch(() => {});
      }
    });

    const ensurePlay = () => {
      const activeVideo = appState.currentVibe === 'girl' ? this.videoGirl : this.videoBoy;
      if (activeVideo && activeVideo.paused) {
        activeVideo.play().catch(() => {});
      }
    };
    window.addEventListener('click', ensurePlay, { passive: true });
    window.addEventListener('touchstart', ensurePlay, { passive: true });
    window.addEventListener('keydown', ensurePlay, { passive: true });

    this.vibeGirlBtn?.addEventListener('click', () => this.switchVibe('girl'));
    this.vibeBoyBtn?.addEventListener('click', () => this.switchVibe('boy'));

    // Default to girl view on load
    this.switchVibe('girl');
  }

  switchVibe(vibe) {
    appState.currentVibe = vibe;
    document.body.setAttribute('data-vibe', vibe);
    document.body.classList.toggle('vibe-girl', vibe === 'girl');
    document.body.classList.toggle('vibe-boy', vibe === 'boy');

    if (this.videoGirl && this.videoBoy) {
      this.videoGirl.muted = true;
      this.videoBoy.muted = true;
      this.videoGirl.defaultMuted = true;
      this.videoBoy.defaultMuted = true;

      if (vibe === 'girl') {
        this.videoGirl.classList.add('active');
        this.videoBoy.classList.remove('active');
        this.videoGirl.play().catch(() => {});
      } else {
        this.videoBoy.classList.add('active');
        this.videoGirl.classList.remove('active');
        this.videoBoy.play().catch(() => {});
      }
    }

    this.vibeGirlBtn?.classList.toggle('active', vibe === 'girl');
    this.vibeGirlBtn?.setAttribute('aria-checked', vibe === 'girl' ? 'true' : 'false');
    this.vibeBoyBtn?.classList.toggle('active', vibe === 'boy');
    this.vibeBoyBtn?.setAttribute('aria-checked', vibe === 'boy' ? 'true' : 'false');

    // Re-measure weather canvas bounds immediately on room switch
    setTimeout(() => {
      if (window.weatherEngineInstance) {
        window.weatherEngineInstance.resize();
        window.weatherEngineInstance.spawnElements();
      }
    }, 60);

    localStorage.setItem('ourcorner_vibe', vibe);
  }
}

// ==========================================================================
// 3.5. EYE-CATCHING SANCTUARY FULL-SCREEN PRELOADER
// ==========================================================================
class SanctuaryPreloaderManager {
  constructor() {
    this.preloader = document.getElementById('sanctuary-preloader');
    this.barFill = document.getElementById('preloader-bar-fill');
    this.statusText = document.getElementById('preloader-status-text');
    this.isDismissed = false;
    this.progress = 20;
    this.init();
  }

  setProgress(percent, text) {
    this.progress = Math.max(this.progress, percent);
    if (this.barFill) this.barFill.style.width = `${this.progress}%`;
    if (text && this.statusText) this.statusText.textContent = text;
  }

  dismiss() {
    if (this.isDismissed) return;
    this.isDismissed = true;
    this.setProgress(100, 'Welcome to your sanctuary');

    setTimeout(() => {
      if (this.preloader) {
        this.preloader.classList.add('fade-out');
        setTimeout(() => {
          this.preloader?.remove();
        }, 900);
      }
    }, 400);
  }

  init() {
    if (!this.preloader) return;

    this.setProgress(40, 'Illuminating cozy ambiance...');
    setTimeout(() => this.setProgress(65, 'Loading video backdrop...'), 180);

    const video = document.getElementById('bg-video-girl');

    const onReady = () => {
      this.setProgress(90, 'Harmonizing weather...');
      setTimeout(() => this.dismiss(), 350);
    };

    if (video) {
      if (video.readyState >= 2 || video.currentTime > 0) {
        onReady();
      } else {
        video.addEventListener('loadeddata', onReady, { once: true });
        video.addEventListener('canplay', onReady, { once: true });
        video.addEventListener('playing', onReady, { once: true });
      }
    }

    // Smooth guaranteed fallback: max 2.2s
    setTimeout(() => this.dismiss(), 2200);
  }
}

// ==========================================================================
// 4. PRECISION DESK LAMP ENGINE (1-CLICK CYCLING + MANUAL SLIDERS)
// ==========================================================================
class LampController {
  constructor() {
    this.quickBtn = document.getElementById('quick-lamp-btn');
    this.navDot = document.getElementById('nav-lamp-dot');
    this.navText = document.getElementById('nav-lamp-text');
    this.lampHotspot = document.getElementById('lamp-video-hotspot');
    this.lampBadgeText = document.getElementById('lamp-badge-text');

    this.settingsBrightnessSlider = document.getElementById('settings-lamp-brightness-slider');
    this.settingsBrightnessVal = document.getElementById('settings-lamp-brightness-val');
    this.customColorInput = document.getElementById('custom-lamp-color-input');
    this.customHexText = document.getElementById('custom-lamp-hex-text');

    this.init();
  }

  init() {
    this.quickBtn?.addEventListener('click', () => this.cycleLamp());
    this.lampHotspot?.addEventListener('click', () => this.cycleLamp());

    this.settingsBrightnessSlider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      this.setBrightness(val / 100);
    });

    this.customColorInput?.addEventListener('input', (e) => {
      this.setColor(e.target.value, 'Custom Glow');
    });

    this.applyAll();
  }

  cycleLamp() {
    appState.currentLampIndex = (appState.currentLampIndex + 1) % LAMP_PRESETS.length;
    const p = LAMP_PRESETS[appState.currentLampIndex];
    if (p.brightness === 0) {
      appState.lamp.power = false;
      this.setBrightness(0);
    } else {
      appState.lamp.power = true;
      this.setColor(p.color, p.name);
      this.setBrightness(p.brightness);
    }
  }

  setBrightness(val) {
    appState.lamp.brightness = Math.max(0, Math.min(1, val));
    if (this.settingsBrightnessVal) {
      this.settingsBrightnessVal.textContent = `${Math.round(appState.lamp.brightness * 100)}%`;
    }
    if (this.settingsBrightnessSlider) {
      this.settingsBrightnessSlider.value = Math.round(appState.lamp.brightness * 100);
    }
    this.applyCssTokens();
    this.updateNavPill();
  }

  setColor(hex, name = 'Custom Glow') {
    appState.lamp.color = hex;
    appState.lamp.colorName = name;
    const rgb = this.hexToRgb(hex) || { r: 255, g: 179, b: 71 };
    appState.lamp.rgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

    if (this.customColorInput) this.customColorInput.value = hex;
    if (this.customHexText) this.customHexText.textContent = hex;

    this.applyCssTokens();
    this.updateNavPill();
  }

  applyCssTokens() {
    const root = document.documentElement;
    const power = appState.lamp.power ? 1 : 0;
    root.style.setProperty('--lamp-color', appState.lamp.color);
    root.style.setProperty('--lamp-rgb', appState.lamp.rgb);
    root.style.setProperty('--lamp-brightness', appState.lamp.brightness);
    root.style.setProperty('--lamp-power', power);
  }

  updateNavPill() {
    const isOn = appState.lamp.power && appState.lamp.brightness > 0;
    const videoGirl = document.getElementById('bg-video-girl');
    const videoBoy = document.getElementById('bg-video-boy');
    const activeVideo = appState.currentVibe === 'girl' ? videoGirl : videoBoy;

    if (!isOn) {
      // Taking a peaceful study break — pause background video
      videoGirl?.pause();
      videoBoy?.pause();
      document.body.classList.add('study-break-active');
    } else {
      // Resume study mode
      document.body.classList.remove('study-break-active');
      activeVideo?.play().catch(() => {});
    }

    if (this.navDot) {
      this.navDot.style.background = isOn ? appState.lamp.color : '#443c52';
      this.navDot.style.boxShadow = isOn ? `0 0 8px ${appState.lamp.color}` : 'none';
    }
    if (this.navText) {
      this.navText.textContent = isOn 
        ? `Lamp: ${appState.lamp.colorName}` 
        : 'Study Break (Lamp Off)';
    }
    if (this.lampBadgeText) {
      this.lampBadgeText.textContent = isOn 
        ? `Lamp: ${appState.lamp.colorName} (Click to cycle)` 
        : 'Study Break (Click to turn lamp on)';
    }
  }

  applyAll() {
    this.applyCssTokens();
    this.setColor(appState.lamp.color, appState.lamp.colorName);
    this.setBrightness(appState.lamp.brightness);
  }

  hexToRgb(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    if (isNaN(num)) return null;
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }
}

// ==========================================================================
// 5. WINDOW WEATHER ENGINE (1-CLICK CYCLING + MANUAL SLIDERS)
// ==========================================================================
class WeatherCanvasEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.viewport = document.getElementById('window-weather-viewport');
    this.ctx = this.canvas.getContext('2d');
    this.width = 300;
    this.height = 400;
    this.mode = 'rain';
    this.intensity = 0.6;

    this.rainDrops = [];
    this.glassDroplets = [];
    this.motes = [];
    this.snowFlakes = [];
    this.lightningTimer = null;

    this.quickBtn = document.getElementById('quick-weather-btn');
    this.navText = document.getElementById('nav-weather-text');
    this.windowHotspot = document.getElementById('window-video-hotspot');
    this.windowBadgeText = document.getElementById('window-badge-text');

    this.settingsIntensitySlider = document.getElementById('settings-weather-intensity-slider');
    this.settingsIntensityVal = document.getElementById('settings-weather-intensity-val');

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
      this.spawnElements();
    });
    this.spawnElements();
    this.animate();

    this.quickBtn?.addEventListener('click', () => this.cycleWeather());
    this.windowHotspot?.addEventListener('click', () => this.cycleWeather());

    this.settingsIntensitySlider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      this.intensity = val / 100;
      if (this.settingsIntensityVal) this.settingsIntensityVal.textContent = `${val}%`;
      this.spawnElements();
    });

    this.setMode('rain');
  }

  cycleWeather() {
    appState.currentWeatherIndex = (appState.currentWeatherIndex + 1) % WEATHER_MODES.length;
    const mode = WEATHER_MODES[appState.currentWeatherIndex].key;
    this.setMode(mode);
  }

  resize() {
    if (this.viewport) {
      const rect = this.viewport.getBoundingClientRect();
      this.width = Math.max(80, Math.floor(rect.width));
      this.height = Math.max(80, Math.floor(rect.height));
    } else {
      this.width = 300;
      this.height = 400;
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setMode(mode) {
    this.mode = mode;
    appState.weather.mode = mode;
    const item = WEATHER_MODES.find(m => m.key === mode) || WEATHER_MODES[0];

    if (this.viewport) this.viewport.setAttribute('data-weather', mode);
    const stage = document.getElementById('ambient-stage');
    if (stage) stage.setAttribute('data-weather', mode);

    if (this.navText) this.navText.textContent = item.name;
    if (this.windowBadgeText) this.windowBadgeText.textContent = `${item.name} (Click to cycle)`;

    const frostMask = document.getElementById('window-frost-mask');
    const mistMask = document.getElementById('window-mist-mask');

    if (frostMask) frostMask.style.opacity = mode === 'snow' ? '0.6' : '0';
    if (mistMask) mistMask.style.opacity = mode === 'fog' ? '0.65' : '0';

    this.spawnElements();

    if (mode === 'storm') this.scheduleLightning();
    else if (this.lightningTimer) clearTimeout(this.lightningTimer);
  }

  spawnElements() {
    this.rainDrops = [];
    this.glassDroplets = [];
    this.motes = [];
    this.snowFlakes = [];

    const isStorm = this.mode === 'storm';
    const rainCount = Math.floor(Math.min(150, this.width / 2.5) * this.intensity * (isStorm ? 2.2 : 1));

    for (let i = 0; i < rainCount; i++) {
      this.rainDrops.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        len: 10 + Math.random() * 16 * (isStorm ? 1.3 : 1),
        speed: (10 + Math.random() * 8) * (isStorm ? 1.4 : 1) * this.intensity
      });
    }

    for (let i = 0; i < 22; i++) {
      this.glassDroplets.push({
        x: Math.random() * (this.width - 16) + 8,
        y: Math.random() * (this.height - 20) + 10,
        r: 1.4 + Math.random() * 2.6,
        speed: (0.08 + Math.random() * 0.22) * this.intensity
      });
    }

    const moteCount = Math.floor(35 * this.intensity);
    for (let i = 0; i < moteCount; i++) {
      this.motes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: 1.2 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.15 - Math.random() * 0.2,
        alpha: 0.25 + Math.random() * 0.7,
        pulse: Math.random() * Math.PI
      });
    }

    const snowCount = Math.floor(65 * this.intensity);
    for (let i = 0; i < snowCount; i++) {
      this.snowFlakes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: 1.2 + Math.random() * 2.6,
        speedY: (0.5 + Math.random() * 1.1) * this.intensity,
        speedX: (Math.random() - 0.5) * 0.55,
        alpha: 0.45 + Math.random() * 0.5
      });
    }
  }

  scheduleLightning() {
    if (this.mode !== 'storm') return;
    const delay = 4000 + Math.random() * 6000;
    this.lightningTimer = setTimeout(() => {
      this.flashLightning();
      this.scheduleLightning();
    }, delay);
  }

  flashLightning() {
    const overlay = document.getElementById('lightning-overlay');
    if (!overlay) return;
    overlay.classList.add('flash');
    setTimeout(() => {
      overlay.classList.remove('flash');
      setTimeout(() => {
        overlay.classList.add('flash');
        setTimeout(() => overlay.classList.remove('flash'), 45);
      }, 60);
    }, 55);

    if (appState.ambientSounds.rain.active) {
      triggerThunderSound(0.4);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === 'rain' || this.mode === 'storm') {
      this.drawRain();
      this.drawGlassDroplets();
    } else if (this.mode === 'motes') {
      this.drawMotes();
    } else if (this.mode === 'snow') {
      this.drawSnow();
    } else if (this.mode === 'fog') {
      this.drawGlassDroplets();
      this.drawMotes();
    } else if (this.mode === 'clear') {
      this.drawClearNight();
    }

    requestAnimationFrame(() => this.animate());
  }

  drawRain() {
    const ctx = this.ctx;
    const isStorm = this.mode === 'storm';
    ctx.strokeStyle = isStorm ? 'rgba(235, 245, 255, 0.45)' : 'rgba(244, 210, 235, 0.35)';
    ctx.lineWidth = isStorm ? 1.2 : 0.95;
    ctx.beginPath();
    const wind = isStorm ? 5.0 : 1.8;

    for (let i = 0; i < this.rainDrops.length; i++) {
      const d = this.rainDrops[i];
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - wind, d.y + d.len);
      d.x -= wind * 0.3;
      d.y += d.speed;
      if (d.y > this.height) {
        d.y = -d.len;
        d.x = Math.random() * this.width;
      }
    }
    ctx.stroke();
  }

  drawGlassDroplets() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < this.glassDroplets.length; i++) {
      const g = this.glassDroplets[i];
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
      ctx.fill();
      g.y += g.speed;
      if (Math.random() < 0.03) g.x += (Math.random() - 0.5) * 0.3;
      if (g.y > this.height - 8) {
        g.y = 8;
        g.x = Math.random() * (this.width - 16) + 8;
      }
    }
  }

  drawMotes() {
    const ctx = this.ctx;
    for (let i = 0; i < this.motes.length; i++) {
      const m = this.motes[i];
      m.pulse += 0.03;
      const alpha = m.alpha * (0.6 + 0.4 * Math.sin(m.pulse));
      ctx.fillStyle = `rgba(253, 230, 138, ${alpha})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
      m.x += m.vx;
      m.y += m.vy;
      if (m.y < 0) {
        m.y = this.height;
        m.x = Math.random() * this.width;
      }
    }
  }

  drawSnow() {
    const ctx = this.ctx;
    for (let i = 0; i < this.snowFlakes.length; i++) {
      const s = this.snowFlakes[i];
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y += s.speedY;
      s.x += s.speedX + Math.sin(s.y * 0.02) * 0.3;
      if (s.y > this.height) {
        s.y = -5;
        s.x = Math.random() * this.width;
      }
    }
  }

  drawClearNight() {
    const ctx = this.ctx;
    for (let i = 0; i < this.motes.length; i++) {
      const m = this.motes[i];
      m.pulse += 0.02;
      const alpha = m.alpha * (0.35 + 0.65 * Math.sin(m.pulse)) * 0.55;
      ctx.fillStyle = `rgba(240, 245, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// ==========================================================================
// 6. PROCEDURAL WEB AUDIO SYNTHESIZERS (RAIN, WHITE NOISE, LO-FI, MELODY)
// ==========================================================================
let audioContext = null;
const audioNodes = {
  rain: null,
  whiteNoise: null,
  vinyl: null,
  wind: null
};

function getAudioCtx() {
  if (!audioContext) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtxClass();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function createPinkNoiseBuffer(ctx, durationSec = 4) {
  const bufferSize = ctx.sampleRate * durationSec;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
    b6 = white * 0.115926;
  }
  return buffer;
}

function createWhiteNoiseBuffer(ctx, durationSec = 4) {
  const bufferSize = ctx.sampleRate * durationSec;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = (Math.random() * 2 - 1) * 0.4;
  }
  return buffer;
}

function startRainSound(vol = 0.4) {
  const ctx = getAudioCtx();
  if (audioNodes.rain) return;
  const buffer = createPinkNoiseBuffer(ctx, 4);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol * 0.85, ctx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  audioNodes.rain = { source, gain, filter };
}

function stopRainSound() {
  if (audioNodes.rain) {
    try { audioNodes.rain.source.stop(); audioNodes.rain.source.disconnect(); } catch (e) {}
    audioNodes.rain = null;
  }
}

function startWhiteNoiseSound(vol = 0.35) {
  const ctx = getAudioCtx();
  if (audioNodes.whiteNoise) return;
  const buffer = createWhiteNoiseBuffer(ctx, 4);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol * 0.75, ctx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  audioNodes.whiteNoise = { source, gain, filter };
}

function stopWhiteNoiseSound() {
  if (audioNodes.whiteNoise) {
    try { audioNodes.whiteNoise.source.stop(); audioNodes.whiteNoise.source.disconnect(); } catch (e) {}
    audioNodes.whiteNoise = null;
  }
}

function startVinylSound(vol = 0.25) {
  const ctx = getAudioCtx();
  if (audioNodes.vinyl) return;
  const bufferSize = ctx.sampleRate * 3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Dense authentic vinyl pops + warm surface hiss
    if (Math.random() < 0.012) {
      data[i] = (Math.random() * 2 - 1) * 0.85;
    } else if (Math.random() < 0.003) {
      data[i] = (Math.random() * 2 - 1) * 0.95;
    } else {
      data[i] = (Math.random() * 2 - 1) * 0.035;
    }
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1800, ctx.currentTime);
  filter.Q.setValueAtTime(1.2, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol * 0.85, ctx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  audioNodes.vinyl = { source, gain, filter };
}

function stopVinylSound() {
  if (audioNodes.vinyl) {
    try { audioNodes.vinyl.source.stop(); audioNodes.vinyl.source.disconnect(); } catch (e) {}
    audioNodes.vinyl = null;
  }
}

function triggerThunderSound(vol = 0.3) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(50, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(22, ctx.currentTime + 3.2);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(110, ctx.currentTime);

  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(vol * 0.65, ctx.currentTime + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.6);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 3.8);
}

function playChimeBell() {
  const ctx = getAudioCtx();
  [528, 792, 1056].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16 / (i + 1), ctx.currentTime + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 3.5);
  });
}

// ==========================================================================
// 6. OFFICIAL STUDIO MUSIC & YOUTUBE / HTML5 AUDIO ENGINE
// ==========================================================================

class PureAudioPlayer {
  constructor() {
    this.playBtn = document.getElementById('audio-main-play-btn');
    this.playSvg = document.getElementById('main-play-svg');
    this.prevBtn = document.getElementById('audio-prev-btn');
    this.nextBtn = document.getElementById('audio-next-btn');
    this.seekBackBtn = document.getElementById('audio-seek-back-btn');
    this.seekFwdBtn = document.getElementById('audio-seek-fwd-btn');

    this.equalizer = document.getElementById('mini-equalizer');
    this.titleDisplay = document.getElementById('dock-track-title');
    this.artistDisplay = document.getElementById('dock-track-artist');
    this.currentTimeDisplay = document.getElementById('audio-current-time');
    this.durationDisplay = document.getElementById('audio-duration-time');
    this.timelineFill = document.getElementById('timeline-bar-fill');
    this.timelineHandle = document.getElementById('timeline-scrubber-handle');
    this.timelineTrack = document.getElementById('timeline-bar-track');
    this.volumeSlider = document.getElementById('soundtrack-volume-slider');

    this.playlistDrawer = document.getElementById('playlist-drawer-overlay');
    this.openPlaylistBtn = document.getElementById('open-playlist-btn');
    this.closePlaylistBtn = document.getElementById('close-playlist-btn');
    this.tracklistContainer = document.getElementById('full-tracklist-container');

    this.playlistCustomInput = document.getElementById('playlist-custom-input');
    this.playlistCustomAddBtn = document.getElementById('playlist-custom-add-btn');
    this.customFeedback = document.getElementById('custom-url-feedback');
    this.settingsOpenPlaylistBtn = document.getElementById('settings-open-playlist-btn');

    this.html5Audio = document.getElementById('html5-audio-element') || new Audio();
    this.ytPlayer = null;
    this.isYtReady = false;
    this.pendingPlay = false;
    this.isDraggingTimeline = false;
    this.playbackTimer = null;
    this.lastSeekTimestamp = 0;

    this.loadSavedCustomTracks();
    this.initYouTube();
    this.initHtml5Audio();
    this.init();
  }

  initYouTube() {
    const setupPlayer = () => {
      if (this.ytPlayer) return;
      try {
        const currentTrack = this.getCurrentTrack();
        const initialVideoId = (currentTrack && currentTrack.ytId) ? currentTrack.ytId : 'kXYiU_JCYtU';

        this.ytPlayer = new YT.Player('youtube-player-mount', {
          height: '100%',
          width: '100%',
          videoId: initialVideoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            disablekb: 0,
            enablejsapi: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0
          },
          events: {
            onReady: () => {
              this.isYtReady = true;
              try {
                this.ytPlayer.setVolume(Math.round(appState.soundtrack.volume * 100));
              } catch (e) {}

              if (this.pendingPlay) {
                this.pendingPlay = false;
                this.play();
              }
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) {
                appState.soundtrack.isPlaying = true;
                this.updatePlayStateUi(true);
                try {
                  const dur = this.ytPlayer.getDuration();
                  if (dur && dur > 0) {
                    appState.soundtrack.duration = Math.floor(dur);
                    if (this.durationDisplay) this.durationDisplay.textContent = this.formatTime(appState.soundtrack.duration);
                  }
                } catch (e) {}
              } else if (event.data === YT.PlayerState.PAUSED) {
                if (!appState.soundtrack.isPlaying) {
                  this.updatePlayStateUi(false);
                }
              } else if (event.data === YT.PlayerState.ENDED) {
                this.nextTrack();
              }
            },
            onError: (event) => {
              console.warn('YouTube playback event notice:', event.data);
            }
          }
        });
      } catch (err) {
        console.warn('YT.Player init:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        setupPlayer();
      };
    }
  }

  initHtml5Audio() {
    if (!this.html5Audio) return;
    this.html5Audio.addEventListener('ended', () => {
      this.nextTrack();
    });
    this.html5Audio.addEventListener('loadedmetadata', () => {
      if (this.html5Audio.duration && !isNaN(this.html5Audio.duration)) {
        appState.soundtrack.duration = Math.floor(this.html5Audio.duration);
        if (this.durationDisplay) this.durationDisplay.textContent = this.formatTime(appState.soundtrack.duration);
      }
    });
  }

  loadSavedCustomTracks() {
    try {
      const saved = localStorage.getItem('ourcorner_custom_tracks');
      if (saved) {
        SOUNDTRACK_PLAYLISTS['custom'].tracks = JSON.parse(saved);
      }
    } catch (e) {}
    this.updateCustomTabBadge();
  }

  saveCustomTracks() {
    try {
      localStorage.setItem('ourcorner_custom_tracks', JSON.stringify(SOUNDTRACK_PLAYLISTS['custom'].tracks));
    } catch (e) {}
  }

  updateCustomTabBadge() {
    const count = SOUNDTRACK_PLAYLISTS['custom'].tracks.length;
    const badge = document.getElementById('custom-tab-label');
    if (badge) badge.textContent = `Custom (${count})`;
  }

  getCurrentTrack() {
    const data = SOUNDTRACK_PLAYLISTS[appState.currentPlaylist] || SOUNDTRACK_PLAYLISTS['linkin-park'];
    return data.tracks[appState.currentTrackIndex] || data.tracks[0];
  }

  loadTrack(index) {
    const data = SOUNDTRACK_PLAYLISTS[appState.currentPlaylist] || SOUNDTRACK_PLAYLISTS['linkin-park'];
    if (!data.tracks || data.tracks.length === 0) return;

    const safeIndex = (index + data.tracks.length) % data.tracks.length;
    const track = data.tracks[safeIndex];

    appState.currentTrackIndex = safeIndex;
    appState.soundtrack.currentTime = 0;
    appState.soundtrack.duration = track.duration || 188;

    if (this.titleDisplay) this.titleDisplay.textContent = track.title;
    if (this.artistDisplay) this.artistDisplay.textContent = track.artist || `${data.tracks.length} Songs`;
    if (this.durationDisplay) this.durationDisplay.textContent = this.formatTime(track.duration || 188);
    if (this.currentTimeDisplay) this.currentTimeDisplay.textContent = '0:00';
    if (this.timelineFill) this.timelineFill.style.width = '0%';
    if (this.timelineHandle) this.timelineHandle.style.left = '0%';

    document.querySelectorAll('.track-item-card').forEach((c, i) => {
      c.classList.toggle('active', i === safeIndex);
    });

    if (track.audioUrl) {
      if (this.html5Audio) {
        this.html5Audio.src = track.audioUrl;
        if (appState.soundtrack.isPlaying) {
          this.html5Audio.volume = appState.soundtrack.volume;
          this.html5Audio.play().catch(() => {});
        }
      }
      if (this.isYtReady && this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
        try { this.ytPlayer.pauseVideo(); } catch (e) {}
      }
    } else if (track.ytId) {
      if (this.html5Audio) this.html5Audio.pause();

      if (this.isYtReady && this.ytPlayer) {
        try {
          if (appState.soundtrack.isPlaying) {
            if (track.playlistId) {
              this.ytPlayer.loadPlaylist({ list: track.playlistId, listType: 'playlist' });
            } else {
              this.ytPlayer.loadVideoById(track.ytId);
            }
          } else {
            if (track.playlistId) {
              this.ytPlayer.cuePlaylist({ list: track.playlistId, listType: 'playlist' });
            } else {
              this.ytPlayer.cueVideoById(track.ytId);
            }
          }
        } catch (e) {
          console.warn('YT loadVideo error:', e);
        }
      }
    }

    if (appState.soundtrack.isPlaying) {
      this.play();
    }
  }

  togglePlay() {
    if (appState.soundtrack.isPlaying) this.pause();
    else this.play();
  }

  play() {
    appState.soundtrack.isPlaying = true;
    const currentTrack = this.getCurrentTrack();
    if (!currentTrack) return;

    if (currentTrack.audioUrl) {
      if (this.html5Audio) {
        if (this.html5Audio.src !== currentTrack.audioUrl) {
          this.html5Audio.src = currentTrack.audioUrl;
        }
        this.html5Audio.volume = appState.soundtrack.volume;
        this.html5Audio.play().catch(() => {});
      }
    } else if (currentTrack.ytId) {
      if (this.isYtReady && this.ytPlayer) {
        try {
          this.ytPlayer.setVolume(Math.round(appState.soundtrack.volume * 100));
          const state = typeof this.ytPlayer.getPlayerState === 'function' ? this.ytPlayer.getPlayerState() : -1;
          if (state === -1 || state === 5) {
            if (currentTrack.playlistId) {
              this.ytPlayer.loadPlaylist({ list: currentTrack.playlistId, listType: 'playlist' });
            } else {
              this.ytPlayer.loadVideoById(currentTrack.ytId);
            }
          } else {
            this.ytPlayer.playVideo();
          }
        } catch (e) {
          try { this.ytPlayer.playVideo(); } catch (err) {}
        }
      } else {
        this.pendingPlay = true;
      }
    }

    this.updatePlayStateUi(true);

    if (this.playbackTimer) clearInterval(this.playbackTimer);
    this.playbackTimer = setInterval(() => {
      if (!appState.soundtrack.isPlaying) return;

      if (!this.isDraggingTimeline) {
        const isRecentSeek = (Date.now() - (this.lastSeekTimestamp || 0)) < 2200;

        if (!isRecentSeek && this.isYtReady && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
          try {
            const cur = this.ytPlayer.getCurrentTime();
            const dur = this.ytPlayer.getDuration();
            if (dur && dur > 0) appState.soundtrack.duration = Math.floor(dur);
            if (cur !== undefined && !isNaN(cur)) {
              appState.soundtrack.currentTime = Math.floor(cur);
            }
          } catch (e) {}
        } else if (!isRecentSeek && this.html5Audio && !this.html5Audio.paused && !isNaN(this.html5Audio.currentTime)) {
          appState.soundtrack.currentTime = Math.floor(this.html5Audio.currentTime);
          if (this.html5Audio.duration && !isNaN(this.html5Audio.duration)) {
            appState.soundtrack.duration = Math.floor(this.html5Audio.duration);
          }
        }

        this.updateProgressUi();
      }
    }, 500);
  }

  pause() {
    appState.soundtrack.isPlaying = false;
    this.pendingPlay = false;

    if (this.isYtReady && this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      try { this.ytPlayer.pauseVideo(); } catch (e) {}
    }

    if (this.html5Audio) {
      this.html5Audio.pause();
    }

    this.updatePlayStateUi(false);

    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  updatePlayStateUi(isPlaying) {
    if (this.equalizer) this.equalizer.classList.toggle('playing', isPlaying);
    if (this.playSvg) {
      if (isPlaying) {
        this.playSvg.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
      } else {
        this.playSvg.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"></polygon>';
      }
    }
  }

  seekTo(seconds) {
    const dur = appState.soundtrack.duration || 188;
    const target = Math.max(0, Math.min(dur, Math.floor(seconds)));
    appState.soundtrack.currentTime = target;
    this.lastSeekTimestamp = Date.now();

    this.updateProgressUi();

    if (this.isYtReady && this.ytPlayer && typeof this.ytPlayer.seekTo === 'function') {
      try {
        this.ytPlayer.seekTo(target, true);
      } catch (e) {}
    }

    if (this.html5Audio && !isNaN(this.html5Audio.duration)) {
      try {
        this.html5Audio.currentTime = target;
      } catch (e) {}
    }
  }

  seekRelative(deltaSeconds) {
    this.seekTo(appState.soundtrack.currentTime + deltaSeconds);
  }

  nextTrack() {
    const data = SOUNDTRACK_PLAYLISTS[appState.currentPlaylist] || SOUNDTRACK_PLAYLISTS['linkin-park'];
    if (!data.tracks || data.tracks.length === 0) return;
    const nextIdx = (appState.currentTrackIndex + 1) % data.tracks.length;
    this.loadTrack(nextIdx);
    if (appState.soundtrack.isPlaying) this.play();
  }

  prevTrack() {
    const data = SOUNDTRACK_PLAYLISTS[appState.currentPlaylist] || SOUNDTRACK_PLAYLISTS['linkin-park'];
    if (!data.tracks || data.tracks.length === 0) return;
    const prevIdx = (appState.currentTrackIndex - 1 + data.tracks.length) % data.tracks.length;
    this.loadTrack(prevIdx);
    if (appState.soundtrack.isPlaying) this.play();
  }

  updateProgressUi() {
    const cur = appState.soundtrack.currentTime || 0;
    const dur = appState.soundtrack.duration || 1;
    const percent = Math.min(100, Math.max(0, (cur / dur) * 100));

    if (this.currentTimeDisplay) this.currentTimeDisplay.textContent = this.formatTime(cur);
    if (this.durationDisplay && dur > 0) this.durationDisplay.textContent = this.formatTime(dur);
    if (this.timelineFill) this.timelineFill.style.width = `${percent}%`;
    if (this.timelineHandle) this.timelineHandle.style.left = `${percent}%`;
    if (this.timelineTrack) this.timelineTrack.setAttribute('aria-valuenow', Math.round(percent));
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  async fetchYouTubeVideoDetails(ytId) {
    try {
      const oembedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${ytId}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return {
          title: data.title || `YouTube Track (${ytId})`,
          artist: data.author_name || 'YouTube Audio'
        };
      }
    } catch (e) {}
    return { title: `YouTube Track (${ytId})`, artist: 'YouTube Audio' };
  }

  async fetchYouTubePlaylistTracks(playlistId) {
    // 1. Try public Invidious instances for full tracklist
    const invidiousInstances = [
      'https://inv.nadeko.net',
      'https://invidious.nerdvpn.de',
      'https://yt.drgnz.club',
      'https://invidious.jing.rocks',
      'https://vid.priv.au'
    ];

    for (const host of invidiousInstances) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(`${host}/api/v1/playlists/${playlistId}`, {
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.videos) && data.videos.length > 0) {
            return data.videos.map(v => ({
              title: v.title || 'Untitled Track',
              artist: v.author || data.title || 'YouTube Audio',
              duration: v.lengthSeconds || 210,
              ytId: v.videoId
            })).filter(t => t.ytId);
          }
        }
      } catch (err) {}
    }

    // 2. Try Piped API instances
    const pipedInstances = [
      'https://pipedapi.kavin.rocks',
      'https://api.piped.privacydev.net'
    ];

    for (const host of pipedInstances) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(`${host}/playlists/${playlistId}`, {
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.relatedStreams) && data.relatedStreams.length > 0) {
            return data.relatedStreams.map(s => {
              const idMatch = (s.url || '').match(/v=([\w-]{11})/);
              const ytId = idMatch ? idMatch[1] : (s.id || null);
              return {
                title: s.title || 'Untitled Track',
                artist: s.uploaderName || data.name || 'YouTube Audio',
                duration: s.duration || 210,
                ytId: ytId
              };
            }).filter(t => t.ytId);
          }
        }
      } catch (err) {}
    }

    return [];
  }

  async addCustomTrack(url, sourceTitle = '') {
    if (!url || !url.trim()) {
      this.showFeedback('Please paste a valid YouTube or audio URL.', true);
      return false;
    }
    url = url.trim();

    let ytId = null;
    let isPlaylist = false;
    let playlistId = null;

    // 1. YouTube Playlist URL
    const listMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (listMatch) {
      playlistId = listMatch[1];
      isPlaylist = true;
    }

    // 2. YouTube Single Video URL (watch, youtu.be, shorts, embed, music)
    const ytVideoMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytVideoMatch) {
      ytId = ytVideoMatch[1];
    }

    // 3. Direct Audio Stream URL
    const isDirectAudio = url.match(/\.(mp3|wav|ogg|m4a|aac)($|\?)/i) || (!ytId && !isPlaylist && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')));

    if (!ytId && !isPlaylist && !isDirectAudio) {
      this.showFeedback('Unsupported URL format. Please paste a valid YouTube or audio link.', true);
      return false;
    }

    this.showFeedback('Fetching track & playlist details...', false);

    // Case A: YouTube Playlist — extract individual videos
    if (isPlaylist && playlistId) {
      const fetchedTracks = await this.fetchYouTubePlaylistTracks(playlistId);
      if (fetchedTracks && fetchedTracks.length > 0) {
        // Add all individual fetched tracks to custom list
        SOUNDTRACK_PLAYLISTS['custom'].tracks = [...fetchedTracks, ...SOUNDTRACK_PLAYLISTS['custom'].tracks];
        this.saveCustomTracks();
        this.updateCustomTabBadge();

        this.switchPlaylist('custom');
        this.renderTracklist();
        this.loadTrack(0);
        this.play();

        this.showFeedback(`✓ Fetched ${fetchedTracks.length} songs from playlist! Play any song in any order.`, false);
        return true;
      } else {
        // Fallback: single playlist container if external mirror APIs are unreachable
        const newTrack = {
          title: sourceTitle || `YouTube Playlist (${playlistId.substring(0, 10)})`,
          artist: 'YouTube Playlist Stream',
          duration: 210,
          ytId: `videoseries?list=${playlistId}`,
          playlistId: playlistId,
          audioUrl: null
        };
        SOUNDTRACK_PLAYLISTS['custom'].tracks.unshift(newTrack);
        this.saveCustomTracks();
        this.updateCustomTabBadge();
        this.switchPlaylist('custom');
        this.loadTrack(0);
        this.play();
        this.showFeedback(`Loaded YouTube Playlist: ${newTrack.title}`, false);
        return true;
      }
    }

    // Case B: Single YouTube Video
    if (ytId) {
      const meta = await this.fetchYouTubeVideoDetails(ytId);
      const newTrack = {
        title: sourceTitle || meta.title || `YouTube Track (${ytId})`,
        artist: meta.artist || 'YouTube Audio',
        duration: 210,
        ytId: ytId,
        playlistId: null,
        audioUrl: null
      };

      SOUNDTRACK_PLAYLISTS['custom'].tracks.unshift(newTrack);
      this.saveCustomTracks();
      this.updateCustomTabBadge();

      this.switchPlaylist('custom');
      this.loadTrack(0);
      this.play();

      this.showFeedback(`✓ Added: ${newTrack.title}`, false);
      return true;
    }

    // Case C: Direct Audio Stream
    if (isDirectAudio) {
      const filename = url.split('/').pop().split('?')[0];
      const trackTitle = sourceTitle || decodeURIComponent(filename) || 'Custom Audio Stream';
      const newTrack = {
        title: trackTitle,
        artist: 'Direct Audio Stream',
        duration: 210,
        ytId: null,
        playlistId: null,
        audioUrl: url
      };

      SOUNDTRACK_PLAYLISTS['custom'].tracks.unshift(newTrack);
      this.saveCustomTracks();
      this.updateCustomTabBadge();

      this.switchPlaylist('custom');
      this.loadTrack(0);
      this.play();

      this.showFeedback(`✓ Added: ${trackTitle}`, false);
      return true;
    }

    return false;
  }

  deleteCustomTrack(index) {
    if (SOUNDTRACK_PLAYLISTS['custom'].tracks[index]) {
      SOUNDTRACK_PLAYLISTS['custom'].tracks.splice(index, 1);
      this.saveCustomTracks();
      this.updateCustomTabBadge();

      if (appState.currentPlaylist === 'custom') {
        if (SOUNDTRACK_PLAYLISTS['custom'].tracks.length === 0) {
          this.switchPlaylist('linkin-park');
          document.querySelectorAll('.playlist-tab-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.playlist === 'linkin-park');
          });
        } else {
          const newIdx = Math.min(index, SOUNDTRACK_PLAYLISTS['custom'].tracks.length - 1);
          this.renderTracklist();
          this.loadTrack(newIdx);
          if (appState.soundtrack.isPlaying) this.play();
        }
      }
      this.showFeedback(`Removed track from custom list`, false);
    }
  }

  showFeedback(msg, isError = false) {
    if (this.customFeedback) {
      this.customFeedback.textContent = msg;
      this.customFeedback.className = `custom-url-feedback ${isError ? 'error' : ''}`;
      setTimeout(() => {
        if (this.customFeedback) this.customFeedback.textContent = '';
      }, 4500);
    }
  }

  switchPlaylist(playlistKey) {
    appState.currentPlaylist = playlistKey;
    this.renderTracklist();
    this.loadTrack(0);
    if (appState.soundtrack.isPlaying) this.play();

    // Sync theme badge, nav button, and drawer tabs
    const themeLabels = {
      'linkin-park': 'Linkin Park',
      'the-weeknd': 'The Weeknd',
      'one-direction': 'One Direction',
      'metallica': 'Metallica',
      'soft-lofi': 'Soft Lo-Fi',
      'custom': 'Custom'
    };
    const currentName = themeLabels[playlistKey] || 'Custom';

    const navPlaylistText = document.getElementById('nav-playlist-text');
    if (navPlaylistText) navPlaylistText.textContent = `Playlist: ${currentName}`;

    const badge = document.getElementById('theme-badge-label');
    if (badge) badge.textContent = currentName;

    if (playlistKey !== 'custom') {
      document.body.setAttribute('data-theme', playlistKey);
      document.querySelectorAll('.theme-preset-card').forEach(c => c.classList.toggle('active', c.dataset.theme === playlistKey));
    }

    document.querySelectorAll('.playlist-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.playlist === playlistKey);
    });
  }

  renderTracklist() {
    const data = SOUNDTRACK_PLAYLISTS[appState.currentPlaylist] || SOUNDTRACK_PLAYLISTS['linkin-park'];
    if (!this.tracklistContainer) return;
    this.tracklistContainer.innerHTML = '';

    const isCustomTab = appState.currentPlaylist === 'custom';

    if (data.tracks.length === 0 && isCustomTab) {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'custom-empty-notice';
      emptyMsg.style.cssText = 'padding: 24px 12px; text-align: center; color: var(--text-muted); font-size: 11.5px;';
      emptyMsg.textContent = 'No custom tracks added yet. Paste a YouTube link or audio URL above to add!';
      this.tracklistContainer.appendChild(emptyMsg);
      return;
    }

    data.tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `track-item-card ${index === appState.currentTrackIndex ? 'active' : ''}`;
      item.dataset.index = index;

      item.innerHTML = `
        <div class="track-item-left">
          <span class="track-number">#${(index + 1).toString().padStart(2, '0')}</span>
          <div class="track-info">
            <span class="track-name">${track.title}</span>
            <span class="track-artist-sub">${track.artist || ''}</span>
          </div>
        </div>
        <div class="track-item-right-actions">
          ${isCustomTab ? `
            <button class="track-delete-btn" data-delete-idx="${index}" title="Remove track" aria-label="Remove track">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          ` : ''}
          <svg class="track-play-badge-svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>
        </div>
      `;

      item.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.track-delete-btn');
        if (deleteBtn) {
          e.stopPropagation();
          const delIdx = parseInt(deleteBtn.dataset.deleteIdx, 10);
          this.deleteCustomTrack(delIdx);
          return;
        }
        this.loadTrack(index);
        this.play();
        this.playlistDrawer?.classList.remove('open');
      });

      this.tracklistContainer.appendChild(item);
    });
  }

  init() {
    this.renderTracklist();
    this.loadTrack(0);

    // Audio Play / Navigation / Seeking Controls
    this.playBtn?.addEventListener('click', () => this.togglePlay());
    this.prevBtn?.addEventListener('click', () => this.prevTrack());
    this.nextBtn?.addEventListener('click', () => this.nextTrack());
    this.seekBackBtn?.addEventListener('click', () => this.seekRelative(-10));
    this.seekFwdBtn?.addEventListener('click', () => this.seekRelative(10));

    // Playlist Drawer open / close
    this.openPlaylistBtn?.addEventListener('click', () => this.playlistDrawer?.classList.add('open'));
    this.closePlaylistBtn?.addEventListener('click', () => this.playlistDrawer?.classList.remove('open'));
    this.playlistDrawer?.addEventListener('click', (e) => {
      if (e.target === this.playlistDrawer) this.playlistDrawer.classList.remove('open');
    });

    // Settings Drawer Playlist Shortcut
    this.settingsOpenPlaylistBtn?.addEventListener('click', () => {
      document.getElementById('settings-drawer-overlay')?.classList.remove('open');
      this.playlistDrawer?.classList.add('open');
    });

    // Playlist Selection Tabs
    document.querySelectorAll('.playlist-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.playlist-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const playlistKey = btn.dataset.playlist;
        this.switchPlaylist(playlistKey);
      });
    });

    // Quick Add in Playlist Drawer
    this.playlistCustomAddBtn?.addEventListener('click', () => {
      const url = this.playlistCustomInput?.value;
      if (this.addCustomTrack(url)) {
        if (this.playlistCustomInput) this.playlistCustomInput.value = '';
      }
    });

    this.playlistCustomInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const url = this.playlistCustomInput?.value;
        if (this.addCustomTrack(url)) {
          if (this.playlistCustomInput) this.playlistCustomInput.value = '';
        }
      }
    });

    // Timeline Scrubbing & Seeking (Click & Drag)
    const handleTimelineSeek = (e) => {
      if (!this.timelineTrack) return;
      const rect = this.timelineTrack.getBoundingClientRect();
      const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
      const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const ratio = clickX / rect.width;
      const targetSecs = ratio * (appState.soundtrack.duration || 188);
      this.seekTo(targetSecs);
    };

    this.timelineTrack?.addEventListener('mousedown', (e) => {
      this.isDraggingTimeline = true;
      this.timelineTrack.classList.add('dragging');
      handleTimelineSeek(e);

      const onMouseMove = (moveEvt) => {
        if (this.isDraggingTimeline) handleTimelineSeek(moveEvt);
      };
      const onMouseUp = () => {
        this.isDraggingTimeline = false;
        this.timelineTrack?.classList.remove('dragging');
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    this.timelineTrack?.addEventListener('touchstart', (e) => {
      this.isDraggingTimeline = true;
      this.timelineTrack.classList.add('dragging');
      handleTimelineSeek(e);

      const onTouchMove = (moveEvt) => {
        if (this.isDraggingTimeline) handleTimelineSeek(moveEvt);
      };
      const onTouchEnd = () => {
        this.isDraggingTimeline = false;
        this.timelineTrack?.classList.remove('dragging');
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }, { passive: true });

    // Soundtrack Volume Slider
    this.volumeSlider?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      const volRatio = val / 100;
      appState.soundtrack.volume = volRatio;

      if (this.isYtReady && this.ytPlayer && typeof this.ytPlayer.setVolume === 'function') {
        try { this.ytPlayer.setVolume(val); } catch (err) {}
      }

      if (this.html5Audio) {
        this.html5Audio.volume = volRatio;
      }
    });
  }
}

// ==========================================================================
// 6. COZYLOCK EXTENSION BRIDGE & FOCUS TIMER CONTROLLER
// ==========================================================================

const DEFAULT_WHITELIST_DOMAINS = [
  'github.com',
  'stackoverflow.com',
  'wikipedia.org',
  'notion.so',
  'docs.google.com',
  'chatgpt.com',
  'claude.ai',
  'figma.com',
  'canvas.instructure.com',
  'google.com',
  'youtube.com'
];

function playFocusCompletionChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Harmonic Tibetan singing bowl chime (A4, E5, A5, C#6)
    const freqs = [440, 659.25, 880, 1108.73];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2 / (idx + 1), now + idx * 0.08 + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 3.3);
    });
  } catch (e) {
    console.warn('Audio chime error:', e);
  }
}

class CozyFocusController {
  constructor() {
    this.quickBtn = document.getElementById('quick-focus-btn');
    this.resetBtn = document.getElementById('quick-focus-reset-btn');
    this.timeText = document.getElementById('quick-focus-timer-text');
    this.actionLabel = document.getElementById('quick-focus-action-label');

    // Settings drawer elements
    this.statusBadge = document.getElementById('cozylock-status-badge');
    this.badgeDot = document.getElementById('cozylock-badge-dot');
    this.badgeText = document.getElementById('cozylock-badge-text');
    this.durationBadge = document.getElementById('focus-duration-badge');
    this.durationPills = document.querySelectorAll('.focus-preset-pill');

    this.whitelistCountBadge = document.getElementById('whitelist-count-badge');
    this.whitelistChipsContainer = document.getElementById('whitelist-chips-container');
    this.whitelistInput = document.getElementById('whitelist-input');
    this.whitelistAddBtn = document.getElementById('whitelist-add-btn');
    this.whitelistResetBtn = document.getElementById('whitelist-reset-btn');
    this.whitelistFeedback = document.getElementById('whitelist-feedback');

    // PIN settings elements
    this.cozyPinInput = document.getElementById('cozy-pin-input');
    this.cozyPinSaveBtn = document.getElementById('cozy-pin-save-btn');
    this.cozyPinFeedback = document.getElementById('cozy-pin-feedback');
    this.pinSavedBadge = document.getElementById('pin-saved-badge');

    // In-App PIN Unlock Modal elements
    this.pinModalOverlay = document.getElementById('pin-modal-overlay');
    this.modalPinInput = document.getElementById('modal-pin-input');
    this.modalPinSubmitBtn = document.getElementById('modal-pin-submit-btn');
    this.modalPinCancelBtn = document.getElementById('modal-pin-cancel-btn');
    this.modalPinFeedback = document.getElementById('modal-pin-feedback');
    this.pendingUnlockCallback = null;

    // State
    this.durationMinutes = parseInt(localStorage.getItem('cozylock_duration_mins') || '25', 10);
    this.totalSeconds = this.durationMinutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.isRunning = false;
    this.intervalId = null;
    this.focusStartTime = null;

    this.pin = String(localStorage.getItem('cozylock_pin') || '').trim();
    this.whitelistedSites = this.loadWhitelist();
    this.isExtensionConnected = false;

    this.syncChannel = typeof BroadcastChannel !== 'undefined'
      ? new BroadcastChannel('COZYLOCK_SYNC_CHANNEL')
      : null;

    this.init();
  }

  loadWhitelist() {
    try {
      const stored = localStorage.getItem('cozylock_whitelist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [...DEFAULT_WHITELIST_DOMAINS];
  }

  saveWhitelist() {
    localStorage.setItem('cozylock_whitelist', JSON.stringify(this.whitelistedSites));
    this.renderWhitelistChips();
    this.notifyExtensionWhitelist();
  }

  init() {
    this.updateDisplay();
    this.renderWhitelistChips();
    this.setupDurationPills();
    this.setupWhitelistHandlers();
    this.setupPinHandlers();
    this.setupModalHandlers();
    this.setupExtensionBridge();

    this.quickBtn?.addEventListener('click', () => this.toggle());
    this.resetBtn?.addEventListener('click', () => this.handleResetClick());

    // Send initial status check and start polling
    this.sendActionToExtension('getStatus');
    setInterval(() => this.sendActionToExtension('getStatus'), 2000);
  }

  setupDurationPills() {
    this.durationPills.forEach(pill => {
      const mins = parseInt(pill.dataset.minutes, 10);
      pill.classList.toggle('active', mins === this.durationMinutes);
      pill.addEventListener('click', () => {
        if (this.isRunning) {
          this.promptPinToUnlock(() => {
            this.setDuration(mins, pill);
          });
        } else {
          this.setDuration(mins, pill);
        }
      });
    });

    if (this.durationBadge) this.durationBadge.textContent = `${this.durationMinutes} min`;
  }

  setDuration(mins, pillElement) {
    this.durationMinutes = mins;
    localStorage.setItem('cozylock_duration_mins', mins);
    this.totalSeconds = mins * 60;
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
    this.durationPills.forEach(p => p.classList.toggle('active', p === pillElement));
    if (this.durationBadge) this.durationBadge.textContent = `${mins} min`;
  }

  setupPinHandlers() {
    if (this.cozyPinInput && this.pin) {
      this.cozyPinInput.value = this.pin;
    }
    this.updatePinBadge();

    // Strict numeric 4-digit input enforcement
    this.cozyPinInput?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });

    const savePin = () => {
      const val = (this.cozyPinInput?.value || '').replace(/\D/g, '').slice(0, 4);
      if (!val) {
        this.pin = '';
        localStorage.removeItem('cozylock_pin');
        this.sendActionToExtension('syncPin', { pin: '' });
        this.showPinFeedback('Safety PIN removed', false);
        this.updatePinBadge();
        return;
      }

      if (val.length !== 4) {
        this.showPinFeedback('PIN must be exactly 4 numeric digits (e.g. 1234)', true);
        return;
      }

      this.pin = val;
      localStorage.setItem('cozylock_pin', val);
      this.sendActionToExtension('syncPin', { pin: val });
      this.showPinFeedback('✓ 4-digit Safety PIN saved & synchronized', false);
      this.updatePinBadge();
    };

    this.cozyPinSaveBtn?.addEventListener('click', savePin);
    this.cozyPinInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') savePin();
    });
  }

  updatePinBadge() {
    if (!this.pinSavedBadge) return;
    if (this.pin && this.pin.length === 4) {
      this.pinSavedBadge.textContent = 'Active (4-Digit)';
      this.pinSavedBadge.style.color = '#34d399';
    } else {
      this.pinSavedBadge.textContent = 'Not Set';
      this.pinSavedBadge.style.color = '#b8a6c4';
    }
  }

  showPinFeedback(msg, isError = false) {
    if (!this.cozyPinFeedback) return;
    this.cozyPinFeedback.textContent = msg;
    this.cozyPinFeedback.className = `whitelist-feedback ${isError ? 'error' : 'success'}`;
    setTimeout(() => {
      if (this.cozyPinFeedback) this.cozyPinFeedback.textContent = '';
    }, 3500);
  }

  // ── PIN Unlock Modal Logic ──
  setupModalHandlers() {
    // Strict numeric 4-digit input enforcement
    this.modalPinInput?.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });

    this.modalPinCancelBtn?.addEventListener('click', () => this.closePinModal());
    this.modalPinSubmitBtn?.addEventListener('click', () => this.verifyPinInput());
    this.modalPinInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.verifyPinInput();
      if (e.key === 'Escape') this.closePinModal();
    });
    this.pinModalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.pinModalOverlay) this.closePinModal();
    });
  }

  promptPinToUnlock(onSuccess) {
    // If no PIN is configured, proceed immediately
    if (!this.pin || this.pin.trim().length !== 4) {
      if (onSuccess) onSuccess();
      return;
    }

    this.pendingUnlockCallback = onSuccess;
    if (this.modalPinInput) this.modalPinInput.value = '';
    if (this.modalPinFeedback) this.modalPinFeedback.textContent = '';
    if (this.pinModalOverlay) this.pinModalOverlay.classList.add('open');
    setTimeout(() => this.modalPinInput?.focus(), 50);
  }

  closePinModal() {
    if (this.pinModalOverlay) this.pinModalOverlay.classList.remove('open');
    this.pendingUnlockCallback = null;
  }

  verifyPinInput() {
    const input = (this.modalPinInput?.value || '').replace(/\D/g, '').slice(0, 4);
    if (!input || input.length !== 4) {
      if (this.modalPinFeedback) this.modalPinFeedback.textContent = 'Please enter your 4-digit PIN';
      return;
    }

    if (input === this.pin) {
      const callback = this.pendingUnlockCallback;
      this.closePinModal();
      if (callback) callback();
    } else {
      if (this.modalPinFeedback) {
        this.modalPinFeedback.textContent = 'Incorrect PIN. Focus Lock is still active.';
      }
      if (this.modalPinInput) {
        this.modalPinInput.value = '';
        this.modalPinInput.focus();
      }
    }
  }

  setupWhitelistHandlers() {
    const addDomainFromInput = () => {
      const val = this.whitelistInput?.value;
      if (!val) return;
      this.addDomain(val);
      if (this.whitelistInput) this.whitelistInput.value = '';
    };

    this.whitelistAddBtn?.addEventListener('click', addDomainFromInput);
    this.whitelistInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addDomainFromInput();
    });

    document.querySelectorAll('.preset-add-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const domain = chip.dataset.domain;
        if (domain) this.addDomain(domain);
      });
    });

    this.whitelistResetBtn?.addEventListener('click', () => {
      if (confirm('Reset whitelist to default recommended study domains?')) {
        this.whitelistedSites = [...DEFAULT_WHITELIST_DOMAINS];
        this.saveWhitelist();
        this.showWhitelistFeedback('Reset whitelist to default study sites', false);
      }
    });
  }

  cleanDomain(raw) {
    if (!raw) return '';
    return raw.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/:.*$/, '')
      .replace(/\/.*$/, '')
      .trim();
  }

  addDomain(raw) {
    const clean = this.cleanDomain(raw);
    if (!clean || clean.length < 3 || !clean.includes('.')) {
      this.showWhitelistFeedback('Please enter a valid domain (e.g. stackoverflow.com)', true);
      return false;
    }

    if (this.whitelistedSites.includes(clean)) {
      this.showWhitelistFeedback(`${clean} is already in your whitelist`, true);
      return false;
    }

    this.whitelistedSites.push(clean);
    this.saveWhitelist();
    this.showWhitelistFeedback(`✓ Added ${clean} to allowed sites`, false);
    return true;
  }

  removeDomain(domain) {
    this.whitelistedSites = this.whitelistedSites.filter(d => d !== domain);
    this.saveWhitelist();
    this.showWhitelistFeedback(`Removed ${domain}`, false);
  }

  renderWhitelistChips() {
    if (!this.whitelistChipsContainer) return;
    this.whitelistChipsContainer.innerHTML = '';
    if (this.whitelistCountBadge) this.whitelistCountBadge.textContent = String(this.whitelistedSites.length);

    this.whitelistedSites.forEach(site => {
      const chip = document.createElement('span');
      chip.className = 'whitelist-tag-chip';
      chip.innerHTML = `
        <span>${site}</span>
        <button class="tag-remove-btn" title="Remove ${site}">✕</button>
      `;
      chip.querySelector('.tag-remove-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeDomain(site);
      });
      this.whitelistChipsContainer.appendChild(chip);
    });
  }

  showWhitelistFeedback(msg, isError = false) {
    if (!this.whitelistFeedback) return;
    this.whitelistFeedback.textContent = msg;
    this.whitelistFeedback.className = `whitelist-feedback ${isError ? 'error' : 'success'}`;
    setTimeout(() => {
      if (this.whitelistFeedback) this.whitelistFeedback.textContent = '';
    }, 3500);
  }

  // ── Extension Two-Way Communication Bridge ──
  setupExtensionBridge() {
    const handleIncomingState = (state) => {
      if (!state) return;
      this.isExtensionConnected = true;

      // Sync safety PIN if present from extension
      if (state.focusPIN && state.focusPIN.length === 4 && state.focusPIN !== this.pin) {
        this.pin = String(state.focusPIN).replace(/\D/g, '').slice(0, 4);
        localStorage.setItem('cozylock_pin', this.pin);
        if (this.cozyPinInput) this.cozyPinInput.value = this.pin;
        this.updatePinBadge();
      }

      if (state.active || state.isActive) {
        // Extension or other tab has an active focus lock session running
        const startTime = state.focusStartTime || Date.now();
        const durationMs = state.focusDuration || (this.durationMinutes * 60 * 1000);
        const elapsedSecs = Math.floor((Date.now() - startTime) / 1000);
        const totalSecs = Math.floor(durationMs / 1000);
        const remaining = Math.max(0, totalSecs - elapsedSecs);

        if (remaining > 0) {
          this.focusStartTime = startTime;
          this.totalSeconds = totalSecs;
          this.remainingSeconds = remaining;
          this.durationMinutes = Math.round(durationMs / 60000);
          if (this.durationBadge) this.durationBadge.textContent = `${this.durationMinutes} min`;

          this.updateDisplay();
          this.quickBtn?.classList.add('running');
          if (this.resetBtn) this.resetBtn.style.display = 'inline-flex';
          if (this.actionLabel) this.actionLabel.textContent = 'Pause';
          this.updateExtensionStatusUi(true);

          if (!this.isRunning) {
            this.isRunning = true;
            this.startLocalTimerTick();
          }
        }
      } else {
        // Focus inactive
        if (this.isRunning) {
          this.isRunning = false;
          if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
          }
          this.focusStartTime = null;
          this.remainingSeconds = this.totalSeconds;
          this.updateDisplay();
          this.quickBtn?.classList.remove('running');
          if (this.actionLabel) this.actionLabel.textContent = 'Start';
          if (this.resetBtn) this.resetBtn.style.display = 'none';
          this.updateExtensionStatusUi(false);
        }
      }
    };

    window.addEventListener('message', (event) => {
      if (!event.data) return;
      const { type, state } = event.data;
      if (type === 'COZYLOCK_EXTENSION_STATE' || type === 'FOCUSNYX_EXTENSION_STATE') {
        handleIncomingState(state);
      }
    });

    window.addEventListener('storage', (event) => {
      if (event.key === 'cozylock_shared_timer_state' && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          handleIncomingState(data);
        } catch {}
      }
    });

    if (this.syncChannel) {
      this.syncChannel.onmessage = (event) => {
        if (!event.data) return;
        const { type, state } = event.data;
        if (type === 'COZYLOCK_EXTENSION_STATE' || type === 'FOCUSNYX_EXTENSION_STATE') {
          handleIncomingState(state);
        }
      };
    }
  }

  updateExtensionStatusUi(isFocusActive) {
    if (!this.badgeText || !this.badgeDot) return;
    if (isFocusActive) {
      this.badgeDot.className = 'cozylock-badge-dot locking';
      this.badgeText.textContent = 'CozyLock: Focus Lock Active';
    } else {
      this.badgeDot.className = 'cozylock-badge-dot active';
      this.badgeText.textContent = 'CozyLock: Connected & Ready';
    }
  }

  sendActionToExtension(action, extraPayload = {}) {
    const payload = {
      type: 'COZYLOCK_WEB_APP_ACTION',
      action,
      durationMinutes: this.durationMinutes,
      allowedUrls: this.whitelistedSites,
      pin: this.pin,
      focusStartTime: this.focusStartTime || Date.now(),
      timestamp: Date.now(),
      ...extraPayload
    };

    window.postMessage(payload, '*');
    if (this.syncChannel) {
      try { this.syncChannel.postMessage(payload); } catch {}
    }
    try {
      localStorage.setItem('cozylock_app_focus_state', JSON.stringify({
        action,
        durationMinutes: this.durationMinutes,
        allowedUrls: this.whitelistedSites,
        pin: this.pin,
        focusStartTime: this.focusStartTime || Date.now(),
        timestamp: Date.now(),
        ...extraPayload
      }));
    } catch {}
  }

  notifyExtensionWhitelist() {
    this.sendActionToExtension('updateWhitelist', { allowedUrls: this.whitelistedSites });
  }

  // ── Timer State & Execution ──
  toggle() {
    if (this.isRunning) {
      this.promptPinToUnlock(() => this.pause());
    } else {
      this.start();
    }
  }

  handleResetClick() {
    if (this.isRunning || this.remainingSeconds < this.totalSeconds) {
      this.promptPinToUnlock(() => this.reset());
    } else {
      this.reset();
    }
  }

  start() {
    this.isRunning = true;
    this.focusStartTime = Date.now();
    this.quickBtn?.classList.add('running');
    if (this.resetBtn) this.resetBtn.style.display = 'inline-flex';
    if (this.actionLabel) this.actionLabel.textContent = 'Pause';

    // Instant local storage sync
    try {
      localStorage.setItem('cozylock_shared_timer_state', JSON.stringify({
        active: true,
        focusStartTime: this.focusStartTime,
        focusDuration: this.totalSeconds * 1000,
        pin: this.pin,
        allowedUrls: this.whitelistedSites,
        timestamp: Date.now()
      }));
    } catch {}

    // Broadcast focus start to extension with start timestamp and PIN
    this.sendActionToExtension('startFocus', {
      durationMinutes: Math.ceil(this.remainingSeconds / 60),
      focusStartTime: this.focusStartTime,
      pin: this.pin
    });
    this.updateExtensionStatusUi(true);

    this.startLocalTimerTick();
  }

  startLocalTimerTick() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.focusStartTime) {
        const elapsed = Math.floor((Date.now() - this.focusStartTime) / 1000);
        this.remainingSeconds = Math.max(0, this.totalSeconds - elapsed);
      } else {
        this.remainingSeconds--;
      }

      this.updateDisplay();

      if (this.remainingSeconds <= 0) {
        this.complete();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    this.quickBtn?.classList.remove('running');
    if (this.actionLabel) this.actionLabel.textContent = 'Resume';
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.focusStartTime = null;

    try {
      localStorage.setItem('cozylock_shared_timer_state', JSON.stringify({
        active: false,
        focusStartTime: null,
        focusDuration: null,
        pin: this.pin,
        timestamp: Date.now()
      }));
    } catch {}

    // Release extension block with PIN
    this.sendActionToExtension('pauseFocus', { pin: this.pin });
    this.updateExtensionStatusUi(false);
  }

  reset() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.focusStartTime = null;
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
    this.quickBtn?.classList.remove('running');
    if (this.actionLabel) this.actionLabel.textContent = 'Start';
    if (this.resetBtn) this.resetBtn.style.display = 'none';

    try {
      localStorage.setItem('cozylock_shared_timer_state', JSON.stringify({
        active: false,
        focusStartTime: null,
        focusDuration: null,
        pin: this.pin,
        timestamp: Date.now()
      }));
    } catch {}

    this.sendActionToExtension('endFocus', { pin: this.pin });
    this.updateExtensionStatusUi(false);
  }

  complete() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.focusStartTime = null;
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
    this.quickBtn?.classList.remove('running');
    if (this.actionLabel) this.actionLabel.textContent = 'Start';
    if (this.resetBtn) this.resetBtn.style.display = 'none';

    try {
      localStorage.setItem('cozylock_shared_timer_state', JSON.stringify({
        active: false,
        focusStartTime: null,
        focusDuration: null,
        pin: this.pin,
        timestamp: Date.now()
      }));
    } catch {}

    this.sendActionToExtension('endFocus', { pin: this.pin });
    this.updateExtensionStatusUi(false);

    playFocusCompletionChime();
  }

  updateDisplay() {
    const mins = Math.floor(Math.max(0, this.remainingSeconds) / 60);
    const secs = Math.max(0, this.remainingSeconds) % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (this.timeText) this.timeText.textContent = formatted;
  }
}

// Clock & Time Greeting
function updateClock() {
  const now = new Date();
  const clock = document.getElementById('live-clock-text');
  if (clock) {
    clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

// ==========================================================================
// 7. APP INITIALIZATION & EVENT WIRING
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initLenisScroll();

  const preloader = new SanctuaryPreloaderManager();
  const videoManager = new VideoBackgroundManager();
  const lampController = new LampController();
  const weatherEngine = new WeatherCanvasEngine('weather-canvas');
  window.weatherEngineInstance = weatherEngine;
  const audioPlayer = new PureAudioPlayer();
  const focusController = new CozyFocusController();

  updateClock();
  setInterval(updateClock, 1000);

  // Settings Drawer
  const settingsDrawer = document.getElementById('settings-drawer-overlay');
  document.getElementById('nav-settings-toggle')?.addEventListener('click', () => settingsDrawer?.classList.add('open'));
  document.getElementById('close-settings-btn')?.addEventListener('click', () => settingsDrawer?.classList.remove('open'));
  settingsDrawer?.addEventListener('click', (e) => {
    if (e.target === settingsDrawer) settingsDrawer.classList.remove('open');
  });

  // 1-Click Instant Playlist Switch Button
  const quickPlaylistBtn = document.getElementById('quick-playlist-btn');
  const playlistCycleKeys = ['linkin-park', 'the-weeknd', 'one-direction', 'metallica', 'soft-lofi'];
  quickPlaylistBtn?.addEventListener('click', () => {
    const curIdx = playlistCycleKeys.indexOf(appState.currentPlaylist);
    const nextIdx = (curIdx + 1) % playlistCycleKeys.length;
    const nextKey = playlistCycleKeys[nextIdx];
    audioPlayer.switchPlaylist(nextKey);
  });

  // 1-Click Combined Ambient Sound Layer Cycle Button
  const quickAmbientBtn = document.getElementById('quick-ambient-btn');
  const navAmbientText = document.getElementById('nav-ambient-text');
  const navAmbientDot = document.getElementById('nav-ambient-dot');

  const mixRainBtn = document.getElementById('mix-rain-btn');
  const mixWhiteNoiseBtn = document.getElementById('mix-white-noise-btn');
  const mixVinylBtn = document.getElementById('mix-vinyl-btn');
  const mixWindBtn = document.getElementById('mix-wind-btn');

  const AMBIENT_MODES = [
    { key: 'off', label: 'Sound: Off', rain: false, whiteNoise: false, vinyl: false, dotColor: '#64748b' },
    { key: 'rain', label: 'Sound: Rain', rain: true, whiteNoise: false, vinyl: false, dotColor: '#38bdf8' },
    { key: 'whitenoise', label: 'Sound: White Noise', rain: false, whiteNoise: true, vinyl: false, dotColor: '#34d399' },
    { key: 'vinyl', label: 'Sound: Lo-Fi Vinyl', rain: false, whiteNoise: false, vinyl: true, dotColor: '#f59e0b' },
    { key: 'mixed', label: 'Sound: All Mixed', rain: true, whiteNoise: true, vinyl: true, dotColor: '#c084fc' }
  ];
  let currentAmbientModeIndex = 0;

  function setAmbientMode(idx) {
    currentAmbientModeIndex = (idx + AMBIENT_MODES.length) % AMBIENT_MODES.length;
    const mode = AMBIENT_MODES[currentAmbientModeIndex];

    appState.ambientSounds.rain.active = mode.rain;
    appState.ambientSounds.whiteNoise.active = mode.whiteNoise;
    appState.ambientSounds.vinyl.active = mode.vinyl;

    if (mode.rain) startRainSound(appState.ambientSounds.rain.volume);
    else stopRainSound();

    if (mode.whiteNoise) startWhiteNoiseSound(appState.ambientSounds.whiteNoise.volume);
    else stopWhiteNoiseSound();

    if (mode.vinyl) startVinylSound(appState.ambientSounds.vinyl.volume);
    else stopVinylSound();

    if (navAmbientText) navAmbientText.textContent = mode.label;
    if (navAmbientDot) {
      navAmbientDot.classList.toggle('active', mode.key !== 'off');
      navAmbientDot.style.background = mode.dotColor;
      navAmbientDot.style.boxShadow = mode.key !== 'off' ? `0 0 8px ${mode.dotColor}` : 'none';
    }

    // Sync settings drawer toggle buttons
    if (mixRainBtn) {
      mixRainBtn.classList.toggle('active', mode.rain);
      mixRainBtn.textContent = mode.rain ? 'ON' : 'OFF';
    }
    if (mixWhiteNoiseBtn) {
      mixWhiteNoiseBtn.classList.toggle('active', mode.whiteNoise);
      mixWhiteNoiseBtn.textContent = mode.whiteNoise ? 'ON' : 'OFF';
    }
    if (mixVinylBtn) {
      mixVinylBtn.classList.toggle('active', mode.vinyl);
      mixVinylBtn.textContent = mode.vinyl ? 'ON' : 'OFF';
    }
  }

  quickAmbientBtn?.addEventListener('click', () => {
    setAmbientMode(currentAmbientModeIndex + 1);
  });

  // Settings Drawer individual toggles
  mixRainBtn?.addEventListener('click', () => {
    appState.ambientSounds.rain.active = !appState.ambientSounds.rain.active;
    if (appState.ambientSounds.rain.active) startRainSound(appState.ambientSounds.rain.volume);
    else stopRainSound();
    mixRainBtn.classList.toggle('active', appState.ambientSounds.rain.active);
    mixRainBtn.textContent = appState.ambientSounds.rain.active ? 'ON' : 'OFF';
  });

  mixWhiteNoiseBtn?.addEventListener('click', () => {
    appState.ambientSounds.whiteNoise.active = !appState.ambientSounds.whiteNoise.active;
    if (appState.ambientSounds.whiteNoise.active) startWhiteNoiseSound(appState.ambientSounds.whiteNoise.volume);
    else stopWhiteNoiseSound();
    mixWhiteNoiseBtn.classList.toggle('active', appState.ambientSounds.whiteNoise.active);
    mixWhiteNoiseBtn.textContent = appState.ambientSounds.whiteNoise.active ? 'ON' : 'OFF';
  });

  mixVinylBtn?.addEventListener('click', () => {
    appState.ambientSounds.vinyl.active = !appState.ambientSounds.vinyl.active;
    if (appState.ambientSounds.vinyl.active) startVinylSound(appState.ambientSounds.vinyl.volume);
    else stopVinylSound();
    mixVinylBtn.classList.toggle('active', appState.ambientSounds.vinyl.active);
    mixVinylBtn.textContent = appState.ambientSounds.vinyl.active ? 'ON' : 'OFF';
  });

  // Wholesome Fullscreen Study Mode
  const navFullscreenToggle = document.getElementById('nav-fullscreen-toggle');
  const zenExitBtn = document.getElementById('zen-exit-button');

  function toggleFullscreenView() {
    appState.zenActive = !appState.zenActive;
    document.body.classList.toggle('wholesome-fullscreen', appState.zenActive);

    if (appState.zenActive) {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  navFullscreenToggle?.addEventListener('click', toggleFullscreenView);
  zenExitBtn?.addEventListener('click', toggleFullscreenView);

  // Themes in Settings
  document.querySelectorAll('.theme-preset-card').forEach(card => {
    card.addEventListener('click', () => {
      const themeId = card.dataset.theme;
      audioPlayer.switchPlaylist(themeId);
    });
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'f' || e.key === 'F' || e.key === 'z' || e.key === 'Z') {
      toggleFullscreenView();
    } else if (e.key === 'Escape' && appState.zenActive) {
      toggleFullscreenView();
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      audioPlayer.togglePlay();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (e.shiftKey) {
        audioPlayer.prevTrack();
      } else {
        audioPlayer.seekRelative(-10);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (e.shiftKey) {
        audioPlayer.nextTrack();
      } else {
        audioPlayer.seekRelative(10);
      }
    } else if (e.key === 'j' || e.key === 'J') {
      audioPlayer.seekRelative(-10);
    } else if (e.key === 'l' || e.key === 'L') {
      lampController.cycleLamp();
    } else if (e.key === 'w' || e.key === 'W') {
      weatherEngine.cycleWeather();
    }
  });

});
