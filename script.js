/**
 * Universal Game Engine: Crossword
 * Enhanced with Luxury Dark Burnt-Orange Cocktail Lounge Presentation
 */

(() => {
  'use strict';

  // Config & Constants
  const CSV_DATA_PATH = './puzzles.csv';
  const STORAGE_KEY_NAMESPACE = 'crossword_game_universal_v1';

  // Universal Navigation Placeholder: To be provided by project owner
  const HOME_PAGE_URL = 'https://tileworksgamesstudio.github.io/86/';

  // Defensive Global State
  const state = {
    records: [],
    dates: [],
    todayDate: '',
    selectedDailyTier: 'mini',
    activeDate: '',
    activeTier: '',
    currentPuzzle: null,
    userGrid: [],
    cursor: { r: 0, c: 0 },
    direction: 'across',
    timerSeconds: 0,
    timerInterval: null,
    isSolved: false,
    saveData: {
      stats: {
        played: 0,
        solved: 0,
        streak: 0,
        bestStreak: 0,
        times: { mini: [], midi: [], main: [] }
      },
      inProgress: {},
      history: {}
    }
  };

  // DOM Elements
  const el = {
    screenMenu: document.getElementById('screen-menu'),
    screenGame: document.getElementById('screen-game'),
    screenVault: document.getElementById('screen-vault'),
    screenError: document.getElementById('screen-error'),
    errorMessage: document.getElementById('error-message'),
    btnRetryLoad: document.getElementById('btn-retry-load'),

    dailyDateLabel: document.getElementById('daily-date-label'),
    dailyTierSelector: document.getElementById('daily-tier-selector'),
    btnPlayDaily: document.getElementById('btn-play-daily'),
    btnOpenVault: document.getElementById('btn-open-vault'),
    btnNavHome: document.getElementById('btn-nav-home'),
    btnOpenStats: document.getElementById('btn-open-stats'),
    btnOpenHelp: document.getElementById('btn-open-help'),

    btnBackMenu: document.getElementById('btn-back-menu'),
    btnBackVault: document.getElementById('btn-back-vault'),
    gamePuzzleTitle: document.getElementById('game-puzzle-title'),
    gameTimer: document.getElementById('game-timer'),
    btnGameHelp: document.getElementById('btn-game-help'),
    gameTierTabs: document.getElementById('game-tier-tabs'),
    activeClueBadge: document.getElementById('active-clue-badge'),
    activeClueText: document.getElementById('active-clue-text'),
    crosswordBoard: document.getElementById('crossword-board'),
    cluesListAcross: document.getElementById('clues-list-across'),
    cluesListDown: document.getElementById('clues-list-down'),
    onscreenKeyboard: document.getElementById('onscreen-keyboard'),
    vaultList: document.getElementById('vault-list'),

    modalStats: document.getElementById('modal-stats'),
    modalHelp: document.getElementById('modal-help'),
    modalVictory: document.getElementById('modal-victory'),
    statPlayed: document.getElementById('stat-played'),
    statSolved: document.getElementById('stat-solved'),
    statStreak: document.getElementById('stat-streak'),
    statBest: document.getElementById('stat-best'),
    statsTierTimes: document.getElementById('stats-tier-times'),
    victorySummaryText: document.getElementById('victory-summary-text'),
    btnVictoryAction: document.getElementById('btn-victory-action'),

    garnishStage: document.getElementById('garnish-stage')
  };

  /* ==========================================================================
     PRESENTATIONAL AUDIO LAYER: SYNTHESIZED LUXURY COCKTAIL SOUNDS
     Safe Web Audio API Implementation (User gesture safe & silent failure)
     ========================================================================== */
  const soundSystem = {
    ctx: null,
    enabled: true,

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      } catch (e) {
        this.enabled = false;
      }
    },

    resume() {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    },

    play(name) {
      if (!this.enabled) return;
      try {
        this.resume();
        if (!this.ctx || this.ctx.state !== 'running') return;
        const now = this.ctx.currentTime;

        if (name === 'tick') {
          // Delicate high crystal tick
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(2600, now);
          osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
          gain.gain.setValueAtTime(0.018, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.045);
        } else if (name === 'tap') {
          // Soft muted glass tap
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(680, now);
          osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);
          gain.gain.setValueAtTime(0.035, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.065);
        } else if (name === 'direction') {
          // Subtle double harmonic shimmer
          [880, 1320].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.03);
            gain.gain.setValueAtTime(0.02, now + i * 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.03);
            osc.stop(now + 0.11);
          });
        } else if (name === 'victory') {
          // 3-tone crystal cocktail glass celebration chime
          const chord = [783.99, 987.77, 1318.51]; // G5, B5, E6
          chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const startTime = now + idx * 0.12;
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.05, startTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.85);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + 0.9);
          });
        }
      } catch (err) {
        // Fail silently to never interfere with application
      }
    }
  };

  /* ==========================================================================
     PRESENTATIONAL GARNISH LAYER: EXACTLY 12 COCKTAIL GARNISH ICONS
     ========================================================================== */
  const GARNISH_SVGS = [
    // 1. Orange twist
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 75C22 50 38 32 55 34C72 36 68 56 50 60C36 63 32 46 44 32C54 20 72 16 82 22" stroke="#d56a2d" stroke-width="7" stroke-linecap="round"/>
      <path d="M22 75C24 52 39 35 55 37C70 39 65 57 49 61" stroke="#f1d88a" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,

    // 2. Lemon twist
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 80C30 52 48 38 65 42C80 46 72 66 54 68C40 69 36 50 50 34C62 18 80 18 85 24" stroke="#f1d88a" stroke-width="6" stroke-linecap="round"/>
      <path d="M28 78C32 54 48 42 63 45" stroke="#fff4cc" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // 3. Lime wheel
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" stroke="#b88a3a" stroke-width="5"/>
      <circle cx="50" cy="50" r="36" stroke="#d56a2d" stroke-width="1.8" stroke-dasharray="2 3"/>
      <circle cx="50" cy="50" r="5" fill="#f1d88a"/>
      <path d="M50 14L50 86M14 50L86 50M24 24L76 76M24 76L76 24" stroke="#d56a2d" stroke-width="2"/>
    </svg>`,

    // 4. Lemon wheel
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" stroke="#f1d88a" stroke-width="5"/>
      <circle cx="50" cy="50" r="37" stroke="#d8b45a" stroke-width="2"/>
      <circle cx="50" cy="50" r="6" fill="#f1d88a"/>
      <path d="M50 13L50 87M13 50L87 50M24 24L76 76M24 76L76 24M18 36L82 64M18 64L82 36" stroke="#f1d88a" stroke-width="1.8"/>
    </svg>`,

    // 5. Dehydrated orange wheel
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="43" stroke="#8c441f" stroke-width="6"/>
      <circle cx="50" cy="50" r="36" fill="rgba(167,70,31,0.22)" stroke="#a7461f" stroke-width="2.5"/>
      <circle cx="50" cy="50" r="7" fill="#6e3113"/>
      <path d="M50 14L50 86M14 50L86 50M25 25L75 75M25 75L75 25" stroke="#783415" stroke-width="3"/>
    </svg>`,

    // 6. Dehydrated lemon wheel
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" stroke="#9e6d2b" stroke-width="5.5"/>
      <circle cx="50" cy="50" r="35" fill="rgba(184,138,58,0.2)" stroke="#b88a3a" stroke-width="2"/>
      <circle cx="50" cy="50" r="5" fill="#8c6426"/>
      <path d="M50 15L50 85M15 50L85 50M26 26L74 74M26 74L74 26" stroke="#8c6426" stroke-width="2.5"/>
    </svg>`,

    // 7. Cocktail cherry
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="64" r="24" fill="rgba(167,70,31,0.4)" stroke="#d56a2d" stroke-width="4"/>
      <path d="M48 42C47 24 58 14 74 12" stroke="#8c6426" stroke-width="4" stroke-linecap="round"/>
      <circle cx="41" cy="58" r="4" fill="#f1d88a"/>
    </svg>`,

    // 8. Maraschino cherry pair
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="68" r="19" fill="rgba(167,70,31,0.4)" stroke="#d56a2d" stroke-width="3.5"/>
      <circle cx="68" cy="66" r="19" fill="rgba(167,70,31,0.4)" stroke="#d56a2d" stroke-width="3.5"/>
      <path d="M34 50C36 30 45 16 52 14C59 16 66 30 68 48" stroke="#b88a3a" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="28" cy="63" r="3.5" fill="#f1d88a"/>
      <circle cx="62" cy="61" r="3.5" fill="#f1d88a"/>
    </svg>`,

    // 9. Mint sprig
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 85L50 24" stroke="#8c6426" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M50 24C40 10 60 10 50 24Z" fill="rgba(216,180,90,0.3)" stroke="#d8b45a" stroke-width="2.5"/>
      <path d="M50 42C30 32 30 48 50 48Z" fill="rgba(167,70,31,0.25)" stroke="#b88a3a" stroke-width="2.5"/>
      <path d="M50 42C70 32 70 48 50 48Z" fill="rgba(167,70,31,0.25)" stroke="#b88a3a" stroke-width="2.5"/>
      <path d="M50 62C26 50 26 70 50 70Z" fill="rgba(216,180,90,0.3)" stroke="#d8b45a" stroke-width="2.5"/>
      <path d="M50 62C74 50 74 70 50 70Z" fill="rgba(216,180,90,0.3)" stroke="#d8b45a" stroke-width="2.5"/>
    </svg>`,

    // 10. Rosemary sprig
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 90L50 14" stroke="#b88a3a" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 25L32 16M50 25L68 16" stroke="#d56a2d" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 40L28 30M50 40L72 30" stroke="#d56a2d" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 55L26 44M50 55L74 44" stroke="#f1d88a" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 70L28 60M50 70L72 60" stroke="#d56a2d" stroke-width="3" stroke-linecap="round"/>
    </svg>`,

    // 11. Green olive on cocktail pick
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="8" x2="50" y2="92" stroke="#f1d88a" stroke-width="3.5" stroke-linecap="round"/>
      <ellipse cx="50" cy="50" rx="20" ry="26" fill="rgba(140,100,38,0.3)" stroke="#b88a3a" stroke-width="4"/>
      <circle cx="50" cy="50" r="7" fill="#a7461f" stroke="#d56a2d" stroke-width="2"/>
    </svg>`,

    // 12. Cucumber ribbon
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 84C24 60 42 54 50 68C58 82 76 76 78 52C80 30 62 26 52 40C44 52 26 44 24 20" stroke="#b88a3a" stroke-width="6" stroke-linecap="round"/>
      <path d="M22 84C24 60 42 54 50 68C58 82 76 76 78 52C80 30 62 26 52 40" stroke="#f1d88a" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  ];

  function initGarnishAtmosphere() {
    if (!el.garnishStage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const maxActive = window.innerWidth < 768 ? 7 : 14;
    let activeCount = 0;

    function spawnGarnish() {
      if (activeCount >= maxActive) return;

      const garnish = document.createElement('div');
      garnish.className = 'floating-garnish';

      const iconIndex = Math.floor(Math.random() * GARNISH_SVGS.length);
      garnish.innerHTML = GARNISH_SVGS[iconIndex];

      // Randomised 3 depth levels
      const depthRand = Math.random();
      let depthClass = 'garnish-depth-middle';
      let duration = 16 + Math.random() * 10;
      let size = 36 + Math.random() * 16;
      let opacity = 0.35 + Math.random() * 0.25;

      if (depthRand < 0.35) {
        depthClass = 'garnish-depth-distant';
        duration = 24 + Math.random() * 12;
        size = 24 + Math.random() * 12;
        opacity = 0.16 + Math.random() * 0.15;
      } else if (depthRand > 0.8) {
        depthClass = 'garnish-depth-near';
        duration = 12 + Math.random() * 6;
        size = 48 + Math.random() * 20;
        opacity = 0.45 + Math.random() * 0.3;
      }

      garnish.classList.add(depthClass);
      garnish.style.width = `${size}px`;
      garnish.style.height = `${size}px`;
      garnish.style.opacity = opacity;

      const startLeft = Math.random() * 94; // 0% to 94%
      garnish.style.left = `${startLeft}vw`;

      const rotStart = Math.floor(Math.random() * 360);
      const rotEnd = rotStart + (Math.random() > 0.5 ? 1 : -1) * (90 + Math.random() * 180);
      const driftX = (Math.random() - 0.5) * 80;

      el.garnishStage.appendChild(garnish);
      activeCount++;

      const animation = garnish.animate([
        {
          transform: `translate3d(0, 0, 0) rotate(${rotStart}deg)`,
          opacity: 0
        },
        {
          offset: 0.15,
          opacity: opacity
        },
        {
          offset: 0.85,
          opacity: opacity
        },
        {
          transform: `translate3d(${driftX}px, -115vh, 0) rotate(${rotEnd}deg)`,
          opacity: 0
        }
      ], {
        duration: duration * 1000,
        easing: 'linear'
      });

      animation.onfinish = () => {
        garnish.remove();
        activeCount--;
      };
    }

    // Initial prime & continuous staggered intervals
    for (let i = 0; i < Math.floor(maxActive / 2); i++) {
      setTimeout(spawnGarnish, i * 800);
    }
    setInterval(spawnGarnish, 2400);
  }

  // Defensive CSV Parsing
  function parseCSV(text) {
    const rows = [];
    let row = [], cell = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      if (inQuotes) {
        if (char === '"' && nextChar === '"') { cell += '"'; i++; }
        else if (char === '"') { inQuotes = false; }
        else { cell += char; }
      } else {
        if (char === '"') { inQuotes = true; }
        else if (char === ',') { row.push(cell.trim()); cell = ''; }
        else if (char === '\n' || char === '\r') {
          if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
          row = []; cell = '';
          if (char === '\r' && nextChar === '\n') i++;
        } else { cell += char; }
      }
    }
    if (cell || row.length) { row.push(cell.trim()); rows.push(row); }
    if (!rows.length) return [];

    const headers = rows[0].map(h => h.toLowerCase());
    return rows.slice(1).map(cols => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = cols[idx] || ''; });
      return obj;
    });
  }

  // Defensive Storage Handlers
  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_NAMESPACE);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          state.saveData.stats = { ...state.saveData.stats, ...(parsed.stats || {}) };
          state.saveData.history = { ...(parsed.history || {}) };
          state.saveData.inProgress = { ...(parsed.inProgress || {}) };
        }
      }
    } catch (e) {
      console.warn('Storage unavailable or reset to default state.', e);
    }
  }

  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_NAMESPACE, JSON.stringify(state.saveData));
    } catch (e) {
      console.warn('Unable to persist to storage.', e);
    }
  }

  // Application Lifecycle
  async function init() {
    try {
      loadStorage();
      bindEvents();
      initGarnishAtmosphere();

      const res = await fetch(CSV_DATA_PATH, { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not ok');
      const text = await res.text();
      const records = parseCSV(text);

      state.records = records.filter(r => /^\d{4}-\d{2}-\d{2}$/.test(r.date) && r.grid);
      if (!state.records.length) throw new Error('No valid crossword records found.');

      const uniqueDates = [...new Set(state.records.map(r => r.date))].sort();
      state.dates = uniqueDates;

      // Calculate today's date in UTC/local ISO format
      const todayISO = new Date().toISOString().slice(0, 10);
      const availableDates = uniqueDates.filter(d => d <= todayISO);

      // Default active daily date to current or latest available released date
      state.todayDate = availableDates.length ? availableDates[availableDates.length - 1] : uniqueDates[0];

      renderMenu();
      showScreen('menu');
    } catch (err) {
      showError(err.message || 'Unable to load puzzle records.');
    }
  }

  function showError(msg) {
    el.errorMessage.textContent = msg;
    showScreen('error');
  }

  function showScreen(screen) {
    el.screenMenu.classList.toggle('hidden', screen !== 'menu');
    el.screenGame.classList.toggle('hidden', screen !== 'game');
    el.screenVault.classList.toggle('hidden', screen !== 'vault');
    el.screenError.classList.toggle('hidden', screen !== 'error');
  }

  // Screen: Main Menu
  function renderMenu() {
    el.dailyDateLabel.textContent = formatDate(state.todayDate);
    el.dailyTierSelector.innerHTML = '';

    const todayTiers = state.records.filter(r => r.date === state.todayDate);
    if (!todayTiers.length) return;

    if (!todayTiers.some(t => t.tier === state.selectedDailyTier)) {
      state.selectedDailyTier = todayTiers[0].tier;
    }

    todayTiers.forEach(item => {
      const isDone = !!state.saveData.history[`${state.todayDate}_${item.tier}`]?.solved;
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = `tier-pill ${item.tier === state.selectedDailyTier ? 'selected' : ''}`;
      pill.innerHTML = `${item.tier} ${isDone ? '&#x2713;' : ''}`;
      pill.addEventListener('click', () => {
        soundSystem.play('tick');
        state.selectedDailyTier = item.tier;
        renderMenu();
      });
      el.dailyTierSelector.appendChild(pill);
    });

    const isCurrentSolved = !!state.saveData.history[`${state.todayDate}_${state.selectedDailyTier}`]?.solved;
    el.btnPlayDaily.textContent = isCurrentSolved ? `Review Daily (${state.selectedDailyTier})` : `Play Daily (${state.selectedDailyTier})`;
  }

  // Screen: Vault (Historical Archive)
  function renderVault() {
    el.vaultList.innerHTML = '';
    // Puzzles prior to current Daily Puzzle date (excluding today's puzzle)
    const historicalDates = state.dates.filter(d => d < state.todayDate).reverse();

    if (!historicalDates.length) {
      el.vaultList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 30px;">No historical puzzles in the vault yet.</p>';
      return;
    }

    historicalDates.forEach(date => {
      const dayTiers = state.records.filter(r => r.date === date);
      const card = document.createElement('article');
      card.className = 'vault-card';

      const badges = dayTiers.map(t => {
        const done = !!state.saveData.history[`${date}_${t.tier}`]?.solved;
        return `<span class="vault-badge ${done ? 'completed' : ''}">${t.tier}${done ? ' &#x2713;' : ''}</span>`;
      }).join('');

      card.innerHTML = `
        <span class="vault-date">${formatDate(date)}</span>
        <div class="vault-badges">${badges}</div>
      `;

      card.addEventListener('click', () => {
        soundSystem.play('tap');
        loadPuzzle(date, dayTiers[0].tier);
      });

      el.vaultList.appendChild(card);
    });
  }

  // Grid & Clues Parser
  function parsePuzzleModel(record) {
    const rawLines = record.grid.split(/[\/\r\n]+/).map(s => s.trim()).filter(Boolean);
    const size = rawLines.length;
    const solution = [];
    const blocks = new Set();

    for (let r = 0; r < size; r++) {
      solution[r] = [];
      for (let c = 0; c < size; c++) {
        const char = (rawLines[r][c] || '#').toUpperCase();
        if (char === '#') blocks.add(`${r},${c}`);
        solution[r][c] = char;
      }
    }

    let counter = 1;
    const numbering = {};
    const wordsAcross = [];
    const wordsDown = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (blocks.has(`${r},${c}`)) continue;
        const needsAcross = (c === 0 || blocks.has(`${r},${c - 1}`)) && (c + 1 < size && !blocks.has(`${r},${c + 1}`));
        const needsDown = (r === 0 || blocks.has(`${r - 1},${c}`)) && (r + 1 < size && !blocks.has(`${r + 1},${c}`));

        if (needsAcross || needsDown) {
          numbering[`${r},${c}`] = counter;
          if (needsAcross) wordsAcross.push(counter);
          if (needsDown) wordsDown.push(counter);
          counter++;
        }
      }
    }

    const parseClueList = (str, wordNums) => {
      if (!str) return [];
      const lines = str.split(/\r?\n|\|/).map(s => s.trim()).filter(Boolean);
      return lines.map((line, idx) => {
        const match = line.match(/^(\d+)[\.\:\-]?\s*(.+)$/);
        if (match) return { num: parseInt(match[1], 10), clue: match[2].trim() };
        return { num: wordNums[idx] || (idx + 1), clue: line };
      });
    };

    return {
      size,
      solution,
      blocks,
      numbering,
      clues: {
        across: parseClueList(record.clues_across, wordsAcross),
        down: parseClueList(record.clues_down, wordsDown)
      },
      title: record.title || '',
      date: record.date,
      tier: record.tier
    };
  }

  // Load and Setup Individual Puzzle
  function loadPuzzle(date, tier) {
    const record = state.records.find(r => r.date === date && r.tier === tier);
    if (!record) return;

    state.activeDate = date;
    state.activeTier = tier;
    state.currentPuzzle = parsePuzzleModel(record);

    const size = state.currentPuzzle.size;
    state.userGrid = Array.from({ length: size }, () => Array(size).fill(''));
    state.isSolved = false;
    state.timerSeconds = 0;

    const puzzleKey = `${date}_${tier}`;
    const savedSolved = state.saveData.history[puzzleKey];
    const savedInProgress = state.saveData.inProgress[puzzleKey];

    if (savedSolved?.solved) {
      state.isSolved = true;
      state.timerSeconds = savedSolved.time || 0;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          state.userGrid[r][c] = state.currentPuzzle.solution[r][c];
        }
      }
    } else if (savedInProgress) {
      state.timerSeconds = savedInProgress.time || 0;
      if (Array.isArray(savedInProgress.grid)) {
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            state.userGrid[r][c] = savedInProgress.grid[r]?.[c] || '';
          }
        }
      }
    }

    renderGameHeader();
    renderBoard();
    renderClues();
    resetCursor();

    showScreen('game');
    updateTimerDisplay();

    clearInterval(state.timerInterval);
    if (!state.isSolved) {
      state.timerInterval = setInterval(() => {
        state.timerSeconds++;
        updateTimerDisplay();
        persistInProgressState();
      }, 1000);
    }
  }

  function renderGameHeader() {
    // Puzzle title exclusively in the header
    const tierDisplay = state.activeTier ? state.activeTier.toUpperCase() : '';
    el.gamePuzzleTitle.textContent = `${formatDate(state.activeDate)} · ${tierDisplay}`;

    el.gameTierTabs.innerHTML = '';
    const dayTiers = state.records.filter(r => r.date === state.activeDate);
    dayTiers.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tab-pill ${t.tier === state.activeTier ? 'active' : ''}`;
      const isDone = !!state.saveData.history[`${state.activeDate}_${t.tier}`]?.solved;
      btn.innerHTML = `${t.tier} ${isDone ? '&#x2713;' : ''}`;
      btn.addEventListener('click', () => {
        soundSystem.play('tick');
        loadPuzzle(state.activeDate, t.tier);
      });
      el.gameTierTabs.appendChild(btn);
    });
  }

  function isBlock(r, c) {
    const p = state.currentPuzzle;
    if (r < 0 || c < 0 || r >= p.size || c >= p.size) return true;
    return p.blocks.has(`${r},${c}`);
  }

  function renderBoard() {
    const size = state.currentPuzzle.size;
    const grid = el.crosswordBoard;
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.setAttribute('role', 'gridcell');

        if (isBlock(r, c)) {
          cell.classList.add('cell-black');
          cell.setAttribute('aria-hidden', 'true');
        } else {
          const num = state.currentPuzzle.numbering[`${r},${c}`];
          if (num) {
            const numEl = document.createElement('span');
            numEl.className = 'cell-num';
            numEl.textContent = num;
            cell.appendChild(numEl);
          }
          const letter = state.userGrid[r][c];
          if (letter) {
            const letterEl = document.createElement('span');
            letterEl.className = 'cell-letter';
            letterEl.textContent = letter;
            cell.appendChild(letterEl);
          }
          cell.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            soundSystem.play('tick');
            handleCellTap(r, c);
          });
        }
        grid.appendChild(cell);
      }
    }
  }

  function renderClues() {
    el.cluesListAcross.innerHTML = '';
    el.cluesListDown.innerHTML = '';

    const createClueNode = (item, dir) => {
      const li = document.createElement('li');
      li.className = 'clue-item';
      li.dataset.dir = dir;
      li.dataset.num = item.num;
      li.innerHTML = `<strong>${item.num}.</strong> ${item.clue}`;
      li.addEventListener('click', () => {
        soundSystem.play('tick');
        jumpToWord(item.num, dir);
      });
      return li;
    };

    state.currentPuzzle.clues.across.forEach(c => el.cluesListAcross.appendChild(createClueNode(c, 'across')));
    state.currentPuzzle.clues.down.forEach(c => el.cluesListDown.appendChild(createClueNode(c, 'down')));
  }

  function handleCellTap(r, c) {
    if (isBlock(r, c)) return;
    if (state.cursor.r === r && state.cursor.c === c) {
      state.direction = state.direction === 'across' ? 'down' : 'across';
    } else {
      state.cursor = { r, c };
      if (!isValidDirection(r, c, state.direction)) {
        state.direction = state.direction === 'across' ? 'down' : 'across';
      }
    }
    updateSelection();
  }

  function isValidDirection(r, c, dir) {
    const size = state.currentPuzzle.size;
    if (dir === 'across') return (c > 0 && !isBlock(r, c - 1)) || (c + 1 < size && !isBlock(r, c + 1));
    return (r > 0 && !isBlock(r - 1, c)) || (r + 1 < size && !isBlock(r + 1, c));
  }

  function resetCursor() {
    const size = state.currentPuzzle.size;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isBlock(r, c)) {
          state.cursor = { r, c };
          state.direction = 'across';
          updateSelection();
          return;
        }
      }
    }
  }

  function getWordSpan(r, c, dir) {
    const span = [];
    const size = state.currentPuzzle.size;
    if (dir === 'across') {
      let sc = c; while (sc > 0 && !isBlock(r, sc - 1)) sc--;
      let ec = c; while (ec + 1 < size && !isBlock(r, ec + 1)) ec++;
      for (let cur = sc; cur <= ec; cur++) span.push({ r, c: cur });
    } else {
      let sr = r; while (sr > 0 && !isBlock(sr - 1, c)) sr--;
      let er = r; while (er + 1 < size && !isBlock(er + 1, c)) er++;
      for (let cur = sr; cur <= er; cur++) span.push({ r: cur, c });
    }
    return span;
  }

  function updateSelection() {
    const { r, c } = state.cursor;
    const size = state.currentPuzzle.size;
    const cells = el.crosswordBoard.children;

    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove('cell-active', 'cell-word');
      cells[i].removeAttribute('aria-selected');
    }

    const span = getWordSpan(r, c, state.direction);
    span.forEach(pos => {
      const idx = pos.r * size + pos.c;
      if (cells[idx]) cells[idx].classList.add('cell-word');
    });

    const activeIdx = r * size + c;
    if (cells[activeIdx]) {
      cells[activeIdx].classList.add('cell-active');
      cells[activeIdx].setAttribute('aria-selected', 'true');
    }

    if (!span.length) return;
    const root = span[0];
    const num = state.currentPuzzle.numbering[`${root.r},${root.c}`];
    const clueObj = state.currentPuzzle.clues[state.direction].find(i => i.num === num);

    el.activeClueBadge.textContent = num ? `${num}${state.direction === 'across' ? 'A' : 'D'}` : '--';
    el.activeClueText.textContent = clueObj ? clueObj.clue : 'Select a cell.';

    document.querySelectorAll('.clue-item').forEach(item => {
      const matches = item.dataset.dir === state.direction && Number(item.dataset.num) === num;
      item.classList.toggle('active', matches);
      if (matches) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  function jumpToWord(num, dir) {
    for (const [coord, wordNum] of Object.entries(state.currentPuzzle.numbering)) {
      if (wordNum === num) {
        const [r, c] = coord.split(',').map(Number);
        state.cursor = { r, c };
        state.direction = dir;
        updateSelection();
        return;
      }
    }
  }

  function handleInput(char) {
    if (state.isSolved) return;
    char = char.toUpperCase();
    if (!/^[A-Z]$/.test(char)) return;

    soundSystem.play('tap');

    const { r, c } = state.cursor;
    state.userGrid[r][c] = char;

    const size = state.currentPuzzle.size;
    const cellEl = el.crosswordBoard.children[r * size + c];
    let letterSpan = cellEl.querySelector('.cell-letter');
    if (!letterSpan) {
      letterSpan = document.createElement('span');
      letterSpan.className = 'cell-letter';
      cellEl.appendChild(letterSpan);
    }
    letterSpan.textContent = char;

    persistInProgressState();
    advanceCursor(false);
    checkWin();
  }

  function handleBackspace() {
    if (state.isSolved) return;
    soundSystem.play('tap');
    const { r, c } = state.cursor;
    const size = state.currentPuzzle.size;

    if (state.userGrid[r][c]) {
      state.userGrid[r][c] = '';
      const letterSpan = el.crosswordBoard.children[r * size + c].querySelector('.cell-letter');
      if (letterSpan) letterSpan.remove();
    } else {
      advanceCursor(true);
      const pr = state.cursor.r;
      const pc = state.cursor.c;
      state.userGrid[pr][pc] = '';
      const pSpan = el.crosswordBoard.children[pr * size + pc].querySelector('.cell-letter');
      if (pSpan) pSpan.remove();
    }
    persistInProgressState();
    updateSelection();
  }

  function advanceCursor(backwards) {
    const size = state.currentPuzzle.size;
    let { r, c } = state.cursor;
    for (let step = 0; step < size; step++) {
      if (state.direction === 'across') c += backwards ? -1 : 1;
      else r += backwards ? -1 : 1;
      if (r < 0 || c < 0 || r >= size || c >= size) break;
      if (!isBlock(r, c)) {
        state.cursor = { r, c };
        break;
      }
    }
    updateSelection();
  }

  function persistInProgressState() {
    if (state.isSolved) return;
    const key = `${state.activeDate}_${state.activeTier}`;
    state.saveData.inProgress[key] = {
      grid: state.userGrid,
      time: state.timerSeconds
    };
    saveStorage();
  }

  function checkWin() {
    const size = state.currentPuzzle.size;
    const sol = state.currentPuzzle.solution;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isBlock(r, c) && state.userGrid[r][c] !== sol[r][c]) return false;
      }
    }

    state.isSolved = true;
    clearInterval(state.timerInterval);

    const histKey = `${state.activeDate}_${state.activeTier}`;
    delete state.saveData.inProgress[histKey];

    if (!state.saveData.history[histKey]) {
      state.saveData.history[histKey] = { solved: true, time: state.timerSeconds };
      state.saveData.stats.played++;
      state.saveData.stats.solved++;
      state.saveData.stats.streak++;
      if (state.saveData.stats.streak > state.saveData.stats.bestStreak) {
        state.saveData.stats.bestStreak = state.saveData.stats.streak;
      }
      if (!state.saveData.stats.times[state.activeTier]) state.saveData.stats.times[state.activeTier] = [];
      state.saveData.stats.times[state.activeTier].push(state.timerSeconds);
      saveStorage();
    }

    soundSystem.play('victory');
    renderGameHeader();
    showVictoryModal();
    return true;
  }

  function showVictoryModal() {
    el.victorySummaryText.textContent = `You solved the ${state.activeTier.toUpperCase()} in ${formatTime(state.timerSeconds)}!`;

    const dayTiers = state.records.filter(r => r.date === state.activeDate);
    const currIdx = dayTiers.findIndex(t => t.tier === state.activeTier);
    const nextTier = dayTiers[currIdx + 1];

    if (nextTier) {
      el.btnVictoryAction.textContent = `Play ${nextTier.tier.toUpperCase()}`;
      el.btnVictoryAction.onclick = () => {
        soundSystem.play('tap');
        closeModal(el.modalVictory);
        loadPuzzle(state.activeDate, nextTier.tier);
      };
    } else {
      el.btnVictoryAction.textContent = 'Back to Menu';
      el.btnVictoryAction.onclick = () => {
        soundSystem.play('tap');
        closeModal(el.modalVictory);
        showScreen('menu');
        renderMenu();
      };
    }
    openModal(el.modalVictory);
  }

  function openStatsModal() {
    soundSystem.play('tap');
    const s = state.saveData.stats;
    el.statPlayed.textContent = s.played;
    el.statSolved.textContent = s.solved;
    el.statStreak.textContent = s.streak;
    el.statBest.textContent = s.bestStreak;

    el.statsTierTimes.innerHTML = '';
    ['mini', 'midi', 'main'].forEach(tier => {
      const times = s.times[tier] || [];
      const med = times.length ? formatTime([...times].sort((a, b) => a - b)[Math.floor(times.length / 2)]) : '--:--';
      const li = document.createElement('li');
      li.innerHTML = `<span>${tier}</span><strong>${med}</strong>`;
      el.statsTierTimes.appendChild(li);
    });
    openModal(el.modalStats);
  }

  function openModal(m) { m.classList.remove('hidden'); }
  function closeModal(m) { m.classList.add('hidden'); }

  function updateTimerDisplay() {
    el.gameTimer.textContent = formatTime(state.timerSeconds);
  }

  function formatTime(secs) {
    if (secs == null) return '--:--';
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function formatDate(isoStr) {
    if (!isoStr) return '';
    const [y, m, d] = isoStr.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  }

  function bindEvents() {
    // 1. Play Daily
    el.btnPlayDaily.addEventListener('click', () => {
      soundSystem.play('tap');
      loadPuzzle(state.todayDate, state.selectedDailyTier);
    });

    // 2. Open Vault
    el.btnOpenVault.addEventListener('click', () => {
      soundSystem.play('tap');
      renderVault();
      showScreen('vault');
    });

    // 3. Return Home (Dedicated external navigation handler)
    el.btnNavHome.addEventListener('click', (e) => {
      e.preventDefault();
      soundSystem.play('tap');
      if (HOME_PAGE_URL && HOME_PAGE_URL !== '#') {
        window.location.href = HOME_PAGE_URL;
      } else {
        console.info('Universal Navigation: HOME clicked. Placeholder: ' + HOME_PAGE_URL);
      }
    });

    // Back to Menu from Game Screen
    el.btnBackMenu.addEventListener('click', () => {
      soundSystem.play('tap');
      clearInterval(state.timerInterval);
      showScreen('menu');
      renderMenu();
    });

    // Back to Menu from Vault
    el.btnBackVault.addEventListener('click', () => {
      soundSystem.play('tap');
      showScreen('menu');
      renderMenu();
    });

    // Modals & Retry
    el.btnOpenStats.addEventListener('click', openStatsModal);
    el.btnOpenHelp.addEventListener('click', () => {
      soundSystem.play('tap');
      openModal(el.modalHelp);
    });
    el.btnGameHelp.addEventListener('click', () => {
      soundSystem.play('tap');
      openModal(el.modalHelp);
    });
    el.btnRetryLoad.addEventListener('click', () => {
      soundSystem.play('tap');
      init();
    });

    document.querySelectorAll('[data-close]').forEach(b => {
      b.addEventListener('click', () => {
        soundSystem.play('tap');
        closeModal(document.getElementById(b.dataset.close));
      });
    });

    // Tactile On-Screen Virtual Keyboard
    el.onscreenKeyboard.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      e.preventDefault();
      const key = btn.dataset.key;
      if (key === 'DIR') {
        soundSystem.play('direction');
        state.direction = state.direction === 'across' ? 'down' : 'across';
        updateSelection();
      } else if (key === 'BACKSPACE') {
        handleBackspace();
      } else if (key) {
        handleInput(key);
      }
    });

    // Physical Hardware Keyboard Support
    window.addEventListener('keydown', (e) => {
      if (el.screenGame.classList.contains('hidden')) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === ' ' || e.key === 'Tab') {
        e.preventDefault();
        soundSystem.play('direction');
        state.direction = state.direction === 'across' ? 'down' : 'across';
        updateSelection();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        soundSystem.play('tick');
        state.direction = 'across';
        advanceCursor(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        soundSystem.play('tick');
        state.direction = 'across';
        advanceCursor(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundSystem.play('tick');
        state.direction = 'down';
        advanceCursor(false);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundSystem.play('tick');
        state.direction = 'down';
        advanceCursor(true);
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleInput(e.key);
      }
    });
  }

  // Self-initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();