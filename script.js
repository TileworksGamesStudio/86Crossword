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
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.06 + 0.02);
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
        gain.gain.setValueAtTime(0.15, now + idx * 0.09);
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
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.applyData(data);
    } catch (err) {
      console.warn("Could not load external data.json. Using full embedded dataset.", err);
      this.applyEmbeddedFallback();
    }
  },

  applyData(data) {
    if (data && Array.isArray(data.puzzles) && data.puzzles.length > 0) {
      this.puzzles = data.puzzles;
      this.codex = data.codex || [];
      this.ranks = data.ranks || [];
      this.domains = data.domains || [];
    } else {
      this.applyEmbeddedFallback();
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
      },
      {
        id: "mini-2",
        title: "The Citrus Station",
        tier: "mini",
        theme: "Sours, Acid Balance & Aeration",
        blurb: "Master the holy trinity of spirit, citrus, and sweet balance.",
        gridSize: { rows: 5, cols: 5 },
        words: [
          { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SHAKE", clue: "Agitate vigorously with ice to aerate, chill, and dilute citrus drinks", cat: "Methods & Tools", codexId: "shake" },
          { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "ELDER", clue: "Fragrant floral liqueur flavor (St-Germain) dubbed 'bartender's ketchup'", cat: "Spirits", codexId: "specs" },
          { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "SOURS", clue: "Foundational cocktail family defined by spirit, citrus, and sweetener", cat: "Cocktails", codexId: "sours" },
          { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SPECS", clue: "House cocktail measurement guides followed across all bar shifts", cat: "Methods & Tools", codexId: "specs" },
          { id: "2D", num: 2, dir: "down", row: 1, col: 2, answer: "ADD", clue: "Incorporate a modifier or syrup directly into the cocktail shaker tin", cat: "Methods & Tools", codexId: "shake" },
          { id: "4D", num: 4, dir: "down", row: 0, col: 4, answer: "EARNS", clue: "What an attentive bartender does with gratuities through warm hospitality", cat: "History & Lore", codexId: "bar" }
        ]
      },
      {
        id: "mini-3",
        title: "The Stirred Classic",
        tier: "mini",
        theme: "Spirit-Forward Clarity & Stemware",
        blurb: "Explore crystal-clear dilution and vintage glassware silhouettes.",
        gridSize: { rows: 5, cols: 5 },
        words: [
          { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "NEAT", clue: "Served straight from the bottle at ambient room temperature with zero ice", cat: "Methods & Tools", codexId: "shoot" },
          { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "COUPE", clue: "Stemmed shallow-bowled glass preferred for drinks served up without ice", cat: "Glassware", codexId: "coupe" },
          { id: "5A", num: 5, dir: "across", row: 4, col: 1, answer: "STIR", clue: "Mix smoothly with a spiral barspoon to preserve crystal clarity", cat: "Methods & Tools", codexId: "stir" },
          { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "NICK", clue: "Stemware partner to Nora, named after the 1934 'Thin Man' cinematic sleuths", cat: "Glassware", codexId: "coupe" },
          { id: "2D", num: 2, dir: "down", row: 0, col: 3, answer: "TOP", clue: "Crown a highball or fizz with sparkling soda or champagne", cat: "Methods & Tools", codexId: "specs" },
          { id: "4D", num: 4, dir: "down", row: 2, col: 4, answer: "EAR", clue: "Sensory organ that monitors the acoustic rhythm of shaking or stirring ice", cat: "Methods & Tools", codexId: "shake" }
        ]
      },
      {
        id: "midi-1",
        title: "Old New Orleans Quarter",
        tier: "midi",
        theme: "Creole Heritage, Sazeracs & French Quarter Apothecaries",
        blurb: "Journey through the French Quarter cradle of American cocktail culture.",
        gridSize: { rows: 7, cols: 7 },
        words: [
          { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SAZERAC", clue: "New Orleans icon combining rye, sugar, Peychaud's, and an absinthe rinse", cat: "Cocktails", codexId: "sazerac" },
          { id: "4A", num: 4, dir: "across", row: 2, col: 1, answer: "ANISE", clue: "Licorice-like botanical signature characterizing both absinthe and pastis", cat: "Spirits", codexId: "absinthe" },
          { id: "6A", num: 6, dir: "across", row: 4, col: 0, answer: "GLASS", clue: "Heavy-bottomed tumbler pre-chilled with crushed ice before the absinthe rinse", cat: "Glassware", codexId: "coupe" },
          { id: "8A", num: 8, dir: "across", row: 6, col: 1, answer: "NEAT", clue: "Served without ice cubes in the finished rocks glass, per authentic Creole spec", cat: "Methods & Tools", codexId: "sazerac" },
          { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SLING", clue: "Ancestral 19th-century drink formula of spirit, sugar, water, and nutmeg", cat: "History & Lore", codexId: "bar" },
          { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "ZINC", clue: "Classic metal bar-top material prized in historic French and Creole bistros", cat: "History & Lore", codexId: "bar" },
          { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "ROSES", clue: "Floral aromatic profile echoing the delicate cherry-floral notes in Creole bitters", cat: "Spirits", codexId: "peychaud" },
          { id: "5D", num: 5, dir: "down", row: 4, col: 2, answer: "AGE", clue: "Charred oak maturation that imparts peppery spice and vanilla to rye whiskey", cat: "Spirits", codexId: "rye" }
        ]
      },
      {
        id: "main-1",
        title: "The Grand Savoy Compendium",
        tier: "main",
        theme: "London Classics, Grand Hotel Culture & The American Bar",
        blurb: "A rich 9×9 honoring Ada Coleman, Harry Craddock, and European mixology craft.",
        gridSize: { rows: 9, cols: 9 },
        words: [
          { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "NEGRONI", clue: "Florentine icon created when Count Camillo requested gin instead of soda", cat: "Cocktails", codexId: "negroni" },
          { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "CANE", clue: "Sugar crop providing molasses and raw juice for rum distillation", cat: "Spirits", codexId: "specs" },
          { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "STIR", clue: "Mixing technique Harry Craddock specified to preserve jewel-like clarity", cat: "Methods & Tools", codexId: "stir" },
          { id: "7A", num: 7, dir: "across", row: 6, col: 2, answer: "AMARO", clue: "Herbal bitter elixir family including Campari, Averna, and Cynar", cat: "Spirits", codexId: "amaro" },
          { id: "9A", num: 9, dir: "across", row: 8, col: 2, answer: "SWEET", clue: "Red botanical vermouth partner balancing London Dry Gin in the Negroni", cat: "Spirits", codexId: "negroni" },
          { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "NICK", clue: "Delicate stemmed glass shape featured heavily in vintage hotel cocktail books", cat: "Glassware", codexId: "coupe" },
          { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "GIN", clue: "Juniper-led botanical spirit forming the backbone of the Savoy cocktail canon", cat: "Spirits", codexId: "gin" },
          { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "OLD", clue: "Victorian sweeter gin style ('___ Tom') bridging genever and London dry", cat: "Spirits", codexId: "gin" },
          { id: "4D", num: 4, dir: "down", row: 4, col: 0, answer: "SOUR", clue: "Core cocktail archetype of spirit, lemon or lime, and balancing sugar", cat: "Cocktails", codexId: "sours" },
          { id: "5D", num: 5, dir: "down", row: 4, col: 3, answer: "RUMS", clue: "Distilled sugarcane spirits championed in Caribbean swizzles and punches", cat: "Spirits", codexId: "specs" },
          { id: "6D", num: 6, dir: "down", row: 6, col: 5, answer: "RYE", clue: "Spicy American grain whiskey that anchors the Manhattan and Sazerac", cat: "Spirits", codexId: "rye" },
          { id: "7D", num: 7, dir: "down", row: 0, col: 6, answer: "ICE", clue: "The essential thermal coolant whose quality and density define drink texture", cat: "Methods & Tools", codexId: "ice" }
        ]
      }
    ];

    this.codex = [
      {
        id: "negroni",
        name: "Negroni",
        category: "Cocktails",
        subline: "Aperitivo Archetype • Florence, Italy c. 1919",
        glass: "Double Rocks Glass",
        method: "Stirred over ice until chilled and diluted (~30s)",
        ice: "Single large clear crystal cube",
        garnish: "Expressed orange peel swath or fresh wheel",
        formula: "1.0 oz (30 ml) London Dry Gin\n1.0 oz (30 ml) Campari\n1.0 oz (30 ml) Sweet Vermouth",
        tip: "Equal parts simplicity hides a delicate thermal balance. Stir for 30–40 seconds to achieve 25% dilution, which opens botanical aromatics and softens bitter gentian.",
        lore: "Legend holds that Count Camillo Negroni asked bartender Fosco Scarselli at Caffè Casoni in Florence to strengthen his favorite Americano by swapping soda water for gin."
      },
      {
        id: "sazerac",
        name: "Sazerac",
        category: "Cocktails",
        subline: "Official Cocktail of New Orleans c. 1850s",
        glass: "Chilled Rocks Glass (served neat)",
        method: "Stirred with ice, strained into absinthe-rinsed glass",
        ice: "Ice in mixing glass only; none in service glass",
        garnish: "Expressed lemon twist (expressed over top and discarded)",
        formula: "2.0 oz (60 ml) Rye Whiskey (or Cognac)\n0.25 oz (7.5 ml) Rich Demerara Syrup\n3–4 dashes Peychaud's Bitters\n1 dash Angostura Bitters\nAbsinthe rinse",
        tip: "Pack the serving rocks glass with crushed ice to freeze the crystal while you stir the cocktail. Dump the ice, coat the cold glass interior with an absinthe atomizer or rinse, then strain.",
        lore: "Originally crafted with Sazerac de Forge et Fils Cognac at the Sazerac Coffee House before transitioning to Maryland and Pennsylvania rye whiskeys."
      },
      {
        id: "sours",
        name: "The Sour Family",
        category: "Cocktails",
        subline: "The Cornerstone of Balance (Spirit, Citrus, Sugar)",
        glass: "Coupe, Nick & Nora, or Rocks",
        method: "Vigorously shaken with ice (optional dry shake for egg white)",
        ice: "Strained neat into chilled coupe or over fresh rock",
        garnish: "Citrus wheel, twist, or Angostura aromatic drops",
        formula: "2.0 oz (60 ml) Base Spirit\n0.75 oz (22.5 ml) Fresh Citrus Juice\n0.75 oz (22.5 ml) Simple Syrup",
        tip: "Citrus acidity varies across seasons. Straw-taste fresh juice daily; dial sugar back an eighth-ounce in midsummer when limes are sweeter.",
        lore: "Derived from British Royal Navy rations where rum or gin was cut with lime juice and raw sugar to ward off scurvy, transforming medicinal necessity into modern mixology."
      },
      {
        id: "amaro",
        name: "Amaro",
        category: "Spirits",
        subline: "Italian Bittersweet Herbal Liqueurs",
        glass: "Rocks Glass or Neat Snifter",
        method: "Neat, built over ice, or stirred as a cocktail modifier",
        ice: "Optional large rock with orange slice",
        garnish: "Orange peel or expressed lemon twist",
        formula: "Neutral spirit macerated with botanicals (gentian, rhubarb, cinchona, wormwood, cardamoms, citrus rinds) and aged in oak casks.",
        tip: "Lighter aperitivo styles (Aperol, Select) stimulate salivary flow before meals; darker digestivo styles (Averna, Cynar) rely on bitter alpine roots.",
        lore: "Born in medieval monasteries and apothecary shops across Italy as medicinal restoratives before flourishing in 19th-century café culture."
      },
      {
        id: "gin",
        name: "London Dry Gin",
        category: "Spirits",
        subline: "Juniper-Led Distillation Aristocrat",
        glass: "Martini, Nick & Nora, or Highball",
        method: "Stirred, shaken, or built in highballs",
        ice: "Dense crystal ice",
        garnish: "Lemon swath, olive, or lime wheel",
        formula: "Neutral spirit redistilled with botanicals dominated by juniper, coriander seed, angelica root, and citrus peels, with zero post-distillation sugar added.",
        tip: "London Dry is a production technique, not a geographic designation. It can be made anywhere provided all flavors are imparted purely through distillation.",
        lore: "The British Gin Craze prompted Parliament to pass distillation acts that elevated crude 'bathtub' hooch into one of the world's most sophisticated spirits."
      },
      {
        id: "rye",
        name: "Rye Whiskey",
        category: "Spirits",
        subline: "Peppery, Robust American Heritage Grain",
        glass: "Rocks Glass or Glencairn",
        method: "Spirit-forward stirred classics or neat",
        ice: "Large rock or neat pour",
        garnish: "Brandied cherry or lemon twist",
        formula: "Distilled from a mashbill of at least 51% rye grain, aged in new charred oak barrels at under 125 proof entry.",
        tip: "Rye whiskey possesses a sharp, peppery grain bite and herbaceous dryness that refuses to be overshadowed by sweet vermouth or herbal liqueurs.",
        lore: "Rye was the dominant American whiskey prior to Prohibition, distilled by early Scottish, Irish, and German settlers across Pennsylvania and Maryland."
      },
      {
        id: "absinthe",
        name: "Absinthe",
        category: "Spirits",
        subline: "The Green Fairy: Grande Wormwood, Anise & Fennel",
        glass: "Pontarlier Glass or Mist/Rinse Atomizer",
        method: "Slow French ice-water drip fountain or glass rinse",
        ice: "Cold iced water slow drip",
        garnish: "None",
        formula: "High-proof spirit redistilled with the 'holy trinity' of botanicals: Artemisia absinthium (grande wormwood), green anise seed, and Florence fennel.",
        tip: "A tiny atomizer mist (or a 1-barspoon rinse rolled around the glass interior) provides intense aromatics without overwhelming delicate balance.",
        lore: "Banned unfairly in 1912 due to moral panic. Modern testing proved vintage absinthes never contained dangerous thujone levels, leading to worldwide legalization."
      },
      {
        id: "peychaud",
        name: "Peychaud's Bitters",
        category: "Spirits",
        subline: "Creole Aromatic Bitters of New Orleans",
        glass: "Bar Bottle with Precision Dasher",
        method: "Dashed into cocktail tins and mixing glasses",
        ice: "N/A",
        garnish: "N/A",
        formula: "Gentian-based aromatic tincture infused with anise seed, cherry bark, nutmeg, and clove, distinguished by its vibrant crimson hue.",
        tip: "Much lighter, more floral, and sweeter than clove-heavy Angostura. Indispensable for authentic New Orleans classics like the Sazerac and Vieux Carré.",
        lore: "Formulated in the 1830s by Antoine Amédée Peychaud, a Haitian apothecary who settled in New Orleans and dispensed medicinal toddies."
      },
      {
        id: "specs",
        name: "Cocktail Specs",
        category: "Methods & Tools",
        subline: "The Standard Bartender Recipe Canon",
        glass: "All Glassware",
        method: "Volumetric jigger measurement",
        ice: "Varies by recipe",
        garnish: "Prescribed garnish",
        formula: "Standard documented liquid formulas specifying base spirits, modifiers, acids, sweeteners, dilution targets, and wash lines.",
        tip: "Always pour cheapest ingredients first (citrus juices, simple syrups) before adding rare spirits. If you mismeasure, you waste cents rather than dollars.",
        lore: "From 19th-century salon logbooks to modern bar manuals, documented specs ensure a cocktail tastes identical regardless of which bartender is on shift."
      },
      {
        id: "shake",
        name: "Shaking Technique",
        category: "Methods & Tools",
        subline: "Aeration, Rapid Chilling & Micro-Emulsion",
        glass: "Two-Piece Boston Tin on Tin",
        method: "Vigorous horizontal shaking with dense ice",
        ice: "High surface-area ice cubes",
        garnish: "N/A",
        formula: "Applied to cocktails containing citrus, egg whites, cream, or fruit purées to emulsify liquids and incorporate thousands of microscopic air bubbles.",
        tip: "Shake horizontally with authority along the line of your shoulders. You are creating a velvet foam cap and achieving 25% dilution in 10–12 seconds.",
        lore: "Patented in the mid-19th century, metal shaking tins replaced the risky practice of 'throwing' cocktails between two fragile glass tumblers."
      },
      {
        id: "stir",
        name: "Stirring Technique",
        category: "Methods & Tools",
        subline: "Silky Texture & Crystal Clarity",
        glass: "Heavy Mixing Glass & Spiral Barspoon",
        method: "Fluid push-pull glide around the interior wall",
        ice: "Dense, dry, solid ice blocks or cubes",
        garnish: "N/A",
        formula: "Reserved exclusively for spirit-forward cocktails without juice or dairy to chill without cloudiness or air bubbles.",
        tip: "Keep the back of the spoon flat against the interior glass wall. Drive the orbit using your fingertips, not your wrist or arm.",
        lore: "Promoted by early London and New York private clubs to ensure spirit-forward cocktails remained gem-like, clear, and luxuriously heavy on the tongue."
      },
      {
        id: "twist",
        name: "Citrus Twist Expression",
        category: "Methods & Tools",
        subline: "Essential Aromatic Oil Dispersion",
        glass: "Coupe, Nick & Nora, or Rocks Glass",
        method: "Fold skin-side outward over drink surface",
        ice: "N/A",
        garnish: "Swath dropped, trimmed, or discarded",
        formula: "Wide swath or strip of fresh citrus peel cleanly cut with minimal bitter white pith.",
        tip: "Express the peel skin-side outward at a 45-degree angle 2 inches above the glass to coat the surface tension with volatile citrus oils.",
        lore: "Standardized in late-19th-century hotel lounges to deliver aromatics without introducing acidic liquid into dry, spirit-forward drinks."
      },
      {
        id: "ice",
        name: "Cocktail Ice Physics",
        category: "Methods & Tools",
        subline: "Thermal Mass, Dilution & Crystal Clarity",
        glass: "All Barware",
        method: "Directional freezing for pure crystal blocks",
        ice: "Large cubes, spheres, collins spears, crushed ice",
        garnish: "N/A",
        formula: "Directional freezing freezes water from the top down, pushing dissolved air and minerals to the bottom to yield 100% transparent thermal mass.",
        tip: "There is no chilling without dilution. Dense, dry, zero-void clear ice melts at a predictable rate, keeping a drink ice-cold without making it watery.",
        lore: "Frederic Tudor founded the global ice trade in the early 1800s, carving New England pond blocks and shipping them insulated in sawdust worldwide."
      },
      {
        id: "coupe",
        name: "Coupe Glass",
        category: "Glassware",
        subline: "The Definitive Stemmed Up-Glass Silhouette",
        glass: "5.5 oz to 7 oz Stemmed Coupe",
        method: "Pre-chilled with ice water or freezer staging",
        ice: "No ice in service glass",
        garnish: "Citrus swath or maraschino cherry",
        formula: "Broad, shallow bowl mounted on a slender stem designed for cocktails served 'up' (without ice in the glass).",
        tip: "Always hold the vessel exclusively by the stem. Holding the bowl directly transfers hand heat to the chilled liquid within seconds.",
        lore: "The legend that it was molded from Marie Antoinette is false; the coupe was designed by English glassmakers in the 1660s for sparkling wine."
      },
      {
        id: "start",
        name: "Mise en Place",
        category: "Methods & Tools",
        subline: "The Station Prep & Bar Readiness",
        glass: "The Well Station",
        method: "Sanitation, staging, and muscle memory alignment",
        ice: "Freshly burned and refilled ice wells",
        garnish: "Garnish caddy cut fresh, squeeze bottles primed",
        formula: "The French culinary philosophy applied to the bar: everything in its deliberate, ergonomic place prior to welcoming the first customer.",
        tip: "Speed is an outcome of economy of motion. When tools and bottles reside in identical muscle-memory positions, service flows effortlessly.",
        lore: "Perfected in legendary hotel bars like London's Savoy and the Paris Ritz, where master bartenders handled relentless rush tickets with serene calm."
      },
      {
        id: "bar",
        name: "The Bar as Third Space",
        category: "History & Lore",
        subline: "Hospitality, Sanctuary & Community",
        glass: "All Vessels",
        method: "Warm greeting, eye contact, thoughtful pacing",
        ice: "Hospitality benchmark",
        garnish: "Attentive guest care",
        formula: "Physical wooden counter, speed rail, mirrored backbar, and stools creating a welcoming public social sanctuary.",
        tip: "A flawless drink cannot redeem cold service, but genuine hospitality and warmth can elevate an entire evening into an unforgettable memory.",
        lore: "Derived from the physical wooden barrier that separated patrons from spirits in 18th-century inns, the modern bar evolved into a democratic sanctuary."
      },
      {
        id: "shoot",
        name: "The Staff Toast & Handshake",
        category: "History & Lore",
        subline: "Hospitality Solidarity & Industry Ritual",
        glass: "Shot Glass, Pony Glass, or Snifter",
        method: "Neat pour shared in solidarity",
        ice: "None",
        garnish: "None",
        formula: "1.0 oz neat measure (traditionally Fernet-Branca, Mezcal, or Chartreuse) poured to welcome visiting industry peers.",
        tip: "Never toast in a way that interrupts guest focus or compromises clean professional service standards.",
        lore: "Fernet-Branca became celebrated as the global 'Bartender's Handshake' during the 2000s craft cocktail revival in San Francisco and New York."
      }
    ];

    this.ranks = [
      { level: 1, title: "Barback Apprentice", xpRequired: 0, icon: "🌱" },
      { level: 2, title: "Junior Mixologist", xpRequired: 200, icon: "🍋" },
      { level: 3, title: "Senior Bartender", xpRequired: 500, icon: "🍹" },
      { level: 4, title: "Head Mixologist", xpRequired: 1000, icon: "🍸" },
      { level: 5, title: "Master of Spirits", xpRequired: 1600, icon: "👑" }
    ];

    this.domains = [
      { id: "cocktails", name: "Classic Cocktails & Specs", weight: 25 },
      { id: "spirits", name: "Spirits & Liqueurs", weight: 25 },
      { id: "methods", name: "Techniques & Dilution", weight: 20 },
      { id: "glassware", name: "Glassware & Presentation", weight: 15 },
      { id: "history", name: "Cocktail History & Lore", weight: 15 }
    ];
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
  boardMap: {}, // key: "r,c" -> { letter, num, words: { across: wordObj, down: wordObj } }

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

    // Pick first word
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
    if (!gridEl || !boardStage) return;

    const { rows, cols } = GameState.currentPuzzle.gridSize;

    // Calculate dynamic responsive cell sizing to fit viewport flawlessly
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

    // If tapping the already active cell, toggle direction if the cell intersects both
    if (GameState.activeCell.r === r && GameState.activeCell.c === c) {
      const otherDir = GameState.activeDirection === "across" ? "down" : "across";
      if (cellData.words[otherDir]) {
        GameState.activeDirection = otherDir;
        GameState.activeWord = cellData.words[otherDir];
      }
    } else {
      // Selecting a new cell
      GameState.activeCell = { r, c };
      // Prefer current direction if available; otherwise switch
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

    // Clear any previous error highlight on write
    const parentCell = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
    if (parentCell) parentCell.classList.remove("error-cell");

    // Advance forward in the active word
    this.advanceActiveCell(1);
    this.checkPuzzleCompletion();
  },

  handleBackspace() {
    if (GameState.isSolved || GameState.isPaused) return;
    const { r, c } = GameState.activeCell;
    const key = `${r},${c}`;

    SoundEngine.playClick();

    // If cell has a letter, clear it. If empty, step back and clear that one.
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

      // Do not clear revealed hint letters
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

    // Reward calculations
    const puzzle = GameState.currentPuzzle;
    const isFirstTime = !GameState.solvedPuzzleIds.has(puzzle.id);
    GameState.solvedPuzzleIds.add(puzzle.id);
    GameState.puzzlesSolvedCount++;

    const isCleanSweep = (GameState.hintsUsed === 0 && GameState.errorsCount === 0);
    if (isCleanSweep) GameState.cleanSweepsCount++;

    const xpEarned = puzzle.tier === "mini" ? 100 : (puzzle.tier === "midi" ? 150 : 250);
    GameState.xp += xpEarned;

    // Unlock codex items associated with this puzzle
    puzzle.words.forEach(w => {
      if (w.codexId) GameState.unlockedCodex.add(w.codexId);
    });

    GameState.savePersistence();

    // Populate Victory Dialog
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

    // Spotlight one featured codex item
    const firstCodexWord = puzzle.words.find(w => w.codexId);
    const spec = GameState.codex.find(c => c.id === (firstCodexWord ? firstCodexWord.codexId : "negroni"));
    if (spec) {
      const sName = document.getElementById("vic-spec-name");
      const sFam = document.getElementById("vic-spec-family");
      const sDesc = document.getElementById("vic-spec-desc");
      if (sName) sName.textContent = spec.name.toUpperCase();
      if (sFam) sFam.textContent = `${spec.category} • ${spec.glass} • ${spec.method.split(' ')[0]}`;
      if (sDesc) sDesc.textContent = spec.tip;
    }

    if (vicModal) vicModal.classList.remove("hidden");
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
    const timerEl = document.getElementById("play-timer");
    if (timerEl) {
      timerEl.textContent = this.formatTime(GameState.timerSeconds);
    }
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
};

/* ==========================================================================
   4. UI CONTROLLERS (TABS, CODEX, VAULT, MASTERY)
   ========================================================================== */
const UIController = {
  activeTab: "play",
  activeFilter: "all",
  activeCodexCat: "all",

  init() {
    this.bindMasthead();
    this.bindTabs();
    this.bindSolvingToolbar();
    this.bindKeyboard();
    this.bindModals();
    this.bindVault();
    this.bindCodex();
    this.bindWindowResize();

    // Initial render
    this.updateMastheadStats();
    CrosswordEngine.loadPuzzle("mini-1");
  },

  bindMasthead() {
    const soundBtn = document.getElementById("btn-sound");
    const soundOnIcon = document.getElementById("sound-icon-on");
    const soundOffIcon = document.getElementById("sound-icon-off");

    const updateSoundIcons = (muted) => {
      if (soundOnIcon) soundOnIcon.classList.toggle("hidden", muted);
      if (soundOffIcon) soundOffIcon.classList.toggle("hidden", !muted);
    };

    updateSoundIcons(SoundEngine.isMuted());

    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const isMuted = SoundEngine.toggleMute();
        updateSoundIcons(isMuted);
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
    const tabBtns = document.querySelectorAll(".nav-tab");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        SoundEngine.playClick();
        this.switchTab(target);
      });
    });
  },

  switchTab(tabName) {
    this.activeTab = tabName;

    document.querySelectorAll(".nav-tab").forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    document.querySelectorAll(".app-view").forEach(view => {
      view.classList.remove("active");
    });

    const activeView = document.getElementById(`view-${tabName}`);
    if (activeView) activeView.classList.add("active");

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

  bindSolvingToolbar() {
    const prevBtn = document.getElementById("clue-prev");
    const nextBtn = document.getElementById("clue-next");
    const pauseBtn = document.getElementById("btn-pause-play");
    const resumeBtn = document.getElementById("btn-resume-play");
    const hintBtn = document.getElementById("tool-reveal-letter");
    const checkBtn = document.getElementById("tool-check-word");
    const clearBtn = document.getElementById("tool-clear-word");
    const inspectBtn = document.getElementById("tool-inspect-spec");
    const clueBar = document.getElementById("active-clue-bar");

    if (prevBtn) prevBtn.addEventListener("click", () => CrosswordEngine.navigateClue(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => CrosswordEngine.navigateClue(1));
    if (pauseBtn) pauseBtn.addEventListener("click", () => CrosswordEngine.togglePause());
    if (resumeBtn) resumeBtn.addEventListener("click", () => CrosswordEngine.togglePause());
    if (hintBtn) hintBtn.addEventListener("click", () => CrosswordEngine.revealActiveLetter());
    if (checkBtn) checkBtn.addEventListener("click", () => CrosswordEngine.checkActiveWord());
    if (clearBtn) clearBtn.addEventListener("click", () => CrosswordEngine.clearActiveWord());

    if (clueBar) {
      clueBar.addEventListener("click", (e) => {
        if (!e.target.closest(".clue-nav-btn")) {
          CrosswordEngine.toggleDirection();
        }
      });
    }

    if (inspectBtn) {
      inspectBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        const word = GameState.activeWord;
        const codexId = word ? word.codexId : "negroni";
        this.openSpecModal(codexId);
      });
    }
  },

  bindKeyboard() {
    // Physical hardware typing
    window.addEventListener("keydown", (e) => {
      if (this.activeTab !== "play") return;

      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) return;

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

    // Virtual touch keyboard
    const keys = document.querySelectorAll(".kb-key");
    keys.forEach(k => {
      k.addEventListener("click", (e) => {
        e.preventDefault();
        const keyVal = k.dataset.key;
        if (keyVal === "BACKSPACE") {
          CrosswordEngine.handleBackspace();
        } else if (keyVal) {
          CrosswordEngine.inputLetter(keyVal);
        }
      });
    });

    const dirToggleBtn = document.getElementById("key-toggle-dir");
    if (dirToggleBtn) {
      dirToggleBtn.addEventListener("click", () => CrosswordEngine.toggleDirection());
    }
  },

  bindModals() {
    // Victory modal buttons
    const btnNext = document.getElementById("btn-next-puzzle");
    const btnCodexVic = document.getElementById("btn-view-in-codex");
    const btnCloseVic = document.getElementById("btn-close-victory");
    const victoryModal = document.getElementById("modal-victory");

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        SoundEngine.playClick();
        if (victoryModal) victoryModal.classList.add("hidden");
        const currIdx = GameState.puzzles.findIndex(p => p.id === GameState.currentPuzzle.id);
        const nextPuzzle = GameState.puzzles[(currIdx + 1) % GameState.puzzles.length];
        CrosswordEngine.loadPuzzle(nextPuzzle.id);
      });
    }

    if (btnCodexVic) {
      btnCodexVic.addEventListener("click", () => {
        SoundEngine.playClick();
        if (victoryModal) victoryModal.classList.add("hidden");
        this.switchTab("codex");
      });
    }

    if (btnCloseVic) {
      btnCloseVic.addEventListener("click", () => {
        SoundEngine.playClick();
        if (victoryModal) victoryModal.classList.add("hidden");
      });
    }

    // Codex spec modal close
    const btnCloseSpec = document.getElementById("btn-close-spec-modal");
    const specModal = document.getElementById("modal-codex-spec");

    if (btnCloseSpec) {
      btnCloseSpec.addEventListener("click", () => {
        SoundEngine.playClick();
        if (specModal) specModal.classList.add("hidden");
      });
    }

    // Close on backdrop tap
    [victoryModal, specModal].forEach(modal => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) modal.classList.add("hidden");
        });
      }
    });
  },

  bindVault() {
    const filterChips = document.querySelectorAll(".filter-chip");
    filterChips.forEach(chip => {
      chip.addEventListener("click", () => {
        SoundEngine.playClick();
        filterChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeFilter = chip.dataset.filter;
        this.renderPuzzlesVault();
      });
    });

    const playDailyBtn = document.getElementById("btn-play-daily");
    if (playDailyBtn) {
      playDailyBtn.addEventListener("click", () => {
        SoundEngine.playClick();
        this.switchTab("play");
        CrosswordEngine.loadPuzzle("mini-1");
      });
    }
  },

  renderPuzzlesVault() {
    const list = document.getElementById("puzzles-list");
    if (!list) return;

    list.innerHTML = "";
    const filtered = GameState.puzzles.filter(p => {
      if (this.activeFilter === "all") return true;
      return p.tier === this.activeFilter;
    });

    filtered.forEach(p => {
      const isSolved = GameState.solvedPuzzleIds.has(p.id);
      const card = document.createElement("div");
      card.className = "puzzle-card";
      card.innerHTML = `
        <div class="pc-top">
          <span class="pc-tier ${p.tier}">${p.tier.toUpperCase()}</span>
          <span class="pc-status">${isSolved ? "SOLVED ✓" : "UNSOLVED"}</span>
        </div>
        <div class="pc-title">${p.title}</div>
        <div class="pc-desc">${p.blurb}</div>
        <div class="pc-footer">
          <span>${p.gridSize.rows}×${p.gridSize.cols} Grid</span>
          <span class="pc-best-time">${isSolved ? "Mastered" : "+XP Points"}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        SoundEngine.playClick();
        this.switchTab("play");
        CrosswordEngine.loadPuzzle(p.id);
      });

      list.appendChild(card);
    });
  },

  bindCodex() {
    const searchInput = document.getElementById("codex-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderCodex(e.target.value.toLowerCase().trim());
      });
    }

    const catChips = document.querySelectorAll(".codex-filter");
    catChips.forEach(chip => {
      chip.addEventListener("click", () => {
        SoundEngine.playClick();
        catChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeCodexCat = chip.dataset.cat;
        this.renderCodex(searchInput ? searchInput.value.toLowerCase().trim() : "");
      });
    });
  },

  renderCodex(searchTerm = "") {
    const grid = document.getElementById("codex-grid");
    const countEl = document.getElementById("codex-unlocked-count");
    if (!grid) return;

    grid.innerHTML = "";

    const allRecords = GameState.codex;
    const unlockedCount = GameState.unlockedCodex.size;
    if (countEl) {
      countEl.textContent = `Unlocked: ${unlockedCount} / ${allRecords.length} Records`;
    }

    const filtered = allRecords.filter(item => {
      const matchCat = this.activeCodexCat === "all" || item.category === this.activeCodexCat;
      const matchSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm) ||
        (item.formula && item.formula.toLowerCase().includes(searchTerm));
      return matchCat && matchSearch;
    });

    filtered.forEach(spec => {
      const isUnlocked = GameState.unlockedCodex.has(spec.id);
      const card = document.createElement("div");
      card.className = `codex-card ${isUnlocked ? "" : "locked"}`;
      card.innerHTML = `
        <div class="cc-header">
          <span class="cc-cat">${spec.category}</span>
          <span class="cc-lock-icon">${isUnlocked ? "📖" : "🔒"}</span>
        </div>
        <div class="cc-title">${spec.name}</div>
        <div class="cc-subline">${isUnlocked ? spec.subline : "Locked Formula"}</div>
        <div class="cc-desc">${isUnlocked ? spec.tip : "Solve crossword puzzles referencing this bar concept to unlock the master formula."}</div>
      `;

      if (isUnlocked) {
        card.addEventListener("click", () => {
          SoundEngine.playClick();
          this.openSpecModal(spec.id);
        });
      }

      grid.appendChild(card);
    });
  },

  openSpecModal(specId) {
    const spec = GameState.codex.find(c => c.id === specId) || GameState.codex[0];
    if (!spec) return;

    const modal = document.getElementById("modal-codex-spec");
    const cat = document.getElementById("modal-spec-cat");
    const title = document.getElementById("codex-modal-title");
    const subline = document.getElementById("modal-spec-subline");
    const glass = document.getElementById("modal-spec-glass");
    const method = document.getElementById("modal-spec-method");
    const ice = document.getElementById("modal-spec-ice");
    const garnish = document.getElementById("modal-spec-garnish");
    const formula = document.getElementById("modal-spec-formula");
    const tip = document.getElementById("modal-spec-tip");
    const lore = document.getElementById("modal-spec-lore");

    if (cat) cat.textContent = spec.category;
    if (title) title.textContent = spec.name.toUpperCase();
    if (subline) subline.textContent = spec.subline;
    if (glass) glass.textContent = spec.glass || "Standard Glassware";
    if (method) method.textContent = spec.method || "Stirred or Shaken";
    if (ice) ice.textContent = spec.ice || "Fresh Ice";
    if (garnish) garnish.textContent = spec.garnish || "Citrus expression";
    if (formula) formula.textContent = spec.formula || "Classified bartender ratio.";
    if (tip) tip.textContent = spec.tip || "Maintain consistent thermal dilution.";
    if (lore) lore.textContent = spec.lore || "A venerable classic in cocktail heritage.";

    if (modal) modal.classList.remove("hidden");
  },

  renderMastery() {
    this.updateMastheadStats();

    // Ranks calculation
    const xp = GameState.xp;
    const ranks = GameState.ranks.length > 0 ? GameState.ranks : [
      { level: 1, title: "Barback Apprentice", xpRequired: 0, icon: "🌱" },
      { level: 2, title: "Junior Mixologist", xpRequired: 200, icon: "🍋" },
      { level: 3, title: "Senior Bartender", xpRequired: 500, icon: "🍹" },
      { level: 4, title: "Head Mixologist", xpRequired: 1000, icon: "🍸" },
      { level: 5, title: "Master of Spirits", xpRequired: 1600, icon: "👑" }
    ];

    let currentRank = ranks[0];
    let nextRank = ranks[1] || ranks[0];

    for (let i = 0; i < ranks.length; i++) {
      if (xp >= ranks[i].xpRequired) {
        currentRank = ranks[i];
        nextRank = ranks[i + 1] || ranks[i];
      }
    }

    const rankIcon = document.getElementById("profile-rank-icon");
    const rankTitle = document.getElementById("profile-rank-title");
    const rankSub = document.getElementById("profile-rank-sub");
    const xpFill = document.getElementById("profile-xp-fill");

    if (rankIcon) rankIcon.textContent = currentRank.icon;
    if (rankTitle) rankTitle.textContent = currentRank.title;
    if (rankSub) rankSub.textContent = `Rank Level ${currentRank.level} • ${xp} Knowledge XP`;

    if (xpFill) {
      const span = Math.max(1, nextRank.xpRequired - currentRank.xpRequired);
      const progress = Math.min(100, Math.max(10, Math.round(((xp - currentRank.xpRequired) / span) * 100)));
      xpFill.style.width = `${progress}%`;
    }

    // Stats box
    const statSolved = document.getElementById("stat-puzzles-solved");
    const statUnlocked = document.getElementById("stat-words-unlocked");
    const statClean = document.getElementById("stat-clean-sweeps");
    const statStreak = document.getElementById("stat-streak-high");

    if (statSolved) statSolved.textContent = GameState.puzzlesSolvedCount.toString();
    if (statUnlocked) statUnlocked.textContent = GameState.unlockedCodex.size.toString();
    if (statClean) statClean.textContent = GameState.cleanSweepsCount.toString();
    if (statStreak) statStreak.textContent = GameState.streak.toString();

    // Render Honors Badges
    const badgeGrid = document.getElementById("achievements-grid");
    if (badgeGrid) {
      badgeGrid.innerHTML = "";
      const badges = [
        { id: "b1", icon: "🌱", name: "First Shift", desc: "Complete 1 crossword", unlocked: GameState.puzzlesSolvedCount >= 1 },
        { id: "b2", icon: "🍸", name: "Clean Sweep", desc: "Solve with 0 hints", unlocked: GameState.cleanSweepsCount >= 1 },
        { id: "b3", icon: "📚", name: "Codex Scholar", desc: "Unlock 5 codex items", unlocked: GameState.unlockedCodex.size >= 5 },
        { id: "b4", icon: "🔥", name: "Iron Station", desc: "Maintain 3-day streak", unlocked: GameState.streak >= 3 }
      ];

      badges.forEach(b => {
        const item = document.createElement("div");
        item.className = `badge-item ${b.unlocked ? "unlocked" : ""}`;
        item.innerHTML = `
          <div class="badge-icon">${b.icon}</div>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
        `;
        badgeGrid.appendChild(item);
      });
    }
  },

  updateMastheadStats() {
    const streakCount = document.getElementById("streak-count");
    if (streakCount) streakCount.textContent = GameState.streak.toString();
  },

  bindWindowResize() {
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.activeTab === "play" && GameState.currentPuzzle) {
          CrosswordEngine.renderGrid();
          CrosswordEngine.highlightActiveCells();
        }
      }, 100);
    });
  }
};

/* ==========================================================================
   5. APP BOOTSTRAP INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
  await GameState.initData();
  UIController.init();
});