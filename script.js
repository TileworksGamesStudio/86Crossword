/**
 * COCKTAIL CROSSWORD • MINI • MIDI • MAIN
 * Architecture: Clean Data-Driven Vanilla JS Application
 */

/* ==========================================================================
   1. SOUND & HAPTIC FEEDBACK ENGINE
   ========================================================================== */
const SoundEngine = (() => {
  let ctx = null;
  let muted = false;

  const initCtx = () => {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  };

  const playClick = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) { /* audio grace */ }

    if (navigator.vibrate) {
      try { navigator.vibrate(8); } catch (e) {}
    }
  };

  const playChime = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [587.33, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.14, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.28);
      });
    } catch (e) { /* audio grace */ }

    if (navigator.vibrate) {
      try { navigator.vibrate(15); } catch (e) {}
    }
  };

  const playFanfare = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.16, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.45);
      });
    } catch (e) { /* audio grace */ }

    if (navigator.vibrate) {
      try { navigator.vibrate([20, 30, 40]); } catch (e) {}
    }
  };

  const playError = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) { /* audio grace */ }

    if (navigator.vibrate) {
      try { navigator.vibrate([12, 10, 12]); } catch (e) {}
    }
  };

  const toggleMute = () => {
    muted = !muted;
    localStorage.setItem('cc_muted', muted ? '1' : '0');
    return muted;
  };

  const isMuted = () => muted;

  const initMute = () => {
    muted = localStorage.getItem('cc_muted') === '1';
  };

  return { playClick, playChime, playFanfare, playError, toggleMute, isMuted, initMute };
})();

/* ==========================================================================
   2. GAME STATE & DATA STORE
   ========================================================================== */
const GameState = {
  puzzles: [],
  codex: [],
  ranks: [],
  domains: [],
  currentPuzzle: null,
  activeCell: { r: 0, c: 0 },
  activeDirection: "across",
  activeWord: null,
  userGrid: {},
  timerSeconds: 0,
  timerInterval: null,
  isPaused: false,
  isSolved: false,
  hintsUsed: 0,
  errorsCount: 0,
  unlockedCodex: new Set(),
  streak: 1,
  xp: 450,
  puzzlesSolvedCount: 0,
  cleanSweepsCount: 0,

  async initData() {
    this.loadPersistence();
    SoundEngine.initMute();

    try {
      const response = await fetch('./data.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.applyData(data);
    } catch (err) {
      console.warn("Could not load data.json via fetch. Using embedded dataset fallback.", err);
      this.applyEmbeddedFallback();
    }
  },

  applyData(data) {
    if (data && Array.isArray(data.puzzles)) {
      this.puzzles = data.puzzles;
      this.codex = data.codex || [];
      this.ranks = data.ranks || [];
      this.domains = data.domains || [];
    }
  },

  applyEmbeddedFallback() {
    this.puzzles = [
      {
        id: "mini-1",
        title: "The Italian Hour",
        tier: "mini",
        theme: "Aperitivo Culture & Bar Formulations",
        blurb: "A snappy 5×5 featuring bitter liqueurs, mise en place, and hospitality traditions.",
        gridSize: { rows: 5, cols: 5 },
        words: [
          { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SPECS", clue: "Standard cocktail recipes and measures followed for drink consistency", cat: "Methods & Tools", codexId: "specs" },
          { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "AMARO", clue: "Bittersweet Italian herbal liqueur enjoyed as an aperitivo or digestivo", cat: "Spirits", codexId: "amaro" },
          { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "TWIST", clue: "Citrus peel expressed over the surface to release aromatic oils", cat: "Methods & Tools", codexId: "twist" },
          { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "START", clue: "Beginning of a busy Friday night shift and station mise en place", cat: "Methods & Tools", codexId: "start" },
          { id: "2D", num: 2, dir: "down", row: 1, col: 2, answer: "BAR", clue: "The counter where cocktails are crafted and hospitality is shared", cat: "History & Lore", codexId: "bar" },
          { id: "4D", num: 4, dir: "down", row: 0, col: 4, answer: "SHOOT", clue: "Down a neat measure with fellow staff as a camaraderie toast", cat: "History & Lore", codexId: "shoot" }
        ]
      }
    ];
  },

  loadPersistence() {
    const savedUnlocked = localStorage.getItem('cc_unlocked');
    if (savedUnlocked) {
      try { this.unlockedCodex = new Set(JSON.parse(savedUnlocked)); } catch (e) {}
    }
    const savedXp = localStorage.getItem('cc_xp');
    if (savedXp) this.xp = parseInt(savedXp, 10) || 0;
    const savedSolved = localStorage.getItem('cc_solved_count');
    if (savedSolved) this.puzzlesSolvedCount = parseInt(savedSolved, 10) || 0;
  }
};