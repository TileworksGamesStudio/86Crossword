(() => {
  'use strict';

  const CONFIG = {
    csvPath: './puzzles.csv',
    releaseTimeZone: 'Europe/London'
  };

  const STORAGE_KEY = 'cocktail_crossword_v4';
  const SOUND_KEY = 'cocktail_crossword_sound';

  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem(SOUND_KEY) !== 'false';
    }
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
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
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
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

  const GARNISH_SVGS = [
    `<svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 34C10 24 16 26 22 20C28 14 26 8 34 6"/><path d="M8 36C12 26 18 28 24 22C30 16 28 10 36 8"/></svg>`,
    `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="20" r="17"/><circle cx="20" cy="20" r="13" stroke-dasharray="2 2"/><circle cx="20" cy="20" r="2.5" fill="currentColor"/><line x1="20" y1="7" x2="20" y2="33"/><line x1="7" y1="20" x2="33" y2="20"/><line x1="10.8" y1="10.8" x2="29.2" y2="29.2"/><line x1="29.2" y1="10.8" x2="10.8" y2="29.2"/></svg>`,
    `<svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 36V12"/><path d="M20 12C12 8 8 16 20 24"/><path d="M20 12C28 8 32 16 20 24"/><path d="M20 22C14 20 10 25 20 30"/><path d="M20 22C26 20 30 25 20 30"/><path d="M20 12C17 6 23 6 20 4"/></svg>`,
    `<svg width="34" height="42" viewBox="0 0 34 42" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="17" y1="2" x2="17" y2="40"/><ellipse cx="17" cy="20" rx="9" ry="12"/><circle cx="17" cy="18" r="3.5" fill="currentColor" fill-opacity="0.35"/></svg>`,
    `<svg width="38" height="38" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="13" cy="27" r="7"/><circle cx="27" cy="25" r="7"/><path d="M13 20C13 12 20 6 25 4"/><path d="M27 18C25 12 24 8 25 4"/><path d="M25 4C28 6 30 5 32 4"/></svg>`,
    `<svg width="36" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="20" y1="36" x2="20" y2="6"/><path d="M20 30L12 26M20 28L28 24M20 22L11 19M20 20L29 17M20 14L13 12M20 12L27 10"/></svg>`
  ];

  class GarnishManager {
    constructor(container) {
      this.container = container;
      this.currentMode = 'menu';
      this.activeCount = 0;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    start() { if (!this.isReducedMotion) this.spawnLoop(); }
    setMode(mode) {
      this.currentMode = mode;
      if (mode === 'game' && this.container) {
        while (this.container.children.length > 2) {
          this.container.children[0].remove();
          this.activeCount--;
        }
      }
    }
    spawnLoop() {
      const max = this.currentMode === 'menu' ? 5 : 2;
      if (this.activeCount < max) this.spawnOne();
      const delay = this.currentMode === 'menu' ? Math.floor(Math.random() * 3200) + 2200 : Math.floor(Math.random() * 6000) + 5000;
      setTimeout(() => this.spawnLoop(), delay);
    }
    spawnOne() {
      if (!this.container) return;
      const el = document.createElement('div');
      el.className = 'floating-garnish';
      el.style.color = 'var(--gold-sheen-2)';
      el.innerHTML = GARNISH_SVGS[Math.floor(Math.random() * GARNISH_SVGS.length)];
      el.style.left = `${Math.floor(Math.random() * 88) + 6}%`;
      el.style.animationDuration = `${Math.floor(Math.random() * 10) + (this.currentMode === 'menu' ? 14 : 18)}s`;
      el.style.setProperty('--rot-end', `${(Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 160) + 90)}deg`);
      this.container.appendChild(el);
      this.activeCount++;
      el.addEventListener('animationend', () => { el.remove(); this.activeCount = Math.max(0, this.activeCount - 1); });
    }
  }

  const APP = {
    currentScreen: 'menu',
    ukDate: null,
    currentRelease: null,
    vaultReleases: [],
    activeRelease: null,
    activeTier: 'mini',
    cursor: { r: 0, c: 0 },
    direction: 'across',
    userGrid: [],
    isSolved: false,
    timerSeconds: 0,
    timerInterval: null,
    storage: {
      stats: { played: 0, solved: 0, streak: 0, bestStreak: 0, times: { mini: [], midi: [], main: [] } },
      history: {}
    }
  };

  const DOM = {
    mainViewport: document.getElementById('mainViewport'),
    screenError: document.getElementById('screenError'),
    errorTitle: document.getElementById('errorTitle'),
    errorMsg: document.getElementById('errorMsg'),
    btnRetry: document.getElementById('btnRetry'),
    
    screenMenu: document.getElementById('screenMenu'),
    screenGame: document.getElementById('screenGame'),
    screenVault: document.getElementById('screenVault'),
    garnishLayer: document.getElementById('garnishLayer'),

    todayHeading: document.getElementById('todayHeading'),
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

    btnBackToMenu: document.getElementById('btnBackToMenu'),
    gameDayLabel: document.getElementById('gameDayLabel'),
    timerText: document.getElementById('timerText'),
    btnGameSound: document.getElementById('btnGameSound'),
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
    virtualKeys: document.querySelectorAll('.key-btn'),

    btnVaultBackToMenu: document.getElementById('btnVaultBackToMenu'),
    vaultListContainer: document.getElementById('vaultListContainer'),

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

  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) APP.storage = JSON.parse(raw);
    } catch (e) { console.warn('Storage read fallback:', e); }
    syncSoundUI();
  }
  function saveStorage() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(APP.storage)); } catch (e) {}
  }
  function syncSoundUI() {
    const txt = audio.enabled ? 'Sound On' : 'Sound Off';
    DOM.btnMenuSound.textContent = txt;
    DOM.btnGameSound.textContent = txt;
  }

  function parseCSV(text) {
    const rows = [];
    let cur = [], val = '', inQuote = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], nc = text[i + 1];
      if (inQuote) {
        if (c === '"' && nc === '"') { val += '"'; i++; }
        else if (c === '"') { inQuote = false; }
        else { val += c; }
      } else {
        if (c === '"') { inQuote = true; }
        else if (c === ',') { cur.push(val); val = ''; }
        else if (c === '\n' || c === '\r') {
          if (val || cur.length) { cur.push(val); rows.push(cur); }
          cur = []; val = '';
          if (c === '\r' && nc === '\n') i++;
        }
        else { val += c; }
      }
    }
    if (val || cur.length) { cur.push(val); rows.push(cur); }
    if (rows.length === 0) throw new Error('Empty CSV');
    
    const headers = rows[0].map(h => h.trim());
    if (headers[0] !== 'release_date') throw new Error('First column must be release_date');
    
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].length !== headers.length) continue;
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = rows[i][idx].trim(); });
      data.push(obj);
    }
    return data;
  }

  async function getUKDate() {
    const url = window.location.href.split('#')[0] + (window.location.href.includes('?') ? '&' : '?') + 'cb=' + Date.now();
    const res = await fetch(url, { method: 'GET', cache: 'no-store' });
    const dateHeader = res.headers.get('Date');
    if (!dateHeader) throw new Error('Missing HTTP Date header');
    
    const authInstant = new Date(dateHeader);
    if (isNaN(authInstant.getTime())) throw new Error('Invalid HTTP Date header');
    
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: CONFIG.releaseTimeZone,
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
    return formatter.format(authInstant);
  }

  async function bootApplication() {
    try {
      showErrorState(false);
      
      const [csvRes, ukDate] = await Promise.all([
        fetch(CONFIG.csvPath, { cache: 'no-store' }).then(r => {
          if (!r.ok) throw new Error('CSV Fetch Failed');
          return r.text();
        }),
        getUKDate()
      ]);

      const allRows = parseCSV(csvRes);
      APP.ukDate = ukDate;
      APP.currentRelease = null;
      APP.vaultReleases = [];

      allRows.forEach(row => {
        const d = row.release_date;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return;
        if (d < APP.ukDate) {
          APP.vaultReleases.push(row);
        } else if (d === APP.ukDate) {
          if (APP.currentRelease) throw new Error('Duplicate current release date');
          APP.currentRelease = row;
        }
      });

      APP.vaultReleases.sort((a, b) => b.release_date.localeCompare(a.release_date));

      if (!APP.currentRelease) {
        showError('Unavailable', 'Today\'s puzzle is not available.');
        return;
      }

      loadStorage();
      bindEvents();
      garnishManager.start();
      
      renderMenu();
      showScreen('menu');

    } catch (e) {
      console.error(e);
      showError('Unavailable', 'Puzzle data could not be verified.');
    }
  }

  function showError(title, msg) {
    DOM.mainViewport.style.display = 'none';
    DOM.screenError.classList.remove('hidden');
    DOM.errorTitle.textContent = title;
    DOM.errorMsg.textContent = msg;
  }

  function showErrorState(show) {
    if (show) {
      DOM.mainViewport.style.display = 'none';
      DOM.screenError.classList.remove('hidden');
    } else {
      DOM.mainViewport.style.display = 'flex';
      DOM.screenError.classList.add('hidden');
    }
  }

  function showScreen(screenId) {
    APP.currentScreen = screenId;
    DOM.screenMenu.classList.toggle('hidden', screenId !== 'menu');
    DOM.screenGame.classList.toggle('hidden', screenId !== 'game');
    DOM.screenVault.classList.toggle('hidden', screenId !== 'vault');
    garnishManager.setMode(screenId === 'menu' ? 'menu' : 'game');
    if (screenId === 'menu') renderMenu();
    else if (screenId === 'vault') renderVault();
  }

  function formatDate(isoStr) {
    const [y, m, d] = isoStr.split('-');
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  }

  function renderMenu() {
    const row = APP.currentRelease;
    DOM.todayHeading.textContent = formatDate(row.release_date);

    ['mini', 'midi', 'main'].forEach(tier => {
      const isDone = !!APP.storage.history[`${row.release_date}_${tier}`];
      
      const titleEl = tier === 'mini' ? DOM.cardTitleMini : tier === 'midi' ? DOM.cardTitleMidi : DOM.cardTitleMain;
      const statusEl = tier === 'mini' ? DOM.statusPillMini : tier === 'midi' ? DOM.statusPillMidi : DOM.statusPillMain;
      const btnEl = tier === 'mini' ? DOM.btnPlayMini : tier === 'midi' ? DOM.btnPlayMidi : DOM.btnPlayMain;
      
      titleEl.textContent = row[`${tier}_category`] || row.theme;
      statusEl.textContent = isDone ? 'Solved' : 'Unsolved';
      statusEl.className = `tier-status-pill ${isDone ? 'status-solved' : ''}`;
      btnEl.textContent = isDone ? 'Review' : 'Play';
    });
  }

  function renderVault() {
    DOM.vaultListContainer.innerHTML = '';
    if (APP.vaultReleases.length === 0) {
      DOM.vaultListContainer.innerHTML = '<div style="text-align:center; padding: 24px; color: var(--text-muted);">The Vault is empty. Check back tomorrow.</div>';
      return;
    }
    APP.vaultReleases.forEach(row => {
      const item = document.createElement('div');
      item.className = 'vault-item-card glass-panel';
      
      const miniD = !!APP.storage.history[`${row.release_date}_mini`];
      const midiD = !!APP.storage.history[`${row.release_date}_midi`];
      const mainD = !!APP.storage.history[`${row.release_date}_main`];
      
      item.innerHTML = `
        <div class="vault-meta">
          <h2>${formatDate(row.release_date)}</h2>
          <span class="vault-sub">${row.theme}</span>
        </div>
        <div class="vault-badges">
          <span class="vault-chip ${miniD ? 'chip-solved' : ''}">Mini</span>
          <span class="vault-chip ${midiD ? 'chip-solved' : ''}">Midi</span>
          <span class="vault-chip ${mainD ? 'chip-solved' : ''}">Main</span>
        </div>
      `;
      item.addEventListener('click', () => {
        audio.playTap();
        APP.activeRelease = row;
        loadPuzzleTier('mini');
      });
      DOM.vaultListContainer.appendChild(item);
    });
  }

  function extractPuzzleData(row, tier) {
    const gridStr = row[`${tier}_grid`];
    const cluesAcrossStr = row[`${tier}_clues_across`];
    const cluesDownStr = row[`${tier}_clues_down`];
    
    if (!gridStr) return null;

    const gridRows = gridStr.split(/\r?\n/).map(r => r.trim()).filter(r => r.length > 0);
    const size = gridRows.length;
    if (size === 0) return null;

    const solution = [];
    const blocks = [];
    for (let r = 0; r < size; r++) {
      solution[r] = [];
      for (let c = 0; c < size; c++) {
        const char = gridRows[r][c] || '';
        if (char === '#') blocks.push([r, c]);
        solution[r][c] = char;
      }
    }

    const parseClueStr = str => {
      if (!str) return [];
      return str.split(/\r?\n/).map(line => {
        const match = line.match(/^(\d+)[\.\:]\s*(.+)$/);
        if (match) return { num: parseInt(match[1], 10), clue: match[2].trim() };
        return null;
      }).filter(Boolean);
    };

    return {
      size,
      solution,
      blocks,
      clues: { across: parseClueStr(cluesAcrossStr), down: parseClueStr(cluesDownStr) },
      category: row[`${tier}_category`] || row.theme
    };
  }

  function loadPuzzleTier(tier) {
    APP.activeTier = tier;
    const puzzleData = extractPuzzleData(APP.activeRelease, tier);
    if (!puzzleData) return;

    APP.currentGridData = puzzleData;
    const size = puzzleData.size;

    APP.userGrid = Array.from({ length: size }, () => Array(size).fill(''));
    APP.isSolved = false;
    APP.timerSeconds = 0;
    updateTimer();

    const histKey = `${APP.activeRelease.release_date}_${tier}`;
    if (APP.storage.history[histKey]) {
      APP.isSolved = true;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          APP.userGrid[r][c] = puzzleData.solution[r][c];
        }
      }
      APP.timerSeconds = APP.storage.history[histKey].time || 0;
      updateTimer();
    }

    DOM.gameDayLabel.textContent = formatDate(APP.activeRelease.release_date);

    DOM.gameTierPills.forEach(pill => {
      const pTier = pill.getAttribute('data-tier');
      pill.classList.toggle('active', pTier === tier);
    });

    syncTierBadges();
    renderBoard();
    renderClues();
    placeCursorInitial();

    showScreen('game');
    if (!APP.isSolved) startTimer();
  }

  function syncTierBadges() {
    const d = APP.activeRelease.release_date;
    DOM.gameBadgeMiniDone.classList.toggle('hidden', !APP.storage.history[`${d}_mini`]);
    DOM.gameBadgeMidiDone.classList.toggle('hidden', !APP.storage.history[`${d}_midi`]);
    DOM.gameBadgeMainDone.classList.toggle('hidden', !APP.storage.history[`${d}_main`]);
  }

  function isBlock(r, c) {
    if (r < 0 || c < 0 || r >= APP.currentGridData.size || c >= APP.currentGridData.size) return true;
    return APP.currentGridData.blocks.some(b => b[0] === r && b[1] === c);
  }

  function buildMatrix() {
    const { size, blocks } = APP.currentGridData;
    const matrix = [];
    const blockSet = new Set(blocks.map(b => `${b[0]},${b[1]}`));
    let numberCounter = 1;
    const numbering = {};

    for (let r = 0; r < size; r++) {
      matrix[r] = [];
      for (let c = 0; c < size; c++) {
        if (blockSet.has(`${r},${c}`)) {
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
        matrix[r][c] = { isBlock: false, num };
      }
    }
    return { matrix, numbering };
  }

  function renderBoard() {
    const size = APP.currentGridData.size;
    const gridEl = DOM.crosswordGrid;
    gridEl.innerHTML = '';
    gridEl.className = `crossword-grid grid-${size}x${size}`;

    const { numbering } = buildMatrix();

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        if (isBlock(r, c)) {
          cell.classList.add('cell-black');
        } else {
          const num = numbering[`${r},${c}`];
          if (num) {
            const numEl = document.createElement('span');
            numEl.className = 'cell-num';
            numEl.textContent = num;
            cell.appendChild(numEl);
          }
          const val = APP.userGrid[r][c];
          if (val) {
            const letter = document.createElement('span');
            letter.className = 'cell-letter';
            letter.textContent = val;
            cell.appendChild(letter);
          }
          cell.addEventListener('pointerdown', (e) => { e.preventDefault(); handleTap(r, c); });
        }
        gridEl.appendChild(cell);
      }
    }
    updateSelection();
  }

  function renderClues() {
    DOM.acrossCluesList.innerHTML = '';
    DOM.downCluesList.innerHTML = '';

    const clues = APP.currentGridData.clues;
    const makeItem = (item, dir) => {
      const li = document.createElement('li');
      li.className = 'clue-item';
      li.dataset.dir = dir;
      li.dataset.num = item.num;
      li.innerHTML = `<strong>${item.num}</strong> ${item.clue}`;
      li.addEventListener('click', () => jumpToClue(dir, item.num));
      return li;
    };

    clues.across.forEach(c => DOM.acrossCluesList.appendChild(makeItem(c, 'across')));
    clues.down.forEach(c => DOM.downCluesList.appendChild(makeItem(c, 'down')));
  }

  function handleTap(r, c) {
    if (isBlock(r, c)) return;
    audio.playTap();
    if (APP.cursor.r === r && APP.cursor.c === c) {
      APP.direction = APP.direction === 'across' ? 'down' : 'across';
    } else {
      APP.cursor = { r, c };
      if (!isWordValid(r, c, APP.direction)) APP.direction = APP.direction === 'across' ? 'down' : 'across';
    }
    updateSelection();
  }

  function isWordValid(r, c, dir) {
    const size = APP.currentGridData.size;
    if (dir === 'across') return (c > 0 && !isBlock(r, c - 1)) || (c + 1 < size && !isBlock(r, c + 1));
    return (r > 0 && !isBlock(r - 1, c)) || (r + 1 < size && !isBlock(r + 1, c));
  }

  function updateSelection() {
    const { r, c } = APP.cursor;
    const size = APP.currentGridData.size;
    const cells = DOM.crosswordGrid.children;
    for (let i = 0; i < cells.length; i++) cells[i].classList.remove('cell-selected', 'highlight-word');

    const span = getWordSpan(r, c, APP.direction);
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
    const size = APP.currentGridData.size;
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

  function updateClueBanner(span) {
    if (!span.length) return;
    const rootPos = span[0];
    const { numbering } = buildMatrix();
    const num = numbering[`${rootPos.r},${rootPos.c}`];
    if (!num) {
      DOM.clueDirectionLabel.textContent = '--';
      DOM.clueTextDisplay.textContent = 'Keep solving.';
      return;
    }
    const dirKey = APP.direction;
    const clueItem = APP.currentGridData.clues[dirKey].find(i => i.num === num);
    
    DOM.clueDirectionLabel.textContent = `${num}${dirKey === 'across' ? 'A' : 'D'}`;
    DOM.clueTextDisplay.textContent = clueItem ? clueItem.clue : '';

    document.querySelectorAll('.clue-item').forEach(el => {
      el.classList.toggle('active-clue-item', el.dataset.dir === dirKey && Number(el.dataset.num) === num);
    });
  }

  function jumpToClue(dir, num) {
    const { numbering } = buildMatrix();
    for (const [key, val] of Object.entries(numbering)) {
      if (val === num) {
        const [r, c] = key.split(',').map(Number);
        APP.cursor = { r, c };
        APP.direction = dir;
        updateSelection();
        audio.playTap();
        return;
      }
    }
  }

  function placeCursorInitial() {
    const size = APP.currentGridData.size;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isBlock(r, c)) {
          APP.cursor = { r, c };
          APP.direction = 'across';
          updateSelection();
          return;
        }
      }
    }
  }

  function handleInput(char) {
    if (APP.isSolved) return;
    char = char.toUpperCase();
    if (!/^[A-Z]$/.test(char)) return;

    audio.playTap();
    const { r, c } = APP.cursor;
    APP.userGrid[r][c] = char;

    const size = APP.currentGridData.size;
    const cellEl = DOM.crosswordGrid.children[r * size + c];
    let letterSpan = cellEl.querySelector('.cell-letter');
    if (!letterSpan) {
      letterSpan = document.createElement('span');
      letterSpan.className = 'cell-letter';
      cellEl.appendChild(letterSpan);
    }
    letterSpan.textContent = char;

    advanceCursor(false);
    checkWin();
  }

  function handleBackspace() {
    if (APP.isSolved) return;
    audio.playTap();
    const { r, c } = APP.cursor;
    const size = APP.currentGridData.size;

    if (APP.userGrid[r][c] !== '') {
      APP.userGrid[r][c] = '';
      const letterSpan = DOM.crosswordGrid.children[r * size + c].querySelector('.cell-letter');
      if (letterSpan) letterSpan.remove();
    } else {
      advanceCursor(true);
      const pr = APP.cursor.r;
      const pc = APP.cursor.c;
      APP.userGrid[pr][pc] = '';
      const pSpan = DOM.crosswordGrid.children[pr * size + pc].querySelector('.cell-letter');
      if (pSpan) pSpan.remove();
    }
    updateSelection();
  }

  function advanceCursor(backwards) {
    const size = APP.currentGridData.size;
    let { r, c } = APP.cursor;
    for (let step = 0; step < size; step++) {
      if (APP.direction === 'across') c += backwards ? -1 : 1;
      else r += backwards ? -1 : 1;
      if (r < 0 || c < 0 || r >= size || c >= size) break;
      if (!isBlock(r, c)) {
        APP.cursor = { r, c };
        break;
      }
    }
    updateSelection();
  }

  function checkWin() {
    const size = APP.currentGridData.size;
    const sol = APP.currentGridData.solution;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!isBlock(r, c) && APP.userGrid[r][c] !== sol[r][c].toUpperCase()) return false;
      }
    }

    APP.isSolved = true;
    clearInterval(APP.timerInterval);
    audio.playSuccess();

    const d = APP.activeRelease.release_date;
    const tier = APP.activeTier;
    const histKey = `${d}_${tier}`;

    if (!APP.storage.history[histKey]) {
      APP.storage.history[histKey] = { solved: true, time: APP.timerSeconds };
      APP.storage.stats.played++;
      APP.storage.stats.solved++;
      APP.storage.stats.streak++;
      if (APP.storage.stats.streak > APP.storage.stats.bestStreak) {
        APP.storage.stats.bestStreak = APP.storage.stats.streak;
      }
      APP.storage.stats.times[tier].push(APP.timerSeconds);
      saveStorage();
    }

    syncTierBadges();
    showVictoryModal();
    return true;
  }

  function startTimer() {
    clearInterval(APP.timerInterval);
    APP.timerInterval = setInterval(() => {
      if (!APP.isSolved) { APP.timerSeconds++; updateTimer(); }
    }, 1000);
  }

  function updateTimer() {
    const m = String(Math.floor(APP.timerSeconds / 60)).padStart(2, '0');
    const s = String(APP.timerSeconds % 60).padStart(2, '0');
    DOM.timerText.textContent = `${m}:${s}`;
  }

  function formatTime(s) {
    if (s == null) return '--:--';
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  function showVictoryModal() {
    DOM.vicDescription.textContent = `You solved the ${APP.activeTier} grid in ${formatTime(APP.timerSeconds)}.`;
    
    if (APP.activeTier === 'mini') {
      DOM.btnNextTierOrMenu.textContent = 'Next';
      DOM.btnNextTierOrMenu.onclick = () => { closeModal(DOM.modalVictory); loadPuzzleTier('midi'); };
    } else if (APP.activeTier === 'midi') {
      DOM.btnNextTierOrMenu.textContent = 'Next';
      DOM.btnNextTierOrMenu.onclick = () => { closeModal(DOM.modalVictory); loadPuzzleTier('main'); };
    } else {
      DOM.btnNextTierOrMenu.textContent = 'Menu';
      DOM.btnNextTierOrMenu.onclick = () => { closeModal(DOM.modalVictory); showScreen('menu'); };
    }
    openModal(DOM.modalVictory);
  }

  function openStats() {
    const s = APP.storage.stats;
    DOM.statPlayed.textContent = s.played;
    DOM.statCompleted.textContent = s.solved;
    DOM.statStreak.textContent = s.streak;
    DOM.statBestStreak.textContent = s.bestStreak;
    
    const median = arr => {
      if (!arr || !arr.length) return '--:--';
      const sorted = [...arr].sort((a, b) => a - b);
      return formatTime(sorted[Math.floor(sorted.length / 2)]);
    };
    DOM.statTimeMini.textContent = median(s.times.mini);
    DOM.statTimeMidi.textContent = median(s.times.midi);
    DOM.statTimeMain.textContent = median(s.times.main);
    openModal(DOM.modalStats);
  }

  function openModal(el) { el.classList.remove('hidden'); audio.playTap(); }
  function closeModal(el) { el.classList.add('hidden'); }

  function bindEvents() {
    DOM.btnPlayMini.addEventListener('click', () => { audio.playTap(); APP.activeRelease = APP.currentRelease; loadPuzzleTier('mini'); });
    DOM.btnPlayMidi.addEventListener('click', () => { audio.playTap(); APP.activeRelease = APP.currentRelease; loadPuzzleTier('midi'); });
    DOM.btnPlayMain.addEventListener('click', () => { audio.playTap(); APP.activeRelease = APP.currentRelease; loadPuzzleTier('main'); });

    DOM.btnCarouselNext.addEventListener('click', () => { audio.playTap(); DOM.tierCarouselTrack.scrollBy({ left: 240, behavior: 'smooth' }); });
    DOM.btnCarouselPrev.addEventListener('click', () => { audio.playTap(); DOM.tierCarouselTrack.scrollBy({ left: -240, behavior: 'smooth' }); });
    
    DOM.tierCarouselTrack.addEventListener('scroll', () => {
      const idx = Math.round(DOM.tierCarouselTrack.scrollLeft / DOM.tierCarouselTrack.offsetWidth);
      DOM.carouselDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    });

    DOM.btnMenuVault.addEventListener('click', () => { audio.playTap(); showScreen('vault'); });
    DOM.btnMenuStats.addEventListener('click', openStats);
    DOM.btnMenuHelp.addEventListener('click', () => openModal(DOM.modalHelp));
    
    DOM.btnMenuSound.addEventListener('click', () => { audio.toggle(); syncSoundUI(); });
    DOM.btnGameSound.addEventListener('click', () => { audio.toggle(); syncSoundUI(); });
    
    DOM.btnGameHelp.addEventListener('click', () => openModal(DOM.modalHelp));
    DOM.btnBackToMenu.addEventListener('click', () => { audio.playTap(); clearInterval(APP.timerInterval); showScreen('menu'); });
    DOM.btnVaultBackToMenu.addEventListener('click', () => { audio.playTap(); showScreen('menu'); });

    DOM.gameTierPills.forEach(p => {
      p.addEventListener('click', () => {
        const tier = p.getAttribute('data-tier');
        if (tier !== APP.activeTier) { audio.playTap(); loadPuzzleTier(tier); }
      });
    });

    document.querySelectorAll('.btn-close, [data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-close');
        if (target) closeModal(document.getElementById(target));
      });
    });

    DOM.virtualKeys.forEach(btn => {
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const key = btn.dataset.key;
        if (key === 'SWITCH') {
          audio.playTap();
          APP.direction = APP.direction === 'across' ? 'down' : 'across';
          updateSelection();
        } else if (key === 'BACKSPACE') {
          handleBackspace();
        } else if (/^[A-Z]$/.test(key)) {
          handleInput(key);
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (APP.currentScreen !== 'game') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Backspace') { e.preventDefault(); handleBackspace(); }
      else if (e.key === ' ' || e.key === 'Tab') {
        e.preventDefault(); audio.playTap();
        APP.direction = APP.direction === 'across' ? 'down' : 'across';
        updateSelection();
      }
      else if (e.key === 'ArrowRight') { e.preventDefault(); APP.direction = 'across'; advanceCursor(false); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); APP.direction = 'across'; advanceCursor(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); APP.direction = 'down'; advanceCursor(false); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); APP.direction = 'down'; advanceCursor(true); }
      else if (/^[a-zA-Z]$/.test(e.key)) { handleInput(e.key); }
    });

    DOM.btnRetry.addEventListener('click', () => { bootApplication(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootApplication);
  else bootApplication();

})();