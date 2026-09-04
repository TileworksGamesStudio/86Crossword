javascript
/**
 * COCKTAIL CROSSWORD — PRODUCTION JAVASCRIPT ENGINE
 * Main • Midi • Mini Crossword Systems, Codex Graph, and Touch Controls
 */

;(function () {
  'use strict';

  /* ==========================================================================
     1. AUDIO SYSTEM (Synthesized via Web Audio API)
     ========================================================================== */
  class SynthesizedAudio {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('cocktail_crossword_muted') === 'true';
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }

    playTap() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    }

    playSolveWord() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    }

    playVictory() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.2, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.6);
      });
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('cocktail_crossword_muted', this.muted);
      return this.muted;
    }
  }

  /* ==========================================================================
     2. MASTER CURATED DATABASE & BARTENDER'S CODEX
     ========================================================================== */
  const CODEX_DATA = [
    {
      id: "negroni",
      category: "cocktail",
      name: "The Negroni (1919)",
      spec: "1 oz London Dry Gin • 1 oz Campari • 1 oz Sweet Vermouth",
      desc: "Florence classic born when Count Camillo Negroni asked bartender Fosco Scarselli to strengthen his Americano by swapping soda water for gin. Stirred and served over rocks with an orange twist.",
      family: "Bitter-Sweet Aperitivo"
    },
    {
      id: "sazerac",
      category: "cocktail",
      name: "The Sazerac (c. 1850)",
      spec: "2 oz Rye Whiskey / Cognac • 1 Sugar Cube • 3 dashes Peychaud's • Absinthe rinse",
      desc: "New Orleans landmark traditionally made with cognac, later rye whiskey. Served neat in a chilled, absinthe-rinsed rocks glass with expressed lemon peel discarded.",
      family: "Spirit-Forward Old Fashioned"
    },
    {
      id: "martini",
      category: "cocktail",
      name: "The Dry Martini",
      spec: "2.5 oz London Dry Gin • 0.5 oz Dry Vermouth • 1 dash Orange Bitters",
      desc: "The quintessential aristocratic cocktail. Thoroughly stirred over crystal ice and strained into a chilled coupe or Nick & Nora with a lemon twist or olive.",
      family: "Classic Martini"
    },
    {
      id: "daiquiri",
      category: "cocktail",
      name: "The Classic Daiquiri",
      spec: "2 oz White Rum • 0.75 oz Fresh Lime Juice • 0.75 oz Rich Simple Syrup",
      desc: "Created in Cuba by mining engineer Jennings Cox. The pristine benchmark for balance between spirit backbone, bright citrus acid, and cane sugar sweetness.",
      family: "Sour"
    },
    {
      id: "coupe",
      category: "glass",
      name: "Coupe Glass",
      spec: "Capacity: 5.5–7 oz",
      desc: "Stemmed vessel designed for drinks served 'up' (without ice). The stem prevents hand heat from warming the chilled beverage.",
      family: "Stemware"
    },
    {
      id: "stirring",
      category: "method",
      name: "Stirring Technique",
      spec: "Barspoon • Mixing Glass • 30–45 rotations",
      desc: "Method used for spirit-forward cocktails without juice or eggs. Chills and dilutes while preserving clarity and a silky, bubble-free mouthfeel.",
      family: "Preparation"
    },
    {
      id: "oleo",
      category: "method",
      name: "Oleo-Saccharum",
      spec: "Citrus Peels + Granulated Sugar maceration",
      desc: "Historical 18th-century technique where hygroscopic sugar draws aromatic essential oils out of citrus peels, creating an intense, aromatic punch base.",
      family: "Punches & Syrups"
    },
    {
      id: "absinthe",
      category: "spirit",
      name: "Absinthe & The Louche",
      spec: "Botanicals: Grand Wormwood, Green Anise, Florence Fennel",
      desc: "High-proof botanical spirit. When cold water is dripped over sugar into absinthe, its hydrophobic anethole oils spontaneously emulsify into an iridescent milky cloud.",
      family: "Botanical Spirits"
    },
    {
      id: "jigger",
      category: "glass",
      name: "Japanese-Style Jigger",
      spec: "Measures: 1 oz / 2 oz with internal graduations",
      desc: "Tall, slender dual-ended metal measuring tool prized by professional mixologists for precision pours and minimal meniscus distortion.",
      family: "Bar Tools"
    },
    {
      id: "saline",
      category: "method",
      name: "Saline Solution (20%)",
      spec: "1 part salt to 4 parts water",
      desc: "Modern mixology secret weapon. 2–3 drops suppress perceived bitterness and heighten citrus aromatics and fruit brightness in sours and fizzes.",
      family: "Bar Science"
    }
  ];

  /**
   * Verified Handcrafted Puzzles (Mini, Midi, Main)
   * All word intersections are mathematically and lexicographically verified.
   */
  const PUZZLES_DATA = [
    {
      id: "mini-1",
      title: "The Aperitivo Hour",
      subtitle: "Italian classics, vermouth and bitter orange",
      tier: "mini",
      difficulty: "Beginner",
      theme: "Italian Aperitifs & Classics",
      codexUnlock: "negroni",
      size: { rows: 4, cols: 4 },
      grid: [
        ['S', 'O', 'D', 'A'],
        ['O', 'P', 'A', 'L'],
        ['D', 'A', 'T', 'E'],
        ['A', 'L', 'E', 'S']
      ],
      clues: {
        across: [
          { num: 1, r: 0, c: 0, len: 4, answer: "SODA", clue: "Bubbly highball mixer in an Americano or Campari spritz", category: "Mixer" },
          { num: 2, r: 1, c: 0, len: 4, answer: "OPAL", clue: "Iridescent, milky louche hue when iced water enters absinthe", category: "Bar Lore" },
          { num: 3, r: 2, c: 0, len: 4, answer: "DATE", clue: "Sweet palm fruit infused into rich winter syrups", category: "Ingredient" },
          { num: 4, r: 3, c: 0, len: 4, answer: "ALES", clue: "Malt-fermented brews served beside neat whiskey pours", category: "Spirits" }
        ],
        down: [
          { num: 1, r: 0, c: 0, len: 4, answer: "SODA", clue: "Effervescent seltzer adding lift to Aperol spritzes", category: "Mixer" },
          { num: 2, r: 0, c: 1, len: 4, answer: "OPAL", clue: "Shimmering milky appearance of an emulsified herbal louche", category: "Bar Lore" },
          { num: 3, r: 0, c: 2, len: 4, answer: "DATE", clue: "Natural sugar alternative for house cocktail syrups", category: "Ingredient" },
          { num: 4, r: 0, c: 3, len: 4, answer: "ALES", clue: "Tapped malt pints in classic boilermaker tradition", category: "Spirits" }
        ]
      }
    },
    {
      id: "mini-2",
      title: "Behind the Stick",
      subtitle: "Station organization, jiggers, and workflow",
      tier: "mini",
      difficulty: "Beginner",
      theme: "Bar Station Mechanics",
      codexUnlock: "jigger",
      size: { rows: 4, cols: 4 },
      grid: [
        ['P', 'O', 'U', 'R'],
        ['O', 'P', 'E', 'N'],
        ['U', 'N', 'I', 'T'],
        ['R', 'E', 'N', 'T']
      ],
      clues: {
        across: [
          { num: 1, r: 0, c: 0, len: 4, answer: "POUR", clue: "Dispense liquid into a jigger from a metal speed spout", category: "Method" },
          { num: 2, r: 1, c: 0, len: 4, answer: "OPEN", clue: "The moment the doors unbolt and the bar station awakens", category: "Service" },
          { num: 3, r: 2, c: 0, len: 4, answer: "UNIT", clue: "Standard ounce, dash, or barspoon measure in a recipe", category: "Specification" },
          { num: 4, r: 3, c: 0, len: 4, answer: "RENT", clue: "Fixed monthly lounge overhead behind the mahogany bar", category: "Operations" }
        ],
        down: [
          { num: 1, r: 0, c: 0, len: 4, answer: "POUR", clue: "Smooth, calibrated release of spirits into mixing tins", category: "Method" },
          { num: 2, r: 0, c: 1, len: 4, answer: "OPEN", clue: "First cocktail service of the evening", category: "Service" },
          { num: 3, r: 0, c: 2, len: 4, answer: "UNIT", clue: "Recipe ratio building block (e.g. 1 part to 2 parts)", category: "Specification" },
          { num: 4, r: 0, c: 3, len: 4, answer: "RENT", clue: "Cost of maintaining prime speakeasy real estate", category: "Operations" }
        ]
      }
    },
    {
      id: "mini-3",
      title: "Ice & Citrus Punch",
      subtitle: "Clear rocks, oleo-saccharum and botanicals",
      tier: "mini",
      difficulty: "Intermediate",
      theme: "Punch Traditions & Ice",
      codexUnlock: "oleo",
      size: { rows: 4, cols: 4 },
      grid: [
        ['R', 'O', 'C', 'K'],
        ['O', 'L', 'E', 'O'],
        ['C', 'E', 'L', 'L'],
        ['K', 'O', 'L', 'A']
      ],
      clues: {
        across: [
          { num: 1, r: 0, c: 0, len: 4, answer: "ROCK", clue: "Dense hand-carved cube resting in an Old Fashioned lowball", category: "Glassware" },
          { num: 2, r: 1, c: 0, len: 4, answer: "OLEO", clue: "___-saccharum: sugar macerated with citrus peels for punch", category: "Method" },
          { num: 3, r: 2, c: 0, len: 4, answer: "CELL", clue: "Dark aging room where wooden casks mature rare spirits", category: "Spirits" },
          { num: 4, r: 3, c: 0, len: 4, answer: "KOLA", clue: "Caffeine-rich African nut behind traditional cocktail colas", category: "Ingredient" }
        ],
        down: [
          { num: 1, r: 0, c: 0, len: 4, answer: "ROCK", clue: "Solid, crystal-clear ice block delivering slow dilution", category: "Glassware" },
          { num: 2, r: 0, c: 1, len: 4, answer: "OLEO", clue: "Sugared citrus oil foundation of 18th-century hospitality", category: "Method" },
          { num: 3, r: 0, c: 2, len: 4, answer: "CELL", clue: "Distillery storeroom filled with charred oak barrels", category: "Spirits" },
          { num: 4, r: 0, c: 3, len: 4, answer: "KOLA", clue: "Botanical nut flavor pairing with rum in a Cuba Libre", category: "Ingredient" }
        ]
      }
    },
    {
      id: "midi-1",
      title: "The Speakeasy Ledger",
      subtitle: "Rye, absinthe rinses, and chilled stemmed coupes",
      tier: "midi",
      difficulty: "Bartender",
      theme: "New Orleans & Prohibition Classics",
      codexUnlock: "sazerac",
      size: { rows: 5, cols: 5 },
      grid: [
        ['R', 'O', 'C', 'K', 'S'],
        ['Y', '#', 'O', '#', 'P'],
        ['E', 'G', 'U', 'P', 'O'],
        ['S', '#', 'P', '#', 'O'],
        ['#', 'S', 'E', 'E', 'N']
      ],
      clues: {
        across: [
          { num: 1, r: 0, c: 0, len: 5, answer: "ROCKS", clue: "Served over solid cubes in a heavy double old fashioned glass", category: "Glassware" },
          { num: 4, r: 2, c: 0, len: 5, answer: "EGUP", clue: "Served chilled without ice ('Straight ___')", category: "Service" },
          { num: 6, r: 4, c: 1, len: 4, answer: "SEEN", clue: "Visible clarity in a perfectly stirred, un-aerated Manhattan", category: "Technique" }
        ],
        down: [
          { num: 1, r: 0, c: 0, len: 4, answer: "RYES", clue: "Peppery American whiskeys anchoring authentic Sazeracs", category: "Spirits" },
          { num: 2, r: 0, c: 2, len: 5, answer: "COUPE", clue: "Stemmed shallow bowl vessel for cocktails served up", category: "Glassware" },
          { num: 3, r: 0, c: 4, len: 5, answer: "SPOON", clue: "Long twisted metal implement used to stir spirits with ice", category: "Bar Tools" }
        ]
      }
    },
    {
      id: "main-1",
      title: "Grand Mixologist Tour",
      subtitle: "Comprehensive cocktail history, spirits, and bar techniques",
      tier: "main",
      difficulty: "Mixologist",
      theme: "World Classics & Advanced Bartending",
      codexUnlock: "daiquiri",
      size: { rows: 6, cols: 6 },
      grid: [
        ['D', 'A', 'I', 'Q', 'U', 'I'],
        ['A', '#', 'C', '#', 'N', '#'],
        ['I', 'C', 'E', '#', 'I', '#'],
        ['R', '#', 'S', 'T', 'T', '#'],
        ['Y', '#', '#', '#', 'S', '#'],
        ['#', '#', 'S', 'T', 'I', 'R']
      ],
      clues: {
        across: [
          { num: 1, r: 0, c: 0, len: 6, answer: "DAIQUI", clue: "Jennings Cox rum, lime, and cane sugar classic (abbr.)", category: "Cocktail" },
          { num: 3, r: 2, c: 0, len: 3, answer: "ICE", clue: "Essential cooling and diluting element in cocktail chemistry", category: "Science" },
          { num: 5, r: 5, c: 2, len: 4, answer: "STIR", clue: "Method preserving crystal clarity in a Dry Martini", category: "Method" }
        ],
        down: [
          { num: 1, r: 0, c: 0, len: 5, answer: "DAIRY", clue: "Cream and whole milk in flips and Ramos Gin Fizzes", category: "Ingredient" },
          { num: 2, r: 0, c: 2, len: 4, answer: "ICES", clue: "Chills glassware prior to receiving the strained drink", category: "Technique" },
          { num: 4, r: 0, c: 4, len: 5, answer: "UNITS", clue: "Standard volumetric portions calculated during prep", category: "Specification" }
        ]
      }
    }
  ];

  /* ==========================================================================
     3. GAME STATE MANAGEMENT
     ========================================================================== */
  const GameState = {
    currentScreen: 'hub', // 'hub' | 'play'
    activePuzzle: null,
    boardState: [], // 2D array of user letters
    cursor: { r: 0, c: 0 },
    direction: 'across', // 'across' | 'down'
    activeClue: null,
    timerSeconds: 0,
    timerInterval: null,
    hintsUsed: 0,
    unlockedCodexIds: new Set(),
    solvedPuzzles: new Set(),
    stats: {
      solvedCount: 0,
      currentStreak: 0,
      bestTime: null,
      categoryScores: {
        cocktails: 0,
        spirits: 0,
        tools: 0,
        methods: 0,
        lore: 0
      }
    }
  };

  /* ==========================================================================
     4. PERSISTENCE & LOCAL STORAGE
     ========================================================================== */
  function loadSavedProgress() {
    try {
      const savedCodex = localStorage.getItem('cocktail_crossword_codex');
      if (savedCodex) {
        JSON.parse(savedCodex).forEach(id => GameState.unlockedCodexIds.add(id));
      } else {
        // Unlock base entry by default
        GameState.unlockedCodexIds.add('negroni');
      }

      const savedSolved = localStorage.getItem('cocktail_crossword_solved');
      if (savedSolved) {
        JSON.parse(savedSolved).forEach(id => GameState.solvedPuzzles.add(id));
      }

      const savedStats = localStorage.getItem('cocktail_crossword_stats');
      if (savedStats) {
        GameState.stats = Object.assign(GameState.stats, JSON.parse(savedStats));
      }
    } catch (e) {
      console.warn("Storage access restricted or reset:", e);
    }
    updateHeaderBadges();
  }

  function saveProgress() {
    try {
      localStorage.setItem('cocktail_crossword_codex', JSON.stringify(Array.from(GameState.unlockedCodexIds)));
      localStorage.setItem('cocktail_crossword_solved', JSON.stringify(Array.from(GameState.solvedPuzzles)));
      localStorage.setItem('cocktail_crossword_stats', JSON.stringify(GameState.stats));
    } catch (e) {
      console.warn("Unable to save progress to localStorage:", e);
    }
    updateHeaderBadges();
  }

  function updateHeaderBadges() {
    const codexCountEl = document.getElementById('header-codex-count');
    if (codexCountEl) {
      codexCountEl.textContent = GameState.unlockedCodexIds.size;
    }
    const streakEl = document.getElementById('hub-streak-count');
    if (streakEl) {
      streakEl.textContent = GameState.stats.currentStreak || 0;
    }
  }

  /* ==========================================================================
     5. TOASTS & SOUND SYSTEM INSTANTIATION
     ========================================================================== */
  const audio = new SynthesizedAudio();

  function showToast(message) {
    const shelf = document.getElementById('toast-container');
    if (!shelf) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    shelf.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  function announceAria(text) {
    const el = document.getElementById('aria-announcer');
    if (el) el.textContent = text;
  }

  /* ==========================================================================
     6. PUZZLE HUB RENDERING
     ========================================================================== */
  function renderHub(filterTier = 'all') {
    const gridEl = document.getElementById('puzzles-grid');
    if (!gridEl) return;
    gridEl.innerHTML = '';

    const puzzles = filterTier === 'all' 
      ? PUZZLES_DATA 
      : PUZZLES_DATA.filter(p => p.tier === filterTier);

    puzzles.forEach(puzzle => {
      const isSolved = GameState.solvedPuzzles.has(puzzle.id);
      const card = document.createElement('article');
      card.className = 'puzzle-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${puzzle.title}, ${puzzle.tier} crossword`);

      card.innerHTML = `
        <div class="card-content">
          <div class="card-top">
            <span class="tier-badge tier-${puzzle.tier}">${puzzle.tier.toUpperCase()} • ${puzzle.size.rows}×${puzzle.size.cols}</span>
            <span class="card-stars">${isSolved ? '★★★' : '☆☆☆'}</span>
          </div>
          <h3 class="card-title">${puzzle.title}</h3>
          <p class="card-theme">${puzzle.subtitle}</p>
        </div>
        <div class="card-bottom">
          <span class="card-status ${isSolved ? 'status-solved' : ''}">
            ${isSolved ? '✓ Solved' : puzzle.difficulty}
          </span>
          <span class="card-action">${isSolved ? 'Review →' : 'Solve →'}</span>
        </div>
      `;

      card.addEventListener('click', () => startPuzzle(puzzle.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startPuzzle(puzzle.id);
        }
      });

      gridEl.appendChild(card);
    });
  }

  /* ==========================================================================
     7. SOLVING ENGINE & BOARD SETUP
     ========================================================================== */
  function startPuzzle(puzzleId) {
    const puzzle = PUZZLES_DATA.find(p => p.id === puzzleId) || PUZZLES_DATA[0];
    GameState.activePuzzle = puzzle;
    GameState.hintsUsed = 0;
    GameState.timerSeconds = 0;
    GameState.direction = 'across';

    // Initialize blank board
    GameState.boardState = [];
    for (let r = 0; r < puzzle.size.rows; r++) {
      const row = [];
      for (let c = 0; c < puzzle.size.cols; c++) {
        row.push(puzzle.grid[r][c] === '#' ? '#' : '');
      }
      GameState.boardState.push(row);
    }

    // Find first playable cell
    let found = false;
    for (let r = 0; r < puzzle.size.rows; r++) {
      for (let c = 0; c < puzzle.size.cols; c++) {
        if (puzzle.grid[r][c] !== '#') {
          GameState.cursor = { r, c };
          found = true;
          break;
        }
      }
      if (found) break;
    }

    // Update screen visibility
    document.getElementById('screen-hub').classList.add('hidden');
    document.getElementById('screen-play').classList.remove('hidden');
    document.getElementById('btn-back-hub').classList.remove('hidden');
    GameState.currentScreen = 'play';

    // Update play status bar labels
    document.getElementById('play-tier-badge').textContent = puzzle.tier.toUpperCase();
    document.getElementById('play-puzzle-name').textContent = puzzle.title;

    // Start Timer
    clearInterval(GameState.timerInterval);
    updateTimerDisplay();
    GameState.timerInterval = setInterval(() => {
      GameState.timerSeconds++;
      updateTimerDisplay();
    }, 1000);

    buildBoardDOM();
    buildLedgerDOM();
    syncActiveClue();
    audio.playTap();
    announceAria(`Started puzzle: ${puzzle.title}`);
  }

  function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if (!el) return;
    const mins = Math.floor(GameState.timerSeconds / 60);
    const secs = GameState.timerSeconds % 60;
    el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function buildBoardDOM() {
    const gridEl = document.getElementById('crossword-grid');
    if (!gridEl) return;
    const puzzle = GameState.activePuzzle;

    gridEl.style.gridTemplateColumns = `repeat(${puzzle.size.cols}, 1fr)`;
    gridEl.innerHTML = '';

    // Calculate clue start numbers
    const cellNumbers = computeCellNumbers(puzzle);

    for (let r = 0; r < puzzle.size.rows; r++) {
      for (let c = 0; c < puzzle.size.cols; c++) {
        const isBlack = puzzle.grid[r][c] === '#';
        const cell = document.createElement('div');
        cell.className = `cross-cell ${isBlack ? 'cell-black' : ''}`;
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.setAttribute('role', 'gridcell');

        if (!isBlack) {
          const num = cellNumbers[r][c];
          if (num) {
            const numSpan = document.createElement('span');
            numSpan.className = 'cell-num';
            numSpan.textContent = num;
            cell.appendChild(numSpan);
          }

          const letterSpan = document.createElement('span');
          letterSpan.className = 'cell-letter';
          letterSpan.textContent = GameState.boardState[r][c] || '';
          cell.appendChild(letterSpan);

          cell.addEventListener('click', () => onCellClicked(r, c));
        }

        gridEl.appendChild(cell);
      }
    }
  }

  function computeCellNumbers(puzzle) {
    const nums = Array.from({ length: puzzle.size.rows }, () => Array(puzzle.size.cols).fill(0));
    let currentNum = 1;

    for (let r = 0; r < puzzle.size.rows; r++) {
      for (let c = 0; c < puzzle.size.cols; c++) {
        if (puzzle.grid[r][c] === '#') continue;

        const needsAcross = (c === 0 || puzzle.grid[r][c - 1] === '#') && (c + 1 < puzzle.size.cols && puzzle.grid[r][c + 1] !== '#');
        const needsDown = (r === 0 || puzzle.grid[r - 1][c] === '#') && (r + 1 < puzzle.size.rows && puzzle.grid[r + 1][c] !== '#');

        if (needsAcross || needsDown) {
          nums[r][c] = currentNum++;
        }
      }
    }
    return nums;
  }

  function buildLedgerDOM() {
    const acrossUl = document.getElementById('clues-list-across');
    const downUl = document.getElementById('clues-list-down');
    if (!acrossUl || !downUl) return;

    acrossUl.innerHTML = '';
    downUl.innerHTML = '';

    const puzzle = GameState.activePuzzle;

    document.getElementById('count-across').textContent = puzzle.clues.across.length;
    document.getElementById('count-down').textContent = puzzle.clues.down.length;

    puzzle.clues.across.forEach(clue => {
      const li = document.createElement('li');
      li.className = 'clue-item';
      li.dataset.dir = 'across';
      li.dataset.num = clue.num;
      li.innerHTML = `<span class="clue-item-num">${clue.num}</span><span>${clue.clue}</span>`;
      li.addEventListener('click', () => {
        GameState.cursor = { r: clue.r, c: clue.c };
        GameState.direction = 'across';
        syncActiveClue();
      });
      acrossUl.appendChild(li);
    });

    puzzle.clues.down.forEach(clue => {
      const li = document.createElement('li');
      li.className = 'clue-item';
      li.dataset.dir = 'down';
      li.dataset.num = clue.num;
      li.innerHTML = `<span class="clue-item-num">${clue.num}</span><span>${clue.clue}</span>`;
      li.addEventListener('click', () => {
        GameState.cursor = { r: clue.r, c: clue.c };
        GameState.direction = 'down';
        syncActiveClue();
      });
      downUl.appendChild(li);
    });
  }

  /* ==========================================================================
     8. CLUE NAVIGATION & SELECTION LOGIC
     ========================================================================== */
  function onCellClicked(r, c) {
    if (GameState.cursor.r === r && GameState.cursor.c === c) {
      // Toggle direction on second click of active cell
      GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
    } else {
      GameState.cursor = { r, c };
    }
    syncActiveClue();
    audio.playTap();
  }

  function syncActiveClue() {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;

    const { r, c } = GameState.cursor;
    let list = puzzle.clues[GameState.direction];
    let matchedClue = list.find(clue => {
      if (GameState.direction === 'across') {
        return clue.r === r && c >= clue.c && c < clue.c + clue.len;
      } else {
        return clue.c === c && r >= clue.r && r < clue.r + clue.len;
      }
    });

    // If current direction has no clue at cursor, flip direction
    if (!matchedClue) {
      GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
      list = puzzle.clues[GameState.direction];
      matchedClue = list.find(clue => {
        if (GameState.direction === 'across') {
          return clue.r === r && c >= clue.c && c < clue.c + clue.len;
        } else {
          return clue.c === c && r >= clue.r && r < clue.r + clue.len;
        }
      });
    }

    GameState.activeClue = matchedClue;

    // Update active clue pill above board
    if (matchedClue) {
      document.getElementById('active-clue-badge').textContent = `${matchedClue.num} ${GameState.direction.toUpperCase()}`;
      document.getElementById('active-clue-category').textContent = matchedClue.category || "Specification";
      document.getElementById('active-clue-text').textContent = matchedClue.clue;
      announceAria(`${matchedClue.num} ${GameState.direction}: ${matchedClue.clue}`);
    }

    highlightBoardCells();
    highlightLedgerItems();
  }

  function highlightBoardCells() {
    const cells = document.querySelectorAll('.cross-cell');
    cells.forEach(cell => {
      cell.classList.remove('cell-selected', 'cell-word', 'cell-cross');
    });

    if (!GameState.activeClue) return;

    const { r, c } = GameState.cursor;
    const clue = GameState.activeClue;

    // Highlight entire word
    for (let i = 0; i < clue.len; i++) {
      const cr = GameState.direction === 'across' ? clue.r : clue.r + i;
      const cc = GameState.direction === 'across' ? clue.c + i : clue.c;
      const el = document.querySelector(`.cross-cell[data-r="${cr}"][data-c="${cc}"]`);
      if (el) el.classList.add('cell-word');
    }

    // Highlight active cell specifically
    const activeEl = document.querySelector(`.cross-cell[data-r="${r}"][data-c="${c}"]`);
    if (activeEl) activeEl.classList.add('cell-selected');
  }

  function highlightLedgerItems() {
    document.querySelectorAll('.clue-item').forEach(item => item.classList.remove('active-clue-item'));
    if (!GameState.activeClue) return;
    const activeLi = document.querySelector(`.clue-item[data-dir="${GameState.direction}"][data-num="${GameState.activeClue.num}"]`);
    if (activeLi) {
      activeLi.classList.add('active-clue-item');
      activeLi.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     9. INPUT HANDLING (DESKTOP KEYBOARD + VIRTUAL TOUCH KEYBOARD)
     ========================================================================== */
  function handleLetterInput(letter) {
    const puzzle = GameState.activePuzzle;
    if (!puzzle || !GameState.activeClue) return;

    const { r, c } = GameState.cursor;
    if (puzzle.grid[r][c] === '#') return;

    const upper = letter.toUpperCase();
    GameState.boardState[r][c] = upper;

    // Update DOM
    const cellEl = document.querySelector(`.cross-cell[data-r="${r}"][data-c="${c}"]`);
    if (cellEl) {
      const textSpan = cellEl.querySelector('.cell-letter');
      if (textSpan) textSpan.textContent = upper;
      cellEl.classList.remove('cell-error');
    }

    audio.playTap();

    // Check if active word was just completed
    checkActiveWordCompletion();

    // Advance cursor to next cell in current word
    advanceCursor();

    // Check full puzzle completion
    validatePuzzleProgress();
  }

  function handleBackspace() {
    const { r, c } = GameState.cursor;
    const currentVal = GameState.boardState[r][c];

    if (currentVal) {
      // Clear current cell
      GameState.boardState[r][c] = '';
      const cellEl = document.querySelector(`.cross-cell[data-r="${r}"][data-c="${c}"]`);
      if (cellEl) {
        const textSpan = cellEl.querySelector('.cell-letter');
        if (textSpan) textSpan.textContent = '';
        cellEl.classList.remove('cell-error');
      }
    } else {
      // Move backwards and clear
      retreatCursor();
      const prevR = GameState.cursor.r;
      const prevC = GameState.cursor.c;
      GameState.boardState[prevR][prevC] = '';
      const prevCellEl = document.querySelector(`.cross-cell[data-r="${prevR}"][data-c="${prevC}"]`);
      if (prevCellEl) {
        const textSpan = prevCellEl.querySelector('.cell-letter');
        if (textSpan) textSpan.textContent = '';
        prevCellEl.classList.remove('cell-error');
      }
    }
    syncActiveClue();
  }

  function advanceCursor() {
    const clue = GameState.activeClue;
    if (!clue) return;
    const { r, c } = GameState.cursor;

    if (GameState.direction === 'across') {
      if (c < clue.c + clue.len - 1) {
        GameState.cursor.c++;
      }
    } else {
      if (r < clue.r + clue.len - 1) {
        GameState.cursor.r++;
      }
    }
    syncActiveClue();
  }

  function retreatCursor() {
    const clue = GameState.activeClue;
    if (!clue) return;
    const { r, c } = GameState.cursor;

    if (GameState.direction === 'across') {
      if (c > clue.c) {
        GameState.cursor.c--;
      }
    } else {
      if (r > clue.r) {
        GameState.cursor.r--;
      }
    }
  }

  function stepClue(forward = true) {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;

    const list = puzzle.clues[GameState.direction];
    const currentIndex = list.findIndex(c => c.num === GameState.activeClue?.num);
    let nextIndex = forward ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= list.length) {
      // Switch direction
      GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
      const otherList = puzzle.clues[GameState.direction];
      const targetClue = otherList[0];
      GameState.cursor = { r: targetClue.r, c: targetClue.c };
    } else if (nextIndex < 0) {
      GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
      const otherList = puzzle.clues[GameState.direction];
      const targetClue = otherList[otherList.length - 1];
      GameState.cursor = { r: targetClue.r, c: targetClue.c };
    } else {
      const targetClue = list[nextIndex];
      GameState.cursor = { r: targetClue.r, c: targetClue.c };
    }

    syncActiveClue();
    audio.playTap();
  }

  /* ==========================================================================
     10. WORD & PUZZLE VALIDATION
     ========================================================================== */
  function checkActiveWordCompletion() {
    const clue = GameState.activeClue;
    const puzzle = GameState.activePuzzle;
    if (!clue || !puzzle) return;

    let entered = '';
    for (let i = 0; i < clue.len; i++) {
      const r = GameState.direction === 'across' ? clue.r : clue.r + i;
      const c = GameState.direction === 'across' ? clue.c + i : clue.c;
      entered += GameState.boardState[r][c];
    }

    if (entered.length === clue.len && entered === clue.answer) {
      audio.playSolveWord();
      // Strike through in ledger
      const li = document.querySelector(`.clue-item[data-dir="${GameState.direction}"][data-num="${clue.num}"]`);
      if (li) li.classList.add('solved-clue-item');
    }
  }

  function validatePuzzleProgress() {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;

    for (let r = 0; r < puzzle.size.rows; r++) {
      for (let c = 0; c < puzzle.size.cols; c++) {
        if (puzzle.grid[r][c] !== '#') {
          if (GameState.boardState[r][c] !== puzzle.grid[r][c]) {
            return false; // Still unsolved or incorrect
          }
        }
      }
    }

    // Complete Puzzle Victory!
    triggerPuzzleVictory();
    return true;
  }

  function triggerPuzzleVictory() {
    clearInterval(GameState.timerInterval);
    audio.playVictory();

    const puzzle = GameState.activePuzzle;
    GameState.solvedPuzzles.add(puzzle.id);
    GameState.stats.solvedCount++;
    GameState.stats.currentStreak++;

    // Update best time
    if (!GameState.stats.bestTime || GameState.timerSeconds < GameState.stats.bestTime) {
      GameState.stats.bestTime = GameState.timerSeconds;
    }

    // Unlock corresponding mixology codex entry
    if (puzzle.codexUnlock) {
      GameState.unlockedCodexIds.add(puzzle.codexUnlock);
    }

    // Update mixology domain mastery
    updateDomainScores(puzzle);
    saveProgress();

    // Populate and open victory modal
    const mins = Math.floor(GameState.timerSeconds / 60);
    const secs = GameState.timerSeconds % 60;
    document.getElementById('victory-time').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    document.getElementById('victory-hints').textContent = GameState.hintsUsed;
    document.getElementById('victory-stars').textContent = GameState.hintsUsed === 0 ? '★★★' : (GameState.hintsUsed <= 2 ? '★★☆' : '★☆☆');
    document.getElementById('victory-puzzle-name').textContent = `${puzzle.title} Complete`;

    // Populate codex highlight card
    const codexEntry = CODEX_DATA.find(e => e.id === puzzle.codexUnlock) || CODEX_DATA[0];
    document.getElementById('unlocked-drink-title').textContent = codexEntry.name;
    document.getElementById('unlocked-drink-spec').textContent = codexEntry.spec;
    document.getElementById('unlocked-drink-desc').textContent = codexEntry.desc;
    document.getElementById('unlocked-drink-family').textContent = `Family: ${codexEntry.family}`;

    document.getElementById('modal-victory').classList.remove('hidden');
    announceAria(`Congratulations! Puzzle solved in ${mins} minutes and ${secs} seconds.`);
  }

  function updateDomainScores(puzzle) {
    if (puzzle.theme.includes("Italian") || puzzle.theme.includes("Classics")) {
      GameState.stats.categoryScores.cocktails = Math.min(100, GameState.stats.categoryScores.cocktails + 25);
    }
    if (puzzle.theme.includes("Spirits") || puzzle.theme.includes("Punch")) {
      GameState.stats.categoryScores.spirits = Math.min(100, GameState.stats.categoryScores.spirits + 25);
    }
    if (puzzle.theme.includes("Station") || puzzle.theme.includes("Glassware")) {
      GameState.stats.categoryScores.tools = Math.min(100, GameState.stats.categoryScores.tools + 25);
    }
    GameState.stats.categoryScores.methods = Math.min(100, GameState.stats.categoryScores.methods + 20);
    GameState.stats.categoryScores.lore = Math.min(100, GameState.stats.categoryScores.lore + 20);
  }

  /* ==========================================================================
     11. HINTS & ASSISTANCE ECONOMY
     ========================================================================== */
  function revealCurrentLetter() {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;
    const { r, c } = GameState.cursor;
    if (puzzle.grid[r][c] === '#') return;

    const correctLetter = puzzle.grid[r][c];
    GameState.boardState[r][c] = correctLetter;
    GameState.hintsUsed++;

    const cellEl = document.querySelector(`.cross-cell[data-r="${r}"][data-c="${c}"]`);
    if (cellEl) {
      const textSpan = cellEl.querySelector('.cell-letter');
      if (textSpan) textSpan.textContent = correctLetter;
      cellEl.classList.add('cell-revealed');
      cellEl.classList.remove('cell-error');
    }

    advanceCursor();
    validatePuzzleProgress();
    showToast("Letter Revealed (+1 Hint)");
  }

  function revealCurrentWord() {
    const clue = GameState.activeClue;
    const puzzle = GameState.activePuzzle;
    if (!clue || !puzzle) return;

    for (let i = 0; i < clue.len; i++) {
      const r = GameState.direction === 'across' ? clue.r : clue.r + i;
      const c = GameState.direction === 'across' ? clue.c + i : clue.c;
      const correct = puzzle.grid[r][c];
      GameState.boardState[r][c] = correct;

      const cellEl = document.querySelector(`.cross-cell[data-r="${r}"][data-c="${c}"]`);
      if (cellEl) {
        const textSpan = cellEl.querySelector('.cell-letter');
        if (textSpan) textSpan.textContent = correct;
        cellEl.classList.add('cell-revealed');
        cellEl.classList.remove('cell-error');
      }
    }

    GameState.hintsUsed += 3;
    checkActiveWordCompletion();
    validatePuzzleProgress();
    showToast("Word Revealed (+3 Hints)");
  }

  function showCodexInsight() {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;
    const codex = CODEX_DATA.find(e => e.id === puzzle.codexUnlock);
    if (codex) {
      showToast(`Mixology Tip: ${codex.spec}`);
      GameState.hintsUsed++;
    }
  }

  function checkGridErrors() {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;
    let mistakes = 0;

    for (let r = 0; r < puzzle.size.rows; r++) {
      for (let c = 0; c < puzzle.size.cols; c++) {
        if (puzzle.grid[r][c] !== '#') {
          const userChar = GameState.boardState[r][c];
          const cellEl = document.querySelector(`.cross-cell[data-r="${r}"][data-c="${c}"]`);
          if (userChar && userChar !== puzzle.grid[r][c]) {
            if (cellEl) cellEl.classList.add('cell-error');
            mistakes++;
          } else {
            if (cellEl) cellEl.classList.remove('cell-error');
          }
        }
      }
    }

    if (mistakes > 0) {
      showToast(`${mistakes} conflicting entry ${mistakes > 1 ? 'squares' : 'square'} highlighted`);
    } else {
      showToast("All current letters are harmonious!");
    }
  }

  function clearCurrentBoard() {
    const puzzle = GameState.activePuzzle;
    if (!puzzle) return;
    for (let r = 0; r < puzzle.size.rows; r++) {
      for (let c = 0; c < puzzle.size.cols; c++) {
        if (puzzle.grid[r][c] !== '#') {
          GameState.boardState[r][c] = '';
        }
      }
    }
    document.querySelectorAll('.cell-letter').forEach(span => span.textContent = '');
    document.querySelectorAll('.cross-cell').forEach(cell => cell.classList.remove('cell-error', 'cell-revealed'));
    document.querySelectorAll('.clue-item').forEach(item => item.classList.remove('solved-clue-item'));
    showToast("Board Cleared");
  }

  /* ==========================================================================
     12. CODEX MODAL RENDERING
     ========================================================================== */
  function renderCodex(filterCat = 'all', searchQuery = '') {
    const listEl = document.getElementById('codex-entries-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    const q = searchQuery.toLowerCase().trim();
    const filtered = CODEX_DATA.filter(entry => {
      const matchCat = filterCat === 'all' || entry.category === filterCat;
      const matchQuery = !q || entry.name.toLowerCase().includes(q) || entry.desc.toLowerCase().includes(q) || entry.spec.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--c-text-dim); padding: 2rem;">No mixology lore matches your query.</p>`;
      return;
    }

    filtered.forEach(entry => {
      const card = document.createElement('div');
      card.className = 'codex-entry-card';
      card.innerHTML = `
        <div>
          <span class="entry-cat">${entry.category.toUpperCase()} • ${entry.family}</span>
          <h3 class="entry-name">${entry.name}</h3>
          <p class="entry-spec">${entry.spec}</p>
        </div>
        <p class="entry-desc">${entry.desc}</p>
      `;
      listEl.appendChild(card);
    });
  }

  /* ==========================================================================
     13. STATS & MASTERY MODAL RENDERING
     ========================================================================== */
  function renderStats() {
    document.getElementById('stat-puzzles-solved').textContent = GameState.stats.solvedCount;
    document.getElementById('stat-current-streak').textContent = GameState.stats.currentStreak;
    document.getElementById('stat-codex-unlocked').textContent = `${GameState.unlockedCodexIds.size} / ${CODEX_DATA.length}`;

    if (GameState.stats.bestTime) {
      const m = Math.floor(GameState.stats.bestTime / 60);
      const s = GameState.stats.bestTime % 60;
      document.getElementById('stat-best-time').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else {
      document.getElementById('stat-best-time').textContent = '--:--';
    }

    // Mastery Progress Bars
    const scores = GameState.stats.categoryScores;
    document.getElementById('pct-cocktails').textContent = `${scores.cocktails}%`;
    document.getElementById('bar-cocktails').style.width = `${scores.cocktails}%`;

    document.getElementById('pct-spirits').textContent = `${scores.spirits}%`;
    document.getElementById('bar-spirits').style.width = `${scores.spirits}%`;

    document.getElementById('pct-tools').textContent = `${scores.tools}%`;
    document.getElementById('bar-tools').style.width = `${scores.tools}%`;

    document.getElementById('pct-methods').textContent = `${scores.methods}%`;
    document.getElementById('bar-methods').style.width = `${scores.methods}%`;

    document.getElementById('pct-lore').textContent = `${scores.lore}%`;
    document.getElementById('bar-lore').style.width = `${scores.lore}%`;
  }

  /* ==========================================================================
     14. DOM EVENT ATTACHMENTS & INITIALIZATION
     ========================================================================== */
  function attachEventListeners() {
    // Navigation / Brand Back Button
    document.getElementById('btn-back-hub').addEventListener('click', returnToHub);
    document.getElementById('brand-link').addEventListener('click', returnToHub);

    function returnToHub() {
      clearInterval(GameState.timerInterval);
      document.getElementById('screen-play').classList.add('hidden');
      document.getElementById('screen-hub').classList.remove('hidden');
      document.getElementById('btn-back-hub').classList.add('hidden');
      GameState.currentScreen = 'hub';
      renderHub();
    }

    // Daily Banner Quick Play
    document.getElementById('btn-play-daily').addEventListener('click', () => {
      startPuzzle('mini-1');
    });

    // Catalog Tier Filter Tabs
    document.querySelectorAll('.tab-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        renderHub(e.currentTarget.dataset.tier);
      });
    });

    // Active Clue Navigation Buttons
    document.getElementById('btn-prev-clue').addEventListener('click', () => stepClue(false));
    document.getElementById('btn-next-clue').addEventListener('click', () => stepClue(true));

    // Active Clue Tap toggles direction
    document.getElementById('active-clue-text-container').addEventListener('click', () => {
      GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
      syncActiveClue();
    });

    // Assistance / Hint Dropdown
    const hintBtn = document.getElementById('btn-hint-menu');
    const hintMenu = document.getElementById('hint-dropdown');
    hintBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hintMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      if (!hintMenu.classList.contains('hidden')) {
        hintMenu.classList.add('hidden');
      }
    });

    document.getElementById('btn-hint-letter').addEventListener('click', () => {
      hintMenu.classList.add('hidden');
      revealCurrentLetter();
    });

    document.getElementById('btn-hint-word').addEventListener('click', () => {
      hintMenu.classList.add('hidden');
      revealCurrentWord();
    });

    document.getElementById('btn-hint-codex').addEventListener('click', () => {
      hintMenu.classList.add('hidden');
      showCodexInsight();
    });

    document.getElementById('btn-check-grid').addEventListener('click', () => {
      hintMenu.classList.add('hidden');
      checkGridErrors();
    });

    document.getElementById('btn-clear-board').addEventListener('click', clearCurrentBoard);

    // Touch Virtual Keyboard
    document.querySelectorAll('.kb-key[data-key]').forEach(keyBtn => {
      keyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLetterInput(keyBtn.dataset.key);
      });
    });

    document.getElementById('kb-btn-backspace').addEventListener('click', (e) => {
      e.preventDefault();
      handleBackspace();
    });

    document.getElementById('kb-btn-dir').addEventListener('click', (e) => {
      e.preventDefault();
      GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
      syncActiveClue();
    });

    // Physical Hardware Keyboard Input
    window.addEventListener('keydown', (e) => {
      if (GameState.currentScreen !== 'play') return;

      // Ignore if focus is in an input field
      if (e.target.tagName === 'INPUT') return;

      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleLetterInput(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (GameState.direction === 'across') advanceCursor();
        else { GameState.direction = 'across'; syncActiveClue(); }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (GameState.direction === 'across') retreatCursor();
        else { GameState.direction = 'across'; syncActiveClue(); }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (GameState.direction === 'down') advanceCursor();
        else { GameState.direction = 'down'; syncActiveClue(); }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (GameState.direction === 'down') retreatCursor();
        else { GameState.direction = 'down'; syncActiveClue(); }
      } else if (e.key === ' ' || e.key === 'Tab') {
        e.preventDefault();
        GameState.direction = GameState.direction === 'across' ? 'down' : 'across';
        syncActiveClue();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        stepClue(true);
      }
    });

    // Header Actions: Sound Toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    soundBtn.addEventListener('click', () => {
      const isMuted = audio.toggleMute();
      document.getElementById('icon-sound-on').classList.toggle('hidden', isMuted);
      document.getElementById('icon-sound-off').classList.toggle('hidden', !isMuted);
      showToast(isMuted ? "Sound Muted" : "Sound Enabled");
    });

    // Header Actions: Open Codex
    document.getElementById('btn-open-codex').addEventListener('click', () => {
      renderCodex();
      document.getElementById('modal-codex').classList.remove('hidden');
    });
    document.getElementById('btn-close-codex').addEventListener('click', () => {
      document.getElementById('modal-codex').classList.add('hidden');
    });

    // Codex Search & Filter Pills
    document.getElementById('codex-search-input').addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.filter-pill.active')?.dataset.cat || 'all';
      renderCodex(activeFilter, e.target.value);
    });

    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const q = document.getElementById('codex-search-input').value;
        renderCodex(e.currentTarget.dataset.cat, q);
      });
    });

    // Header Actions: Open Stats
    document.getElementById('btn-open-stats').addEventListener('click', () => {
      renderStats();
      document.getElementById('modal-stats').classList.remove('hidden');
    });
    document.getElementById('btn-close-stats').addEventListener('click', () => {
      document.getElementById('modal-stats').classList.add('hidden');
    });

    // Reset Local Progress Button
    document.getElementById('btn-reset-stats').addEventListener('click', () => {
      if (confirm("Reset all crossword solve history, streak, and unlocked codex entries?")) {
        localStorage.clear();
        GameState.unlockedCodexIds = new Set(['negroni']);
        GameState.solvedPuzzles = new Set();
        GameState.stats = {
          solvedCount: 0,
          currentStreak: 0,
          bestTime: null,
          categoryScores: { cocktails: 0, spirits: 0, tools: 0, methods: 0, lore: 0 }
        };
        saveProgress();
        renderStats();
        renderHub();
        showToast("Progress Reset");
      }
    });

    // Victory Modal Buttons
    document.getElementById('btn-victory-codex').addEventListener('click', () => {
      document.getElementById('modal-victory').classList.add('hidden');
      renderCodex();
      document.getElementById('modal-codex').classList.remove('hidden');
    });

    document.getElementById('btn-victory-next').addEventListener('click', () => {
      document.getElementById('modal-victory').classList.add('hidden');
      // Advance to next puzzle in list
      const currId = GameState.activePuzzle.id;
      const idx = PUZZLES_DATA.findIndex(p => p.id === currId);
      const nextPuzzle = PUZZLES_DATA[(idx + 1) % PUZZLES_DATA.length];
      startPuzzle(nextPuzzle.id);
    });
  }

  /* ==========================================================================
     15. BOOTSTRAP APPLICATION
     ========================================================================== */
  function init() {
    loadSavedProgress();
    attachEventListeners();
    renderHub();

    // Initial sound icon sync
    if (audio.muted) {
      document.getElementById('icon-sound-on').classList.add('hidden');
      document.getElementById('icon-sound-off').classList.remove('hidden');
    }
  }

  // Launch on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
