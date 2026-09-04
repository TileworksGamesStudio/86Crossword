const SoundEngine = (() => {
  let ctx = null;
  let muted = false;

  const initCtx = () => {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        ctx = new AudioContext();
      }
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
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch (e) { /* grace */ }
  };

  const playChime = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [587.33, 880].forEach((freq, i) => { // D5, A5
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.3);
      });
    } catch (e) { /* grace */ }
  };

  const playFanfare = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.18, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.5);
      });
    } catch (e) { /* grace */ }
  };

  const playError = () => {
    if (muted) return;
    initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) { /* grace */ }
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

  return { initCtx, playClick, playChime, playFanfare, playError, toggleMute, isMuted, initMute };
})();

/* ==========================================================================
   2. CODEX DATABASE (VERIFIED MIXOLOGY & BARTENDER KNOWLEDGE GRAPH)
   ========================================================================== */
const CodexDatabase = [
  {
    id: "amaro",
    name: "Amaro",
    category: "Spirits",
    subline: "Italian Bittersweet Herbal Liqueurs",
    glass: "Rocks or Neat Snifter",
    method: "Neat or Built over ice",
    ice: "Optional cube with orange slice",
    garnish: "Orange peel or lemon wheel",
    formula: "Infusion of neutral spirits or wine with herbs, roots, flowers, bark, and citrus peels, sweetened and rested in casks.",
    tip: "Aperitivo styles (Aperol, Select) stimulate appetite; heavier digestivo styles (Averna, Fernet, Cynar) ease digestion after meals.",
    lore: "Originating in Italian monasteries and apothecaries as medicinal elixirs in the 18th and 19th centuries before entering daily café culture."
  },
  {
    id: "specs",
    name: "Cocktail Specs",
    category: "Methods & Tools",
    subline: "Standard Bartender Formulation Standard",
    glass: "All Barware",
    method: "Precision Measurement",
    ice: "Varies by drink",
    garnish: "Prescribed garnish",
    formula: "Standard liquid recipe listing base spirits, modifiers, acids, sweeteners, and dash measurements.",
    tip: "Always pour the cheapest ingredients first (citrus, syrups) so mistakes don't ruin premium base spirits.",
    lore: "Early recipe cards and hotel cocktail logs evolved into contemporary digitized bar house specs to ensure guest consistency."
  },
  {
    id: "twist",
    name: "Citrus Twist",
    category: "Methods & Tools",
    subline: "Essential Aromatic Oil Expression",
    glass: "Stemmed or Tumbler",
    method: "Express skin-side toward drink surface",
    ice: "N/A",
    garnish: "Express and drop, or discard",
    formula: "Wide or thin swath of fresh citrus peel (lemon, orange, grapefruit) preserving aromatic essential oils without bitter white pith.",
    tip: "Express the twist at a 45-degree angle 2 inches above the glass to disperse the oil mist over the rim, not in the eyes of the guest.",
    lore: "The practice became standardized during the Golden Age to add fragrance before the first sip touched the palate."
  },
  {
    id: "start",
    name: "Mise en Place",
    category: "Methods & Tools",
    subline: "The Station Setup & Bar Prep",
    glass: "Bar Station",
    method: "Sanitation & Pre-service staging",
    ice: "Fresh ice well filled",
    garnish: "Cut garnishes, caddies, syrups stocked",
    formula: "The French culinary philosophy applied to the bar: everything in its dedicated place prior to the first customer ticket.",
    tip: "A well-organized station reduces unnecessary steps, allowing the bartender to maintain speed and eye contact with patrons.",
    lore: "Codified in hotel bars like the Savoy and Ritz where speed of service under rush was the signature of master bartenders."
  },
  {
    id: "bar",
    name: "The Bar",
    category: "History & Lore",
    subline: "Sanctuary of Hospitality & Craft",
    glass: "Various",
    method: "Service & Hostmanship",
    ice: "Hospitality Standard",
    garnish: "Warm greeting",
    formula: "Physical counter, backbar, speed rail, and guest seats creating a unique social third space.",
    tip: "The finest bartenders care equally about hospitality, speed, cleanliness, and drink balance.",
    lore: "Derived from the physical wooden barrier that separated patrons from the spirits and innkeepers in 18th-century public houses."
  },
  {
    id: "shoot",
    name: "Staff Toast",
    category: "History & Lore",
    subline: "Bartender Camaderie & Traditions",
    glass: "Shot or Snifter",
    method: "Neat pour",
    ice: "None",
    garnish: "None",
    formula: "1 oz pour (frequently Fernet-Branca, Mezcal, or Chartreuse) shared between hospitality comrades.",
    tip: "Never let toasting compromise guest service or professional hospitality conduct.",
    lore: "Fernet-Branca became known worldwide as the 'Bartender’s Handshake' during the modern craft revival in San Francisco and New York."
  },
  {
    id: "carts",
    name: "Tableside Bar Cart",
    category: "History & Lore",
    subline: "Gueridon Service for Vintage Classics",
    glass: "Chilled Coupes & Nick & Noras",
    method: "Tableside Stirring",
    ice: "Insulated ice buckets",
    garnish: "Lemon peel, Castelvetrano olives, cocktail onions",
    formula: "Mobile luxury cart equipped with frozen spirits, vermouths, bitters, and crystal barware wheeled directly to the guest.",
    tip: "Master the narrative: discuss vermouth vintage, olive varieties, and garnish logic while chilling the glass before the guest.",
    lore: "Popularized by grand hotel dining rooms in London and New York in the mid-20th century to elevate the Martini ceremony."
  },
  {
    id: "negroni",
    name: "Negroni",
    category: "Cocktails",
    subline: "Aperitivo Archetype • Florence, Italy c. 1919",
    glass: "Double Rocks Glass",
    method: "Stirred over ice",
    ice: "Single large crystal clear cube",
    garnish: "Expressed orange peel or orange wheel",
    formula: "1.0 oz (30 ml) London Dry Gin\n1.0 oz (30 ml) Campari\n1.0 oz (30 ml) Sweet Vermouth",
    tip: "Stir for 30–40 seconds. The drink requires roughly 25% dilution to soften the bold botanical alcohol and balance Campari’s bitterness.",
    lore: "Count Camillo Negroni famously requested bartender Fosco Scarselli at Caffè Casoni replace soda water with gin in his Americano."
  },
  {
    id: "shake",
    name: "Shaking Technique",
    category: "Methods & Tools",
    subline: "Aeration, Chilling & Rapid Dilution",
    glass: "Shaker Tin on Tin (Boston)",
    method: "Hard shake with clean ice",
    ice: "High surface-area cubes",
    garnish: "N/A",
    formula: "Used whenever citrus juice, egg white, cream, or dairy is present to emulsify and introduce micro-bubbles.",
    tip: "Shake horizontally with authority. You are not only chilling; you are aerating to create velvety foam and creamy texture.",
    lore: "Patented in 1848 by William Harned, the Boston shaker replaced the messy practice of throwing drinks between two glasses."
  },
  {
    id: "agave",
    name: "Agave Spirits",
    category: "Spirits",
    subline: "Tequila, Mezcal & Raicilla",
    glass: "Copita or Rocks Glass",
    method: "Neat or shaken in sours",
    ice: "Optional cube for high-proof",
    garnish: "Lime, orange slice with sal de gusano",
    formula: "Spirits distilled from the fermented hearts (piñas) of mature agave plants across designated Mexican Denominations of Origin.",
    tip: "Tequila uses only blue Weber agave steamed in autoclaves or brick ovens; artisanal mezcal is roasted underground over smoky wood pits.",
    lore: "Indigenous pulque met Spanish copper distillation in the 16th century, founding the oldest native distilled spirits in the Americas."
  },
  {
    id: "flair",
    name: "Flair Bartending",
    category: "Methods & Tools",
    subline: "Showmanship & Dexterity at the Station",
    glass: "All Vessels",
    method: "Kinetic bottle spins, tin catches, pour cuts",
    ice: "Clean ice",
    garnish: "Presentation element",
    formula: "Working flair emphasizes speed and efficiency; exhibition flair focuses on competition-level gymnastics with bar tools.",
    tip: "Never let showmanship slow down ticket times or sacrifice drink taste and hygiene.",
    lore: "Jerry Thomas practiced the first documented flair in the 1850s with his Blue Blazer, igniting flaming whiskey back and forth."
  },
  {
    id: "sours",
    name: "Sour Family",
    category: "Cocktails",
    subline: "The Cornerstone of Balance (Spirit, Citrus, Sugar)",
    glass: "Coupe, Nick & Nora, or Rocks",
    method: "Vigorously shaken with ice",
    ice: "Strained neat into coupe or over fresh rocks",
    garnish: "Citrus twist, wheel, or Angostura drops",
    formula: "2.0 oz Base Spirit\n0.75 oz Fresh Citrus (Lemon/Lime)\n0.75 oz Rich Simple Syrup (or liqueur modifier)",
    tip: "Taste your citrus daily: lime acidity changes over the season. Adjust sweetener by a quarter-ounce to preserve harmony.",
    lore: "Codified by British naval grog (rum, lime, water, sugar) to prevent scurvy before entering 19th-century American saloon guides."
  },
  {
    id: "acids",
    name: "Citrus Acids",
    category: "Methods & Tools",
    subline: "Citric & Malic Chemistry in Cocktails",
    glass: "N/A",
    method: "Juice extraction or acid adjustment",
    ice: "N/A",
    garnish: "N/A",
    formula: "Lemon juice contains ~5% citric acid; lime juice contains ~6% acid with higher malic acid content imparting distinct bite.",
    tip: "Citrus juice reaches its aromatic peak 4 to 8 hours after squeezing; enzymatic oxidation improves flavor after an initial rest.",
    lore: "Dave Arnold’s 'Liquid Intelligence' popularized acid-adjusting orange and grapefruit juices to lime-strength for modern clear cocktails."
  },
  {
    id: "lemon",
    name: "Lemon (Citrus limon)",
    category: "Methods & Tools",
    subline: "The Sovereign Citrus of the Bar",
    glass: "Coupe or Highball",
    method: "Freshly squeezed & double-strained",
    ice: "N/A",
    garnish: "Wheel, twist, wedge",
    formula: "High citric acid profile with bright floral aromatics, pairing naturally with gin, whiskey, brandy, and honey.",
    tip: "Never press the white bitter pith when juicing lemons. Use gentle mechanical lever squeezers.",
    lore: "Lemon cordial and shrub recipes sustained long voyages before refrigeration became standard in early 20th-century bars."
  },
  {
    id: "sazerac",
    name: "Sazerac",
    category: "Cocktails",
    subline: "Official Cocktail of New Orleans c. 1850s",
    glass: "Chilled Rocks Glass (No Ice)",
    method: "Stirred with ice, strained into absinthe-rinsed glass",
    ice: "None in service glass",
    garnish: "Expressed lemon peel (discarded or dropped)",
    formula: "2.0 oz Rye Whiskey (or Cognac)\n1 Sugar Cube (or 0.25 oz Rich Demerara)\n3–4 dashes Peychaud's Bitters\n1 dash Angostura Bitters\nAbsinthe rinse",
    tip: "Chill the serving rocks glass with crushed ice while stirring the drink, then discard the ice and roll the absinthe rinse before pouring.",
    lore: "Originally based on Sazerac de Forge et Fils Cognac, rye whiskey took over after phylloxera decimated French vineyards in the 1870s."
  },
  {
    id: "absinthe",
    name: "Absinthe (The Green Fairy)",
    category: "Spirits",
    subline: "Anise, Grande Wormwood & Fennel",
    glass: "Pontarlier Glass or Rinse in Cocktail",
    method: "French Drip Fountain or Atomizer Rinse",
    ice: "Ice water slow drip",
    garnish: "None",
    formula: "High-proof botanical spirit macerated and distilled with the holy trinity of herbs: wormwood (Artemisia absinthium), green anise, and fennel.",
    tip: "A few drops or a fine atomizer mist transforms sours, corpse revivers, and stirred drinks with ethereal licorice aromatics.",
    lore: "Banned in 1912 due to hysteria and wine-lobby propaganda, scientific research later proved thujone levels were completely harmless."
  },
  {
    id: "peychaud",
    name: "Peychaud's Bitters",
    category: "Spirits",
    subline: "Creole Aromatic Bitters from New Orleans",
    glass: "Bar Bottle with Dasher",
    method: "Dashed into cocktail",
    ice: "N/A",
    garnish: "N/A",
    formula: "Gentian-based aromatic bitters with prominent notes of anise, cherry, clove, and a brilliant crimson hue.",
    tip: "Far lighter and more floral than Angostura; essential for authentic Sazeracs, Seelbachs, and Vieux Carrés.",
    lore: "Created in the 1830s by Haitian apothecary Antoine Amédée Peychaud at his pharmacy on Royal Street in the French Quarter."
  },
  {
    id: "coupe",
    name: "Coupe Glass",
    category: "Glassware",
    subline: "The Definitive Stemmed Cocktail Vessel",
    glass: "5.5 oz to 7 oz Coupe",
    method: "Stem keeps drink cold",
    ice: "Pre-chilled with ice/water",
    garnish: "Express citrus across surface",
    formula: "Broad, curved shallow bowl on a long stem designed for drinks served 'up' (shaken or stirred without ice in the glass).",
    tip: "Hold exclusively by the stem so body heat from the fingers does not warm the cold liquid.",
    lore: "The popular myth that it was modeled after Marie Antoinette's breast is false; it was crafted in England in the 1660s for sparkling wine."
  },
  {
    id: "stir",
    name: "Stirring Technique",
    category: "Methods & Tools",
    subline: "Silky Clarity & Controlled Dilution",
    glass: "Mixing Glass & Spiral Barspoon",
    method: "Smooth push-pull glide around perimeter",
    ice: "Solid, dense crystal cubes",
    garnish: "N/A",
    formula: "Employed for spirit-forward cocktails without juice (Martini, Manhattan, Negroni) to avoid cloudiness and air bubbles.",
    tip: "Keep the back of the spoon flat against the glass wall. Move your fingers in a fluid orbit without splashing.",
    lore: "Promoted by early London and New York clubs to ensure drinks remained jewel-like and crystal clear."
  },
  {
    id: "rye",
    name: "Rye Whiskey",
    category: "Spirits",
    subline: "Spicy, Bold American Grain Spirit",
    glass: "Rocks or Glencairn",
    method: "Spirit-forward stirred classics",
    ice: "Large rock or neat",
    garnish: "Cherry or lemon peel",
    formula: "Distilled in the US from a mashbill of at least 51% rye grain, aged in new charred oak barrels.",
    tip: "Rye's peppery grain backbone stands up against sweet vermouth and strong modifiers far better than sweeter corn-heavy bourbon.",
    lore: "The dominant American whiskey prior to Prohibition, distilled extensively across Pennsylvania and Maryland."
  },
  {
    id: "gin",
    name: "London Dry Gin",
    category: "Spirits",
    subline: "Juniper-Forward Botanical Aristocrat",
    glass: "Martini, Coupe, or Highball",
    method: "Stirred, Shaken, or Built",
    ice: "Varies",
    garnish: "Lemon twist, olive, lime wheel",
    formula: "Distilled neutral spirit re-distilled with juniper berries, coriander, angelica, orris root, and citrus peels, with zero added sugar.",
    tip: "Juniper must remain dominant by legal definition; modern 'contemporary' gins dial up florals and citrus instead.",
    lore: "The British Gin Craze of the 1700s led to strict distillation acts that eventually birthed clean, dry, world-class spirits."
  },
  {
    id: "ice",
    name: "Cocktail Ice Physics",
    category: "Methods & Tools",
    subline: "The Unsung Ingredient: Chilling & Dilution",
    glass: "All Glasses",
    method: "Directional freezing for crystal clarity",
    ice: "Blocks, spears, spheres, crushed, pebbles",
    garnish: "N/A",
    formula: "Pure H2O frozen slowly from top to bottom, pushing dissolved gases and minerals out to achieve transparent ice.",
    tip: "There is no chilling without dilution. Solid, cold, dry ice chills faster with less premature water loss.",
    lore: "Frederic Tudor pioneered the global natural ice trade in the 1800s, shipping frozen New England lake blocks to tropical ports."
  }
];

/* ==========================================================================
   3. CURATED CROSSWORD PUZZLE ROSTER (MINI, MIDI, MAIN)
   ========================================================================== */
const PuzzleRoster = [
  {
    id: "mini-1",
    title: "The Italian Hour",
    tier: "mini",
    gridSize: { rows: 5, cols: 5 },
    theme: "Aperitivo Culture & Classic Formulations",
    blurb: "A snappy 5×5 featuring bitter liqueurs, bar prep, and tableside service.",
    words: [
      {
        id: "1A",
        num: 1,
        dir: "across",
        row: 0,
        col: 0,
        answer: "SPECS",
        clue: "Standard bar recipe formulations listing exact measures and ingredients",
        cat: "Methods & Tools",
        codexId: "specs"
      },
      {
        id: "3A",
        num: 3,
        dir: "across",
        row: 2,
        col: 0,
        answer: "AMARO",
        clue: "Italian bittersweet herbal liqueur enjoyed as an aperitivo or digestivo",
        cat: "Spirits",
        codexId: "amaro"
      },
      {
        id: "5A",
        num: 5,
        dir: "across",
        row: 4,
        col: 0,
        answer: "TWIST",
        clue: "Citrus peel expressed over the surface of a cocktail to release aromatic oils",
        cat: "Methods & Tools",
        codexId: "twist"
      },
      {
        id: "1D",
        num: 1,
        dir: "down",
        row: 0,
        col: 0,
        answer: "START",
        clue: "Beginning of a busy Friday night bar shift and station mise en place",
        cat: "Methods & Tools",
        codexId: "start"
      },
      {
        id: "2D",
        num: 2,
        dir: "down",
        row: 1,
        col: 2,
        answer: "BAR",
        clue: "The counter where cocktails are crafted and hospitality is shared",
        cat: "History & Lore",
        codexId: "bar"
      },
      {
        id: "4D",
        num: 4,
        dir: "down",
        row: 0,
        col: 4,
        answer: "SHOOT",
        clue: "Quickly down a straight measure of liquor, as a staff toast",
        cat: "History & Lore",
        codexId: "shoot"
      }
    ]
  },
  {
    id: "mini-2",
    title: "The Citrus Station",
    tier: "mini",
    gridSize: { rows: 5, cols: 5 },
    theme: "Sours, Acid Balance & Bar Technique",
    blurb: "Master the trinity of spirit, citrus, and sweet balance.",
    words: [
      {
        id: "1A",
        num: 1,
        dir: "across",
        row: 0,
        col: 0,
        answer: "SHAKE",
        clue: "Agitate vigorously with ice to aerate, chill, and dilute citrus drinks",
        cat: "Methods & Tools",
        codexId: "shake"
      },
      {
        id: "3A",
        num: 3,
        dir: "across",
        row: 2,
        col: 0,
        answer: "FLAIR",
        clue: "Showmanship technique featuring bottle spins, catches, and tin flips",
        cat: "Methods & Tools",
        codexId: "flair"
      },
      {
        id: "5A",
        num: 5,
        dir: "across",
        row: 4,
        col: 0,
        answer: "SPECS",
        clue: "House cocktail measurements followed for consistency across bartenders",
        cat: "Methods & Tools",
        codexId: "specs"
      },
      {
        id: "2D",
        num: 2,
        dir: "down",
        row: 0,
        col: 2,
        answer: "AGAVE",
        clue: "Succulent harvested in Mexico to produce Tequila and Mezcal",
        cat: "Spirits",
        codexId: "agave"
      },
      {
        id: "4D",
        num: 4,
        dir: "down",
        row: 0,
        col: 4,
        answer: "EARNS",
        clue: "What an attentive bartender does with tips through great hospitality",
        cat: "History & Lore",
        codexId: "bar"
      }
    ]
  },
  {
    id: "mini-3",
    title: "The Stirred Classic",
    tier: "mini",
    gridSize: { rows: 5, cols: 5 },
    theme: "Spirit-Forward Chemistry & Precision",
    blurb: "Explore the art of dilution without air bubbles or cloudiness.",
    words: [
      {
        id: "1A",
        num: 1,
        dir: "across",
        row: 0,
        col: 0,
        answer: "NEAT",
        clue: "Served straight from the bottle at room temperature with zero ice",
        cat: "Methods & Tools",
        codexId: "shoot"
      },
      {
        id: "3A",
        num: 3,
        dir: "across",
        row: 2,
        col: 0,
        answer: "COUPE",
        clue: "Stemmed shallow-bowled glass preferred for drinks served up",
        cat: "Glassware",
        codexId: "coupe"
      },
      {
        id: "5A",
        num: 5,
        dir: "across",
        row: 4,
        col: 1,
        answer: "STIR",
        clue: "Mix smoothly with a barspoon to preserve jewel-like clarity",
        cat: "Methods & Tools",
        codexId: "stir"
      },
      {
        id: "1D",
        num: 1,
        dir: "down",
        row: 0,
        col: 0,
        answer: "NICK",
        clue: "Stemware partner to Nora, named after The Thin Man detective",
        cat: "Glassware",
        codexId: "coupe"
      },
      {
        id: "2D",
        num: 2,
        dir: "down",
        row: 0,
        col: 3,
        answer: "TOP",
        clue: "A float of overproof spirit or aromatic foam crowning a cocktail",
        cat: "Methods & Tools",
        codexId: "specs"
      },
      {
        id: "4D",
        num: 4,
        dir: "down",
        row: 2,
        col: 4,
        answer: "EAR",
        clue: "Sensory organ that registers the crisp clatter of shaking ice",
        cat: "Methods & Tools",
        codexId: "shake"
      }
    ]
  },
  {
    id: "midi-1",
    title: "Old New Orleans Quarter",
    tier: "midi",
    gridSize: { rows: 7, cols: 7 },
    theme: "Creole Heritage, Sazeracs & Absinthe Rinses",
    blurb: "Journey through the French Quarter cradle of American cocktail culture.",
    words: [
      {
        id: "1A",
        num: 1,
        dir: "across",
        row: 0,
        col: 0,
        answer: "SAZERAC",
        clue: "New Orleans icon combining rye, sugar, Peychaud's, and an absinthe rinse",
        cat: "Cocktails",
        codexId: "sazerac"
      },
      {
        id: "4A",
        num: 4,
        dir: "across",
        row: 2,
        col: 0,
        answer: "ABSINTHE",
        clue: "Anise and wormwood spirit used to coat the inside of a chilled Sazerac glass",
        cat: "Spirits",
        codexId: "absinthe"
      },
      {
        id: "6A",
        num: 6,
        dir: "across",
        row: 4,
        col: 1,
        answer: "PEYCHAUD",
        clue: "Crimson Creole aromatic bitters created by a Royal Street apothecary",
        cat: "Spirits",
        codexId: "peychaud"
      },
      {
        id: "8A",
        num: 8,
        dir: "across",
        row: 6,
        col: 2,
        answer: "RYES",
        clue: "Grain whiskeys providing a spicy backbone against rich vermouths",
        cat: "Spirits",
        codexId: "rye"
      },
      {
        id: "1D",
        num: 1,
        dir: "down",
        row: 0,
        col: 0,
        answer: "SOURS",
        clue: "The fundamental family that balances spirit, citrus, and sweet",
        cat: "Cocktails",
        codexId: "sours"
      },
      {
        id: "2D",
        num: 2,
        dir: "down",
        row: 0,
        col: 2,
        answer: "ZESTS",
        clue: "Citrus peels containing rich fragrant oils for expressing over drinks",
        cat: "Methods & Tools",
        codexId: "twist"
      },
      {
        id: "3D",
        num: 3,
        dir: "down",
        row: 0,
        col: 5,
        answer: "ACIDS",
        clue: "Citric and malic compounds that provide tartness and thirst-quenching bite",
        cat: "Methods & Tools",
        codexId: "acids"
      },
      {
        id: "5D",
        num: 5,
        dir: "down",
        row: 2,
        col: 4,
        answer: "NEAT",
        clue: "Unadorned pour served at room temperature without ice or water",
        cat: "Methods & Tools",
        codexId: "shoot"
      }
    ]
  },
  {
    id: "main-1",
    title: "The Grand Savoy Compendium",
    tier: "main",
    gridSize: { rows: 9, cols: 9 },
    theme: "Grand Hotel Culture, London Classics & Golden Age Specs",
    blurb: "A substantial grid honoring Ada Coleman, Harry Craddock, and European mixology.",
    words: [
      {
        id: "1A",
        num: 1,
        dir: "across",
        row: 0,
        col: 0,
        answer: "NEGRONI",
        clue: "Italian masterpiece of equal parts Gin, Campari, and Sweet Vermouth",
        cat: "Cocktails",
        codexId: "negroni"
      },
      {
        id: "4A",
        num: 4,
        dir: "across",
        row: 2,
        col: 0,
        answer: "GIN",
        clue: "Juniper-led spirit that forms the base of Martinis and Gimlets",
        cat: "Spirits",
        codexId: "gin"
      },
      {
        id: "6A",
        num: 6,
        dir: "across",
        row: 4,
        col: 0,
        answer: "STIR",
        clue: "Technique utilizing a spiral barspoon inside a mixing vessel",
        cat: "Methods & Tools",
        codexId: "stir"
      },
      {
        id: "8A",
        num: 8,
        dir: "across",
        row: 6,
        col: 1,
        answer: "AMARO",
        clue: "Bittersweet herbal concoction such as Fernet, Nonino, or Montenegro",
        cat: "Spirits",
        codexId: "amaro"
      },
      {
        id: "10A",
        num: 10,
        dir: "across",
        row: 8,
        col: 2,
        answer: "COUPE",
        clue: "Stemmed vessel providing broad aromatic surface for chilled sours",
        cat: "Glassware",
        codexId: "coupe"
      },
      {
        id: "1D",
        num: 1,
        dir: "down",
        row: 0,
        col: 0,
        answer: "NICK",
        clue: "Glassware silhouette characterized by steep sides and delicate volume",
        cat: "Glassware",
        codexId: "coupe"
      },
      {
        id: "2D",
        num: 2,
        dir: "down",
        row: 0,
        col: 2,
        answer: "GLASS",
        clue: "Vessel material chosen to optimize temperature retention and clarity",
        cat: "Glassware",
        codexId: "coupe"
      },
      {
        id: "3D",
        num: 3,
        dir: "down",
        row: 0,
        col: 4,
        answer: "ORGAN",
        clue: "The palate or sensory faculty used by master tasters for spirit judging",
        cat: "Methods & Tools",
        codexId: "specs"
      },
      {
        id: "5D",
        num: 5,
        dir: "down",
        row: 2,
        col: 6,
        answer: "ICE",
        clue: "Crucial cooling agent whose temperature and dilution dictate texture",
        cat: "Methods & Tools",
        codexId: "ice"
      },
      {
        id: "7D",
        num: 7,
        dir: "down",
        row: 4,
        col: 3,
        answer: "RYE",
        clue: "Grain whiskey celebrated for robust spicy aromatics in a Manhattan",
        cat: "Spirits",
        codexId: "rye"
      }
    ]
  }
];

/* ==========================================================================
   4. GAME STATE ENGINE
   ========================================================================== */
const GameState = {
  currentPuzzle: null,
  activeCell: { r: 0, c: 0 },
  activeDirection: "across", // "across" | "down"
  activeWord: null,
  userGrid: {}, // key `${r}_${c}` -> string letter
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

  init() {
    this.loadPersistence();
    SoundEngine.initMute();
  },

  loadPersistence() {
    try {
      const savedUnlocked = localStorage.getItem('cc_unlocked_codex');
      if (savedUnlocked) {
        this.unlockedCodex = new Set(JSON.parse(savedUnlocked));
      } else {
        // Starter unlocked
        ["amaro", "specs", "twist", "sours"].forEach(id => this.unlockedCodex.add(id));
      }

      this.streak = parseInt(localStorage.getItem('cc_streak') || "1", 10);
      this.xp = parseInt(localStorage.getItem('cc_xp') || "450", 10);
      this.puzzlesSolvedCount = parseInt(localStorage.getItem('cc_solved_count') || "0", 10);
      this.cleanSweepsCount = parseInt(localStorage.getItem('cc_clean_sweeps') || "0", 10);
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  },

  savePersistence() {
    try {
      localStorage.setItem('cc_unlocked_codex', JSON.stringify([...this.unlockedCodex]));
      localStorage.setItem('cc_streak', this.streak.toString());
      localStorage.setItem('cc_xp', this.xp.toString());
      localStorage.setItem('cc_solved_count', this.puzzlesSolvedCount.toString());
      localStorage.setItem('cc_clean_sweeps', this.cleanSweepsCount.toString());
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }
};

/* ==========================================================================
   5. UI CONTROLLER & EVENT COORDINATOR
   ========================================================================== */
const UIController = (() => {
  // DOM Elements
  const els = {
    appContainer: document.getElementById('app-container'),
    navTabs: document.querySelectorAll('.nav-tab'),
    views: document.querySelectorAll('.app-view'),
    btnSound: document.getElementById('btn-sound'),
    soundIconOn: document.getElementById('sound-icon-on'),
    soundIconOff: document.getElementById('sound-icon-off'),
    streakCount: document.getElementById('streak-count'),
    playTierBadge: document.getElementById('puzzle-tier-badge'),
    playTitleLabel: document.getElementById('puzzle-title-label'),
    playTimer: document.getElementById('play-timer'),
    btnPausePlay: document.getElementById('btn-pause-play'),
    cluePrev: document.getElementById('clue-prev'),
    clueNext: document.getElementById('clue-next'),
    clueDirBadge: document.getElementById('clue-direction-badge'),
    clueNumLabel: document.getElementById('clue-number-label'),
    clueCatLabel: document.getElementById('clue-category-label'),
    clueDesc: document.getElementById('clue-description'),
    activeClueBar: document.getElementById('active-clue-bar'),
    crosswordGrid: document.getElementById('crossword-grid'),
    virtualKeyboard: document.getElementById('virtual-keyboard'),
    toolRevealLetter: document.getElementById('tool-reveal-letter'),
    toolCheckWord: document.getElementById('tool-check-word'),
    toolClearWord: document.getElementById('tool-clear-word'),
    toolInspectSpec: document.getElementById('tool-inspect-spec'),
    puzzlesList: document.getElementById('puzzles-list'),
    btnPlayDaily: document.getElementById('btn-play-daily'),
    puzzleFilterChips: document.querySelectorAll('.filter-chip'),
    codexGrid: document.getElementById('codex-grid'),
    codexSearch: document.getElementById('codex-search'),
    codexFilters: document.querySelectorAll('.codex-filter'),
    codexUnlockedCount: document.getElementById('codex-unlocked-count'),
    modalVictory: document.getElementById('modal-victory'),
    btnNextPuzzle: document.getElementById('btn-next-puzzle'),
    btnViewInCodex: document.getElementById('btn-view-in-codex'),
    btnCloseVictory: document.getElementById('btn-close-victory'),
    modalCodexSpec: document.getElementById('modal-codex-spec'),
    btnCloseSpecModal: document.getElementById('btn-close-spec-modal'),
    pauseOverlay: document.getElementById('pause-overlay'),
    btnResumePlay: document.getElementById('btn-resume-play'),
    btnQuickStats: document.getElementById('btn-quick-stats'),
    statPuzzlesSolved: document.getElementById('stat-puzzles-solved'),
    statWordsUnlocked: document.getElementById('stat-words-unlocked'),
    statCleanSweeps: document.getElementById('stat-clean-sweeps'),
    statStreakHigh: document.getElementById('stat-streak-high'),
    profileRankTitle: document.getElementById('profile-rank-title'),
    profileRankSub: document.getElementById('profile-rank-sub'),
    profileXpFill: document.getElementById('profile-xp-fill'),
    achievementsGrid: document.getElementById('achievements-grid')
  };

  const init = () => {
    bindEvents();
    renderSoundIcon();
    renderStreak();
    renderCatalog();
    renderCodex();
    renderMastery();

    // Launch initial puzzle
    loadPuzzle(PuzzleRoster[0]);
  };

  const bindEvents = () => {
    // Navigation Tabs
    els.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        SoundEngine.playClick();
        switchView(tab.dataset.tab);
      });
    });

    // Sound toggle
    els.btnSound.addEventListener('click', () => {
      const isMuted = SoundEngine.toggleMute();
      renderSoundIcon();
      if (!isMuted) SoundEngine.playClick();
    });

    // Quick stats icon in header
    els.btnQuickStats.addEventListener('click', () => {
      SoundEngine.playClick();
      switchView('mastery');
    });

    // Clue Navigation
    els.cluePrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateClue(-1);
    });
    els.clueNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateClue(1);
    });

    // Tapping the clue bar flips direction
    els.activeClueBar.addEventListener('click', () => {
      toggleDirection();
    });

    // Solving Tools
    els.toolRevealLetter.addEventListener('click', revealCurrentLetter);
    els.toolCheckWord.addEventListener('click', checkActiveWord);
    els.toolClearWord.addEventListener('click', clearActiveWord);
    els.toolInspectSpec.addEventListener('click', inspectCurrentWordSpec);

    // Timer & Pause
    els.btnPausePlay.addEventListener('click', togglePause);
    els.btnResumePlay.addEventListener('click', togglePause);

    // Hardware Keyboard input
    window.addEventListener('keydown', handleHardwareKeyDown);

    // Virtual Touch Keypad
    els.virtualKeyboard.addEventListener('click', handleVirtualKeyPress);

    // Puzzles View Filters
    els.puzzleFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        SoundEngine.playClick();
        els.puzzleFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderCatalog(chip.dataset.filter);
      });
    });

    // Play Daily Button
    els.btnPlayDaily.addEventListener('click', () => {
      SoundEngine.playClick();
      loadPuzzle(PuzzleRoster[0]); // Daily links to premier daily mini
      switchView('play');
    });

    // Codex Search & Filter
    els.codexSearch.addEventListener('input', () => {
      renderCodex();
    });
    els.codexFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        SoundEngine.playClick();
        els.codexFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCodex();
      });
    });

    // Victory Dialog Actions
    els.btnNextPuzzle.addEventListener('click', () => {
      SoundEngine.playClick();
      els.modalVictory.classList.add('hidden');
      loadNextPuzzle();
    });
    els.btnViewInCodex.addEventListener('click', () => {
      SoundEngine.playClick();
      els.modalVictory.classList.add('hidden');
      switchView('codex');
    });
    els.btnCloseVictory.addEventListener('click', () => {
      SoundEngine.playClick();
      els.modalVictory.classList.add('hidden');
    });

    // Spec Modal
    els.btnCloseSpecModal.addEventListener('click', () => {
      SoundEngine.playClick();
      els.modalCodexSpec.classList.add('hidden');
    });
  };

  const switchView = (tabName) => {
    els.navTabs.forEach(t => {
      const active = t.dataset.tab === tabName;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    els.views.forEach(v => {
      v.classList.toggle('active', v.id === `view-${tabName}`);
    });

    if (tabName === 'mastery') {
      renderMastery();
    } else if (tabName === 'codex') {
      renderCodex();
    }
  };

  const renderSoundIcon = () => {
    const muted = SoundEngine.isMuted();
    els.soundIconOn.classList.toggle('hidden', muted);
    els.soundIconOff.classList.toggle('hidden', !muted);
  };

  const renderStreak = () => {
    els.streakCount.textContent = GameState.streak;
  };

  /* ==========================================================================
     CROSSWORD BOARD RENDERER & INTERACTION
     ========================================================================== */
  const loadPuzzle = (puzzle) => {
    GameState.currentPuzzle = puzzle;
    GameState.userGrid = {};
    GameState.isSolved = false;
    GameState.isPaused = false;
    GameState.hintsUsed = 0;
    GameState.errorsCount = 0;
    GameState.timerSeconds = 0;
    clearInterval(GameState.timerInterval);

    els.playTierBadge.textContent = puzzle.tier.toUpperCase();
    els.playTitleLabel.textContent = puzzle.title;

    buildGridDOM(puzzle);
    startTimer();

    // Default select first word
    selectWord(puzzle.words[0]);
    updateBoardHighlights();
  };

  const loadNextPuzzle = () => {
    const currentIndex = PuzzleRoster.findIndex(p => p.id === GameState.currentPuzzle.id);
    const nextIndex = (currentIndex + 1) % PuzzleRoster.length;
    loadPuzzle(PuzzleRoster[nextIndex]);
    switchView('play');
  };

  const buildGridDOM = (puzzle) => {
    const { rows, cols } = puzzle.gridSize;
    els.crosswordGrid.innerHTML = '';
    els.crosswordGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    els.crosswordGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    // Calculate optimal responsive cell size
    const availableWidth = Math.min(window.innerWidth - 32, 520);
    const cellSize = Math.floor((availableWidth - cols * 2) / cols);
    const boundedSize = Math.max(32, Math.min(cellSize, 54));

    els.crosswordGrid.style.width = `${boundedSize * cols}px`;
    els.crosswordGrid.style.height = `${boundedSize * rows}px`;

    // Map which cells belong to words
    const cellNumbers = {};
    const validCells = new Set();

    puzzle.words.forEach(w => {
      const numKey = `${w.row}_${w.col}`;
      if (!cellNumbers[numKey]) cellNumbers[numKey] = w.num;

      for (let i = 0; i < w.answer.length; i++) {
        const r = w.dir === 'across' ? w.row : w.row + i;
        const c = w.dir === 'across' ? w.col + i : w.col;
        validCells.add(`${r}_${c}`);
      }
    });

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r}_${c}`;
        const isPlayable = validCells.has(key);
        const cell = document.createElement('div');
        cell.className = `cw-cell ${isPlayable ? '' : 'black-cell'}`;
        cell.dataset.r = r;
        cell.dataset.c = c;

        if (isPlayable) {
          if (cellNumbers[key]) {
            const numSpan = document.createElement('span');
            numSpan.className = 'cw-cell-num';
            numSpan.textContent = cellNumbers[key];
            cell.appendChild(numSpan);
          }

          const letterSpan = document.createElement('span');
          letterSpan.className = 'cw-cell-letter';
          letterSpan.textContent = '';
          cell.appendChild(letterSpan);

          cell.addEventListener('click', () => handleCellClick(r, c));
        }

        els.crosswordGrid.appendChild(cell);
      }
    }
  };

  const handleCellClick = (r, c) => {
    SoundEngine.playClick();
    const isSameCell = GameState.activeCell.r === r && GameState.activeCell.c === c;

    if (isSameCell) {
      // Toggle orientation on repeated tap
      toggleDirection();
    } else {
      GameState.activeCell = { r, c };
      // Check if current word covers this cell in active direction; if not, switch to word that covers it
      const currentWordCovers = wordCoversCell(GameState.activeWord, r, c);
      if (!currentWordCovers) {
        const candidate = findWordAt(r, c, GameState.activeDirection) || findWordAt(r, c, getOppositeDirection());
        if (candidate) {
          GameState.activeDirection = candidate.dir;
          GameState.activeWord = candidate;
        }
      }
      updateBoardHighlights();
      updateClueDisplay();
    }
  };

  const wordCoversCell = (word, r, c) => {
    if (!word) return false;
    for (let i = 0; i < word.answer.length; i++) {
      const wr = word.dir === 'across' ? word.row : word.row + i;
      const wc = word.dir === 'across' ? word.col + i : word.col;
      if (wr === r && wc === c) return true;
    }
    return false;
  };

  const findWordAt = (r, c, dir) => {
    return GameState.currentPuzzle.words.find(w => {
      if (w.dir !== dir) return false;
      return wordCoversCell(w, r, c);
    });
  };

  const getOppositeDirection = () => {
    return GameState.activeDirection === 'across' ? 'down' : 'across';
  };

  const toggleDirection = () => {
    const opp = getOppositeDirection();
    const candidate = findWordAt(GameState.activeCell.r, GameState.activeCell.c, opp);
    if (candidate) {
      GameState.activeDirection = opp;
      GameState.activeWord = candidate;
    } else {
      GameState.activeDirection = opp;
    }
    SoundEngine.playClick();
    updateBoardHighlights();
    updateClueDisplay();
  };

  const selectWord = (word) => {
    GameState.activeWord = word;
    GameState.activeDirection = word.dir;
    GameState.activeCell = { r: word.row, c: word.col };
    updateBoardHighlights();
    updateClueDisplay();
  };

  const navigateClue = (offset) => {
    SoundEngine.playClick();
    const words = GameState.currentPuzzle.words;
    const currentIndex = words.findIndex(w => w.id === GameState.activeWord.id);
    let nextIndex = (currentIndex + offset) % words.length;
    if (nextIndex < 0) nextIndex = words.length - 1;
    selectWord(words[nextIndex]);
  };

  const updateClueDisplay = () => {
    const word = GameState.activeWord;
    if (!word) return;
    els.clueDirBadge.textContent = word.dir.toUpperCase();
    els.clueNumLabel.textContent = `${word.num}.`;
    els.clueCatLabel.textContent = word.cat;
    els.clueDesc.textContent = word.clue;
  };

  const updateBoardHighlights = () => {
    const { r: activeR, c: activeC } = GameState.activeCell;
    const word = GameState.activeWord;
    const cells = els.crosswordGrid.querySelectorAll('.cw-cell');

    cells.forEach(cellEl => {
      const cr = parseInt(cellEl.dataset.r, 10);
      const cc = parseInt(cellEl.dataset.c, 10);

      cellEl.classList.remove('active-cell', 'word-highlight', 'cross-highlight');

      if (isNaN(cr) || isNaN(cc)) return;

      if (cr === activeR && cc === activeC) {
        cellEl.classList.add('active-cell');
      } else if (word && wordCoversCell(word, cr, cc)) {
        cellEl.classList.add('word-highlight');
      }
    });
  };

  /* ==========================================================================
     LETTER ENTRY & KEYBOARD HANDLING
     ========================================================================== */
  const enterLetter = (letter) => {
    if (GameState.isSolved || GameState.isPaused) return;

    const { r, c } = GameState.activeCell;
    const key = `${r}_${c}`;
    GameState.userGrid[key] = letter.toUpperCase();

    // Update DOM cell
    const cellEl = els.crosswordGrid.querySelector(`[data-r="${r}"][data-c="${c}"]`);
    if (cellEl) {
      const letterSpan = cellEl.querySelector('.cw-cell-letter');
      if (letterSpan) {
        letterSpan.textContent = letter.toUpperCase();
        cellEl.classList.remove('error-cell');
      }
    }

    SoundEngine.playClick();
    advanceCursor();
    checkCompletion();
  };

  const deleteLetter = () => {
    if (GameState.isSolved || GameState.isPaused) return;

    const { r, c } = GameState.activeCell;
    const key = `${r}_${c}`;

    if (GameState.userGrid[key]) {
      // Delete current cell
      delete GameState.userGrid[key];
      const cellEl = els.crosswordGrid.querySelector(`[data-r="${r}"][data-c="${c}"]`);
      if (cellEl) {
        const letterSpan = cellEl.querySelector('.cw-cell-letter');
        if (letterSpan) letterSpan.textContent = '';
        cellEl.classList.remove('error-cell');
      }
    } else {
      // Step backward and delete
      retreatCursor();
      const newKey = `${GameState.activeCell.r}_${GameState.activeCell.c}`;
      delete GameState.userGrid[newKey];
      const cellEl = els.crosswordGrid.querySelector(`[data-r="${GameState.activeCell.r}"][data-c="${GameState.activeCell.c}"]`);
      if (cellEl) {
        const letterSpan = cellEl.querySelector('.cw-cell-letter');
        if (letterSpan) letterSpan.textContent = '';
        cellEl.classList.remove('error-cell');
      }
    }
    SoundEngine.playClick();
  };

  const advanceCursor = () => {
    const word = GameState.activeWord;
    if (!word) return;

    const dir = word.dir;
    let nextR = GameState.activeCell.r + (dir === 'down' ? 1 : 0);
    let nextC = GameState.activeCell.c + (dir === 'across' ? 1 : 0);

    if (wordCoversCell(word, nextR, nextC)) {
      GameState.activeCell = { r: nextR, c: nextC };
    } else {
      // Jump to next word in sequence if at end of word
      navigateClue(1);
    }
    updateBoardHighlights();
  };

  const retreatCursor = () => {
    const word = GameState.activeWord;
    if (!word) return;

    const dir = word.dir;
    let prevR = GameState.activeCell.r - (dir === 'down' ? 1 : 0);
    let prevC = GameState.activeCell.c - (dir === 'across' ? 1 : 0);

    if (wordCoversCell(word, prevR, prevC)) {
      GameState.activeCell = { r: prevR, c: prevC };
      updateBoardHighlights();
    }
  };

  const handleHardwareKeyDown = (e) => {
    // Only capture during play tab
    const playView = document.getElementById('view-play');
    if (!playView.classList.contains('active')) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      deleteLetter();
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      toggleDirection();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveActiveCell(0, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveActiveCell(0, -1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveActiveCell(1, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveActiveCell(-1, 0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      navigateClue(e.shiftKey ? -1 : 1);
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      enterLetter(e.key);
    }
  };

  const handleVirtualKeyPress = (e) => {
    const target = e.target.closest('.kb-key');
    if (!target) return;

    if (target.id === 'key-toggle-dir') {
      toggleDirection();
    } else if (target.dataset.key === 'BACKSPACE') {
      deleteLetter();
    } else if (target.dataset.key) {
      enterLetter(target.dataset.key);
    }
  };

  const moveActiveCell = (dr, dc) => {
    const newR = GameState.activeCell.r + dr;
    const newC = GameState.activeCell.c + dc;
    const target = els.crosswordGrid.querySelector(`[data-r="${newR}"][data-c="${newC}"]`);
    if (target && !target.classList.contains('black-cell')) {
      GameState.activeCell = { r: newR, c: newC };
      const word = findWordAt(newR, newC, GameState.activeDirection) || findWordAt(newR, newC, getOppositeDirection());
      if (word) {
        GameState.activeDirection = word.dir;
        GameState.activeWord = word;
      }
      updateBoardHighlights();
      updateClueDisplay();
      SoundEngine.playClick();
    }
  };

  /* ==========================================================================
     TOOLS: HINT, CHECK & CLEAR
     ========================================================================== */
  const revealCurrentLetter = () => {
    if (GameState.isSolved) return;
    const { r, c } = GameState.activeCell;
    const word = GameState.activeWord;
    if (!word) return;

    // Find correct letter from word spec
    for (let i = 0; i < word.answer.length; i++) {
      const wr = word.dir === 'across' ? word.row : word.row + i;
      const wc = word.dir === 'across' ? word.col + i : word.col;
      if (wr === r && wc === c) {
        const correctLetter = word.answer[i];
        GameState.hintsUsed++;
        enterLetter(correctLetter);

        // Mark cell as revealed
        const cellEl = els.crosswordGrid.querySelector(`[data-r="${r}"][data-c="${c}"]`);
        if (cellEl) cellEl.classList.add('revealed-cell');
        break;
      }
    }
  };

  const checkActiveWord = () => {
    const word = GameState.activeWord;
    if (!word) return;

    let hasMistake = false;
    for (let i = 0; i < word.answer.length; i++) {
      const wr = word.dir === 'across' ? word.row : word.row + i;
      const wc = word.dir === 'across' ? word.col + i : word.col;
      const userLetter = GameState.userGrid[`${wr}_${wc}`] || '';
      const cellEl = els.crosswordGrid.querySelector(`[data-r="${wr}"][data-c="${wc}"]`);

      if (userLetter && userLetter !== word.answer[i]) {
        hasMistake = true;
        GameState.errorsCount++;
        if (cellEl) cellEl.classList.add('error-cell');
      } else if (cellEl) {
        cellEl.classList.remove('error-cell');
      }
    }

    if (hasMistake) {
      SoundEngine.playError();
    } else {
      SoundEngine.playChime();
    }
  };

  const clearActiveWord = () => {
    const word = GameState.activeWord;
    if (!word) return;

    for (let i = 0; i < word.answer.length; i++) {
      const wr = word.dir === 'across' ? word.row : word.row + i;
      const wc = word.dir === 'across' ? word.col + i : word.col;
      delete GameState.userGrid[`${wr}_${wc}`];

      const cellEl = els.crosswordGrid.querySelector(`[data-r="${wr}"][data-c="${wc}"]`);
      if (cellEl) {
        const letterSpan = cellEl.querySelector('.cw-cell-letter');
        if (letterSpan) letterSpan.textContent = '';
        cellEl.classList.remove('error-cell', 'revealed-cell');
      }
    }
    SoundEngine.playClick();
  };

  const inspectCurrentWordSpec = () => {
    const word = GameState.activeWord;
    if (!word || !word.codexId) return;
    openSpecModal(word.codexId);
  };

  /* ==========================================================================
     TIMER & PAUSE
     ========================================================================== */
  const startTimer = () => {
    clearInterval(GameState.timerInterval);
    GameState.timerInterval = setInterval(() => {
      if (!GameState.isPaused && !GameState.isSolved) {
        GameState.timerSeconds++;
        renderTimer();
      }
    }, 1000);
    renderTimer();
  };

  const renderTimer = () => {
    const m = Math.floor(GameState.timerSeconds / 60);
    const s = GameState.timerSeconds % 60;
    els.playTimer.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const togglePause = () => {
    GameState.isPaused = !GameState.isPaused;
    els.pauseOverlay.classList.toggle('hidden', !GameState.isPaused);
    els.btnPausePlay.textContent = GameState.isPaused ? '▶' : '⏸';
  };

  /* ==========================================================================
     COMPLETION & REWARDS PIPELINE
     ========================================================================== */
  const checkCompletion = () => {
    const words = GameState.currentPuzzle.words;
    let allCorrect = true;

    for (const w of words) {
      for (let i = 0; i < w.answer.length; i++) {
        const wr = w.dir === 'across' ? w.row : w.row + i;
        const wc = w.dir === 'across' ? w.col + i : w.col;
        const entered = GameState.userGrid[`${wr}_${wc}`];
        if (entered !== w.answer[i]) {
          allCorrect = false;
          break;
        }
      }
      if (!allCorrect) break;
    }

    if (allCorrect && !GameState.isSolved) {
      handlePuzzleVictory();
    }
  };

  const handlePuzzleVictory = () => {
    GameState.isSolved = true;
    clearInterval(GameState.timerInterval);
    SoundEngine.playFanfare();

    // Unlock codex items from this puzzle
    GameState.currentPuzzle.words.forEach(w => {
      if (w.codexId) GameState.unlockedCodex.add(w.codexId);
    });

    // Score & metrics
    GameState.puzzlesSolvedCount++;
    const isCleanSweep = GameState.hintsUsed === 0 && GameState.errorsCount === 0;
    if (isCleanSweep) GameState.cleanSweepsCount++;
    GameState.xp += (GameState.currentPuzzle.tier === 'main' ? 250 : 100);

    GameState.savePersistence();

    // Populate Victory Modal
    document.getElementById('victory-puzzle-name').textContent = GameState.currentPuzzle.title;
    document.getElementById('vic-time').textContent = els.playTimer.textContent;
    document.getElementById('vic-hints').textContent = GameState.hintsUsed;
    const accuracy = Math.max(70, Math.round(100 - GameState.errorsCount * 5));
    document.getElementById('vic-accuracy').textContent = `${accuracy}%`;

    // Spotlight primary cocktail or tool
    const spotlightWord = GameState.currentPuzzle.words.find(w => w.codexId) || GameState.currentPuzzle.words[0];
    const entry = CodexDatabase.find(e => e.id === spotlightWord.codexId) || CodexDatabase[0];
    document.getElementById('vic-spec-name').textContent = entry.name;
    document.getElementById('vic-spec-family').textContent = entry.subline;
    document.getElementById('vic-spec-desc').textContent = entry.formula;

    setTimeout(() => {
      els.modalVictory.classList.remove('hidden');
    }, 450);
  };

  /* ==========================================================================
     CATALOG / PUZZLES BROWSER
     ========================================================================== */
  const renderCatalog = (filter = 'all') => {
    els.puzzlesList.innerHTML = '';
    const filtered = PuzzleRoster.filter(p => filter === 'all' || p.tier === filter);

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'puzzle-card';
      card.innerHTML = `
        <div class="pc-top">
          <span class="pc-tier ${p.tier}">${p.tier.toUpperCase()}</span>
          <span class="pc-status">${GameState.currentPuzzle && GameState.currentPuzzle.id === p.id ? 'ACTIVE' : 'READY'}</span>
        </div>
        <div class="pc-title">${p.title}</div>
        <div class="pc-desc">${p.blurb}</div>
        <div class="pc-footer">
          <span>Grid: ${p.gridSize.rows}×${p.gridSize.cols}</span>
          <span class="pc-best-time">Best: 01:24</span>
        </div>
      `;
      card.addEventListener('click', () => {
        SoundEngine.playClick();
        loadPuzzle(p);
        switchView('play');
      });
      els.puzzlesList.appendChild(card);
    });
  };

  /* ==========================================================================
     CODEX RENDERER & INSPECTOR
     ========================================================================== */
  const renderCodex = () => {
    const query = els.codexSearch.value.trim().toLowerCase();
    const activeFilterBtn = document.querySelector('.codex-filter.active');
    const category = activeFilterBtn ? activeFilterBtn.dataset.cat : 'all';

    els.codexGrid.innerHTML = '';
    let unlockedCount = 0;

    const filtered = CodexDatabase.filter(item => {
      const matchesCat = category === 'all' || item.category === category;
      const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.subline.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });

    filtered.forEach(item => {
      const isUnlocked = GameState.unlockedCodex.has(item.id);
      if (isUnlocked) unlockedCount++;

      const card = document.createElement('div');
      card.className = `codex-card ${isUnlocked ? '' : 'locked'}`;
      card.innerHTML = `
        <div class="cc-header">
          <span class="cc-cat">${item.category}</span>
          <span class="cc-lock-icon">${isUnlocked ? '✓' : '🔒'}</span>
        </div>
        <div class="cc-title">${isUnlocked ? item.name : 'Unknown Formulation'}</div>
        <div class="cc-subline">${isUnlocked ? item.subline : 'Solve clues to uncover'}</div>
        <div class="cc-desc">${isUnlocked ? item.formula : 'Locked Mixology Archive'}</div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          SoundEngine.playClick();
          openSpecModal(item.id);
        });
      }

      els.codexGrid.appendChild(card);
    });

    els.codexUnlockedCount.textContent = `Unlocked: ${GameState.unlockedCodex.size} / ${CodexDatabase.length} Records`;
  };

  const openSpecModal = (specId) => {
    const item = CodexDatabase.find(c => c.id === specId);
    if (!item) return;

    document.getElementById('modal-spec-cat').textContent = item.category;
    document.getElementById('codex-modal-title').textContent = item.name;
    document.getElementById('modal-spec-subline').textContent = item.subline;
    document.getElementById('modal-spec-glass').textContent = item.glass;
    document.getElementById('modal-spec-method').textContent = item.method;
    document.getElementById('modal-spec-ice').textContent = item.ice;
    document.getElementById('modal-spec-garnish').textContent = item.garnish;
    document.getElementById('modal-spec-formula').textContent = item.formula;
    document.getElementById('modal-spec-tip').textContent = item.tip;
    document.getElementById('modal-spec-lore').textContent = item.lore;

    els.modalCodexSpec.classList.remove('hidden');
  };

  /* ==========================================================================
     MASTERY DASHBOARD
     ========================================================================== */
  const renderMastery = () => {
    els.statPuzzlesSolved.textContent = GameState.puzzlesSolvedCount;
    els.statWordsUnlocked.textContent = GameState.unlockedCodex.size;
    els.statCleanSweeps.textContent = GameState.cleanSweepsCount;
    els.statStreakHigh.textContent = GameState.streak;

    // Rank Calculation
    let rank = "Curious Barback";
    let icon = "🌱";
    let xpTarget = 500;
    if (GameState.xp >= 1500) {
      rank = "Master Mixologist";
      icon = "👑";
      xpTarget = 2000;
    } else if (GameState.xp >= 1000) {
      rank = "Head Bartender";
      icon = "🍸";
      xpTarget = 1500;
    } else if (GameState.xp >= 500) {
      rank = "Senior Bartender";
      icon = "🍹";
      xpTarget = 1000;
    }

    els.profileRankTitle.textContent = rank;
    document.getElementById('profile-rank-icon').textContent = icon;
    els.profileRankSub.textContent = `${GameState.xp} Knowledge XP`;
    const pct = Math.min(100, Math.round((GameState.xp / xpTarget) * 100));
    els.profileXpFill.style.width = `${pct}%`;

    // Badges
    const badges = [
      { name: "First Pour", icon: "🥃", desc: "Solve first crossword", unlocked: GameState.puzzlesSolvedCount >= 1 },
      { name: "Clean Sweep", icon: "✨", desc: "Solve with zero hints", unlocked: GameState.cleanSweepsCount >= 1 },
      { name: "Aperitivo Sage", icon: "🍊", desc: "Master 5 Italian specs", unlocked: GameState.unlockedCodex.has("amaro") },
      { name: "Master of Ice", icon: "🧊", desc: "Unlock dilution science", unlocked: GameState.unlockedCodex.has("ice") }
    ];

    els.achievementsGrid.innerHTML = '';
    badges.forEach(b => {
      const bEl = document.createElement('div');
      bEl.className = `badge-item ${b.unlocked ? 'unlocked' : ''}`;
      bEl.innerHTML = `
        <span class="badge-icon">${b.icon}</span>
        <span class="badge-name">${b.name}</span>
        <span class="badge-desc">${b.desc}</span>
      `;
      els.achievementsGrid.appendChild(bEl);
    });
  };

  return { init, loadPuzzle, switchView };
})();

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  GameState.init();
  UIController.init();
});
