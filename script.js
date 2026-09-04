/**
 * COCKTAIL CROSSWORD • MINI • MIDI • MAIN
 * Architecture: Clean Data-Driven Vanilla JS Application
 * Data Source: data.json
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
      ctx.resume().catch(() => {});
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
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {}

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
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.28);
      });
    } catch (e) {}

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
        gain.gain.setValueAtTime(0.15, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.45);
      });
    } catch (e) {}

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
    } catch (e) {}

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
   2. GAME STATE & DATA STORE (READS DATA.JSON)
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
  revealedCells: new Set(),
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
  solvedPuzzleIds: new Set(),

  async initData() {
    this.loadPersistence();
    SoundEngine.initMute();

    try {
      const response = await fetch('./data.json');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - Could not locate data.json`);
      }
      const data = await response.json();

      this.puzzles = data.puzzles || [];
      this.codex = data.codex || [];
      this.ranks = data.ranks || [];
      this.domains = data.domains || [];

      if (this.puzzles.length === 0) {
        throw new Error("data.json was loaded but contains no puzzles.");
      }
    } catch (err) {
      console.error("Data loading error:", err);
      this.displayDataError(err.message);
      throw err;
    }
  },

  displayDataError(msg) {
    const stage = document.getElementById("board-stage");
    if (stage) {
      stage.innerHTML = `
        <div style="background: rgba(143,42,32,0.9); border: 2px solid #d89b3e; padding: 20px; border-radius: 8px; max-width: 400px; text-align: center; color: #fff;">
          <h3 style="margin-bottom: 8px; font-family: serif;">Unable to Load data.json</h3>
          <p style="font-size: 13px; margin-bottom: 12px; color: #f7eedd;">${msg}</p>
          <p style="font-size: 11px; color: #cbb6a2;">Note: If testing locally on your desktop, browsers block <code>fetch()</code> on <code>file:///</code> paths. Run a local development server (like VS Code Live Server) or view it hosted on GitHub Pages.</p>
        </div>
      `;
    }
  },

  loadPersistence() {
    const savedUnlocked = localStorage.getItem('cc_unlocked');
    if (savedUnlocked) {
      try { this.unlockedCodex = new Set(JSON.parse(savedUnlocked)); } catch (e) {}
    }
    const savedSolvedIds = localStorage.getItem('cc_solved_ids');
    if (savedSolvedIds) {
      try { this.solvedPuzzleIds = new Set(JSON.parse(savedSolvedIds)); } catch (e) {}
    }
    const savedXp = localStorage.getItem('cc_xp');
    if (savedXp) this.xp = parseInt(savedXp, 10) || 450;
    const savedSolved = localStorage.getItem('cc_solved_count');
    if (savedSolved) this.puzzlesSolvedCount = parseInt(savedSolved, 10) || 0;
    const savedSweeps = localStorage.getItem('cc_clean_sweeps');
    if (savedSweeps) this.cleanSweepsCount = parseInt(savedSweeps, 10) || 0;
    const savedStreak = localStorage.getItem('cc_streak');
    if (savedStreak) this.streak = parseInt(savedStreak, 10) || 1;
  },

  savePersistence() {
    try {
      localStorage.setItem('cc_unlocked', JSON.stringify([...this.unlockedCodex]));
      localStorage.setItem('cc_solved_ids', JSON.stringify([...this.solvedPuzzleIds]));
      localStorage.setItem('cc_xp', this.xp.toString());
      localStorage.setItem('cc_solved_count', this.puzzlesSolvedCount.toString());
      localStorage.setItem('cc_clean_sweeps', this.cleanSweepsCount.toString());
      localStorage.setItem('cc_streak', this.streak.toString());
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  }
};

/* ==========================================================================
   3. BOARD & CROSSWORD PLAY ENGINE
   ========================================================================== */
const CrosswordEngine = {
  boardMap: {},

  loadPuzzle(puzzleId) {
    const puzzle = GameState.puzzles.find(p => p.id === puzzleId) || GameState.puzzles[0];
    if (!puzzle) return;

    GameState.currentPuzzle = puzzle;
    GameState.userGrid = {};
    GameState.revealedCells = new Set();
    GameState.isSolved = false;
    GameState.isPaused = false;
    GameState.hintsUsed = 0;
    GameState.errorsCount = 0;
    GameState.timerSeconds = 0;

    this.buildBoardMap(puzzle);

    const firstWord = puzzle.words[0];
    GameState.activeDirection = firstWord.dir;
    GameState.activeCell = { r: firstWord.row, c: firstWord.col };
    GameState.activeWord = firstWord;

    this.renderMeta();
    this.renderGrid();
    this.updateClueBar();
    this.highlightActiveCells();
    this.startTimer();
  },

  buildBoardMap(puzzle) {
    this.boardMap = {};
    const { rows, cols } = puzzle.gridSize;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this.boardMap[`${r},${c}`] = null;
      }
    }

    puzzle.words.forEach(word => {
      const len = word.answer.length;
      for (let i = 0; i < len; i++) {
        const r = word.dir === "across" ? word.row : word.row + i;
        const c = word.dir === "across" ? word.col + i : word.col;
        const key = `${r},${c}`;

        if (!this.boardMap[key]) {
          this.boardMap[key] = {
            r,
            c,
            letter: word.answer[i],
            num: (i === 0) ? word.num : null,
            words: {}
          };
        } else if (i === 0 && !this.boardMap[key].num) {
          this.boardMap[key].num = word.num;
        }
        this.boardMap[key].words[word.dir] = word;
      }
    });
  },

  renderMeta() {
    const p = GameState.currentPuzzle;
    const tierBadge = document.getElementById("puzzle-tier-badge");
    const titleLabel = document.getElementById("puzzle-title-label");
    const editionLabel = document.getElementById("masthead-edition");

    if (tierBadge) {
      tierBadge.textContent = p.tier.toUpperCase();
      tierBadge.className = `badge tier-badge pc-tier ${p.tier}`;
    }
    if (titleLabel) titleLabel.textContent = p.title;
    if (editionLabel) editionLabel.textContent = `${p.tier.toUpperCase()} • ${p.gridSize.rows}×${p.gridSize.cols}`;
    
    this.updateTimerDisplay();
  },

  renderGrid() {
    const gridEl = document.getElementById("crossword-grid");
    const boardStage = document.getElementById("board-stage");
    if (!gridEl || !boardStage || !GameState.currentPuzzle) return;

    const { rows, cols } = GameState.currentPuzzle.gridSize;

    const stageWidth = Math.max(280, boardStage.clientWidth - 24);
    const stageHeight = Math.max(260, boardStage.clientHeight - 24);
    const maxCellByWidth = Math.floor(stageWidth / cols);
    const maxCellByHeight = Math.floor(stageHeight / rows);
    const cellSize = Math.min(Math.max(34, Math.min(maxCellByWidth, maxCellByHeight)), 64);

    gridEl.innerHTML = "";
    gridEl.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    gridEl.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`;
        const cellData = this.boardMap[key];
        const cell = document.createElement("div");
        cell.className = "cw-cell";
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;

        if (!cellData) {
          cell.classList.add("black-cell");
          cell.setAttribute("aria-hidden", "true");
        } else {
          if (cellData.num) {
            const numEl = document.createElement("span");
            numEl.className = "cw-cell-num";
            numEl.textContent = cellData.num;
            cell.appendChild(numEl);
          }

          const letterEl = document.createElement("span");
          letterEl.className = "cw-cell-letter";
          letterEl.style.fontSize = `${Math.round(cellSize * 0.52)}px`;
          const currentVal = GameState.userGrid[key] || "";
          letterEl.textContent = currentVal;
          cell.appendChild(letterEl);

          cell.addEventListener("click", () => this.handleCellClick(r, c));
        }

        gridEl.appendChild(cell);
      }
    }
  },

  handleCellClick(r, c) {
    if (GameState.isSolved || GameState.isPaused) return;
    const key = `${r},${c}`;
    const cellData = this.boardMap[key];
    if (!cellData) return;

    SoundEngine.playClick();

    if (GameState.activeCell.r === r && GameState.activeCell.c === c) {
      const otherDir = GameState.activeDirection === "across" ? "down" : "across";
      if (cellData.words[otherDir]) {
        GameState.activeDirection = otherDir;
        GameState.activeWord = cellData.words[otherDir];
      }
    } else {
      GameState.activeCell = { r, c };
      if (cellData.words[GameState.activeDirection]) {
        GameState.activeWord = cellData.words[GameState.activeDirection];
      } else {
        const availableDir = Object.keys(cellData.words)[0];
        GameState.activeDirection = availableDir;
        GameState.activeWord = cellData.words[availableDir];
      }
    }

    this.updateClueBar();
    this.highlightActiveCells();
  },

  updateClueBar() {
    const word = GameState.activeWord;
    if (!word) return;

    const dirBadge = document.getElementById("clue-direction-badge");
    const numLabel = document.getElementById("clue-number-label");
    const catLabel = document.getElementById("clue-category-label");
    const descLabel = document.getElementById("clue-description");

    if (dirBadge) dirBadge.textContent = word.dir.toUpperCase();
    if (numLabel) numLabel.textContent = `${word.num}.`;
    if (catLabel) catLabel.textContent = word.cat;
    if (descLabel) descLabel.textContent = word.clue;
  },

  highlightActiveCells() {
    const cells = document.querySelectorAll(".cw-cell:not(.black-cell)");
    const active = GameState.activeCell;
    const activeWord = GameState.activeWord;
    const key = `${active.r},${active.c}`;
    const currentData = this.boardMap[key];

    const intersectingWord = currentData ? 
      (GameState.activeDirection === "across" ? currentData.words.down : currentData.words.across) : null;

    cells.forEach(cell => {
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      const isCurrentActive = r === active.r && c === active.c;

      cell.classList.remove("active-cell", "word-highlight", "cross-highlight");

      if (isCurrentActive) {
        cell.classList.add("active-cell");
      } else if (activeWord && this.isCellInWord(r, c, activeWord)) {
        cell.classList.add("word-highlight");
      } else if (intersectingWord && this.isCellInWord(r, c, intersectingWord)) {
        cell.classList.add("cross-highlight");
      }
    });
  },

  isCellInWord(r, c, word) {
    if (!word) return false;
    const len = word.answer.length;
    if (word.dir === "across") {
      return r === word.row && c >= word.col && c < word.col + len;
    } else {
      return c === word.col && r >= word.row && r < word.row + len;
    }
  },

  inputLetter(char) {
    if (GameState.isSolved || GameState.isPaused) return;
    const { r, c } = GameState.activeCell;
    const key = `${r},${c}`;
    if (!this.boardMap[key]) return;

    SoundEngine.playClick();

    const upper = char.toUpperCase();
    GameState.userGrid[key] = upper;

    const cellEl = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"] .cw-cell-letter`);
    if (cellEl) {
      cellEl.textContent = upper;
    }

    const parentCell = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
    if (parentCell) parentCell.classList.remove("error-cell");

    this.advanceActiveCell(1);
    this.checkPuzzleCompletion();
  },

  handleBackspace() {
    if (GameState.isSolved || GameState.isPaused) return;
    const { r, c } = GameState.activeCell;
    const key = `${r},${c}`;

    SoundEngine.playClick();

    if (GameState.userGrid[key]) {
      delete GameState.userGrid[key];
      const cellEl = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"] .cw-cell-letter`);
      if (cellEl) cellEl.textContent = "";
    } else {
      this.advanceActiveCell(-1);
      const newKey = `${GameState.activeCell.r},${GameState.activeCell.c}`;
      delete GameState.userGrid[newKey];
      const cellEl = document.querySelector(`.cw-cell[data-row="${GameState.activeCell.r}"][data-col="${GameState.activeCell.c}"] .cw-cell-letter`);
      if (cellEl) cellEl.textContent = "";
    }
  },

  advanceActiveCell(step = 1) {
    const word = GameState.activeWord;
    if (!word) return;

    const len = word.answer.length;
    let offset = (word.dir === "across") 
      ? GameState.activeCell.c - word.col 
      : GameState.activeCell.r - word.row;

    const nextOffset = offset + step;
    if (nextOffset >= 0 && nextOffset < len) {
      const nextR = word.dir === "across" ? word.row : word.row + nextOffset;
      const nextC = word.dir === "across" ? word.col + nextOffset : word.col;
      GameState.activeCell = { r: nextR, c: nextC };
    }

    this.highlightActiveCells();
  },

  toggleDirection() {
    SoundEngine.playClick();
    const { r, c } = GameState.activeCell;
    const key = `${r},${c}`;
    const cellData = this.boardMap[key];
    if (!cellData) return;

    const targetDir = GameState.activeDirection === "across" ? "down" : "across";
    if (cellData.words[targetDir]) {
      GameState.activeDirection = targetDir;
      GameState.activeWord = cellData.words[targetDir];
      this.updateClueBar();
      this.highlightActiveCells();
    }
  },

  navigateClue(step = 1) {
    SoundEngine.playClick();
    const words = GameState.currentPuzzle.words;
    if (!words || words.length === 0) return;

    let idx = words.findIndex(w => w.id === GameState.activeWord?.id);
    if (idx === -1) idx = 0;

    let nextIdx = (idx + step + words.length) % words.length;
    const nextWord = words[nextIdx];

    GameState.activeWord = nextWord;
    GameState.activeDirection = nextWord.dir;
    GameState.activeCell = { r: nextWord.row, c: nextWord.col };

    this.updateClueBar();
    this.highlightActiveCells();
  },

  revealActiveLetter() {
    if (GameState.isSolved || GameState.isPaused) return;
    const { r, c } = GameState.activeCell;
    const key = `${r},${c}`;
    const cellData = this.boardMap[key];
    if (!cellData) return;

    GameState.hintsUsed++;
    GameState.revealedCells.add(key);
    GameState.userGrid[key] = cellData.letter;

    const cell = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) {
      cell.classList.add("revealed-cell");
      cell.classList.remove("error-cell");
      const letterEl = cell.querySelector(".cw-cell-letter");
      if (letterEl) letterEl.textContent = cellData.letter;
    }

    SoundEngine.playChime();
    this.advanceActiveCell(1);
    this.checkPuzzleCompletion();
  },

  checkActiveWord() {
    if (GameState.isSolved || GameState.isPaused) return;
    const word = GameState.activeWord;
    if (!word) return;

    SoundEngine.playClick();
    let hasMistake = false;
    const len = word.answer.length;

    for (let i = 0; i < len; i++) {
      const r = word.dir === "across" ? word.row : word.row + i;
      const c = word.dir === "across" ? word.col + i : word.col;
      const key = `${r},${c}`;
      const userVal = GameState.userGrid[key];
      const correctVal = word.answer[i];

      const cell = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
      if (userVal && userVal !== correctVal) {
        hasMistake = true;
        GameState.errorsCount++;
        if (cell) {
          cell.classList.add("error-cell");
          setTimeout(() => cell.classList.remove("error-cell"), 1600);
        }
      }
    }

    if (hasMistake) {
      SoundEngine.playError();
    } else {
      SoundEngine.playChime();
    }
  },

  clearActiveWord() {
    if (GameState.isSolved || GameState.isPaused) return;
    const word = GameState.activeWord;
    if (!word) return;

    SoundEngine.playClick();
    const len = word.answer.length;

    for (let i = 0; i < len; i++) {
      const r = word.dir === "across" ? word.row : word.row + i;
      const c = word.dir === "across" ? word.col + i : word.col;
      const key = `${r},${c}`;

      if (!GameState.revealedCells.has(key)) {
        delete GameState.userGrid[key];
        const letterEl = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"] .cw-cell-letter`);
        if (letterEl) letterEl.textContent = "";
      }
    }
  },

  checkPuzzleCompletion() {
    const keys = Object.keys(this.boardMap).filter(k => this.boardMap[k] !== null);
    const allFilled = keys.every(k => !!GameState.userGrid[k]);
    if (!allFilled) return;

    const allCorrect = keys.every(k => GameState.userGrid[k] === this.boardMap[k].letter);

    if (allCorrect) {
      this.handlePuzzleVictory();
    } else {
      SoundEngine.playError();
    }
  },

  handlePuzzleVictory() {
    GameState.isSolved = true;
    this.stopTimer();
    SoundEngine.playFanfare();

    const puzzle = GameState.currentPuzzle;
    GameState.solvedPuzzleIds.add(puzzle.id);
    GameState.puzzlesSolvedCount++;

    const isCleanSweep = (GameState.hintsUsed === 0 && GameState.errorsCount === 0);
    if (isCleanSweep) GameState.cleanSweepsCount++;

    const xpEarned = puzzle.tier === "mini" ? 100 : (puzzle.tier === "midi" ? 150 : 250);
    GameState.xp += xpEarned;

    puzzle.words.forEach(w => {
      if (w.codexId) GameState.unlockedCodex.add(w.codexId);
    });

    GameState.savePersistence();

    const vicModal = document.getElementById("modal-victory");
    const pTitle = document.getElementById("victory-puzzle-name");
    const vTime = document.getElementById("vic-time");
    const vHints = document.getElementById("vic-hints");
    const vAcc = document.getElementById("vic-accuracy");

    if (pTitle) pTitle.textContent = puzzle.title;
    if (vTime) vTime.textContent = this.formatTime(GameState.timerSeconds);
    if (vHints) vHints.textContent = GameState.hintsUsed.toString();
    if (vAcc) {
      const accuracy = Math.max(70, 100 - (GameState.errorsCount * 5 + GameState.hintsUsed * 10));
      vAcc.textContent = `${accuracy}%`;
    }

    const firstCodexWord = puzzle.words.find(w => w.codexId);
    const spec = GameState.codex.find(c => c.id === (firstCodexWord ? firstCodexWord.codexId : "negroni"));
    if (spec) {
      const sName = document.getElementById("vic-spec-name");
      const sFam = document.getElementById("vic-spec-family");
      const sDesc = document.getElementById("vic-spec-desc");
      if (sName) sName.textContent = spec.name.toUpperCase();
      if (sFam) sFam.textContent = `${spec.category} • ${spec.glass || ""} • ${spec.method ? spec.method.split(' ')[0] : ""}`;
      if (sDesc) sDesc.textContent = spec.tip || spec.subline;
    }

    if (vicModal) vicModal.classList.remove("hidden");
  },

  startTimer() {
    this.stopTimer();
    GameStat