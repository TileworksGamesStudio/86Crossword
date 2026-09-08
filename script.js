/**
 * THE DAILY COCKTAIL CROSSWORD — PLATFORM GAME ENGINE
 * Architected for:
 * - Dedicated Main Menu Screen with swipeable Tier Selector (Mini, Midi, Main)
 * - Deterministic Day 0 anchor (8 September 2026)
 * - Pure Web Audio API synthesis (zero external audio dependencies)
 * - Subtle floating garnish background system (2-6 on menu, 1-2 in active play)
 * - Mobile safe-area ergonomics & keyboard input handling
 */

(() => {
  'use strict';

  // --- CONFIG & CONSTANTS ---
  const STORAGE_KEY = 'cocktail_crossword_platform_v2';
  const SOUND_KEY = 'cocktail_crossword_sound_enabled';

  // Deterministic Launch Anchor: 8 September 2026 = Day 0
  // Month is 0-indexed in JS Date: September = 8
  const ANCHOR_YEAR = 2026;
  const ANCHOR_MONTH = 8;
  const ANCHOR_DATE = 8;

  // --- AUDIO SYNTHESIZER (Pure Web Audio API) ---
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem(SOUND_KEY) !== 'false'; // Enabled by default
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTap() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A Major Chord
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.36);
      });
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem(SOUND_KEY, this.enabled ? 'true' : 'false');
      if (this.enabled) this.playTap();
      return this.enabled;
    }
  }

  const audio = new SoundFX();

  // --- GARNISH BACKGROUND SYSTEM ---
  // High quality gold vector line-art library for 6 classic garnishes
  const GARNISH_SVGS = [
    // 1. Citrus Twist / Ribbon Spiral
    `<svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 34C10 24 16 26 22 20C28 14 26 8 34 6"/><path d="M8 36C12 26 18 28 24 22C30 16 28 10 36 8"/></svg>`,
    // 2. Citrus Wheel Slice
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="1.5"><circle cx="20" cy="20" r="17"/><circle cx="20" cy="20" r="13" stroke-dasharray="2 2"/><circle cx="20" cy="20" r="2.5" fill="#d4af37"/><line x1="20" y1="7" x2="20" y2="33"/><line x1="7" y1="20" x2="33" y2="20"/><line x1="10.8" y1="10.8" x2="29.2" y2="29.2"/><line x1="29.2" y1="10.8" x2="10.8" y2="29.2"/></svg>`,
    // 3. Mint Sprig
    `<svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 36V12"/><path d="M20 12C12 8 8 16 20 24"/><path d="M20 12C28 8 32 16 20 24"/><path d="M20 22C14 20 10 25 20 30"/><path d="M20 22C26 20 30 25 20 30"/><path d="M20 12C17 6 23 6 20 4"/></svg>`,
    // 4. Skewered Cocktail Olive on Pick
    `<svg width="34" height="42" viewBox="0 0 34 42" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round"><line x1="17" y1="2" x2="17" y2="40"/><ellipse cx="17" cy="20" rx="9" ry="12"/><circle cx="17" cy="18" r="3.5" fill="#d4af37" fill-opacity="0.35"/></svg>`,
    // 5. Brandied Cherries on Stems
    `<svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round"><circle cx="13" cy="27" r="7"/><circle cx="27" cy="25" r="7"/><path d="M13 20C13 12 20 6 25 4"/><path d="M27 18C25 12 24 8 25 4"/><path d="M25 4C28 6 30 5 32 4"/></svg>`,
    // 6. Rosemary Branch
    `<svg width="36" height="40" viewBox="0 0 40 40" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-linecap="round"><line x1="20" y1="36" x2="20" y2="6"/><path d="M20 30L12 26M20 28L28 24M20 22L11 19M20 20L29 17M20 14L13 12M20 12L27 10"/></svg>`
  ];

  class GarnishManager {
    constructor(container) {
      this.container = container;
      this.currentMode = 'menu'; // 'menu' (2-6 visible) | 'game' (1-2 visible)
      this.activeCount = 0;
      this.timer = null;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    start() {
      if (this.isReducedMotion) return;
      this.spawnLoop();
    }

    setMode(mode) {
      this.currentMode = mode;
      // If entering game mode, gently trim excess active garnishes
      if (mode === 'game' && this.container) {
        const existing = this.container.children;
        while (existing.length > 2) {
          existing[0].remove();
          this.activeCount--;
        }
      }
    }

    spawnLoop() {
      const maxAllowed = this.currentMode === 'menu' ? 5 : 2;
      if (this.activeCount < maxAllowed) {
        this.spawnOne();
      }
      const nextDelay = this.currentMode === 'menu' 
        ? Math.floor(Math.random() * 3200) + 2200 
        : Math.floor(Math.random() * 6000) + 5000;

      this.timer = setTimeout(() => this.spawnLoop(), nextDelay);
    }

    spawnOne() {
      if (!this.container) return;
      const el = document.createElement('div');
      el.className = 'floating-garnish';

      const svgIdx = Math.floor(Math.random() * GARNISH_SVGS.length);
      el.innerHTML = GARNISH_SVGS[svgIdx];

      // Random horizontal start, duration, drift, rotation
      const leftPercent = Math.floor(Math.random() * 88) + 6;
      const durationSec = Math.floor(Math.random() * 10) + (this.currentMode === 'menu' ? 14 : 18);
      const rotEnd = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 160) + 90);

      el.style.left = `${leftPercent}%`;
      el.style.animationDuration = `${durationSec}s`;
      el.style.setProperty('--rot-end', `${rotEnd}deg`);

      this.container.appendChild(el);
      this.activeCount++;

      // Self cleanup when animation completes
      el.addEventListener('animationend', () => {
        el.remove();
        this.activeCount = Math.max(0, this.activeCount - 1);
      });
    }
  }

  // --- STATE SYSTEM ---
  const state = {
    currentScreen: 'menu', // 'menu' | 'game' | 'vault'
    releaseDay: 0,         // Evaluated relative to 8 Sep 2026 = Day 0
    activeDay: 0,
    activeTier: 'mini',    // 'mini' | 'midi' | 'main'
    activeDayData: null,
    activeGridData: null,
    cursor: { r: 0, c: 0 },
    direction: 'across',   // 'across' | 'down'
    userGrid: [],
    isSolved: false,
    timerSeconds: 0,
    timerInterval: null,
    storage: {
      version: 2,
      stats: {
        played: 0,
        solved: 0,
        streak: 0,
        bestStreak: 0,
        times: { mini: [], midi: [], main: [] }
      },
      solvedHistory: {} // key: `${dayId}_${tier}` => { solved: true, time: seconds, date: ISO }
    }
  };

  // --- DOM CACHE ---
  const DOM = {
    // Screens
    screenMenu: document.getElementById('screenMenu'),
    screenGame: document.getElementById('screenGame'),
    screenVault: document.getElementById('screenVault'),
    garnishLayer: document.getElementById('garnishLayer'),

    // Menu Screen Elements
    menuTodayDate: document.getElementById('menuTodayDate'),
    menuTodayDayLabel: document.getElementById('menuTodayDayLabel'),
    tierCarouselTrack: document.getElementById('tierCarouselTrack'),
    btnCarouselPrev: document.getElementById('btnCarouselPrev'),
    btnCarouselNext: document.getElementById('btnCarouselNext'),
    carouselDots: document.querySelectorAll('.carousel-dots .dot'),
    cardTitleMini: document.getElementById('cardTitleMini'),
    cardTitleMidi: document.getElementById('cardTitleMidi'),
    cardTitleMain: document.getElementById('cardTitleMain'),
    statusPillMini: document.getElementById('statusPillMini'),
    statusPillMidi: document.getElementById('statusPillMidi'),
    statusPillMain: document.getElementById('statusPillMain'),
    btnPlayMini: document.getElementById('btnPlayMini'),
    btnPlayMidi: document.getElementById('btnPlayMidi'),
    btnPlayMain: document.getElementById('btnPlayMain'),
    btnMenuVault: document.getElementById('btnMenuVault'),
    btnMenuStats: document.getElementById('btnMenuStats'),
    btnMenuHelp: document.getElementById('btnMenuHelp'),
    btnMenuSound: document.getElementById('btnMenuSound'),
    menuSoundOnIcon: document.getElementById('menuSoundOnIcon'),
    menuSoundOffIcon: document.getElementById('menuSoundOffIcon'),
    menuSoundLabel: document.getElementById('menuSoundLabel'),

    // Game Screen Elements
    btnBackToMenu: document.getElementById('btnBackToMenu'),
    gameDayLabel: document.getElementById('gameDayLabel'),
    gameThemeLabel: document.getElementById('gameThemeLabel'),
    timerDisplay: document.getElementById('timerDisplay'),
    timerText: document.getElementById('timerText'),
    btnGameSound: document.getElementById('btnGameSound'),
    gameSoundOnIcon: document.getElementById('gameSoundOnIcon'),
    gameSoundOffIcon: document.getElementById('gameSoundOffIcon'),
    btnGameHelp: document.getElementById('btnGameHelp'),
    gameTierPills: document.querySelectorAll('.game-tier-pill'),
    gameBadgeMiniDone: document.getElementById('gameBadgeMiniDone'),
    gameBadgeMidiDone: document.getElementById('gameBadgeMidiDone'),
    gameBadgeMainDone: document.getElementById('gameBadgeMainDone'),
    activeClueBar: document.getElementById('activeClueBar'),
    clueDirectionLabel: document.getElementById('clueDirectionLabel'),
    clueTextDisplay: document.getElementById('clueTextDisplay'),
    crosswordGrid: document.getElementById('crosswordGrid'),
    colAcross: document.getElementById('colAcross'),
    colDown: document.getElementById('colDown'),
    acrossCluesList: document.getElementById('acrossCluesList'),
    downCluesList: document.getElementById('downCluesList'),
    virtualKeyboard: document.getElementById('virtualKeyboard'),
    virtualKeys: document.querySelectorAll('.key-btn'),

    // Vault Screen Elements
    btnVaultBackToMenu: document.getElementById('btnVaultBackToMenu'),
    vaultListContainer: document.getElementById('vaultListContainer'),

    // Modals
    modalStats: document.getElementById('modalStats'),
    modalHelp: document.getElementById('modalHelp'),
    modalVictory: document.getElementById('modalVictory'),
    statPlayed: document.getElementById('statPlayed'),
    statCompleted: document.getElementById('statCompleted'),
    statStreak: document.getElementById('statStreak'),
    statBestStreak: document.getElementById('statBestStreak'),
    statTimeMini: document.getElementById('statTimeMini'),
    statTimeMidi: document.getElementById('statTimeMidi'),
    statTimeMain: document.getElementById('statTimeMain'),
    vicDescription: document.getElementById('vicDescription'),
    btnNextTierOrMenu: document.getElementById('btnNextTierOrMenu')
  };

  const garnishManager = new GarnishManager(DOM.garnishLayer);

  // --- DETERMINISTIC CALENDAR ENGINE (8 September 2026 = Day 0) ---
  function computeReleaseDay() {
    const now = new Date();
    // Midnight comparison in player's local timezone
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const anchorMidnight = new Date(ANCHOR_YEAR, ANCHOR_MONTH, ANCHOR_DATE).getTime();

    // 8 September 2026 = Day 0
    const diffDays = Math.floor((todayMidnight - anchorMidnight) / 86400000);
    return Math.max(0, diffDays);
  }

  function formatDateLabel(dayNum) {
    const d = new Date(ANCHOR_YEAR, ANCHOR_MONTH, ANCHOR_DATE);
    d.setDate(d.getDate() + dayNum);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // --- DETERMINISTIC PUZZLE PICKER ---
  function getPuzzleForDay(targetDay) {
    const catalog = window.COCKTAIL_CROSSWORD_PUZZLES;
    if (!catalog || !Array.isArray(catalog) || catalog.length === 0) {
      console.error('Crossword catalog unavailable.');
      return null;
    }
    // Stable wrap: Day 0 -> index 0, Day 1 -> index 1, etc.
    const index = targetDay % catalog.length;
    return catalog[index];
  }

  // --- LOCAL STORAGE MANAGER ---
  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.version === 2 || parsed.version === 1)) {
          state.storage = parsed;
          state.storage.version = 2;
        }
      }
    } catch (err) {
      console.warn('Storage parse fallback applied:', err);
    }
    syncSoundUI();
  }

  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storage));
    } catch (err) {
      console.warn('Storage write failed:', err);
    }
  }

  function syncSoundUI() {
    const isEn = audio.enabled;
    // Menu Sound
    DOM.menuSoundOnIcon.classList.toggle('hidden', !isEn);
    DOM.menuSoundOffIcon.classList.toggle('hidden', isEn);
    DOM.menuSoundLabel.textContent = isEn ? 'SOUND ON' : 'SOUND OFF';
    DOM.btnMenuSound.setAttribute('aria-pressed', isEn ? 'true' : 'false');

    // Game Sound
    DOM.gameSoundOnIcon.classList.toggle('hidden', !isEn);
    DOM.gameSoundOffIcon.classList.toggle('hidden', isEn);
  }

  // --- SCREEN NAVIGATION ---
  function showScreen(screenId) {
    state.currentScreen = screenId;
    DOM.screenMenu.classList.toggle('hidden', screenId !== 'menu');
    DOM.screenGame.classList.toggle('hidden', screenId !== 'game');
    DOM.screenVault.classList.toggle('hidden', screenId !== 'vault');

    garnishManager.setMode(screenId === 'menu' ? 'menu' : 'game');

    if (screenId === 'menu') {
      renderMenuTodayCard();
    } else if (screenId === 'vault') {
      renderVaultScreen();
    }
  }

  // --- TIMER LOGIC ---
  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      if (!state.isSolved) {
        state.timerSeconds++;
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
    const secs = String(state.timerSeconds % 60).padStart(2, '0');
    DOM.timerText.textContent = `${mins}:${secs}`;
  }

  function formatTime(totalSeconds) {
    if (!totalSeconds && totalSeconds !== 0) return '--:--';
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  // --- CROSSWORD MATRIX BUILDER ---
  function buildCrosswordMatrix(gridData) {
    const { size, solution, blocks } = gridData;
    const matrix = [];
    const blockSet = new Set((blocks || []).map(b => `${b[0]},${b[1]}`));

    let numberCounter = 1;
    const numbering = {}; // "r,c" => number

    for (let r = 0; r < size; r++) {
      matrix[r] = [];
      for (let c = 0; c < size; c++) {
        const isBlock = blockSet.has(`${r},${c}`);
        if (isBlock) {
          matrix[r][c] = { isBlock: true };
          continue;
        }

        const needsAcross = (c === 0 || blockSet.has(`${r},${c - 1}`)) && (c + 1 < size && !blockSet.has(`${r},${c + 1}`));
        const needsDown = (r === 0 || blockSet.has(`${r - 1},${c}`)) && (r + 1 < size && !blockSet.has(`${r + 1},${c}`));

        let num = null;
        if (needsAcross || needsDown) {
          num = numberCounter++;
          numbering[`${r},${c}`] = num;
        }

        matrix[r][c] = {
          isBlock: false,
          num: num,
          sol: solution[r][c].toUpperCase()
        };
      }
    }

    return { matrix, numbering };
  }

  // --- LOAD & RENDER GAME PUZZLE ---
  function loadPuzzle(dayNum, tier) {
    state.activeDay = dayNum;
    state.activeTier = tier;
    state.activeDayData = getPuzzleForDay(dayNum);

    if (!state.activeDayData || !state.activeDayData.tiers[tier]) {
      console.error('Requested puzzle tier missing from catalog.');
      return;
    }

    state.activeGridData = state.activeDayData.tiers[tier];
    const size = state.activeGridData.size;

    // Reset board state
    state.userGrid = Array.from({ length: size }, () => Array(size).fill(''));
    state.isSolved = false;
    state.timerSeconds = 0;
    updateTimerDisplay();

    // Check if previously solved
    const historyKey = `${state.activeDayData.id}_${tier}`;
    if (state.storage.solvedHistory[historyKey]) {
      state.isSolved = true;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          state.userGrid[r][c] = state.activeGridData.solution[r][c];
        }
      }
      state.timerSeconds = state.storage.solvedHistory[historyKey].time || 0;
      updateTimerDisplay();
    }

    // Set Game Header
    DOM.gameDayLabel.textContent = `DAY ${dayNum}`;
    DOM.gameThemeLabel.textContent = state.activeGridData.curriculumCategory || state.activeDayData.theme;

    // In-game tier tabs
    DOM.gameTierPills.forEach(pill => {
      const pTier = pill.getAttribute('data-tier');
      pill.classList.toggle('active', pTier === tier);
      pill.setAttribute('aria-selected', pTier === tier ? 'true' : 'false');
    });

    syncTierBadges();
    renderBoard();
    renderCluesShelf();
    placeCursorInitial();

    showScreen('game');
    if (!state.isSolved) startTimer();
  }

  function syncTierBadges() {
    if (!state.activeDayData) return;
    const dayId = state.activeDayData.id;
    DOM.gameBadgeMiniDone.classList.toggle('hidden', !state.storage.solvedHistory[`${dayId}_mini`]);
    DOM.gameBadgeMidiDone.classList.toggle('hidden', !state.storage.solvedHistory[`${dayId}_midi`]);
    DOM.gameBadgeMainDone.classList.toggle('hidden', !state.storage.solvedHistory[`${dayId}_main`]);
  }

  function isBlockCell(r, c) {
    if (r < 0 || c < 0 || r >= state.activeGridData.size || c >= state.activeGridData.size) return true;
    return (state.activeGridData.blocks || []).some(b => b[0] === r && b[1] === c);
  }

  function placeCursorInitial() {
    const size = state.activeGridData.size;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isBlockCell(r, c)) {
          state.cursor = { r, c };
          state.direction = 'across';
          updateSelectionHighlight();
          return;
        }
      }
    }
  }

  // --- RENDER CROSSWORD BOARD ---
  function renderBoard() {
    const size = state.activeGridData.size;
    const gridEl = DOM.crosswordGrid;
    gridEl.innerHTML = '';
    gridEl.className = `crossword-grid grid-${size}x${size}`;

    const { numbering } = buildCrosswordMatrix(state.activeGridData);

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;

        if (isBlockCell(r, c)) {
          cell.classList.add('cell-black');
          cell.setAttribute('aria-hidden', 'true');
        } else {
          const num = numbering[`${r},${c}`];
          if (num) {
            const numEl = document.createElement('span');
            numEl.className = 'cell-num';
            numEl.textContent = num;
            cell.appendChild(numEl);
          }

          const val = state.userGrid[r][c] || '';
          if (val) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'cell-letter';
            letterSpan.textContent = val;
            cell.appendChild(letterSpan);
          }

          cell.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            handleCellTap(r, c);
          });
        }
        gridEl.appendChild(cell);
      }
    }
    updateSelectionHighlight();
  }

  // --- RENDER CLUES SHELF (DESKTOP) ---
  function renderCluesShelf() {
    DOM.acrossCluesList.innerHTML = '';
    DOM.downCluesList.innerHTML = '';

    const clues = state.activeGridData.clues;

    (clues.across || []).forEach(item => {
      const li = document.createElement('li');
      li.className = 'clue-item brutal-tap';
      li.dataset.dir = 'across';
      li.dataset.num = item.num;
      li.innerHTML = `<strong>${item.num}</strong> ${item.clue}`;
      li.addEventListener('click', () => jumpToClue('across', item.num));
      DOM.acrossCluesList.appendChild(li);
    });

    (clues.down || []).forEach(item => {
      const li = document.createElement('li');
      li.className = 'clue-item brutal-tap';
      li.dataset.dir = 'down';
      li.dataset.num = item.num;
      li.innerHTML = `<strong>${item.num}</strong> ${item.clue}`;
      li.addEventListener('click', () => jumpToClue('down', item.num));
      DOM.downCluesList.appendChild(li);
    });
  }

  // --- SELECTION & INTERACTION ---
  function handleCellTap(r, c) {
    if (isBlockCell(r, c)) return;
    audio.playTap();

    if (state.cursor.r === r && state.cursor.c === c) {
      // Toggle direction on repeated tap of identical cell
      state.direction = state.direction === 'across' ? 'down' : 'across';
    } else {
      state.cursor = { r, c };
      if (!isWordValidInDirection(r, c, state.direction)) {
        state.direction = state.direction === 'across' ? 'down' : 'across';
      }
    }
    updateSelectionHighlight();
  }

  function isWordValidInDirection(r, c, dir) {
    const size = state.activeGridData.size;
    if (dir === 'across') {
      const leftFree = c > 0 && !isBlockCell(r, c - 1);
      const rightFree = c + 1 < size && !isBlockCell(r, c + 1);
      return leftFree || rightFree;
    } else {
      const topFree = r > 0 && !isBlockCell(r - 1, c);
      const botFree = r + 1 < size && !isBlockCell(r + 1, c);
      return topFree || botFree;
    }
  }

  function updateSelectionHighlight() {
    const { r, c } = state.cursor;
    const size = state.activeGridData.size;
    const cells = DOM.crosswordGrid.children;

    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove('cell-selected', 'highlight-word');
    }

    const span = getWordSpan(r, c, state.direction);

    span.forEach(pos => {
      const idx = pos.r * size + pos.c;
      if (cells[idx]) cells[idx].classList.add('highlight-word');
    });

    const activeIdx = r * size + c;
    if (cells[activeIdx]) cells[activeIdx].classList.add('cell-selected');

    updateClueBanner(span);
  }

  function getWordSpan(r, c, dir) {
    const span = [];
    const size = state.activeGridData.size;

    if (dir === 'across') {
      let startC = c;
      while (startC > 0 && !isBlockCell(r, startC - 1)) startC--;
      let endC = c;
      while (endC + 1 < size && !isBlockCell(r, endC + 1)) endC++;
      for (let cur = startC; cur <= endC; cur++) span.push({ r, c: cur });
    } else {
      let startR = r;
      while (startR > 0 && !isBlockCell(startR - 1, c)) startR--;
      let endR = r;
      while (endR + 1 < size && !isBlockCell(endR + 1, c)) endR++;
      for (let cur = startR; cur <= endR; cur++) span.push({ r: cur, c });
    }
    return span;
  }

  function updateClueBanner(span) {
    if (!span || span.length === 0) return;
    const rootPos = span[0];
    const { numbering } = buildCrosswordMatrix(state.activeGridData);
    const clueNum = numbering[`${rootPos.r},${rootPos.c}`];

    if (!clueNum) {
      DOM.clueDirectionLabel.textContent = '--';
      DOM.clueTextDisplay.textContent = 'Keep solving to complete the serve.';
      return;
    }

    const dirKey = state.direction === 'across' ? 'across' : 'down';
    const clueItem = (state.activeGridData.clues[dirKey] || []).find(item => item.num === clueNum);

    DOM.clueDirectionLabel.textContent = `${clueNum}${dirKey === 'across' ? 'A' : 'D'}`;
    DOM.clueTextDisplay.textContent = clueItem ? clueItem.clue : 'Clue detail missing.';

    // Synchronize desktop clue shelf
    document.querySelectorAll('.clue-item').forEach(el => {
      el.classList.toggle('active-clue-item', 
        el.dataset.dir === dirKey && Number(el.dataset.num) === clueNum
      );
    });
  }

  function jumpToClue(dir, num) {
    const { numbering } = buildCrosswordMatrix(state.activeGridData);
    for (const [key, value] of Object.entries(numbering)) {
      if (value === num) {
        const [r, c] = key.split(',').map(Number);
        state.cursor = { r, c };
        state.direction = dir;
        updateSelectionHighlight();
        audio.playTap();
        return;
      }
    }
  }

  // --- TYPING & INPUT HANDLING ---
  function handleInputLetter(letter) {
    if (state.isSolved) return;
    const char = letter.toUpperCase();
    if (!/^[A-Z]$/.test(char)) return;

    audio.playTap();
    const { r, c } = state.cursor;
    state.userGrid[r][c] = char;

    const size = state.activeGridData.size;
    const cellEl = DOM.crosswordGrid.children[r * size + c];
    let letterSpan = cellEl.querySelector('.cell-letter');
    if (!letterSpan) {
      letterSpan = document.createElement('span');
      letterSpan.className = 'cell-letter';
      cellEl.appendChild(letterSpan);
    }
    letterSpan.textContent = char;

    cellEl.classList.remove('pulse-fill');
    void cellEl.offsetWidth; // Reflow
    cellEl.classList.add('pulse-fill');

    advanceCursor(false);
    checkWinCondition();
  }

  function handleBackspace() {
    if (state.isSolved) return;
    audio.playTap();
    const { r, c } = state.cursor;
    const size = state.activeGridData.size;

    if (state.userGrid[r][c] !== '') {
      state.userGrid[r][c] = '';
      const cellEl = DOM.crosswordGrid.children[r * size + c];
      const letterSpan = cellEl.querySelector('.cell-letter');
      if (letterSpan) letterSpan.remove();
    } else {
      advanceCursor(true);
      const prevR = state.cursor.r;
      const prevC = state.cursor.c;
      state.userGrid[prevR][prevC] = '';
      const prevCellEl = DOM.crosswordGrid.children[prevR * size + prevC];
      const prevLetterSpan = prevCellEl.querySelector('.cell-letter');
      if (prevLetterSpan) prevLetterSpan.remove();
    }
    updateSelectionHighlight();
  }

  function advanceCursor(backwards = false) {
    const size = state.activeGridData.size;
    let { r, c } = state.cursor;

    for (let step = 0; step < size; step++) {
      if (state.direction === 'across') {
        c += backwards ? -1 : 1;
      } else {
        r += backwards ? -1 : 1;
      }

      if (r < 0 || c < 0 || r >= size || c >= size) break;
      if (!isBlockCell(r, c)) {
        state.cursor = { r, c };
        break;
      }
    }
    updateSelectionHighlight();
  }

  // --- WIN CONDITION EVALUATOR ---
  function checkWinCondition() {
    const size = state.activeGridData.size;
    const solution = state.activeGridData.solution;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isBlockCell(r, c)) {
          if (state.userGrid[r][c] !== solution[r][c].toUpperCase()) {
            return false;
          }
        }
      }
    }

    // Solved!
    state.isSolved = true;
    clearInterval(state.timerInterval);
    audio.playSuccess();

    const dayId = state.activeDayData.id;
    const tier = state.activeTier;
    const historyKey = `${dayId}_${tier}`;

    if (!state.storage.solvedHistory[historyKey]) {
      state.storage.solvedHistory[historyKey] = {
        solved: true,
        time: state.timerSeconds,
        date: new Date().toISOString()
      };

      state.storage.stats.played++;
      state.storage.stats.solved++;
      state.storage.stats.streak++;
      if (state.storage.stats.streak > state.storage.stats.bestStreak) {
        state.storage.stats.bestStreak = state.storage.stats.streak;
      }
      state.storage.stats.times[tier].push(state.timerSeconds);
      saveStorage();
    }

    syncTierBadges();
    showVictoryModal();
    return true;
  }

  function showVictoryModal() {
    const tierLabels = { mini: 'Mini (5×5)', midi: 'Midi (7×7)', main: 'Main (12×12)' };
    DOM.vicDescription.innerHTML = `Clean pour! You solved the <strong>${tierLabels[state.activeTier]}</strong> grid in <strong>${formatTime(state.timerSeconds)}</strong>.`;

    if (state.activeTier === 'mini') {
      DOM.btnNextTierOrMenu.textContent = 'POUR MIDI (7×7)';
      DOM.btnNextTierOrMenu.onclick = () => {
        closeModal(DOM.modalVictory);
        loadPuzzle(state.activeDay, 'midi');
      };
    } else if (state.activeTier === 'midi') {
      DOM.btnNextTierOrMenu.textContent = 'POUR MAIN (12×12)';
      DOM.btnNextTierOrMenu.onclick = () => {
        closeModal(DOM.modalVictory);
        loadPuzzle(state.activeDay, 'main');
      };
    } else {
      DOM.btnNextTierOrMenu.textContent = 'RETURN TO MENU';
      DOM.btnNextTierOrMenu.onclick = () => {
        closeModal(DOM.modalVictory);
        showScreen('menu');
      };
    }

    openModal(DOM.modalVictory);
  }

  // --- RENDER MAIN MENU TODAY CARD & CAROUSEL ---
  function renderMenuTodayCard() {
    state.releaseDay = computeReleaseDay();
    const todayPuzzle = getPuzzleForDay(state.releaseDay);
    if (!todayPuzzle) return;

    DOM.menuTodayDate.textContent = formatDateLabel(state.releaseDay).toUpperCase();
    DOM.menuTodayDayLabel.textContent = `DAY ${state.releaseDay}`;

    // Update Mini card
    const miniDone = !!state.storage.solvedHistory[`${todayPuzzle.id}_mini`];
    DOM.cardTitleMini.textContent = todayPuzzle.tiers.mini.curriculumCategory || todayPuzzle.theme;
    DOM.statusPillMini.textContent = miniDone ? 'SOLVED' : 'UNSOLVED';
    DOM.statusPillMini.className = `tier-status-pill ${miniDone ? 'status-solved' : ''}`;
    DOM.btnPlayMini.textContent = miniDone ? 'REVIEW MINI' : 'POUR MINI';

    // Update Midi card
    const midiDone = !!state.storage.solvedHistory[`${todayPuzzle.id}_midi`];
    DOM.cardTitleMidi.textContent = todayPuzzle.tiers.midi.curriculumCategory || todayPuzzle.theme;
    DOM.statusPillMidi.textContent = midiDone ? 'SOLVED' : 'UNSOLVED';
    DOM.statusPillMidi.className = `tier-status-pill ${midiDone ? 'status-solved' : ''}`;
    DOM.btnPlayMidi.textContent = midiDone ? 'REVIEW MIDI' : 'POUR MIDI';

    // Update Main card
    const mainDone = !!state.storage.solvedHistory[`${todayPuzzle.id}_main`];
    DOM.cardTitleMain.textContent = todayPuzzle.tiers.main.curriculumCategory || todayPuzzle.theme;
    DOM.statusPillMain.textContent = mainDone ? 'SOLVED' : 'UNSOLVED';
    DOM.statusPillMain.className = `tier-status-pill ${mainDone ? 'status-solved' : ''}`;
    DOM.btnPlayMain.textContent = mainDone ? 'REVIEW MAIN' : 'POUR MAIN';
  }

  // --- RENDER CELLAR VAULT SCREEN ---
  function renderVaultScreen() {
    DOM.vaultListContainer.innerHTML = '';
    state.releaseDay = computeReleaseDay();

    // The Vault contains ONLY previously released days (< state.releaseDay).
    // On Day 0 (8 Sep 2026), 0 days have been vaulted.
    if (state.releaseDay === 0) {
      const emptyNote = document.createElement('div');
      emptyNote.className = 'vault-empty-note';
      emptyNote.innerHTML = `
        <p><strong>The cellar is pristine.</strong></p>
        <p>Today is Day 0 of service. Yesterday's crosswords will be vaulted here starting tomorrow morning.</p>
      `;
      DOM.vaultListContainer.appendChild(emptyNote);
      return;
    }

    // Render historical releases from Day (releaseDay - 1) down to Day 0
    for (let day = state.releaseDay - 1; day >= 0; day--) {
      const puzzle = getPuzzleForDay(day);
      if (!puzzle) continue;

      const item = document.createElement('div');
      item.className = 'vault-item-card brutal-tap';

      const miniDone = !!state.storage.solvedHistory[`${puzzle.id}_mini`];
      const midiDone = !!state.storage.solvedHistory[`${puzzle.id}_midi`];
      const mainDone = !!state.storage.solvedHistory[`${puzzle.id}_main`];

      item.innerHTML = `
        <div class="vault-meta">
          <h4>DAY ${day}: ${puzzle.theme}</h4>
          <span class="vault-sub">${formatDateLabel(day)}</span>
        </div>
        <div class="vault-badges">
          <span class="vault-chip ${miniDone ? 'chip-solved' : ''}">Mini</span>
          <span class="vault-chip ${midiDone ? 'chip-solved' : ''}">Midi</span>
          <span class="vault-chip ${mainDone ? 'chip-solved' : ''}">Main</span>
        </div>
      `;

      item.addEventListener('click', () => {
        audio.playTap();
        loadPuzzle(day, 'mini');
      });

      DOM.vaultListContainer.appendChild(item);
    }
  }

  // --- STATS DOSSIER MODAL ---
  function openStats() {
    const s = state.storage.stats;
    DOM.statPlayed.textContent = s.played;
    DOM.statCompleted.textContent = s.solved;
    DOM.statStreak.textContent = s.streak;
    DOM.statBestStreak.textContent = s.bestStreak;

    const median = arr => {
      if (!arr || arr.length === 0) return '--:--';
      const sorted = [...arr].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return formatTime(sorted[mid]);
    };

    DOM.statTimeMini.textContent = median(s.times.mini);
    DOM.statTimeMidi.textContent = median(s.times.midi);
    DOM.statTimeMain.textContent = median(s.times.main);

    openModal(DOM.modalStats);
  }

  // --- MODAL UTILITIES ---
  function openModal(el) {
    el.classList.remove('hidden');
    audio.playTap();
  }

  function closeModal(el) {
    el.classList.add('hidden');
  }

  // --- BIND ALL EVENT LISTENERS ---
  function bindEvents() {
    // Menu -> Carousel Tier CTA Buttons
    DOM.btnPlayMini.addEventListener('click', () => {
      audio.playTap();
      loadPuzzle(state.releaseDay, 'mini');
    });

    DOM.btnPlayMidi.addEventListener('click', () => {
      audio.playTap();
      loadPuzzle(state.releaseDay, 'midi');
    });

    DOM.btnPlayMain.addEventListener('click', () => {
      audio.playTap();
      loadPuzzle(state.releaseDay, 'main');
    });

    // Carousel Navigation
    DOM.btnCarouselNext.addEventListener('click', () => {
      audio.playTap();
      DOM.tierCarouselTrack.scrollBy({ left: 240, behavior: 'smooth' });
    });

    DOM.btnCarouselPrev.addEventListener('click', () => {
      audio.playTap();
      DOM.tierCarouselTrack.scrollBy({ left: -240, behavior: 'smooth' });
    });

    DOM.tierCarouselTrack.addEventListener('scroll', () => {
      const scrollLeft = DOM.tierCarouselTrack.scrollLeft;
      const cardWidth = DOM.tierCarouselTrack.offsetWidth;
      const activeIdx = Math.round(scrollLeft / cardWidth);
      DOM.carouselDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    });

    // Menu Navigation
    DOM.btnMenuVault.addEventListener('click', () => {
      audio.playTap();
      showScreen('vault');
    });

    DOM.btnMenuStats.addEventListener('click', openStats);
    DOM.btnMenuHelp.addEventListener('click', () => openModal(DOM.modalHelp));

    DOM.btnMenuSound.addEventListener('click', () => {
      audio.toggle();
      syncSoundUI();
    });

    // Game Top Bar
    DOM.btnBackToMenu.addEventListener('click', () => {
      audio.playTap();
      clearInterval(state.timerInterval);
      showScreen('menu');
    });

    DOM.btnVaultBackToMenu.addEventListener('click', () => {
      audio.playTap();
      showScreen('menu');
    });

    DOM.btnGameSound.addEventListener('click', () => {
      audio.toggle();
      syncSoundUI();
    });

    DOM.btnGameHelp.addEventListener('click', () => openModal(DOM.modalHelp));

    // In-game Tier Switcher
    DOM.gameTierPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const tier = pill.getAttribute('data-tier');
        if (tier !== state.activeTier) {
          audio.playTap();
          loadPuzzle(state.activeDay, tier);
        }
      });
    });

    // Modal Close buttons
    document.querySelectorAll('.btn-close, [data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-close');
        if (targetId) closeModal(document.getElementById(targetId));
      });
    });

    // Virtual Keyboard Keys
    DOM.virtualKeys.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const key = btn.dataset.key;
        if (key === 'SWITCH') {
          audio.playTap();
          state.direction = state.direction === 'across' ? 'down' : 'across';
          updateSelectionHighlight();
        } else if (key === 'BACKSPACE') {
          handleBackspace();
        } else if (/^[A-Z]$/.test(key)) {
          handleInputLetter(key);
        }
      });
    });

    // Physical Hardware Keyboard
    window.addEventListener('keydown', (e) => {
      if (state.currentScreen !== 'game') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === ' ' || e.key === 'Tab') {
        e.preventDefault();
        audio.playTap();
        state.direction = state.direction === 'across' ? 'down' : 'across';
        updateSelectionHighlight();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        state.direction = 'across';
        advanceCursor(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        state.direction = 'across';
        advanceCursor(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        state.direction = 'down';
        advanceCursor(false);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        state.direction = 'down';
        advanceCursor(true);
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleInputLetter(e.key.toUpperCase());
      }
    });

    // Active Midnight Rollover Watcher (every 30s)
    setInterval(() => {
      const freshDay = computeReleaseDay();
      if (freshDay !== state.releaseDay) {
        state.releaseDay = freshDay;
        if (state.currentScreen === 'menu') {
          renderMenuTodayCard();
        } else if (state.currentScreen === 'vault') {
          renderVaultScreen();
        }
      }
    }, 30000);
  }

  // --- BOOTSTRAP ---
  function boot() {
    loadStorage();
    bindEvents();
    state.releaseDay = computeReleaseDay();
    garnishManager.start();
    showScreen('menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();