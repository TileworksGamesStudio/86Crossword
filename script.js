/**
 * COCKTAIL CROSSWORD • COMPLETE ENGINE & CONTENT REPOSITORY
 * Architecture: Clean Vanilla JS Data-Driven Application
 * Self-Contained: Exactly 5 Playable Crossword Services (Mini, Midi, Main)
 */

/* ==========================================================================
   1. IN-SCRIPT CONTENT DATASET (EXACTLY 5 PLAYABLE PUZZLE EXAMPLES)
   ========================================================================== */
const CONTENT_DATA = {
  // Exactly 5 playable challenge entries forming the complete service progression
  puzzles: [
    {
      id: "puzzle-1-italian-hour",
      tier: "mini",
      title: "The Italian Hour",
      blurb: "Step into the aperitivo counter for bittersweet Italian herbal pours, proper expressions, and bar essentials.",
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
      blurb: "Saline borders, rested tequila reposado, and frothy citrus shaken under the desert sun.",
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
      blurb: "Whisky, crisp bubbles, and crystal clear ice spears in the Japanese highball tradition.",
      gridSize: { rows: 6, cols: 6 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "MINT", clue: "Fragrant herb slapped to bloom aromatic top notes", cat: "Methods & Tools", codexId: "mint" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "SODA", clue: "Effervescent club water that lifts spirit aromatics", cat: "Mixers", codexId: "soda" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "PROOF", clue: "Twice the percentage of alcohol by volume in the US", cat: "Spirits", codexId: "proof" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "MAS", clue: "Historic cocktail root term behind the Mint Smash", cat: "History & Lore", codexId: "mas" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "NOD", clue: "The silent hospitality cue welcoming a regular guest", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 2, col: 0, answer: "SIP", clue: "To savor a balanced cocktail slowly across the palate", cat: "Methods & Tools", codexId: "sip" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 2, answer: "DUO", clue: "Spirit plus single modifier drink category", cat: "Cocktails", codexId: "duo" }
      ]
    },
    {
      id: "puzzle-4-speakeasy-secret",
      tier: "midi",
      title: "Speakeasy Secret",
      blurb: "Spirit-forward standards, Bottled-in-Bond whiskies, and secret cellar service.",
      gridSize: { rows: 6, cols: 6 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "BITE", clue: "Pleasing ethanol kick balancing a cocktail", cat: "Cocktails", codexId: "bite" },
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
      blurb: "Shaken Daiquiris, elegant stemware, and sensory appreciation from nose to wash line.",
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
    { id: "neat", name: "NEAT SERVICE", category: "Methods & Tools", subline: "Unadulterated room-temperature spirit", glass: "Glencairn / Rocks", method: "Direct Pour", ice: "None (Ambient)", garnish: "None (Water side)", formula: "2.0 oz (60 ml) Premium Single Malt, Mezcal, or Bourbon", tip: "Serve with a small pipette of neutral spring water to allow the guest to drop water and bloom aromatics at will.", lore: "The oldest and purest way to inspect distillation quality without thermal masking." },
    { id: "peel", name: "CITRUS PEEL", category: "Methods & Tools", subline: "Expressed essential oil garnish", glass: "Coupe or Nick & Nora", method: "Express & Discard", ice: "According to build", garnish: "Wide orange, lemon, or grapefruit swath", formula: "1 wide swath cut without white bitter pith", tip: "Pinch skin side facing the glass at a 45-degree angle over the drink surface so micro-droplets mist the surface tension.", lore: "Originated in 19th-century punches where citrus peel oils (oleo saccharum) provided the core aroma." },
    { id: "pour", name: "JIGGER POUR", category: "Methods & Tools", subline: "Accurate liquid balance measuring", glass: "Any vessel", method: "Meniscus fill & dump", ice: "Not applicable", garnish: "None", formula: "Precise measurements: 0.25 oz to 2.0 oz increments", tip: "Fill jiggers until an upward convex meniscus forms at the absolute top rim before tipping cleanly into the tin.", lore: "Named for the 19th-century 'jigger boss' who dispensed small spirit rations to canal and rail workers." },
    { id: "nip", name: "THE NIP / DRAM", category: "History & Lore", subline: "Historic small spirit measure", glass: "Small copita or dram glass", method: "Hand pour", ice: "None", garnish: "None", formula: "1.0 oz (30 ml) Spirit", tip: "Ideal for hospitality welcomes, bar guest handshakes, and distiller tastings.", lore: "Derived from 'nipperkin', an old English vessel containing under a half-pint of strong ale or cordial." },
    { id: "ale", name: "GINGER ALE", category: "Mixers", subline: "Effervescent sweetened ginger soda", glass: "Collins / Highball", method: "Built gently over ice", ice: "Clear Ice Spear or Cubes", garnish: "Lime wedge or candied ginger", formula: "4.0 oz Ginger Ale\n2.0 oz Whiskey or Brandy", tip: "Pour carbonated mixers down the twisted spiral shaft of a bar spoon to protect carbonation bubbles from bursting.", lore: "Invented in Belfast in the 1850s, later perfected into the pale dry style in Canada in 1904." },
    { id: "pop", name: "CHAMPAGNE POP", category: "History & Lore", subline: "Sparkling cellar tradition", glass: "Flute or Tulip", method: "Slow twist uncorking", ice: "Chilled to 45°F", garnish: "None", formula: "Traditional method sparkling wine under 6 atmospheres of pressure", tip: "Keep your thumb over the cork at all times while untwisting the wire cage, then turn the bottle base rather than the cork.", lore: "English scientist Christopher Merret documented intentional secondary in-bottle carbonation back in 1662." },
    { id: "eau", name: "EAU-DE-VIE", category: "Spirits", subline: "Clear unaged fruit brandy", glass: "Tulip / Grappa Glass", method: "Chilled or ambient neat", ice: "None", garnish: "None", formula: "Pure fermented and distilled fruit (pear, cherry, plum, apple)", tip: "Serve at 55°F (12°C). Never over-chill, or fragile fruit esters will lock up and hide from the nose.", lore: "Translates to 'Water of Life' in French, traditionally distilled across Alsace, Germany, and Switzerland." },
    { id: "ices", name: "BAR ICE SCIENCE", category: "Methods & Tools", subline: "Thermal dilution control", glass: "Mixing glass / Shaker tin", method: "Directional freezing", ice: "Dense clear block ice", garnish: "None", formula: "0°F to 28°F solid frozen density", tip: "Shake drinks with solid, dry, cold cubes. Wet melting ice over-dilutes the wash line before chilling is achieved.", lore: "Frederic Tudor sparked the 19th-century cocktail revolution by shipping fresh New England pond ice worldwide." },
    { id: "aged", name: "BARREL AGING", category: "Spirits", subline: "Charred white oak maturation", glass: "Glencairn", method: "Cask resting", ice: "Optional single cube", garnish: "None", formula: "Spirit extraction, oxidation, and wood subtraction across seasons", tip: "White oak barrels contribute vanillin, lactones (coconut notes), and wood sugars through charred interior staves.", lore: "Charring barrels was originally adopted to sanitize fish and pickle barrels before shipping frontier whiskey." },
    { id: "edge", name: "SALT RIM / CRUSTA", category: "Glassware", subline: "Contrast border application", glass: "Coupe / Rocks", method: "Half-rim swipe", ice: "Fresh cold cubes", garnish: "Flaky sea salt or spiced sugar", formula: "Lime cheek wipe + flaky kosher salt rim", tip: "Salt only half the exterior rim so guests can alternate between salted and clean sips.", lore: "Joseph Santini invented the brandy Crusta in 1850s New Orleans, the direct ancestor of modern salted rims." },
    { id: "egg", name: "ALBUMEN FOAM", category: "Methods & Tools", subline: "Silky cocktail foam texture", glass: "Coupe or Sour Glass", method: "Dry shake, then wet shake", ice: "Strained off ice", garnish: "Angostura bitters drop art", tip: "Dry shake (without ice) for 15 seconds to emulsify egg proteins, then add ice and shake hard to chill and aerate.", lore: "Bartenders began emulsifying egg whites into spirit sours in the 1880s to soften harsh frontier spirits." },
    { id: "mint", name: "MINT SERVICE", category: "Methods & Tools", subline: "Aromatic herb crown handling", glass: "Julep Cup / Highball", method: "Gentle slap expression", ice: "Crushed pebble ice", garnish: "Bouquet of fresh mint sprigs", tip: "Never pulverize mint leaves with a toothed muddler; tearing releases bitter plant chlorophyll. Press gently or clap.", lore: "The Mint Julep was Virginia's morning eye-opener in the early 1800s before turning into a Kentucky Derby icon." },
    { id: "soda", name: "CLUB SODA", category: "Mixers", subline: "Mineralized carbonated lengthener", glass: "Highball", method: "Gently top and lift with barspoon", ice: "Clear spear", garnish: "Citrus twist", formula: "Carbonated water + sodium bicarbonate / potassium sulfate", tip: "Keep club soda bottles stored near 33°F (1°C). Colder liquid holds dissolved CO2 gas with far higher tenacity.", lore: "Joseph Priestley discovered how to carbonate water in Leeds in 1767 by suspending water over beer vats." },
    { id: "proof", name: "PROOF SYSTEM", category: "Spirits", subline: "Ethanol concentration metric", glass: "Any vessel", method: "Hydrometer measurement", ice: "Not applicable", garnish: "None", formula: "Proof = ABV% × 2 (US Standard)", tip: "Higher proof spirits (100+ proof) resist ice dilution longer and carry delicate herbal modifiers with greater backbone.", lore: "British Navy gunpowder would still ignite when soaked in rum tested at 57.1% ABV ('Navy Proof')." },
    { id: "coupe", name: "COUPE GLASS", category: "Glassware", subline: "Classic stemmed cocktail vessel", glass: "5.5 oz (160 ml) Coupe", method: "Pre-chill in freezer", ice: "Served 'Up' (No ice in glass)", garnish: "Twist or Brandied Cherry", formula: "Ideal capacity: 5 to 6 oz with 0.5 oz wash line wash headroom", tip: "Always hold a coupe by the stem; holding the bowl transfers body heat from your palm directly into the cold drink.", lore: "Debunking the myth: the coupe was designed for sparkling wine in England around 1663, not Marie Antoinette." },
    { id: "nose", name: "THE COCKTAIL NOSE", category: "Methods & Tools", subline: "Aroma bouquet appreciation", glass: "Fluted or stemmed", method: "Olfactory inspection", ice: "Properly rested", garnish: "Aromatic citrus or botanical", formula: "Over 80% of perceived flavor is retronasal and orthonasal aroma", tip: "Encourage guests to smell the drink with their mouth slightly open to avoid olfactory fatigue from ethanol fumes.", lore: "Jerry Thomas crowned early cocktails with seasonal berry and citrus tops specifically to charm the nose." }
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
    { id: "first_solve", icon: "🍸", name: "First Service", desc: "Solve your first cocktail crossword" },
    { id: "clean_sweep", icon: "✨", name: "Clean Sweep", desc: "Complete a puzzle with zero hints or errors" },
    { id: "vault_master", icon: "🏆", name: "Vault Master", desc: "Solve all five puzzle editions" },
    { id: "scholar", icon: "📖", name: "Codex Scholar", desc: "Unlock 8 or more bartender codex cards" },
    { id: "speedy", icon: "⚡", name: "Fast Service", desc: "Solve any puzzle in under 2 minutes" },
    { id: "craft_master", icon: "👑", name: "Master of Spirits", desc: "Achieve Level 5 Hospitality Rank" }
  ]
};

/* ==========================================================================
   2. CONTENT VALIDATION ENGINE
   ========================================================================== */
const ContentValidator = {
  validate(data) {
    if (!data || !Array.isArray(data.puzzles) || data.puzzles.length !== 5) {
      console.warn("Content warning: Expected exactly 5 playable puzzle entries.");
    }
    const puzzleIds = new Set();
    data.puzzles.forEach((p, idx) => {
      if (!p.id) throw new Error(`Puzzle at index ${idx} is missing an ID.`);
      if (puzzleIds.has(p.id)) throw new Error(`Duplicate puzzle ID detected: ${p.id}`);
      puzzleIds.add(p.id);

      if (!p.gridSize || typeof p.gridSize.rows !== "number" || typeof p.gridSize.cols !== "number") {
        throw new Error(`Puzzle ${p.id} has invalid gridSize.`);
      }

      // Orthographic intersection validation
      const charMap = new Map();
      p.words.forEach(w => {
        const len = w.answer.length;
        for (let i = 0; i < len; i++) {
          const r = w.dir === "across" ? w.row : w.row + i;
          const c = w.dir === "across" ? w.col + i : w.col;
          const key = `${r},${c}`;
          const letter = w.answer[i].toUpperCase();
          if (charMap.has(key)) {
            const existing = charMap.get(key);
            if (existing !== letter) {
              throw new Error(`Letter mismatch in puzzle ${p.id} at (${r},${c}): "${existing}" vs "${letter}"`);
            }
          } else {
            charMap.set(key, letter);
          }
        }
      });
    });
    return true;
  }
};

/* ==========================================================================
   3. SOUND & HAPTIC ENGINE
   ========================================================================== */
const SoundEngine = (() => {
  let ctx = null;
  let muted = false;

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
    if (muted) return;
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

  const playClick = () => {
    playTone(520, "sine", 0.03, 0.07, 240);
    if (navigator.vibrate) try { navigator.vibrate(8); } catch (e) {}
  };

  const playChime = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [587.33, 880].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.26);
      });
    } catch (e) {}
    if (navigator.vibrate) try { navigator.vibrate(15); } catch (e) {}
  };

  const playFanfare = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.14, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.4);
      });
    } catch (e) {}
    if (navigator.vibrate) try { navigator.vibrate([20, 30, 40]); } catch (e) {}
  };

  const playError = () => {
    playTone(180, "sawtooth", 0.12, 0.09, 110);
    if (navigator.vibrate) try { navigator.vibrate([12, 10, 12]); } catch (e) {}
  };

  const toggleMute = () => {
    muted = !muted;
    try { localStorage.setItem("cc_muted", muted ? "1" : "0"); } catch (e) {}
    return muted;
  };

  const initMute = () => {
    try { muted = localStorage.getItem("cc_muted") === "1"; } catch (e) { muted = false; }
  };

  const isMuted = () => muted;

  return { playClick, playChime, playFanfare, playError, toggleMute, initMute, isMuted };
})();

/* ==========================================================================
   4. CENTRAL GAME STATE & PERSISTENCE
   ========================================================================== */
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
  unlockedCodex: new Set(),
  streak: 1,
  xp: 0,
  puzzlesSolvedCount: 0,
  cleanSweepsCount: 0,
  solvedPuzzleIds: new Set(),
  unlockedBadges: new Set(),

  init() {
    SoundEngine.initMute();
    this.loadPersistence();
  },

  loadPersistence() {
    try {
      const savedUnlocked = localStorage.getItem("cc_unlocked");
      if (savedUnlocked) this.unlockedCodex = new Set(JSON.parse(savedUnlocked));

      const savedSolvedIds = localStorage.getItem("cc_solved_ids");
      if (savedSolvedIds) this.solvedPuzzleIds = new Set(JSON.parse(savedSolvedIds));

      const savedBadges = localStorage.getItem("cc_badges");
      if (savedBadges) this.unlockedBadges = new Set(JSON.parse(savedBadges));

      const savedXp = localStorage.getItem("cc_xp");
      if (savedXp) this.xp = parseInt(savedXp, 10) || 0;

      const savedSolved = localStorage.getItem("cc_solved_count");
      if (savedSolved) this.puzzlesSolvedCount = parseInt(savedSolved, 10) || 0;

      const savedSweeps = localStorage.getItem("cc_clean_sweeps");
      if (savedSweeps) this.cleanSweepsCount = parseInt(savedSweeps, 10) || 0;

      const savedStreak = localStorage.getItem("cc_streak");
      if (savedStreak) this.streak = parseInt(savedStreak, 10) || 1;
    } catch (e) {
      console.warn("Storage read error:", e);
    }
  },

  savePersistence() {
    try {
      localStorage.setItem("cc_unlocked", JSON.stringify([...this.unlockedCodex]));
      localStorage.setItem("cc_solved_ids", JSON.stringify([...this.solvedPuzzleIds]));
      localStorage.setItem("cc_badges", JSON.stringify([...this.unlockedBadges]));
      localStorage.setItem("cc_xp", this.xp.toString());
      localStorage.setItem("cc_solved_count", this.puzzlesSolvedCount.toString());
      localStorage.setItem("cc_clean_sweeps", this.cleanSweepsCount.toString());
      localStorage.setItem("cc_streak", this.streak.toString());
    } catch (e) {
      console.warn("Storage write error:", e);
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
  }
};

/* ==========================================================================
   5. CROSSWORD SOLVING & BOARD ENGINE
   ========================================================================== */
const CrosswordEngine = {
  boardMap: {},

  loadPuzzle(puzzleId) {
    const puzzle = CONTENT_DATA.puzzles.find(p => p.id === puzzleId) || CONTENT_DATA.puzzles[0];
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
    this.updateProgress();
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
    const availWidth = Math.max(260, stage.clientWidth - 16);
    const availHeight = Math.max(220, stage.clientHeight - 16);

    const cellByWidth = Math.floor(availWidth / cols);
    const cellByHeight = Math.floor(availHeight / rows);
    const rawSize = Math.min(cellByWidth, cellByHeight);
    const cellSize = Math.min(Math.max(34, rawSize), 58);

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
          cell.setAttribute("aria-label", `Row ${r + 1}, Column ${c + 1}`);

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
      // Toggle orientation if alternate direction exists at this intersection
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
    this.updateProgress();
  },

  advanceActiveCell(step = 1) {
    const word = GameState.activeWord;
    if (!word) return;

    const len = word.answer.length;
    const offset = word.dir === "across"
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
          setTimeout(() => cell.classList.remove("error-cell"), 1600);
        }
      }
    }

    if (hasMistake) {
      SoundEngine.playError();
      UIController.showToast("Mistakes flagged in red.", "error");
    } else {
      SoundEngine.playChime();
      UIController.showToast("Current word is correct!", "success");
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
    this.updateProgress();
    UIController.showToast("Cleared active word.");
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
      UIController.showToast("Grid is filled, but some letters need adjustment.", "error");
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

    // Calculate XP
    const baseReward = puzzle.tier === "mini" ? 100 : (puzzle.tier === "midi" ? 150 : 250);
    const earnedXp = isFirstSolve ? baseReward : Math.round(baseReward * 0.4);
    GameState.xp += earnedXp;

    // Unlock codex records
    puzzle.words.forEach(w => {
      if (w.codexId) GameState.unlockedCodex.add(w.codexId);
    });

    // Check achievements
    if (GameState.puzzlesSolvedCount >= 1) GameState.unlockedBadges.add("first_solve");
    if (isClean) GameState.unlockedBadges.add("clean_sweep");
    if (GameState.solvedPuzzleIds.size >= 5) GameState.unlockedBadges.add("vault_master");
    if (GameState.unlockedCodex.size >= 8) GameState.unlockedBadges.add("scholar");
    if (GameState.timerSeconds < 120) GameState.unlockedBadges.add("speedy");
    if (GameState.getCurrentRank().current.level >= 5) GameState.unlockedBadges.add("craft_master");

    GameState.savePersistence();

    // Populate victory dialog
    const modal = document.getElementById("modal-victory");
    const vTitle = document.getElementById("victory-puzzle-name");
    const vTime = document.getElementById("vic-time");
    const vHints = document.getElementById("vic-hints");
    const vAcc = document.getElementById("vic-accuracy");

    if (vTitle) vTitle.textContent = puzzle.title;
    if (vTime) vTime.textContent = this.formatTime(GameState.timerSeconds);
    if (vHints) vHints.textContent = GameState.hintsUsed.toString();
    if (vAcc) {
      const accuracy = Math.max(70, 100 - (GameState.errorsCount * 4 + GameState.hintsUsed * 8));
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
   6. UI CONTROLLER & VIEW NAVIGATION
   ========================================================================== */
const UIController = {
  activeTab: "play",
  activeFilter: "all",
  activeCodexCat: "all",

  init() {
    ContentValidator.validate(CONTENT_DATA);
    GameState.init();

    this.bindMasthead();
    this.bindTabs();
    this.bindToolbar();
    this.bindKeyboard();
    this.bindModals();
    this.bindVault();
    this.bindCodex();
    this.bindResize();

    // Start with the first of exactly five challenges
    CrosswordEngine.loadPuzzle(CONTENT_DATA.puzzles[0].id);
    this.renderMastery();
  },

  bindMasthead() {
    const soundBtn = document.getElementById("btn-sound");
    const soundIcon = document.getElementById("sound-icon");

    const updateSoundIcon = () => {
      const muted = SoundEngine.isMuted();
      if (soundIcon) soundIcon.textContent = muted ? "🔇" : "🔊";
      if (soundBtn) {
        soundBtn.setAttribute("aria-label", muted ? "Unmute sound effects" : "Mute sound effects");
      }
    };
    updateSoundIcon();

    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        SoundEngine.toggleMute();
        updateSoundIcon();
        SoundEngine.playClick();
      });
    }

    const quickStatsBtn = document.getElementById("btn-quick-stats");
    if (quickStatsBtn) {
      quickStatsBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        this.switchTab("mastery");
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
      setTimeout(() => CrosswordEngine.renderGrid(), 30);
    } else if (tabName === "puzzles") {
      this.renderPuzzlesVault();
    } else if (tabName === "codex") {
      this.renderCodex();
    } else if (tabName === "mastery") {
      this.renderMastery();
    }
  },

  bindToolbar() {
    const prevBtn = document.getElementById("clue-prev");
    const nextBtn = document.getElementById("clue-next");
    const pauseBtn = document.getElementById("btn-pause-play");
    const restartBtn = document.getElementById("btn-restart-play");
    const resumeBtn = document.getElementById("btn-resume-play");
    const pausedRestartBtn = document.getElementById("btn-restart-paused");
    const hintBtn = document.getElementById("tool-reveal-letter");
    const checkBtn = document.getElementById("tool-check-word");
    const clearBtn = document.getElementById("tool-clear-word");
    const inspectBtn = document.getElementById("tool-inspect-spec");
    const clueMain = document.getElementById("clue-main");

    if (prevBtn) prevBtn.addEventListener("click", () => CrosswordEngine.navigateClue(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => CrosswordEngine.navigateClue(1));
    if (pauseBtn) pauseBtn.addEventListener("click", () => CrosswordEngine.togglePause());
    if (resumeBtn) resumeBtn.addEventListener("click", () => CrosswordEngine.togglePause());

    const doRestart = () => {
      if (confirm("Restart this puzzle from the beginning?")) {
        SoundEngine.playClick();
        const pauseModal = document.getElementById("pause-overlay");
        if (pauseModal) pauseModal.classList.add("hidden");
        CrosswordEngine.loadPuzzle(GameState.currentPuzzle.id);
      }
    };
    if (restartBtn) restartBtn.addEventListener("click", doRestart);
    if (pausedRestartBtn) pausedRestartBtn.addEventListener("click", doRestart);

    if (hintBtn) hintBtn.addEventListener("click", () => CrosswordEngine.revealActiveLetter());
    if (checkBtn) checkBtn.addEventListener("click", () => CrosswordEngine.checkActiveWord());
    if (clearBtn) clearBtn.addEventListener("click", () => CrosswordEngine.clearActiveWord());

    if (clueMain) {
      clueMain.addEventListener("click", () => CrosswordEngine.toggleDirection());
    }

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
        const val