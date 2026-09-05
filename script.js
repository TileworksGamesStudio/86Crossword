const CONTENT_DATA = {
  puzzles: [
    {
      id: "puzzle-1-italian-hour",
      tier: "mini",
      title: "The Italian Hour",
      blurb: "Aperitivo counter herbal pours, proper expressions, and bar essentials.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "NEAT", clue: "Spirit served unchilled without ice or dilution", cat: "Methods & Tools", codexId: "neat" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "PEEL", clue: "Citrus skin strip expressed over a cocktail", cat: "Methods & Tools", codexId: "peel" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "POUR", clue: "Accurately dispensing spirit through a jigger or spout", cat: "Methods & Tools", codexId: "pour" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "NIP", clue: "A swift tasting dram or small measure", cat: "History & Lore", codexId: "nip" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "ALE", clue: "Ginger ___: effervescent spiced highball lengthener", cat: "Mixers", codexId: "ale" },
        { id: "3D", num: 3, dir: "down", row: 2, col: 0, answer: "POP", clue: "Sound made uncorking effervescent sparkling wine", cat: "History & Lore", codexId: "pop" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 2, answer: "EAU", clue: "French for water, as in distilled fruit ___ -de-vie", cat: "Spirits", codexId: "eau" }
      ]
    },
    {
      id: "puzzle-2-agave-sunset",
      tier: "mini",
      title: "Agave Sunset",
      blurb: "Saline borders, rested tequila reposado, and frothy citrus under desert sun.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "ICES", clue: "Chills glassware and shaker tins with cubes", cat: "Methods & Tools", codexId: "ices" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "AGED", clue: "Rested in charred oak casks for mellow vanilla depth", cat: "Spirits", codexId: "aged" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "EDGE", clue: "The rim of a Margarita coupe salted for contrast", cat: "Glassware", codexId: "edge" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "IPA", clue: "Bitter hoppy beer style paired with a shot", cat: "Mixers", codexId: "ipa" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "EYE", clue: "Glass dropper used for saline solution measures", cat: "Methods & Tools", codexId: "eye" },
        { id: "3D", num: 3, dir: "down", row: 2, col: 0, answer: "ALE", clue: "Malted brew providing effervescence in beer cocktails", cat: "Mixers", codexId: "ale" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 2, answer: "EGG", clue: "Albumen foam source that yields silky velvet texture", cat: "Methods & Tools", codexId: "egg" }
      ]
    },
    {
      id: "puzzle-3-highball-express",
      tier: "midi",
      title: "Highball Express",
      blurb: "Whisky, crisp bubbles, and crystal clear ice spears in the highball tradition.",
      gridSize: { rows: 6, cols: 6 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "MINT", clue: "Fragrant herb slapped to bloom aromatic top notes", cat: "Methods & Tools", codexId: "mint" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "SODA", clue: "Effervescent club water that lifts spirit aromatics", cat: "Mixers", codexId: "soda" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "PROOF", clue: "Twice the percentage of alcohol by volume in the US", cat: "Spirits", codexId: "proof" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "MAS", clue: "Historic cocktail root term behind the Mint Smash", cat: "History & Lore", codexId: "mas" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "NOD", clue: "The silent hospitality cue welcoming a regular guest", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 2, col: 0, answer: "SIP", clue: "To savor a balanced cocktail slowly across the palate", cat: "Methods & Tools", codexId: "sip" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 2, answer: "DUO", clue: "Spirit plus single modifier drink category", cat: "Methods & Tools", codexId: "duo" }
      ]
    },
    {
      id: "puzzle-4-speakeasy-secret",
      tier: "midi",
      title: "Speakeasy Secret",
      blurb: "Spirit-forward standards, Bottled-in-Bond whiskies, and cellar service.",
      gridSize: { rows: 6, cols: 6 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "BITE", clue: "Pleasing ethanol kick balancing a cocktail", cat: "Spirits", codexId: "bite" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "BOND", clue: "Bottled-in-___: 100-proof government purity guarantee", cat: "Spirits", codexId: "bond" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "RYES", clue: "Spicy grain spirits powering classic Manhattans", cat: "Spirits", codexId: "ryes" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "BIB", clue: "Industry acronym for Bottled in Bond", cat: "History & Lore", codexId: "bib" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "TAN", clue: "Charred barrel hue infused into resting whiskey", cat: "Spirits", codexId: "tan" },
        { id: "3D", num: 3, dir: "down", row: 2, col: 0, answer: "BAR", clue: "The historic counter across which hospitality thrives", cat: "History & Lore", codexId: "bar" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 2, answer: "NYE", clue: "New Year's Eve: the busiest bar shift on the calendar", cat: "History & Lore", codexId: "nye" }
      ]
    },
    {
      id: "puzzle-5-masters-service",
      tier: "main",
      title: "The Master’s Service",
      blurb: "Stemware, shaken Daiquiris, and sensory evaluation from nose to wash line.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "COUPE", clue: "Stemmed glass curved to hold cocktails served up", cat: "Glassware", codexId: "coupe" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "PINTS", clue: "16-ounce tavern glasses used for beer and mixing", cat: "Glassware", codexId: "pints" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "TASTES", clue: "Evaluates dilution and balance with a bar straw drop", cat: "Methods & Tools", codexId: "tastes" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CAP", clue: "The small top seal of a three-piece cobbler shaker", cat: "Methods & Tools", codexId: "cap" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "URN", clue: "Historic vessel for batching holiday hot punch", cat: "Glassware", codexId: "urn" },
        { id: "3D", num: 3, dir: "down", row: 2, col: 0, answer: "POT", clue: "Batch still style producing rich, heavy pot spirits", cat: "Spirits", codexId: "pot" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 2, answer: "NOSE", clue: "The aromatic bouquet preceding the first sip", cat: "Methods & Tools", codexId: "nose" }
      ]
    }
  ],

  codex: [
    { id: "neat", name: "NEAT SERVICE", category: "Methods & Tools", subline: "Unadulterated room-temperature spirit", glass: "Glencairn / Rocks", method: "Direct Pour", ice: "None (Ambient)", garnish: "None (Water side)", formula: "2.0 oz (60 ml) Premium Single Malt, Mezcal, or Bourbon", tip: "Serve with a small pipette of neutral spring water to bloom aromatics.", lore: "The oldest and purest way to inspect distillation quality without thermal masking." },
    { id: "peel", name: "CITRUS PEEL", category: "Methods & Tools", subline: "Expressed essential oil garnish", glass: "Coupe or Nick & Nora", method: "Express & Discard", ice: "Per build", garnish: "Wide orange or lemon swath", formula: "1 wide swath cut without white bitter pith", tip: "Pinch skin side at a 45° angle over the drink surface so micro-droplets mist evenly.", lore: "Originated in 19th-century punches where citrus peel oils provided the core aroma." },
    { id: "pour", name: "JIGGER POUR", category: "Methods & Tools", subline: "Accurate liquid balance measuring", glass: "Any vessel", method: "Meniscus fill & tip", ice: "N/A", garnish: "None", formula: "Precise measures: 0.25 oz to 2.0 oz increments", tip: "Fill jiggers until an upward convex meniscus forms at the absolute top rim.", lore: "Named for the 19th-century 'jigger boss' who dispensed small spirit rations." },
    { id: "nip", name: "THE NIP / DRAM", category: "History & Lore", subline: "Historic small spirit measure", glass: "Small copita or dram glass", method: "Hand pour", ice: "None", garnish: "None", formula: "1.0 oz (30 ml) Spirit", tip: "Ideal for hospitality welcomes and bar guest handshakes.", lore: "Derived from 'nipperkin', an old English vessel containing under a half-pint." },
    { id: "ale", name: "GINGER ALE", category: "Mixers", subline: "Effervescent sweetened ginger soda", glass: "Collins / Highball", method: "Built over ice", ice: "Clear Ice Spear", garnish: "Lime wedge", formula: "4.0 oz Ginger Ale\n2.0 oz Whiskey or Brandy", tip: "Pour carbonated mixers down the spiral shaft of a barspoon to preserve fizz.", lore: "Invented in Belfast in the 1850s, perfected into the pale dry style in 1904." },
    { id: "pop", name: "CHAMPAGNE POP", category: "History & Lore", subline: "Sparkling cellar tradition", glass: "Flute or Tulip", method: "Slow twist uncorking", ice: "Chilled to 45°F", garnish: "None", formula: "Traditional method sparkling wine under 6 bars of pressure", tip: "Keep your thumb over the cork at all times, turning the bottle base rather than the cork.", lore: "Christopher Merret documented intentional in-bottle carbonation back in 1662." },
    { id: "eau", name: "EAU-DE-VIE", category: "Spirits", subline: "Clear unaged fruit brandy", glass: "Tulip / Grappa Glass", method: "Ambient neat", ice: "None", garnish: "None", formula: "Pure fermented and distilled fruit (pear, cherry, plum, apple)", tip: "Serve at 55°F (12°C). Never over-chill, or fragile fruit esters will lock up.", lore: "Translates to 'Water of Life' in French, traditionally distilled in Alsace." },
    { id: "ices", name: "BAR ICE SCIENCE", category: "Methods & Tools", subline: "Thermal dilution control", glass: "Mixing glass / Shaker", method: "Directional freezing", ice: "Dense clear block ice", garnish: "None", formula: "0°F to 28°F solid frozen density", tip: "Shake drinks with solid, dry cubes. Wet melting ice over-dilutes the wash line.", lore: "Frederic Tudor sparked the cocktail revolution shipping pond ice worldwide in 1806." },
    { id: "aged", name: "BARREL AGING", category: "Spirits", subline: "Charred white oak maturation", glass: "Glencairn", method: "Cask resting", ice: "Optional single cube", garnish: "None", formula: "Spirit extraction, oxidation, and wood subtraction across seasons", tip: "White oak barrels contribute vanillin, lactones, and wood sugars.", lore: "Charring barrels was originally adopted to sanitize fish and pickle barrels." },
    { id: "edge", name: "SALT RIM / CRUSTA", category: "Glassware", subline: "Contrast border application", glass: "Coupe / Rocks", method: "Half-rim swipe", ice: "Fresh cubes", garnish: "Flaky sea salt", formula: "Lime cheek wipe + flaky kosher salt rim", tip: "Salt only half the exterior rim so guests can alternate between salted and clean sips.", lore: "Joseph Santini invented the brandy Crusta in 1850s New Orleans." },
    { id: "egg", name: "ALBUMEN FOAM", category: "Methods & Tools", subline: "Silky cocktail foam texture", glass: "Coupe or Sour Glass", method: "Dry shake, then wet shake", ice: "Strained off ice", garnish: "Bitters drops", formula: "0.75 oz Egg White or Aquafaba\n2.0 oz Spirit\n0.75 oz Lemon\n0.75 oz Simple", tip: "Dry shake for 15 seconds to emulsify proteins, then add ice and shake hard.", lore: "Bartenders began emulsifying egg whites into spirit sours in the 1880s." },
    { id: "mint", name: "MINT SERVICE", category: "Methods & Tools", subline: "Aromatic herb crown handling", glass: "Julep Cup / Highball", method: "Gentle slap expression", ice: "Crushed pebble ice", garnish: "Bouquet of fresh mint", tip: "Never pulverize mint leaves; tearing releases bitter plant chlorophyll. Clap gently.", lore: "The Mint Julep was Virginia's morning eye-opener in the early 1800s." },
    { id: "soda", name: "CLUB SODA", category: "Mixers", subline: "Mineralized carbonated lengthener", glass: "Highball", method: "Gently top and lift", ice: "Clear spear", garnish: "Citrus twist", formula: "Carbonated water + sodium bicarbonate", tip: "Keep soda bottles stored near 33°F (1°C). Colder liquid holds dissolved CO2 tighter.", lore: "Joseph Priestley discovered how to carbonate water in Leeds in 1767." },
    { id: "proof", name: "PROOF SYSTEM", category: "Spirits", subline: "Ethanol concentration metric", glass: "Any vessel", method: "Hydrometer measurement", ice: "N/A", garnish: "None", formula: "Proof = ABV% × 2 (US Standard)", tip: "Higher proof spirits resist ice dilution longer and hold delicate modifiers.", lore: "British Navy gunpowder would still ignite when soaked in 57.1% ABV rum ('Navy Proof')." },
    { id: "coupe", name: "COUPE GLASS", category: "Glassware", subline: "Classic stemmed cocktail vessel", glass: "5.5 oz (160 ml) Coupe", method: "Pre-chill in freezer", ice: "Served 'Up' (No ice)", garnish: "Twist or Cherry", formula: "Ideal capacity: 5 to 6 oz with 0.5 oz wash line headroom", tip: "Always hold a coupe by the stem to avoid transferring body heat into the drink.", lore: "Designed for sparkling wine in England around 1663, not Marie Antoinette." },
    { id: "nose", name: "THE COCKTAIL NOSE", category: "Methods & Tools", subline: "Aroma bouquet appreciation", glass: "Stemmed glass", method: "Olfactory inspection", ice: "Properly rested", garnish: "Aromatic botanical", formula: "Over 80% of perceived flavor is retronasal and orthonasal aroma", tip: "Smell cocktails with your mouth slightly open to avoid olfactory fatigue from ethanol.", lore: "Jerry Thomas crowned early cocktails with seasonal berry and citrus tops for aroma." }
  ],

  ranks: [
    { level: 1, title: "Barback Apprentice", xpRequired: 0, icon: "🌱" },
    { level: 2, title: "Junior Mixologist", xpRequired: 100, icon: "🍋" },
    { level: 3, title: "Senior Bartender", xpRequired: 250, icon: "🍹" },
    { level: 4, title: "Head Mixologist", xpRequired: 450, icon: "🍸" },
    { level: 5, title: "Master of Spirits", xpRequired: 700, icon: "👑" }
  ],

  domains: [
    { id: "spirits", name: "Spirits & Distillation", keyCat: "Spirits" },
    { id: "methods", name: "Technique & Tools", keyCat: "Methods & Tools" },
    { id: "glassware", name: "Glassware & Service", keyCat: "Glassware" },
    { id: "mixers", name: "Mixers & Lengtheners", keyCat: "Mixers" },
    { id: "lore", name: "Cocktail History & Lore", keyCat: "History & Lore" }
  ],

  achievements: [
    { id: "first_solve", icon: "🍸", name: "First Shift", desc: "Complete your first mixology crossword service" },
    { id: "clean_sweep", icon: "✨", name: "Clean Sweep", desc: "Complete any service with zero hints or errors" },
    { id: "vault_master", icon: "🏆", name: "Vault Master", desc: "Solve all five curated puzzle services" },
    { id: "scholar", icon: "📖", name: "Codex Scholar", desc: "Unlock 8 or more bartender codex cards" },
    { id: "speedy", icon: "⚡", name: "Swift Pour", desc: "Solve any service in under 2 minutes" },
    { id: "craft_master", icon: "👑", name: "Master of Spirits", desc: "Achieve Level 5 Hospitality Rank" }
  ]
};

/* ==========================================================================
   2. SOUND & HAPTIC ENGINE
   ========================================================================== */
const SoundEngine = (() => {
  let ctx = null;

  const initCtx = () => {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  };

  const playTone = (freq, type, duration, gainVal, rampTo = null) => {
    if (!GameState.settings.sound) return;
    initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (rampTo) {
        osc.frequency.exponentialRampToValueAtTime(rampTo, ctx.currentTime + duration);
      }
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const triggerHaptic = (pattern) => {
    if (!GameState.settings.haptics) return;
    if (navigator.vibrate) {
      try { navigator.vibrate(pattern); } catch (e) {}
    }
  };

  return {
    playClick() {
      playTone(520, "sine", 0.03, 0.06, 240);
      triggerHaptic(6);
    },
    playChime() {
      if (!GameState.settings.sound) return;
      initCtx();
      if (!ctx) return;
      try {
        const now = ctx.currentTime;
        [587.33, 880].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.1, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.23);
        });
      } catch (e) {}
      triggerHaptic(12);
    },
    playFanfare() {
      if (!GameState.settings.sound) return;
      initCtx();
      if (!ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        const now = ctx.currentTime;
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.36);
        });
      } catch (e) {}
      triggerHaptic([20, 30, 40]);
    },
    playError() {
      playTone(180, "sawtooth", 0.1, 0.08, 110);
      triggerHaptic([12, 10, 12]);
    }
  };
})();

/* ==========================================================================
   3. CENTRAL PERSISTENT GAME STATE
   ========================================================================== */
const STORAGE_KEY = "cocktail_crossword_save_v1";

const GameState = {
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

  // Persistent user records
  unlockedCodex: new Set(),
  streak: 1,
  xp: 0,
  puzzlesSolvedCount: 0,
  cleanSweepsCount: 0,
  solvedPuzzleIds: new Set(),
  unlockedBadges: new Set(),
  lastPlayedDate: null,
  activePuzzleId: "puzzle-1-italian-hour",
  savedGrids: {}, // puzzleId -> { grid, time, hints, errors, revealed }

  settings: {
    sound: true,
    haptics: true,
    skipFilled: true
  },

  init() {
    this.loadPersistence();
    this.checkDailyStreak();
  },

  loadPersistence() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && typeof data === "object") {
        if (Array.isArray(data.unlockedCodex)) this.unlockedCodex = new Set(data.unlockedCodex);
        if (Array.isArray(data.solvedPuzzleIds)) this.solvedPuzzleIds = new Set(data.solvedPuzzleIds);
        if (Array.isArray(data.unlockedBadges)) this.unlockedBadges = new Set(data.unlockedBadges);
        if (typeof data.xp === "number") this.xp = data.xp;
        if (typeof data.puzzlesSolvedCount === "number") this.puzzlesSolvedCount = data.puzzlesSolvedCount;
        if (typeof data.cleanSweepsCount === "number") this.cleanSweepsCount = data.cleanSweepsCount;
        if (typeof data.streak === "number") this.streak = Math.max(1, data.streak);
        if (data.lastPlayedDate) this.lastPlayedDate = data.lastPlayedDate;
        if (data.activePuzzleId) this.activePuzzleId = data.activePuzzleId;
        if (data.savedGrids && typeof data.savedGrids === "object") this.savedGrids = data.savedGrids;
        if (data.settings && typeof data.settings === "object") {
          this.settings = { ...this.settings, ...data.settings };
        }
      }
    } catch (e) {
      console.warn("Storage load warning:", e);
    }
  },

  savePersistence() {
    try {
      // Save current active puzzle state if solving
      if (this.currentPuzzle && !this.isSolved) {
        this.savedGrids[this.currentPuzzle.id] = {
          userGrid: this.userGrid,
          timerSeconds: this.timerSeconds,
          hintsUsed: this.hintsUsed,
          errorsCount: this.errorsCount,
          revealedCells: [...this.revealedCells]
        };
      } else if (this.currentPuzzle && this.isSolved) {
        delete this.savedGrids[this.currentPuzzle.id];
      }

      const bundle = {
        version: 1,
        unlockedCodex: [...this.unlockedCodex],
        solvedPuzzleIds: [...this.solvedPuzzleIds],
        unlockedBadges: [...this.unlockedBadges],
        xp: this.xp,
        puzzlesSolvedCount: this.puzzlesSolvedCount,
        cleanSweepsCount: this.cleanSweepsCount,
        streak: this.streak,
        lastPlayedDate: this.lastPlayedDate,
        activePuzzleId: this.activePuzzleId,
        savedGrids: this.savedGrids,
        settings: this.settings
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  },

  checkDailyStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (!this.lastPlayedDate) {
      this.lastPlayedDate = today;
      return;
    }
    if (this.lastPlayedDate !== today) {
      const last = new Date(this.lastPlayedDate);
      const now = new Date(today);
      const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        this.streak += 1;
      } else if (diffDays > 1) {
        this.streak = 1;
      }
      this.lastPlayedDate = today;
      this.savePersistence();
    }
  },

  getCurrentRank() {
    const ranks = CONTENT_DATA.ranks;
    let current = ranks[0];
    for (let i = 0; i < ranks.length; i++) {
      if (this.xp >= ranks[i].xpRequired) {
        current = ranks[i];
      }
    }
    const currentIndex = ranks.indexOf(current);
    const next = ranks[currentIndex + 1] || current;
    return { current, next };
  },

  resetAllData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    this.unlockedCodex = new Set();
    this.solvedPuzzleIds = new Set();
    this.unlockedBadges = new Set();
    this.xp = 0;
    this.puzzlesSolvedCount = 0;
    this.cleanSweepsCount = 0;
    this.streak = 1;
    this.savedGrids = {};
    this.savePersistence();
  }
};

/* ==========================================================================
   4. CROSSWORD SOLVING & BOARD ENGINE
   ========================================================================== */
const CrosswordEngine = {
  boardMap: {},

  loadPuzzle(puzzleId) {
    const puzzle = CONTENT_DATA.puzzles.find(p => p.id === puzzleId) || CONTENT_DATA.puzzles[0];
    GameState.currentPuzzle = puzzle;
    GameState.activePuzzleId = puzzle.id;
    GameState.isSolved = GameState.solvedPuzzleIds.has(puzzle.id);
    GameState.isPaused = false;

    // Restore saved in-progress board if present
    const saved = GameState.savedGrids[puzzle.id];
    if (saved && !GameState.isSolved) {
      GameState.userGrid = { ...saved.userGrid };
      GameState.timerSeconds = saved.timerSeconds || 0;
      GameState.hintsUsed = saved.hintsUsed || 0;
      GameState.errorsCount = saved.errorsCount || 0;
      GameState.revealedCells = new Set(saved.revealedCells || []);
    } else {
      GameState.userGrid = {};
      GameState.timerSeconds = 0;
      GameState.hintsUsed = 0;
      GameState.errorsCount = 0;
      GameState.revealedCells = new Set();
    }

    this.buildBoardMap(puzzle);

    const firstWord = puzzle.words[0];
    GameState.activeDirection = firstWord.dir;
    GameState.activeCell = { r: firstWord.row, c: firstWord.col };
    GameState.activeWord = firstWord;

    this.renderMeta();
    this.renderGrid();
    this.updateClueBar();
    this.highlightActiveCells();
    this.updateProgress();

    if (!GameState.isSolved) {
      this.startTimer();
    } else {
      this.stopTimer();
      // If already solved, fill whole grid correctly for review
      Object.keys(this.boardMap).forEach(key => {
        if (this.boardMap[key]) GameState.userGrid[key] = this.boardMap[key].letter;
      });
      this.renderGrid();
      this.updateProgress();
    }
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
            letter: word.answer[i].toUpperCase(),
            num: i === 0 ? word.num : null,
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
      tierBadge.className = `badge tier-badge ${p.tier}`;
    }
    if (titleLabel) titleLabel.textContent = p.title;
    if (editionLabel) {
      editionLabel.textContent = `${p.tier.toUpperCase()} • ${p.gridSize.rows}×${p.gridSize.cols} SERVICE`;
    }
    this.updateTimerDisplay();
  },

  renderGrid() {
    const gridEl = document.getElementById("crossword-grid");
    const stage = document.getElementById("board-stage");
    if (!gridEl || !stage || !GameState.currentPuzzle) return;

    const { rows, cols } = GameState.currentPuzzle.gridSize;
    const availWidth = Math.max(220, stage.clientWidth - 12);
    const availHeight = Math.max(180, stage.clientHeight - 12);

    const cellByW = Math.floor(availWidth / cols);
    const cellByH = Math.floor(availHeight / rows);
    const rawSize = Math.min(cellByW, cellByH);
    const cellSize = Math.min(Math.max(30, rawSize), 52);

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
          cell.setAttribute("role", "gridcell");
          cell.setAttribute("tabindex", "-1");
          cell.setAttribute("aria-label", `Row ${r + 1}, Col ${c + 1}`);

          if (cellData.num) {
            const numEl = document.createElement("span");
            numEl.className = "cw-cell-num";
            numEl.textContent = cellData.num;
            cell.appendChild(numEl);
          }

          const letterEl = document.createElement("span");
          letterEl.className = "cw-cell-letter";
          letterEl.style.fontSize = `${Math.round(cellSize * 0.52)}px`;
          letterEl.textContent = GameState.userGrid[key] || "";
          cell.appendChild(letterEl);

          if (GameState.revealedCells.has(key)) {
            cell.classList.add("revealed-cell");
          }

          cell.addEventListener("click", () => this.handleCellClick(r, c));
        }
        gridEl.appendChild(cell);
      }
    }
    this.highlightActiveCells();
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
        const fallback = Object.keys(cellData.words)[0];
        GameState.activeDirection = fallback;
        GameState.activeWord = cellData.words[fallback];
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

    const crossWord = currentData ?
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
      } else if (crossWord && this.isCellInWord(r, c, crossWord)) {
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
    if (cellEl) cellEl.textContent = upper;

    const parent = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
    if (parent) parent.classList.remove("error-cell");

    GameState.savePersistence();
    this.advanceActiveCell(1);
    this.updateProgress();
    this.checkPuzzleCompletion();
  },

  handleBackspace() {
    if (GameState.isSolved || GameState.isPaused) return;
    const { r, c } = GameState.activeCell;
    const key = `${r},${c}`;

    SoundEngine.playClick();

    if (GameState.userGrid[key] && !GameState.revealedCells.has(key)) {
      delete GameState.userGrid[key];
      const cellEl = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"] .cw-cell-letter`);
      if (cellEl) cellEl.textContent = "";
    } else {
      this.advanceActiveCell(-1);
      const newKey = `${GameState.activeCell.r},${GameState.activeCell.c}`;
      if (!GameState.revealedCells.has(newKey)) {
        delete GameState.userGrid[newKey];
        const prevEl = document.querySelector(`.cw-cell[data-row="${GameState.activeCell.r}"][data-col="${GameState.activeCell.c}"] .cw-cell-letter`);
        if (prevEl) prevEl.textContent = "";
      }
    }
    GameState.savePersistence();
    this.updateProgress();
  },

  advanceActiveCell(step = 1) {
    const word = GameState.activeWord;
    if (!word) return;

    const len = word.answer.length;
    const offset = word.dir === "across"
      ? GameState.activeCell.c - word.col
      : GameState.activeCell.r - word.row;

    let nextOffset = offset + step;

    // Optional Skip filled cells setting when advancing forward
    if (step > 0 && GameState.settings.skipFilled) {
      while (nextOffset < len) {
        const testR = word.dir === "across" ? word.row : word.row + nextOffset;
        const testC = word.dir === "across" ? word.col + nextOffset : word.col;
        const testKey = `${testR},${testC}`;
        if (!GameState.userGrid[testKey]) break;
        nextOffset++;
      }
    }

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

    const nextIdx = (idx + step + words.length) % words.length;
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
    GameState.savePersistence();
    this.advanceActiveCell(1);
    this.updateProgress();
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
          setTimeout(() => cell.classList.remove("error-cell"), 1500);
        }
      }
    }

    if (hasMistake) {
      SoundEngine.playError();
      UIController.showToast("Mistakes flagged in red", "error");
    } else {
      SoundEngine.playChime();
      UIController.showToast("Word is looking sharp!", "success");
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
    GameState.savePersistence();
    this.updateProgress();
    UIController.showToast("Word cleared");
  },

  updateProgress() {
    if (!GameState.currentPuzzle) return;
    const keys = Object.keys(this.boardMap).filter(k => this.boardMap[k] !== null);
    const total = keys.length;
    const filled = keys.filter(k => !!GameState.userGrid[k]).length;
    const pct = total > 0 ? Math.round((filled / total) * 100) : 0;

    const txt = document.getElementById("progress-text");
    const fill = document.getElementById("progress-fill");
    const status = document.getElementById("progress-status");

    if (txt) txt.textContent = `${filled} / ${total} cells (${pct}%)`;
    if (fill) fill.style.width = `${pct}%`;
    if (status) status.textContent = pct === 100 ? "Ready" : "Solving";
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
      UIController.showToast("Grid is filled with some errors", "error");
    }
  },

  handlePuzzleVictory() {
    GameState.isSolved = true;
    this.stopTimer();
    SoundEngine.playFanfare();

    const puzzle = GameState.currentPuzzle;
    const isFirstSolve = !GameState.solvedPuzzleIds.has(puzzle.id);
    GameState.solvedPuzzleIds.add(puzzle.id);
    GameState.puzzlesSolvedCount++;

    const isClean = GameState.hintsUsed === 0 && GameState.errorsCount === 0;
    if (isClean) GameState.cleanSweepsCount++;

    const baseReward = puzzle.tier === "mini" ? 100 : (puzzle.tier === "midi" ? 150 : 250);
    const earnedXp = isFirstSolve ? baseReward : Math.round(baseReward * 0.35);
    GameState.xp += earnedXp;

    puzzle.words.forEach(w => {
      if (w.codexId) GameState.unlockedCodex.add(w.codexId);
    });

    if (GameState.puzzlesSolvedCount >= 1) GameState.unlockedBadges.add("first_solve");
    if (isClean) GameState.unlockedBadges.add("clean_sweep");
    if (GameState.solvedPuzzleIds.size >= 5) GameState.unlockedBadges.add("vault_master");
    if (GameState.unlockedCodex.size >= 8) GameState.unlockedBadges.add("scholar");
    if (GameState.timerSeconds < 120) GameState.unlockedBadges.add("speedy");
    if (GameState.getCurrentRank().current.level >= 5) GameState.unlockedBadges.add("craft_master");

    GameState.savePersistence();

    const modal = document.getElementById("modal-victory");
    const vTitle = document.getElementById("victory-puzzle-name");
    const vTime = document.getElementById("vic-time");
    const vHints = document.getElementById("vic-hints");
    const vAcc = document.getElementById("vic-accuracy");

    if (vTitle) vTitle.textContent = puzzle.title;
    if (vTime) vTime.textContent = this.formatTime(GameState.timerSeconds);
    if (vHints) vHints.textContent = GameState.hintsUsed.toString();
    if (vAcc) {
      const accuracy = Math.max(65, 100 - (GameState.errorsCount * 4 + GameState.hintsUsed * 8));
      vAcc.textContent = `${accuracy}%`;
    }

    const firstWord = puzzle.words.find(w => w.codexId);
    const spec = CONTENT_DATA.codex.find(c => c.id === (firstWord ? firstWord.codexId : "neat"));
    if (spec) {
      const sName = document.getElementById("vic-spec-name");
      const sFam = document.getElementById("vic-spec-family");
      const sDesc = document.getElementById("vic-spec-desc");
      if (sName) sName.textContent = spec.name;
      if (sFam) sFam.textContent = `${spec.category} • ${spec.glass}`;
      if (sDesc) sDesc.textContent = spec.tip || spec.subline;
    }

    if (modal) modal.classList.remove("hidden");
    UIController.refreshMenuStats();
  },

  startTimer() {
    this.stopTimer();
    GameState.timerInterval = setInterval(() => {
      if (!GameState.isPaused && !GameState.isSolved) {
        GameState.timerSeconds++;
        this.updateTimerDisplay();
      }
    }, 1000);
  },

  stopTimer() {
    if (GameState.timerInterval) {
      clearInterval(GameState.timerInterval);
      GameState.timerInterval = null;
    }
  },

  togglePause() {
    GameState.isPaused = !GameState.isPaused;
    const pauseOverlay = document.getElementById("pause-overlay");
    const pauseBtn = document.getElementById("btn-pause-play");

    if (GameState.isPaused) {
      if (pauseOverlay) pauseOverlay.classList.remove("hidden");
      if (pauseBtn) pauseBtn.textContent = "▶";
    } else {
      if (pauseOverlay) pauseOverlay.classList.add("hidden");
      if (pauseBtn) pauseBtn.textContent = "⏸";
    }
  },

  updateTimerDisplay() {
    const el = document.getElementById("play-timer");
    if (el) el.textContent = this.formatTime(GameState.timerSeconds);
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
};

/* ==========================================================================
   5. UI CONTROLLER & VIEW NAVIGATION
   ========================================================================== */
const UIController = {
  activeTab: "menu",
  activeFilter: "all",
  activeCodexCat: "all",

  init() {
    GameState.init();

    this.bindMasthead();
    this.bindTabs();
    this.bindMenuActions();
    this.bindToolbar();
    this.bindKeyboard();
    this.bindModals();
    this.bindSettings();
    this.bindVault();
    this.bindCodex();
    this.bindResize();

    // Start on Menu
    this.refreshMenuStats();
    this.switchTab("menu");
  },

  bindMasthead() {
    const soundBtn = document.getElementById("btn-sound");
    const soundIcon = document.getElementById("sound-icon");
    const menuToggle = document.getElementById("btn-menu-toggle");
    const settingsBtn = document.getElementById("btn-settings-open");

    const updateSoundUI = () => {
      const active = GameState.settings.sound;
      if (soundIcon) soundIcon.textContent = active ? "🔊" : "🔇";
      if (soundBtn) soundBtn.setAttribute("aria-label", active ? "Mute audio" : "Unmute audio");
    };
    updateSoundUI();

    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        GameState.settings.sound = !GameState.settings.sound;
        GameState.savePersistence();
        updateSoundUI();
        SoundEngine.playClick();
        const toggleEl = document.getElementById("setting-toggle-sound");
        if (toggleEl) toggleEl.checked = GameState.settings.sound;
      });
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        SoundEngine.playClick();
        this.switchTab("menu");
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.getElementById("modal-settings").classList.remove("hidden");
      });
    }
  },

  bindTabs() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        SoundEngine.playClick();
        this.switchTab(target);
      });
    });

    document.querySelectorAll(".btn-return-menu").forEach(btn => {
      btn.addEventListener("click", () => {
        SoundEngine.playClick();
        this.switchTab("menu");
      });
    });
  },

  switchTab(tabName) {
    this.activeTab = tabName;

    document.querySelectorAll(".nav-tab").forEach(tab => {
      const isActive = tab.dataset.tab === tabName;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    document.querySelectorAll(".app-view").forEach(v => v.classList.remove("active"));
    const targetView = document.getElementById(`view-${tabName}`);
    if (targetView) targetView.classList.add("active");

    if (tabName === "play") {
      if (!GameState.currentPuzzle) {
        CrosswordEngine.loadPuzzle(GameState.activePuzzleId || CONTENT_DATA.puzzles[0].id);
      }
      setTimeout(() => CrosswordEngine.renderGrid(), 40);
    } else if (tabName === "menu") {
      this.refreshMenuStats();
    } else if (tabName === "puzzles") {
      this.renderPuzzlesVault();
    } else if (tabName === "codex") {
      this.renderCodex();
    } else if (tabName === "mastery") {
      this.renderMastery();
    }
  },

  bindMenuActions() {
    const primaryBtn = document.getElementById("btn-menu-primary-action");
    const vaultCard = document.getElementById("menu-btn-vault");
    const codexCard = document.getElementById("menu-btn-codex");
    const masteryCard = document.getElementById("menu-btn-mastery");

    if (primaryBtn) {
      primaryBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        const target = CONTENT_DATA.puzzles.find(p => !GameState.solvedPuzzleIds.has(p.id)) || CONTENT_DATA.puzzles[0];
        CrosswordEngine.loadPuzzle(target.id);
        this.switchTab("play");
      });
    }

    if (vaultCard) vaultCard.addEventListener("click", () => { SoundEngine.playClick(); this.switchTab("puzzles"); });
    if (codexCard) codexCard.addEventListener("click", () => { SoundEngine.playClick(); this.switchTab("codex"); });
    if (masteryCard) masteryCard.addEventListener("click", () => { SoundEngine.playClick(); this.switchTab("mastery"); });
  },

  refreshMenuStats() {
    const nextUnsolved = CONTENT_DATA.puzzles.find(p => !GameState.solvedPuzzleIds.has(p.id)) || CONTENT_DATA.puzzles[0];
    const featTier = document.getElementById("menu-featured-tier");
    const featTitle = document.getElementById("menu-featured-title");
    const featDesc = document.getElementById("menu-featured-desc");
    const primaryActionText = document.getElementById("menu-primary-action-text");

    if (featTier) featTier.textContent = nextUnsolved.tier.toUpperCase();
    if (featTitle) featTitle.textContent = nextUnsolved.title;
    if (featDesc) featDesc.textContent = nextUnsolved.blurb;
    if (primaryActionText) {
      primaryActionText.textContent = GameState.solvedPuzzleIds.has(nextUnsolved.id) ? "Replay Service" : "Solve Featured Shift";
    }

    const vaultProg = document.getElementById("menu-vault-progress");
    if (vaultProg) vaultProg.textContent = `${GameState.solvedPuzzleIds.size}/5 Services Solved`;

    const codexProg = document.getElementById("menu-codex-progress");
    if (codexProg) codexProg.textContent = `${GameState.unlockedCodex.size}/16 Specs Unlocked`;

    const rankTitle = document.getElementById("menu-rank-title");
    if (rankTitle) rankTitle.textContent = GameState.getCurrentRank().current.title;

    const streakCount = document.getElementById("streak-count");
    if (streakCount) streakCount.textContent = GameState.streak.toString();

    document.getElementById("menu-stat-xp").textContent = GameState.xp.toString();
    document.getElementById("menu-stat-cleans").textContent = GameState.cleanSweepsCount.toString();
    document.getElementById("menu-stat-solved").textContent = `${GameState.solvedPuzzleIds.size}/5`;
  },

  bindToolbar() {
    const prevBtn = document.getElementById("clue-prev");
    const nextBtn = document.getElementById("clue-next");
    const pauseBtn = document.getElementById("btn-pause-play");
    const restartBtn = document.getElementById("btn-restart-play");
    const resumeBtn = document.getElementById("btn-resume-play");
    const menuFromPauseBtn = document.getElementById("btn-menu-from-pause");
    const hintBtn = document.getElementById("tool-reveal-letter");
    const checkBtn = document.getElementById("tool-check-word");
    const clearBtn = document.getElementById("tool-clear-word");
    const inspectBtn = document.getElementById("tool-inspect-spec");
    const clueMain = document.getElementById("clue-main");

    if (prevBtn) prevBtn.addEventListener("click", () => CrosswordEngine.navigateClue(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => CrosswordEngine.navigateClue(1));
    if (pauseBtn) pauseBtn.addEventListener("click", () => CrosswordEngine.togglePause());
    if (resumeBtn) resumeBtn.addEventListener("click", () => CrosswordEngine.togglePause());

    if (menuFromPauseBtn) {
      menuFromPauseBtn.addEventListener("click", () => {
        CrosswordEngine.togglePause();
        this.switchTab("menu");
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        if (confirm("Restart this puzzle service from the beginning?")) {
          SoundEngine.playClick();
          CrosswordEngine.loadPuzzle(GameState.currentPuzzle.id);
        }
      });
    }

    if (hintBtn) hintBtn.addEventListener("click", () => CrosswordEngine.revealActiveLetter());
    if (checkBtn) checkBtn.addEventListener("click", () => CrosswordEngine.checkActiveWord());
    if (clearBtn) clearBtn.addEventListener("click", () => CrosswordEngine.clearActiveWord());
    if (clueMain) clueMain.addEventListener("click", () => CrosswordEngine.toggleDirection());

    if (inspectBtn) {
      inspectBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        const word = GameState.activeWord;
        const codexId = word?.codexId || "neat";
        this.openSpecModal(codexId);
      });
    }
  },

  bindKeyboard() {
    window.addEventListener("keydown", e => {
      if (this.activeTab !== "play") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = e.key;
      if (/^[a-zA-Z]$/.test(key)) {
        e.preventDefault();
        CrosswordEngine.inputLetter(key);
      } else if (key === "Backspace") {
        e.preventDefault();
        CrosswordEngine.handleBackspace();
      } else if (key === " " || key === "Enter") {
        e.preventDefault();
        CrosswordEngine.toggleDirection();
      } else if (key === "ArrowRight") {
        e.preventDefault();
        if (GameState.activeDirection === "across") CrosswordEngine.advanceActiveCell(1);
        else CrosswordEngine.toggleDirection();
      } else if (key === "ArrowLeft") {
        e.preventDefault();
        if (GameState.activeDirection === "across") CrosswordEngine.advanceActiveCell(-1);
        else CrosswordEngine.toggleDirection();
      } else if (key === "ArrowDown") {
        e.preventDefault();
        if (GameState.activeDirection === "down") CrosswordEngine.advanceActiveCell(1);
        else CrosswordEngine.toggleDirection();
      } else if (key === "ArrowUp") {
        e.preventDefault();
        if (GameState.activeDirection === "down") CrosswordEngine.advanceActiveCell(-1);
        else CrosswordEngine.toggleDirection();
      } else if (key === "Tab") {
        e.preventDefault();
        CrosswordEngine.navigateClue(e.shiftKey ? -1 : 1);
      }
    });

    document.querySelectorAll(".kb-key").forEach(k => {
      k.addEventListener("click", e => {
        e.preventDefault();
        const val = k.dataset.key;
        if (val === "BACKSPACE") {
          CrosswordEngine.handleBackspace();
        } else if (k.id === "key-toggle-dir") {
          CrosswordEngine.toggleDirection();
        } else if (val) {
          CrosswordEngine.inputLetter(val);
        }
      });
    });
  },

  bindModals() {
    const nextBtn = document.getElementById("btn-next-puzzle");
    const viewCodexBtn = document.getElementById("btn-view-in-codex");
    const closeVictoryBtn = document.getElementById("btn-close-victory");
    const closeSpecBtn = document.getElementById("btn-close-spec-modal");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.getElementById("modal-victory").classList.add("hidden");
        this.switchTab("puzzles");
      });
    }

    if (viewCodexBtn) {
      viewCodexBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.getElementById("modal-victory").classList.add("hidden");
        const puzzle = GameState.currentPuzzle;
        const firstWord = puzzle?.words.find(w => w.codexId);
        if (firstWord) this.openSpecModal(firstWord.codexId);
        this.switchTab("codex");
      });
    }

    if (closeVictoryBtn) {
      closeVictoryBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.getElementById("modal-victory").classList.add("hidden");
      });
    }

    if (closeSpecBtn) {
      closeSpecBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.getElementById("modal-codex-spec").classList.add("hidden");
      });
    }
  },

  bindSettings() {
    const closeSettings = document.getElementById("btn-close-settings");
    const toggleSound = document.getElementById("setting-toggle-sound");
    const toggleHaptics = document.getElementById("setting-toggle-haptics");
    const toggleSkip = document.getElementById("setting-toggle-skip-filled");
    const resetDataBtn = document.getElementById("btn-reset-data");

    if (closeSettings) {
      closeSettings.addEventListener("click", () => {
        SoundEngine.playClick();
        document.getElementById("modal-settings").classList.add("hidden");
      });
    }

    if (toggleSound) {
      toggleSound.checked = GameState.settings.sound;
      toggleSound.addEventListener("change", e => {
        GameState.settings.sound = e.target.checked;
        GameState.savePersistence();
        const soundIcon = document.getElementById("sound-icon");
        if (soundIcon) soundIcon.textContent = e.target.checked ? "🔊" : "🔇";
      });
    }

    if (toggleHaptics) {
      toggleHaptics.checked = GameState.settings.haptics;
      toggleHaptics.addEventListener("change", e => {
        GameState.settings.haptics = e.target.checked;
        GameState.savePersistence();
      });
    }

    if (toggleSkip) {
      toggleSkip.checked = GameState.settings.skipFilled;
      toggleSkip.addEventListener("change", e => {
        GameState.settings.skipFilled = e.target.checked;
        GameState.savePersistence();
      });
    }

    if (resetDataBtn) {
      resetDataBtn.addEventListener("click", () => {
        if (confirm("Reset all saved progress, records, and unlocks?")) {
          GameState.resetAllData();
          this.refreshMenuStats();
          this.renderMastery();
          this.renderCodex();
          this.renderPuzzlesVault();
          document.getElementById("modal-settings").classList.add("hidden");
          this.showToast("All progress reset");
        }
      });
    }
  },

  openSpecModal(codexId) {
    const spec = CONTENT_DATA.codex.find(c => c.id === codexId);
    if (!spec) return;

    document.getElementById("modal-spec-cat").textContent = spec.category;
    document.getElementById("codex-modal-title").textContent = spec.name;
    document.getElementById("modal-spec-subline").textContent = spec.subline;
    document.getElementById("modal-spec-glass").textContent = spec.glass;
    document.getElementById("modal-spec-method").textContent = spec.method;
    document.getElementById("modal-spec-ice").textContent = spec.ice;
    document.getElementById("modal-spec-garnish").textContent = spec.garnish;
    document.getElementById("modal-spec-formula").innerText = spec.formula || "N/A";
    document.getElementById("modal-spec-tip").textContent = spec.tip || "";
    document.getElementById("modal-spec-lore").textContent = spec.lore || "";

    document.getElementById("modal-codex-spec").classList.remove("hidden");
  },

  bindVault() {
    document.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeFilter = btn.dataset.filter;
        this.renderPuzzlesVault();
      });
    });
  },

  renderPuzzlesVault() {
    const list = document.getElementById("puzzles-list");
    if (!list) return;
    list.innerHTML = "";

    const puzzles = CONTENT_DATA.puzzles.filter(p => this.activeFilter === "all" || p.tier === this.activeFilter);

    puzzles.forEach(p => {
      const isSolved = GameState.solvedPuzzleIds.has(p.id);
      const article = document.createElement("article");
      article.className = "daily-spotlight-card";

      article.innerHTML = `
        <div class="daily-badge-row">
          <span class="badge tier-badge ${p.tier}">${p.tier.toUpperCase()}</span>
          ${isSolved ? '<span class="badge gold-badge">SOLVED</span>' : '<span class="daily-reward-text">+100 XP</span>'}
        </div>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="daily-cta-row">
          <button class="btn btn-primary vault-play-btn" data-id="${p.id}" type="button">${isSolved ? 'Replay' : 'Solve Service'}</button>
          <span class="daily-reward-text">${p.gridSize.rows}×${p.gridSize.cols} GRID</span>
        </div>
      `;
      list.appendChild(article);
    });

    document.querySelectorAll(".vault-play-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        SoundEngine.playClick();
        CrosswordEngine.loadPuzzle(e.target.dataset.id);
        this.switchTab("play");
      });
    });
  },

  bindCodex() {
    document.querySelectorAll(".codex-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        SoundEngine.playClick();
        document.querySelectorAll(".codex-filter").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCodexCat = btn.dataset.cat;
        this.renderCodex();
      });
    });

    const searchInput = document.getElementById("codex-search");
    if (searchInput) {
      searchInput.addEventListener("input", e => this.renderCodex(e.target.value.toLowerCase()));
    }
  },

  renderCodex(searchQuery = "") {
    const grid = document.getElementById("codex-grid");
    const countLabel = document.getElementById("codex-unlocked-count");
    if (!grid) return;

    if (countLabel) {
      countLabel.textContent = `Unlocked: ${GameState.unlockedCodex.size} / ${CONTENT_DATA.codex.length} Records`;
    }

    grid.innerHTML = "";

    const filtered = CONTENT_DATA.codex.filter(c => {
      const catMatch = this.activeCodexCat === "all" || c.category === this.activeCodexCat;
      const searchMatch = !searchQuery ||
        c.name.toLowerCase().includes(searchQuery) ||
        c.category.toLowerCase().includes(searchQuery) ||
        c.subline.toLowerCase().includes(searchQuery);
      return catMatch && searchMatch;
    });

    filtered.forEach(c => {
      const isUnlocked = GameState.unlockedCodex.has(c.id);
      const card = document.createElement("div");
      card.className = "codex-card " + (isUnlocked ? "unlocked" : "locked");

      if (isUnlocked) {
        card.innerHTML = `
          <span class="cat-tag">${c.category}</span>
          <h4 style="margin: 6px 0 2px; font-size: 1.05rem; color: #f0e6d2;">${c.name}</h4>
          <p style="margin: 0; font-size: 0.8rem; color: #a49688;">${c.subline}</p>
        `;
        card.addEventListener("click", () => {
          SoundEngine.playClick();
          this.openSpecModal(c.id);
        });
      } else {
        card.innerHTML = `
          <div style="font-size: 1.2rem; margin-bottom: 4px;">🔒</div>
          <h4 style="margin: 0 0 2px; color: #726257; font-size: 0.95rem;">Locked Craft Record</h4>
          <p style="margin: 0; font-size: 0.8rem; color: #5a4f47;">Solve crossword entry to inspect</p>
        `;
      }
      grid.appendChild(card);
    });
  },

  renderMastery() {
    const { current, next } = GameState.getCurrentRank();

    document.getElementById("profile-rank-icon").textContent = current.icon;
    document.getElementById("profile-rank-title").textContent = current.title;
    document.getElementById("profile-rank-sub").textContent = `Level ${current.level} • ${GameState.xp} XP`;

    const progress = next.level === current.level ? 100 :
      ((GameState.xp - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100;
    document.getElementById("profile-xp-fill").style.width = `${Math.min(100, Math.max(0, progress))}%`;

    document.getElementById("stat-puzzles-solved").textContent = `${GameState.solvedPuzzleIds.size} / 5`;
    document.getElementById("stat-words-unlocked").textContent = GameState.unlockedCodex.size.toString();
    document.getElementById("stat-clean-sweeps").textContent = GameState.cleanSweepsCount.toString();
    document.getElementById("stat-streak-high").textContent = GameState.streak.toString();
    document.getElementById("streak-count").textContent = GameState.streak.toString();

    const domainBars = document.getElementById("domain-bars");
    if (domainBars) {
      domainBars.innerHTML = "";
      CONTENT_DATA.domains.forEach(d => {
        const domainItems = CONTENT_DATA.codex.filter(c => c.category === d.keyCat);
        const unlockedItems = domainItems.filter(c => GameState.unlockedCodex.has(c.id));
        const pct = domainItems.length ? Math.round((unlockedItems.length / domainItems.length) * 100) : 0;

        domainBars.innerHTML += `
          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 2px; color: #d0c4b4;">
              <span>${d.name}</span>
              <span>${unlockedItems.length}/${domainItems.length} (${pct}%)</span>
            </div>
            <div style="background: rgba(255,255,255,0.05); height: 5px; border-radius: 3px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: #dfae52; transition: width 0.3s ease;"></div>
            </div>
          </div>
        `;
      });
    }

    const badgesGrid = document.getElementById("achievements-grid");
    if (badgesGrid) {
      badgesGrid.innerHTML = "";
      CONTENT_DATA.achievements.forEach(a => {
        const earned = GameState.unlockedBadges.has(a.id);
        badgesGrid.innerHTML += `
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; text-align: center; opacity: ${earned ? 1 : 0.4}; border: 1px solid ${earned ? 'rgba(223,174,82,0.4)' : 'transparent'};">
            <div style="font-size: 1.5rem; margin-bottom: 2px;">${earned ? a.icon : '🔒'}</div>
            <div style="font-size: 0.8rem; font-weight: bold; color: #f0e6d2; margin-bottom: 2px;">${a.name}</div>
            <div style="font-size: 0.7rem; color: #a49688;">${a.desc}</div>
          </div>
        `;
      });
    }
  },

  bindResize() {
    window.addEventListener("resize", () => {
      if (this.activeTab === "play") CrosswordEngine.renderGrid();
    });
  },

  showToast(msg, type = "info") {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `toast-message ${type} show`;
    setTimeout(() => toast.classList.remove("show"), 2200);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  UIController.init();
});
