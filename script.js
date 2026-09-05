/* ==========================================================================
   COCKTAIL CROSSWORD — SCRIPT.JS
   Complete Architecture, Data, Sound Engine, Game Logic & UI Controller
   ========================================================================== */

const CONTENT_DATA = {
  puzzles: [
    {
      id: "puzzle-1-italian-hour",
      tier: "mini",
      title: "The Italian Hour",
      blurb: "Aperitivo counter herbal pours, proper expressions, and bar essentials.",
      gridSize: { rows: 3, cols: 3 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SIP", clue: "Savor a bitter aperitivo in slow, measured draws", cat: "Methods & Tools", codexId: "sip" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "ICE", clue: "Large, dense rock keeping a Spritz chilled without rapid melt", cat: "Methods & Tools", codexId: "ices" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "POP", clue: "Festive sound when releasing a wire cage on Prosecco", cat: "History & Lore", codexId: "pop" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SIP", clue: "Tasting technique before presenting a drink to guests", cat: "Methods & Tools", codexId: "sip" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "ICO", clue: "Suffix for classic Italian aperitifs like 'Amer-___'", cat: "Spirits", codexId: "amaro" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "PEP", clue: "Lively effervescence and botanical snap", cat: "Mixers", codexId: "soda" }
      ]
    },
    {
      id: "puzzle-2-agave-sunset",
      tier: "mini",
      title: "Agave Sunset",
      blurb: "Saline borders, rested reposado, and frothy citrus under the desert sun.",
      gridSize: { rows: 3, cols: 3 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "ALE", clue: "Crisp ginger brew topped onto Mexican mules", cat: "Mixers", codexId: "ale" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "RIM", clue: "Glassware boundary dressed with sal de gusano or Tajín", cat: "Glassware", codexId: "rims" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "MUD", clue: "Sediment in unfiltered artisanal clay-pot agave runs", cat: "Spirits", codexId: "clay" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "ARM", clue: "Physical muscle applied while shaking agave nectar", cat: "Methods & Tools", codexId: "egg" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "LIU", clue: "Historic trade port routes carrying citrus across the Pacific", cat: "History & Lore", codexId: "bar" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "EMD", clue: "Emergency measure: when a bar runs entirely out of fresh limes", cat: "Methods & Tools", codexId: "lime" }
      ]
    },
    {
      id: "puzzle-6-french-75",
      tier: "mini",
      title: "French 75",
      blurb: "Champagne effervescence, London dry botanical snap, and Parisian salon style.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "BRUT", clue: "Bone-dry Champagne classification ideal for French 75s", cat: "Spirits", codexId: "brut" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "RIPE", clue: "Citrus condition delivering the brightest acidity and peel oils", cat: "Mixers", codexId: "lime" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "USER", clue: "Cocktail patron enjoying bespoke service at the stick", cat: "History & Lore", codexId: "nod" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "MERS", clue: "Seas across which French sparkling wine conquered the globe", cat: "History & Lore", codexId: "eau" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "BRUM", clue: "Historic English distilling center producing botanical gin", cat: "Spirits", codexId: "junip" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "RISE", clue: "Tiny effervescent Champagne bead ascending the flute", cat: "Mixers", codexId: "soda" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "UPER", clue: "Serving a cocktail up without ice in a stemmed flute", cat: "Glassware", codexId: "coupe" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "TERS", clue: "Short, dry, and direct drink finish", cat: "Spirits", codexId: "neat" }
      ]
    },
    {
      id: "puzzle-7-the-julep-cup",
      tier: "mini",
      title: "The Julep Cup",
      blurb: "Pebble ice packing, fresh spearmint crowns, and chilled silver chalices.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "MINT", clue: "Aromatic garden herb slapped gently to awaken essential oils", cat: "Methods & Tools", codexId: "mint" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "ICEE", clue: "Crushed, powdery ice packed into a high dome", cat: "Methods & Tools", codexId: "ices" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "STIR", clue: "Gently rotating crushed ice with bourbon until the metal chalice frosts", cat: "Methods & Tools", codexId: "stirs" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "TENT", clue: "Derby infield shelter where thousands of juleps flow on race day", cat: "History & Lore", codexId: "bar" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "MIST", clue: "Frosted bead forming rapidly on conductive silver chalices", cat: "Methods & Tools", codexId: "cold" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "ICIE", clue: "Frosty, sub-zero state of a properly prepared metal cup", cat: "Methods & Tools", codexId: "ices" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "NEIN", clue: "German refusal to dilute premium aged spirits with soda", cat: "Spirits", codexId: "neat" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "TRT", clue: "Tender Loving Treatment given to delicate herb crowns", cat: "Methods & Tools", codexId: "mint" }
      ]
    },
    {
      id: "puzzle-8-bitter-truth",
      tier: "mini",
      title: "Bitter Truth",
      blurb: "Alpine gentian root, Italian amaro maceration, and botanic tinctures.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "ROOT", clue: "Underground botanical anchor like gentian, angelica, or orris", cat: "Spirits", codexId: "gentian" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "ALOE", clue: "Bitter succulent sap infused into botanical digestive tonics", cat: "Mixers", codexId: "herbal" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "BARK", clue: "Cinchona tree stripping yielding raw natural quinine", cat: "Mixers", codexId: "cinchona" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "SLOE", clue: "Small wild tart plum macerated in gin for ruby-red cordials", cat: "Spirits", codexId: "junip" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "RABS", clue: "Aromatic botanicals harvested wild on sunny Mediterranean hills", cat: "Spirits", codexId: "herbal" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "OLAL", clue: "Ancient Persian name for spiced grain elixirs", cat: "History & Lore", codexId: "bar" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "OOKO", clue: "Japanese rhythmic tapping of ice during medicinal stirring", cat: "Methods & Tools", codexId: "carv" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "TEKE", clue: "Historic tavern bench where bitter digestifs were sipped", cat: "History & Lore", codexId: "bar" }
      ]
    },
    {
      id: "puzzle-9-tiki-torch",
      tier: "mini",
      title: "Tiki Torch",
      blurb: "Almond orgeat, Barbados rum blends, and Polynesian flair.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "RUMS", clue: "Sugarcane spirits blended across pot and column stills", cat: "Spirits", codexId: "rums" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "ORGE", clue: "Classic cocktail shorthand for French almond orgeat", cat: "Mixers", codexId: "orge" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "LIME", clue: "Tart green lime supplying essential citric bite against heavy syrups", cat: "Mixers", codexId: "lime" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "LUSH", clue: "Sensory opulence of rich tropical juices, falernum, and spices", cat: "Methods & Tools", codexId: "cane" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "ROLL", clue: "Tossing liquid gently between shaker tins to incorporate juice", cat: "Methods & Tools", codexId: "pour" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "URIM", clue: "Ancient sacred stones evoked by Polynesian temple carvings", cat: "History & Lore", codexId: "tai" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "MGES", clue: "Milligrams of whole grated nutmeg dusting tiki drinks", cat: "Mixers", codexId: "nutmeg" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "SEEN", clue: "Eye-catching visual showmanship of blazing rum garnishes", cat: "History & Lore", codexId: "tai" }
      ]
    },
    {
      id: "puzzle-10-irish-warmth",
      tier: "mini",
      title: "Irish Warmth",
      blurb: "Hot water mugs, malted barley whiskey, and warm winter cheer.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "MALT", clue: "Barley grain sprouted and kilned for pot still distilling", cat: "Spirits", codexId: "malt" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "AGED", clue: "Rested in Oloroso sherry butts for rich dried-fruit nuance", cat: "Spirits", codexId: "aged" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "SHIN", clue: "Front rail where bartenders anchor their balance during peak volume", cat: "Methods & Tools", codexId: "pour" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "HOTS", clue: "Steaming drinks like the classic Irish Coffee and Toddy", cat: "Methods & Tools", codexId: "warm" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "MASH", clue: "Mixture of crushed malt and hot brewing liquor", cat: "Spirits", codexId: "malt" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "AGHO", clue: "Ancient Gaelic expletive of festive celebration", cat: "History & Lore", codexId: "bar" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "LEIT", clue: "Leitrim: Irish county famed for hearth-side hospitality", cat: "History & Lore", codexId: "warm" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "TDNS", clue: "Toddy measures carefully counted by cordial makers", cat: "Methods & Tools", codexId: "pour" }
      ]
    },
    {
      id: "puzzle-11-the-martini-dry",
      tier: "mini",
      title: "The Martini Dry",
      blurb: "Freezer-cold gin, dry vermouth mist, and Spanish olive brine.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "COLD", clue: "Sub-zero chill required for the quintessential dry Martini", cat: "Methods & Tools", codexId: "cold" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "OLIV", clue: "Castelvetrano or queen olive speared on a cocktail pick", cat: "Methods & Tools", codexId: "oliv" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "PALE", clue: "Crystal-clear, ethereal tint of a 5:1 London dry Martini", cat: "Spirits", codexId: "junip" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "STEM", clue: "Coupe or Nick & Nora handle preventing drink warming", cat: "Glassware", codexId: "stem" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "COPS", clue: "Constabulary officers raiding secret backroom speakeasies", cat: "History & Lore", codexId: "bib" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "OLAT", clue: "Old Latin root behind spirit distillation treatises", cat: "History & Lore", codexId: "eau" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "LILE", clue: "Light, floral whisper of French dry vermouth", cat: "Mixers", codexId: "vermouth" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "DVE", clue: "Dive bar standard: quick spirit-forward pours", cat: "History & Lore", codexId: "dive" }
      ]
    },
    {
      id: "puzzle-12-velvet-sour",
      tier: "mini",
      title: "Velvet Sour",
      blurb: "Raw egg white emulsions, citric tang, and aromatic bitter drops.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "FOAM", clue: "Meringue-like silky cap formed from dry-shaken albumen", cat: "Methods & Tools", codexId: "egg" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "ACID", clue: "Citric and malic sourness providing crisp structural snap", cat: "Mixers", codexId: "lime" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "SNAP", clue: "Sharp, brisk finish of well-aerated citrus cocktails", cat: "Methods & Tools", codexId: "sour" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "TAST", clue: "Sensory palate appraisal performed before garnishing", cat: "Methods & Tools", codexId: "tastes" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "FAST", clue: "High-cadence, vigorous shaking speed to lock protein bonds", cat: "Methods & Tools", codexId: "egg" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "OCNA", clue: "Organic citrus acids found naturally in lemon juices", cat: "Mixers", codexId: "lime" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "AIMS", clue: "Bartending targets: perfect chill, texture, and wash line", cat: "Methods & Tools", codexId: "balance" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "MDPT", clue: "Midpoint balancing sugar sweetness against raw spirits", cat: "Methods & Tools", codexId: "balance" }
      ]
    },
    {
      id: "puzzle-13-salty-dog",
      tier: "mini",
      title: "Salty Dog",
      blurb: "Ruby red grapefruit juice, vodka, and coarse pink sea salt rims.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SALT", clue: "Sodium crystals heightening perception of fruit sweetness", cat: "Methods & Tools", codexId: "edge" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "AGUA", clue: "Spanish for water, vital for spirit proof reduction", cat: "Mixers", codexId: "eau" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "LIME", clue: "Citrus wedge wiped across the rim before rolling in salt", cat: "Mixers", codexId: "lime" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "TART", clue: "Piquant, mouth-puckering bite of freshly pressed ruby red juice", cat: "Mixers", codexId: "grape" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SALT", clue: "Crisp crust adhering to the circumference of the glass", cat: "Glassware", codexId: "edge" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "AGIA", clue: "Ancient sacred spring water used in botanical infusions", cat: "History & Lore", codexId: "bar" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "LUMR", clue: "Luminescent pink color of fresh grapefruit cocktails", cat: "Mixers", codexId: "grape" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "TAET", clue: "Sensory tasting evaluation made via bar straw", cat: "Methods & Tools", codexId: "tastes" }
      ]
    },
    {
      id: "puzzle-14-japanese-precision",
      tier: "mini",
      title: "Japanese Precision",
      blurb: "Hand-carved ice gems, hard-shake mechanics, and meticulous bar craft.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CARV", clue: "Sculpting crystalline ice blocks into multifaceted gems", cat: "Methods & Tools", codexId: "carv" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "AGED", clue: "Japanese whisky rested in rare Mizunara sandalwood oak", cat: "Spirits", codexId: "aged" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ROCK", clue: "Dense, hand-cut clear cube anchored in an Old Fashioned glass", cat: "Glassware", codexId: "rock" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "POUR", clue: "Controlled, silent spirit arc flowing into crystal", cat: "Methods & Tools", codexId: "pour" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CARP", clue: "Fish motif engraved into decorative hand-hammered tins", cat: "Methods & Tools", codexId: "shakers" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "AGOO", clue: "Traditional hospitality greeting upon entering a Ginza lounge", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "RECU", clue: "Classic cocktail specs meticulously memorized by apprentices", cat: "History & Lore", codexId: "rec" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "VDKR", clue: "Vodka martini precision specs logged in master bar registers", cat: "Spirits", codexId: "vodka" }
      ]
    },
    {
      id: "puzzle-15-daiquiri-craft",
      tier: "mini",
      title: "Daiquiri Craft",
      blurb: "The ultimate bartender test: raw rum, fresh lime, and sugar cane crystals.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CANE", clue: "Saccharum officinarum stalk yielding pure golden syrup", cat: "Spirits", codexId: "cane" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "OPAL", clue: "Iridescent, shimmering appearance of fine aerated cocktails", cat: "Glassware", codexId: "coupe" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "RIPE", clue: "Fresh Persian limes squeezed at peak maturity", cat: "Mixers", codexId: "lime" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "DEER", clue: "Wild game paired with rustic Caribbean plantation punches", cat: "History & Lore", codexId: "rums" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CORD", clue: "Fine citrus twists tied neatly to garnish tropical drinks", cat: "Methods & Tools", codexId: "peel" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "APIE", clue: "Balanced cocktail recipe fitting together like clockwork", cat: "Methods & Tools", codexId: "balance" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "NAPE", clue: "Back rim of the coupe resting against the index finger", cat: "Glassware", codexId: "coupe" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "ELER", clue: "Elderflower cordial drops lending floral lift to rum", cat: "Mixers", codexId: "herbal" }
      ]
    },
    {
      id: "puzzle-16-old-fashioned-bar",
      tier: "mini",
      title: "Old Fashioned Bar",
      blurb: "Demerara sugar cubes, aromatic bitters saturated, and rye warmth.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "RYES", clue: "Spicy American grain whiskeys anchoring classic recipes", cat: "Spirits", codexId: "ryes" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "OAKS", clue: "Quercus alba wood barrels imparting vanillin and charred sugars", cat: "Spirits", codexId: "aged" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "CUBE", clue: "Dense format sugar block soaked in Angostura bitters", cat: "Methods & Tools", codexId: "bitters" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "PEEL", clue: "Orange skin strip expressed firmly to coat the rim with oil", cat: "Methods & Tools", codexId: "peel" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "ROCP", clue: "Heavy crystal base supporting an Old Fashioned glass", cat: "Glassware", codexId: "rock" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "YAUE", clue: "Subtle woody aromas rising from toasted white oak staves", cat: "Spirits", codexId: "aged" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "EKBE", clue: "Historic abbreviation for European oak aging standards", cat: "Spirits", codexId: "aged" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "SSEL", clue: "Vessel walls holding ice cold during a Yarai stir", cat: "Methods & Tools", codexId: "stirs" }
      ]
    },
    {
      id: "puzzle-17-the-highball-spear",
      tier: "mini",
      title: "The Highball Spear",
      blurb: "Crystal ice monoliths, super-chilled club soda, and single malt harmony.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SODA", clue: "Highly effervescent mineral water lifting whisky aromas", cat: "Mixers", codexId: "soda" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "PEAK", clue: "Top edge of an ice spear aligned with the glass wash line", cat: "Methods & Tools", codexId: "spea" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ECHO", clue: "Acoustic chime of crystal highball glasses clinking together", cat: "History & Lore", codexId: "nod" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "ARCS", clue: "Curved paths of carbonation bubbles rising along glass walls", cat: "Mixers", codexId: "soda" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SPEA", clue: "Ice spear carved precisely to the inner height of a Collins", cat: "Methods & Tools", codexId: "spea" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "OECC", clue: "Over-extracted citrus check ensuring zero bitter pith enters", cat: "Methods & Tools", codexId: "peel" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "DAHR", clue: "Subtle earthy peat aroma in Islay single malt highballs", cat: "Spirits", codexId: "islay" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "AKOS", clue: "Akashi and other renowned Japanese whisky producers", cat: "Spirits", codexId: "aged" }
      ]
    },
    {
      id: "puzzle-18-oaxacan-smoke",
      tier: "mini",
      title: "Oaxacan Smoke",
      blurb: "Underground pit-roasted espadín, clay copitas, and sal de gusano.",
      gridSize: { rows: 4, cols: 4 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CLAY", clue: "Porous ceramic copita traditionally used for sipping mezcal", cat: "Glassware", codexId: "clay" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "LAVA", clue: "Volcanic stone lining earthen fire pits roasting wild agaves", cat: "Methods & Tools", codexId: "tahona" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "AGED", clue: "Resting mezcal gently in glass demijohns under cool dirt floors", cat: "Spirits", codexId: "aged" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "YARD", clue: "Palenque courtyard where cooked piñas cool before milling", cat: "History & Lore", codexId: "pura" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CLAY", clue: "Earthen material imparting mineral terroir to pot distillates", cat: "Glassware", codexId: "clay" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "LAGA", clue: "Sediment layer of agave yeasts during open-air fermentation", cat: "Spirits", codexId: "pura" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "AVER", clue: "To affirm the provenance of ancestral batch distillations", cat: "History & Lore", codexId: "pura" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "YADD", clue: "Historic Oaxacan mountain trails connecting remote palenques", cat: "History & Lore", codexId: "pura" }
      ]
    },

    /* =========================================================================
       MIDI PUZZLES (18 TOTAL) — 5x5 to 6x6 grids, rich thematic mixology crosswords
       ========================================================================= */
    {
      id: "puzzle-3-highball-express",
      tier: "midi",
      title: "Highball Express",
      blurb: "Whisky, crisp bubbles, and crystal clear ice spears in the highball tradition.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CHILL", clue: "Deep sub-zero cooling of glassware and spirit before pouring", cat: "Methods & Tools", codexId: "cold" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "HONEY", clue: "Rich golden syrup sweetening modern highball variations", cat: "Mixers", codexId: "honey" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ANGER", clue: "What a bartender feels when a soda siphon goes completely flat", cat: "History & Lore", codexId: "nod" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "SPEAR", clue: "Precision-cut ice prism extending the height of a Collins glass", cat: "Methods & Tools", codexId: "spea" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "MYTHS", clue: "Legends surrounding the exact origin of the term 'highball'", cat: "History & Lore", codexId: "bar" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CHASM", clue: "Deep crack formed if warm soda hits un-tempered ice", cat: "Methods & Tools", codexId: "ices" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "HONPY", clue: "Dense viscous mouthfeel from high-brix syrups", cat: "Mixers", codexId: "honey" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "INGET", clue: "Metal ingot mold inspiring large-format craft ice carving", cat: "Methods & Tools", codexId: "carv" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "LEEAS", clue: "Yeast sediment resting at the bottom of cider and wine barrels", cat: "Spirits", codexId: "finos" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "LYRHS", clue: "Melodic cadence of carbonation fizzing against the glass rim", cat: "Mixers", codexId: "soda" }
      ]
    },
    {
      id: "puzzle-4-speakeasy-secret",
      tier: "midi",
      title: "Speakeasy Secret",
      blurb: "Spirit-forward standards, Bottled-in-Bond whiskies, and cellar service.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "PROOF", clue: "Twice the percentage of alcohol by volume in the US system", cat: "Spirits", codexId: "proof" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "RYESR", clue: "Spicy grain spirit lots aging in bonded rickhouses", cat: "Spirits", codexId: "ryes" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ORDER", clue: "Ticket calling out three Manhattans and an Old Fashioned", cat: "History & Lore", codexId: "bar" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "OUTER", clue: "External surface of shaker tins that frosts during a hard shake", cat: "Methods & Tools", codexId: "shakers" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "FORKS", clue: "Bar tools with trident tips for spearing cocktail cherries", cat: "Methods & Tools", codexId: "cherr" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "PROOF", clue: "The purity benchmark guaranteed by the 1897 Bond Act", cat: "Spirits", codexId: "proof" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "RYOUO", clue: "Rested grain spirits savored in backroom drinking dens", cat: "Spirits", codexId: "ryes" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "ORDTR", clue: "Systematic order of bottles arranged in the speed rail", cat: "Methods & Tools", codexId: "misenplace" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "OEERK", clue: "Seasoned oak barrel staves imparting rich vanillin", cat: "Spirits", codexId: "aged" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "FRRSS", clue: "Fierce thermal chill produced when dry ice contacts ethanol", cat: "Methods & Tools", codexId: "cold" }
      ]
    },
    {
      id: "puzzle-19-the-manhattan-grid",
      tier: "midi",
      title: "The Manhattan Grid",
      blurb: "Rye whiskey backbone, sweet Italian vermouth, and brandied cherries.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SWEET", clue: "Rich Italian rosso vermouth providing herbal body and dark fruit", cat: "Mixers", codexId: "sweet" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "WINEP", clue: "Fortified wine profile anchoring historic aromatized aperitifs", cat: "Mixers", codexId: "sweet" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ENTER", clue: "Step through speakeasy curtains into the bustling cocktail room", cat: "History & Lore", codexId: "bar" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "EXALT", clue: "Elevate a drink through precise dilution and proper glassware", cat: "Methods & Tools", codexId: "balance" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TREYS", clue: "Three-dash measures of aromatic bitters across the cocktail surface", cat: "Mixers", codexId: "bitters" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SWEET", clue: "Opposite of dry: vermouth style that makes a classic Manhattan", cat: "Mixers", codexId: "sweet" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "WINTX", clue: "Winter spices like clove and cinnamon infused into red vermouth", cat: "Mixers", codexId: "sweet" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "ENEAE", clue: "Aromatic terpenes evaporated from fresh orange zest", cat: "Methods & Tools", codexId: "peel" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "ETRLY", clue: "Earthy botanical bitterness lingering on the back of the palate", cat: "Spirits", codexId: "amaro" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "TPRTS", clue: "Tasting portions poured into snifters for bar staff training", cat: "Methods & Tools", codexId: "tastes" }
      ]
    },
    {
      id: "puzzle-20-negroni-century",
      tier: "midi",
      title: "Negroni Century",
      blurb: "Count Camillo's equal-parts masterpiece of gin, Campari, and sweet vermouth.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "EQUAL", clue: "Historic 1:1:1 proportion balancing gin, red bitter, and sweet vermouth", cat: "Methods & Tools", codexId: "equal" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "QUITE", clue: "Description of a Negroni with a high-proof London dry gin", cat: "Spirits", codexId: "junip" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "UNTIL", clue: "Stirring continuous revolutions until ice cold and properly diluted", cat: "Methods & Tools", codexId: "stirs" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "AMARO", clue: "Bitter Italian herbal category sipped before and after meals", cat: "Spirits", codexId: "amaro" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "LEMON", clue: "Citrus cousin whose peel is occasionally swapped for orange", cat: "Mixers", codexId: "lime" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "EQUAL", clue: "Identical ounce measures yielding timeless structural balance", cat: "Methods & Tools", codexId: "equal" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "QUNME", clue: "Quinine and herbs macerated in warm neutral alcohol", cat: "Spirits", codexId: "amaro" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "UTTAM", clue: "Top-tier hospitality experience delivering memorable guest moments", cat: "History & Lore", codexId: "nod" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "AIROO", clue: "Aromatic citrus oils expressed over the cocktail surface", cat: "Methods & Tools", codexId: "peel" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "LELON", clue: "Lemon twist variation ordered by guests desiring brighter acidity", cat: "Methods & Tools", codexId: "peel" }
      ]
    },
    {
      id: "puzzle-21-london-dry-fog",
      tier: "midi",
      title: "London Dry Fog",
      blurb: "Juniper pine, coriander seed, angelica root, and quinine tonic water.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "STILL", clue: "Copper pot or Carter-Head chamber extracting clean botanical vapors", cat: "Spirits", codexId: "still" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "TONIC", clue: "Quinine-infused carbonated mixer balancing sharp juniper pine", cat: "Mixers", codexId: "tonic" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "INCUR", clue: "What high-volume bars do to ice inventory during Friday rushes", cat: "Methods & Tools", codexId: "ices" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "LANCE", clue: "Cocktail pick piercing cocktail onions in a Gibson", cat: "Methods & Tools", codexId: "cherr" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "LOKEY", clue: "Understated elegance of a quiet hotel gin lounge", cat: "History & Lore", codexId: "bar" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "STILL", clue: "Apparatus where spirit wash boils to produce fragrant gin", cat: "Spirits", codexId: "still" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "TONAN", clue: "Tonic recipe balances recorded in historic British Navy logbooks", cat: "Mixers", codexId: "tonic" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "INCCO", clue: "Incorporating citrus oil droplets evenly across gin and tonics", cat: "Methods & Tools", codexId: "peel" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "LICEE", clue: "Fine crushed ice floating over long refreshing summer highballs", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "LCREY", clue: "Licorice root providing subtle sweet undertones to dry gin", cat: "Spirits", codexId: "junip" }
      ]
    },
    {
      id: "puzzle-22-bourbon-county",
      tier: "midi",
      title: "Bourbon County",
      blurb: "Kentucky limestone water, 51% corn mashbills, and fresh charred oak.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CHARS", clue: "Level 3 or 4 alligator char inside new American oak barrels", cat: "Spirits", codexId: "chars" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "HONEY", clue: "Sweet tasting note pulled from caramelized oak wood sugars", cat: "Spirits", codexId: "honey" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ACRES", clue: "Fields of yellow dent corn cultivated for historic distilleries", cat: "Spirits", codexId: "corns" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "RESET", clue: "Wiping and resetting a bar station between rounds of service", cat: "Methods & Tools", codexId: "misenplace" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "STEEP", clue: "Soak cracked grains in heated mash tuns to convert starches", cat: "Spirits", codexId: "malt" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CHARS", clue: "Torched wood surface activating oak wood sugars and vanillin", cat: "Spirits", codexId: "chars" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "HOCES", clue: "Historic wooden hogshead casks shipped down the Ohio River", cat: "Spirits", codexId: "aged" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "ANREE", clue: "Annual maturation shifts caused by Kentucky summer heat", cat: "Spirits", codexId: "aged" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "RESET", clue: "Restocking clean glassware and ice wells at shift changes", cat: "Methods & Tools", codexId: "misenplace" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "SYSTP", clue: "Systematic rotation of whiskey casks across warehouse floors", cat: "Spirits", codexId: "aged" }
      ]
    },
    {
      id: "puzzle-23-caribbean-cask",
      tier: "midi",
      title: "Caribbean Cask",
      blurb: "High ester Jamaican pot-still rums, lime acid, and tropical funk.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SUGAR", clue: "Dark molasses boiled down from tropical sugarcane stalks", cat: "Spirits", codexId: "cane" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "USAGE", clue: "Consumption volume of lime juice during warm summer service", cat: "Mixers", codexId: "lime" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "GRAVY", clue: "Thick, viscous mouthfeel of heavy Jamaican pot distillates", cat: "Spirits", codexId: "rums" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "AGILE", clue: "Nimble bar speed juggling shakers, bottles, and garnishes", cat: "Methods & Tools", codexId: "pour" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "REEDS", clue: "Tall wild sugarcane grasses harvested on tropical hillsides", cat: "Spirits", codexId: "cane" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SUGAR", clue: "Sweet foundation balancing overproof funk and citrus", cat: "Spirits", codexId: "cane" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "USGAR", clue: "Unrefined raw sugar crystals utilized in Caribbean punches", cat: "Mixers", codexId: "cane" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "GAVIE", clue: "Gala tavern festivities where punch bowls were emptied", cat: "History & Lore", codexId: "urn" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "AGYLD", clue: "Aging yields lost to the Caribbean angel's share", cat: "Spirits", codexId: "aged" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "REYES", clue: "Spicy Mexican ancho chile liqueur pairing with dark rums", cat: "Spirits", codexId: "rums" }
      ]
    },
    {
      id: "puzzle-24-the-sidecar-flight",
      tier: "midi",
      title: "The Sidecar Flight",
      blurb: "Cognac grandeur, orange liqueur sweetness, and lemon sugar crustas.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CRUST", clue: "Sugar border coating the coupe rim to temper lemon acidity", cat: "Glassware", codexId: "edge" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "RADIO", clue: "Jazz age broadcast soundtracking Parisian American barrooms", cat: "History & Lore", codexId: "bar" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "UNCLE", clue: "Affectionate nickname for regular patrons who sit at the corner stool", cat: "History & Lore", codexId: "nod" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "STERN", clue: "Firm hospitality demeanor handling unruly or over-served guests", cat: "History & Lore", codexId: "nod" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TEARS", clue: "Droplets running down mixing glass walls revealing alcohol tears", cat: "Spirits", codexId: "proof" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CRUST", clue: "Crisp outer band of fine white sugar adorning the glass rim", cat: "Glassware", codexId: "edge" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "RANTR", clue: "Lively debate voiced across tavern counters late at night", cat: "History & Lore", codexId: "bar" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "UDCER", clue: "Under-chilled cocktail needing rapid aeration in tins", cat: "Methods & Tools", codexId: "shakers" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "SILRN", clue: "Silky texture imparted when triple sec emulsifies with citrus", cat: "Mixers", codexId: "sec" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "TOENS", clue: "Tones of toasted oak and candied orange peel on the palate", cat: "Spirits", codexId: "limousin" }
      ]
    },
    {
      id: "puzzle-25-moscow-mule-express",
      tier: "midi",
      title: "Moscow Mule Express",
      blurb: "Copper mug frost, fiery ginger beer spice, and crisp vodka.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "FROST", clue: "Icy sheen coating copper mugs within seconds of pouring", cat: "Methods & Tools", codexId: "cold" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "RIDER", clue: "Cocktail menu addendum listing seasonal house variations", cat: "History & Lore", codexId: "bar" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ORDER", clue: "Call for a round of mules served in frosted metal mugs", cat: "History & Lore", codexId: "bar" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "STERN", clue: "Sturdy handle preventing body heat from warming the cup", cat: "Glassware", codexId: "cup" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TREES", clue: "Birch forests yielding charcoal used to filter premium vodka", cat: "Spirits", codexId: "vodka" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "FROST", clue: "Thermal conductivity of copper delivering icy exterior frost", cat: "Methods & Tools", codexId: "cold" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "RIDTR", clue: "Ridge along metal cups providing secure grip when condensation forms", cat: "Glassware", codexId: "cup" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "ODREE", clue: "Order of build: vodka, fresh lime, crushed ice, spicy ginger", cat: "Methods & Tools", codexId: "pour" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "SERRE", clue: "Tight ice packing technique ensuring maximum drink longevity", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "TRNS", clue: "Turns of the barspoon integrating spicy ginger beer", cat: "Methods & Tools", codexId: "stirs" }
      ]
    },
    {
      id: "puzzle-26-corpse-reviver",
      tier: "midi",
      title: "Corpse Reviver",
      blurb: "Four equal parts, an absinthe rinse, and morning hair-of-the-dog lore.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "RINSE", clue: "Swirling absinthe around the coupe bowl before discarding excess", cat: "Methods & Tools", codexId: "rinse" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "IONIC", clue: "Charged mineral salts in aperitif wines heightening flavor", cat: "Mixers", codexId: "kina" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "NIGHT", clue: "Late bar shift giving rise to the morning need for a Reviver", cat: "History & Lore", codexId: "cor" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "SHINE", clue: "Polished brilliance of crystal coupes catching saloon chandeliers", cat: "Glassware", codexId: "coupe" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "ENTER", clue: "Walk into Harry Craddock's American Bar for early remedies", cat: "History & Lore", codexId: "savoy" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "RINSE", clue: "Aromatic anise film coating the glass to provide ethereal aromatics", cat: "Methods & Tools", codexId: "rinse" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "IONHN", clue: "Ion balance in sparkling waters used for morning spritzes", cat: "Mixers", codexId: "soda" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "NIGIT", clue: "Nightcap counterpart to morning revivers", cat: "History & Lore", codexId: "cor" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "SCNER", clue: "Scenic Savoy hotel lounge where vintage formulas were born", cat: "History & Lore", codexId: "savoy" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "ETTER", clue: "Etiquette of discreet daytime restorative cocktail service", cat: "History & Lore", codexId: "nod" }
      ]
    },
    {
      id: "puzzle-27-sazerac-room",
      tier: "midi",
      title: "Sazerac Room",
      blurb: "New Orleans Peychaud's bitters, rye spice, herbsaint, and lemon peel oil.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "ANISE", clue: "Pungent licorice seed profile powering Herbsaint and absinthe", cat: "Spirits", codexId: "anise" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "NEVER", clue: "Rule of the Sazerac: ___ serve it over ice rocks in the glass", cat: "Methods & Tools", codexId: "neat" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "IMAGE", clue: "Visual silhouette of the chilled, amber, un-iced old fashioned tumbler", cat: "Glassware", codexId: "rock" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "SEDGE", clue: "Marsh grass near Louisiana bayous where herbs were gathered", cat: "History & Lore", codexId: "peych" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "ENTER", clue: "Step into the Roosevelt Hotel's famed walnut-paneled Sazerac Bar", cat: "History & Lore", codexId: "bar" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "ANISE", clue: "Dominant botanical perfume lingering from the glass rinse", cat: "Spirits", codexId: "anise" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "NEMEN", clue: "Nemesis of sweet drinks: bold, dry, high-proof rye whiskey", cat: "Spirits", codexId: "ryes" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "IVADT", clue: "Invigorating bitter drops of Peychaud's gentian tincture", cat: "Mixers", codexId: "peych" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "SEGER", clue: "Bar spoon segment guiding aromatic peel oils across the rim", cat: "Methods & Tools", codexId: "peel" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "EREE", clue: "Eerie glow of green absinthe louche in vintage fountains", cat: "Spirits", codexId: "anise" }
      ]
    },
    {
      id: "puzzle-28-paloma-sunset",
      tier: "midi",
      title: "Paloma Sunset",
      blurb: "Tequila blanco, sparkling grapefruit soda, fresh lime, and sea salt rim.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SALTS", clue: "Crust coarse pink mineral salt along the glass perimeter", cat: "Methods & Tools", codexId: "edge" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "AGAVE", clue: "Blue Weber succulent harvested in Jalisco highlands and valleys", cat: "Spirits", codexId: "pura" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "LIMES", clue: "Tart green citrus providing malic cut to bittersweet soda", cat: "Mixers", codexId: "lime" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "TONES", clue: "Grapefruit pith and mineral notes lingering pleasantly", cat: "Mixers", codexId: "grape" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "SMART", clue: "Clever bartender technique: salting only half the rim for guest choice", cat: "Glassware", codexId: "edge" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SALTS", clue: "Enhances sweetness perception while curbing excessive grapefruit bitterness", cat: "Methods & Tools", codexId: "edge" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "AGIOM", clue: "Agave nectar dissolved in citrus juice to balance highballs", cat: "Mixers", codexId: "honey" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "LIMA", clue: "Key lime cultivar known throughout Latin America for crisp acid", cat: "Mixers", codexId: "lime" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "TVNER", clue: "Tavern server carrying trays of refreshing summer highballs", cat: "History & Lore", codexId: "nod" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "SESST", clue: "Sensory zest test made by pinching a swatch of citrus peel", cat: "Methods & Tools", codexId: "peel" }
      ]
    },
    {
      id: "puzzle-29-jungle-bird-nest",
      tier: "midi",
      title: "Jungle Bird Nest",
      blurb: "Dark Jamaican blackstrap rum, Campari, fresh pineapple juice, and demerara.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "FLOAT", clue: "Layering high-proof dark rum gently across the cocktail surface", cat: "Methods & Tools", codexId: "float" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "LEMON", clue: "Citrus whose oils accent tropical bitter-sweet balances", cat: "Mixers", codexId: "lime" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "OPINE", clue: "Discuss cocktail merits with fellow aficionados at the mahogany bar", cat: "History & Lore", codexId: "bar" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "AGILE", clue: "Fast, coordinated shaking necessary to froth dense pineapple juice", cat: "Methods & Tools", codexId: "egg" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TIRED", clue: "Bartender's arms after whipping up dozens of shaken tiki drinks", cat: "Methods & Tools", codexId: "shakers" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "FLOAT", clue: "Technique utilizing a turned bar spoon to create stunning layered colors", cat: "Methods & Tools", codexId: "float" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "LEPGI", clue: "Layered glass presentation designed to delight tropical guests", cat: "Glassware", codexId: "coupe" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "OMIRR", clue: "Opaque foam head mirroring egg white froth on pineapple sours", cat: "Methods & Tools", codexId: "egg" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "ANLEE", clue: "Anise and spice undertones found in Caribbean falernum syrups", cat: "Mixers", codexId: "orge" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "TNETD", clue: "Tended station meticulously organized for high-speed craft cocktail execution", cat: "Methods & Tools", codexId: "misenplace" }
      ]
    },
    {
      id: "puzzle-30-the-last-word",
      tier: "midi",
      title: "The Last Word",
      blurb: "Gin, green Chartreuse, maraschino liqueur, and fresh lime in equal quarters.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "CHART", clue: "Chartreuse: 130-herb green elixir made by Carthusian monks since 1737", cat: "Spirits", codexId: "chart" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "HONOR", clue: "Revering time-honored proportions recorded in the Detroit Athletic Club", cat: "History & Lore", codexId: "fours" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ANISE", clue: "Botanical spice lending pungent herbal support to green liqueurs", cat: "Spirits", codexId: "anise" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "RESET", clue: "Clear mixing vessels immediately after working with intensely dyed cordials", cat: "Methods & Tools", codexId: "misenplace" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TREYS", clue: "Three-dash accents of bitters used in modern Last Word riffs", cat: "Mixers", codexId: "bitters" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CHART", clue: "Visual specs chart hung behind the back bar for apprentice training", cat: "History & Lore", codexId: "rec" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "HONES", clue: "Sharpens bar skills and palate perception through constant blind tasting", cat: "Methods & Tools", codexId: "tastes" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "ANISE", clue: "Licorice aromatic note weaving through alpine herbal liqueurs", cat: "Spirits", codexId: "anise" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "ROETY", clue: "Round, silky mouthfeel produced when maraschino meets fresh lime", cat: "Spirits", codexId: "maras" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "TRETS", clue: "Treats offered to loyal regulars who order sophisticated historical cocktails", cat: "History & Lore", codexId: "nod" }
      ]
    },
    {
      id: "puzzle-31-sherry-bodega",
      tier: "midi",
      title: "Sherry Bodega",
      blurb: "Jerez de la Frontera, flor yeast veils, and solera system criaderas.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "FINOS", clue: "Bone-dry fortified wine aged under a protective live veil of flor yeast", cat: "Spirits", codexId: "finos" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "IMAGE", clue: "Silhouette of black Osborne bulls along dusty Spanish bodega highways", cat: "History & Lore", codexId: "soler" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "NUTTY", clue: "Oxidative savory walnut and hazelnut complexity of Amontillado", cat: "Spirits", codexId: "nutty" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "ORATE", clue: "Deliver an impassioned explanation of the dynamic solera system", cat: "History & Lore", codexId: "soler" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "SEWER", clue: "Where flat, oxidized, and spoiled low-acid table wine belongs", cat: "Methods & Tools", codexId: "tastes" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "FINOS", clue: "Pale, saline Andalusian pours served ice-cold with salted almonds", cat: "Spirits", codexId: "finos" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "IMURE", clue: "Immure barrels in cool, humid cathedral-like bodega cellars", cat: "History & Lore", codexId: "soler" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "NATAW", clue: "Natural chalky albariza soil capturing winter rains in Jerez", cat: "Spirits", codexId: "finos" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "OGTEE", clue: "Original oak cask wood selected for criadera solera tiers", cat: "Spirits", codexId: "soler" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "SYER", clue: "Syrupy sweetness of sun-dried Pedro Ximénez raisin grapes", cat: "Spirits", codexId: "nutty" }
      ]
    },
    {
      id: "puzzle-32-penicillin-lab",
      tier: "midi",
      title: "Penicillin Lab",
      blurb: "Blended Scotch, ginger honey syrup, lemon, and an Islay peat float.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "ISLAY", clue: "Peat-smoked Scottish island producing pungent, medicinal single malts", cat: "Spirits", codexId: "islay" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "SHAKE", clue: "Aerating blended Scotch, fresh lemon, and ginger-honey syrup", cat: "Methods & Tools", codexId: "shakers" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "LABEL", clue: "Identification tag affixed to squeeze bottles of homemade syrups", cat: "Methods & Tools", codexId: "misenplace" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "AMBER", clue: "Glowing golden-honey hue of a properly poured Penicillin", cat: "Spirits", codexId: "aged" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "YEARS", clue: "Decades casks sleep in damp Scottish warehouses facing the sea", cat: "Spirits", codexId: "islay" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "ISLAY", clue: "Source of the smoky aromatic mist floating above the drink surface", cat: "Spirits", codexId: "islay" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "SHAME", clue: "The bartender's regret over spilling a rare peated single malt", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "LABBA", clue: "Laboratory-like precision used to extract fresh spicy ginger root", cat: "Methods & Tools", codexId: "honey" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "AKEER", clue: "Aromatic oak esters greeting the guest during their first inhalation", cat: "Spirits", codexId: "nose" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "YELRS", clue: "Yellow candied ginger disks speared as the modern classic garnish", cat: "Methods & Tools", codexId: "honey" }
      ]
    },
    {
      id: "puzzle-33-aviation-skies",
      tier: "midi",
      title: "Aviation Skies",
      blurb: "Crème de violette, maraschino, dry gin, and lemon skies.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "VIOLE", clue: "Crème de violette: floral alpine cordial creating twilight-purple hues", cat: "Spirits", codexId: "viole" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "IMAGE", clue: "The pale sky-blue appearance of Hugo Ensslin's 1916 masterpiece", cat: "History & Lore", codexId: "coupe" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "ORRIS", clue: "Powdered iris root used in gin to fix and anchor floral aromatics", cat: "Spirits", codexId: "junip" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "LEAST", clue: "Minimal dash proportion of violette needed to avoid soapy excess", cat: "Methods & Tools", codexId: "pour" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TESTS", clue: "Palate tastings ensuring maraschino does not overpower botanical gin", cat: "Methods & Tools", codexId: "tastes" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "VIOLT", clue: "Violet flower essence perfume rising when the drink is poured", cat: "Spirits", codexId: "viole" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "IMORE", clue: "Immersion method of infusing delicate alpine blossom petals", cat: "Methods & Tools", codexId: "herbal" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "OARAS", clue: "Oak barrels occasionally seasoned with floral fruit eaux-de-vie", cat: "Spirits", codexId: "eau" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "LGIST", clue: "Light, ethereal mist created when floral citrus drinks are shaken hard", cat: "Methods & Tools", codexId: "shakers" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "ESSTS", clue: "Essential oils misting out of fresh lemon wheels over the purple drink", cat: "Methods & Tools", codexId: "peel" }
      ]
    },
    {
      id: "puzzle-34-boulevardier-club",
      tier: "midi",
      title: "Boulevardier Club",
      blurb: "Erskine Gwynne's 1920s Paris expatriate blend of bourbon, Campari, and rouge.",
      gridSize: { rows: 5, cols: 5 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "ROUGE", clue: "Sweet red vermouth supplying luscious dried fig and herb depth", cat: "Mixers", codexId: "rouge" },
        { id: "4A", num: 4, dir: "across", row: 1, col: 0, answer: "ORDER", clue: "Direct request for an equal-parts whiskey aperitivo", cat: "History & Lore", codexId: "bar" },
        { id: "5A", num: 5, dir: "across", row: 2, col: 0, answer: "UNTIL", clue: "Continue stirring until proper thermal transfer and dilution are achieved", cat: "Methods & Tools", codexId: "stirs" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 0, answer: "GRAIN", clue: "Corn and rye mashbill providing backbone against intense bitters", cat: "Spirits", codexId: "corns" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "EARTH", clue: "Gentian and botanical earthiness anchoring the bitter finish", cat: "Spirits", codexId: "gentian" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "ROUGE", clue: "Ruby red fortified wine originating from Turin and Chambéry", cat: "Mixers", codexId: "rouge" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 1, answer: "ORNAR", clue: "Ornate crystal mixing beakers gracing Parisian expatriate counters", cat: "Glassware", codexId: "rock" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 2, answer: "UDTIA", clue: "Underlying herbal complexity uniting bitter orange and corn whiskey", cat: "Spirits", codexId: "amaro" },
        { id: "4D", num: 4, dir: "down", row: 0, col: 3, answer: "GEIRT", clue: "Gentle circular motion of the bar spoon keeping clarity pristine", cat: "Methods & Tools", codexId: "stirs" },
        { id: "5D", num: 5, dir: "down", row: 0, col: 4, answer: "ERLNH", clue: "Early 20th-century European salons where cocktail culture flourished", cat: "History & Lore", codexId: "bar" }
      ]
    },
    {
      id: "puzzle-5-masters-service",
      tier: "main",
      title: "The Master’s Service",
      blurb: "Stemware, shaken Daiquiris, and sensory evaluation from nose to wash line.",
      gridSize: { rows: 6, cols: 6 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "COUPE", clue: "Curved stemmed glass designed for drinks served up without ice", cat: "Glassware", codexId: "coupe" },
        { id: "3A", num: 3, dir: "across", row: 1, col: 1, answer: "ORDER", clue: "Guest beverage request relayed during service rushes", cat: "History & Lore", codexId: "bar" },
        { id: "4A", num: 4, dir: "across", row: 2, col: 0, answer: "PINTS", clue: "Standard 16-ounce glassware for draft pours and mixing glasses", cat: "Glassware", codexId: "pints" },
        { id: "6A", num: 6, dir: "across", row: 3, col: 1, answer: "STILL", clue: "Copper pot producing dense, flavorful spirits", cat: "Spirits", codexId: "still" },
        { id: "7A", num: 7, dir: "across", row: 4, col: 0, answer: "TASTES", clue: "Evaluates drink balance and dilution via bar straw drop", cat: "Methods & Tools", codexId: "tastes" },
        { id: "8A", num: 8, dir: "across", row: 5, col: 1, answer: "SWEET", clue: "Sugar cane, agave, or liqueur balance against proof", cat: "Mixers", codexId: "cane" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "CAP", clue: "The snug closure capping a three-piece cobbler shaker", cat: "Methods & Tools", codexId: "cap" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "URN", clue: "Vessel used to batch and ladle communal hot punches", cat: "Glassware", codexId: "urn" },
        { id: "3D", num: 3, dir: "down", row: 1, col: 4, answer: "ROSE", clue: "Pink hue or botanical water misted over vintage cocktails", cat: "Mixers", codexId: "herbal" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 0, answer: "POT", clue: "Traditional batch still retaining botanical oils and congeners", cat: "Spirits", codexId: "pot" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "TILT", clue: "Angle the coupe slightly when fine straining to prevent foam splash", cat: "Methods & Tools", codexId: "pour" },
        { id: "6D", num: 6, dir: "down", row: 3, col: 1, answer: "STRAW", clue: "Tool used by craft tenders to sanitary-taste drinks before service", cat: "Methods & Tools", codexId: "tastes" }
      ]
    },
    {
      id: "puzzle-35-the-grand-speakeasy",
      tier: "main",
      title: "The Grand Speakeasy",
      blurb: "Prohibition cellar doors, Boston shaker tins, hand jiggers, and house bitters.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SHAKERS", clue: "Two-piece metal Boston tins delivering rapid thermal chill and aeration", cat: "Methods & Tools", codexId: "shakers" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "BITTERS", clue: "Concentrated botanical extracts balancing proof and sweetness", cat: "Mixers", codexId: "bitters" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "STIRRED", clue: "Cocktails turned smoothly with ice to preserve crystal clarity", cat: "Methods & Tools", codexId: "stirs" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "JULEPS", clue: "Mint and bourbon drinks packed in frosted sterling silver chalices", cat: "Glassware", codexId: "juleps" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SUB", clue: "House syrup or modifier substituted to customize classic templates", cat: "Methods & Tools", codexId: "sub" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "ACT", clue: "The 1919 Volstead Act driving American cocktail culture underground", cat: "History & Lore", codexId: "bib" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "EYE", clue: "Carefully eyeing wash lines to guarantee consistent presentation", cat: "Methods & Tools", codexId: "eye" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "ICE", clue: "Hand-cut clear blocks providing clean, controlled dilution", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "TAI", clue: "Trader Vic's 1944 Tahitian rum icon: the Mai ___", cat: "History & Lore", codexId: "tai" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "RYE", clue: "Spicy grain backbone of the pre-Prohibition Manhattan", cat: "Spirits", codexId: "ryes" },
        { id: "7D", num: 7, dir: "down", row: 4, col: 0, answer: "SIP", clue: "Tasting the finished cocktail across the entire palate", cat: "Methods & Tools", codexId: "sip" },
        { id: "8D", num: 8, dir: "down", row: 4, col: 2, answer: "RUM", clue: "Molasses spirit smuggled past coast guards along Rum Row", cat: "Spirits", codexId: "rums" }
      ]
    },
    {
      id: "puzzle-36-the-molecular-lounge",
      tier: "main",
      title: "The Molecular Lounge",
      blurb: "Rotovap distillates, sodium alginate spheres, liquid nitrogen, and fat washes.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SPHERES", clue: "Alginate cocktail pearls bursting with liquid juice upon the tongue", cat: "Methods & Tools", codexId: "spheres" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "CLARIFY", clue: "Using milk-washing, agar, or a centrifuge to remove all turbidity", cat: "Methods & Tools", codexId: "clarify" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "ROTOVAP", clue: "Rotary evaporator vacuum-distilling fresh botanical aromas at room temp", cat: "Methods & Tools", codexId: "rotavap" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "FOAMING", clue: "Nitrous oxide siphon dispensing velvety espumas over drinks", cat: "Methods & Tools", codexId: "egg" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SEC", clue: "Triple ___: clear orange liqueur modifier", cat: "Spirits", codexId: "sec" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "HOG", clue: "Hogshead oak cask used to mature spirit prior to high-tech processing", cat: "Spirits", codexId: "aged" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "RAW", clue: "Unprocessed, cold-pressed botanical essences", cat: "Mixers", codexId: "herbal" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "LOT", clue: "Specific distillation run batch number recorded in modern lab logs", cat: "Methods & Tools", codexId: "rotavap" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "ICE", clue: "Sub-zero ice chilled by liquid nitrogen for instant frost", cat: "Methods & Tools", codexId: "ices" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "FAT", clue: "Washing spirits with brown butter, duck fat, or toasted sesame oil", cat: "Methods & Tools", codexId: "fat" },
        { id: "7D", num: 7, dir: "down", row: 4, col: 0, answer: "RIM", clue: "Coating the edge of glassware with powdered citric acid crystals", cat: "Glassware", codexId: "rims" }
      ]
    },
    {
      id: "puzzle-37-the-historic-punch-bowl",
      tier: "main",
      title: "The Historic Punch Bowl",
      blurb: "Oleo-saccharum citrus oils, Batavia arrack, grated nutmeg, and silver ladles.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "PLANTER", clue: "Planter's Punch: classic Jamaican dark rum, lime, and spice serve", cat: "Glassware", codexId: "urn" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "OLEOSAC", clue: "Oleo-saccharum: lemon peels macerated in granulated sugar to express oils", cat: "Methods & Tools", codexId: "oleo" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "NUTMEGS", clue: "Fragrant whole seed freshly grated over communal milk punches", cat: "Mixers", codexId: "nutmeg" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "COMMUNA", clue: "Communal bowl ritual shared by travelers across 18th-century coaching inns", cat: "History & Lore", codexId: "urn" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "POUR", clue: "Ladle punch smoothly from silver tureen into crystal cups", cat: "Methods & Tools", codexId: "pour" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "AGED", clue: "Matured Jamaican rums creating rich molasses depth in punch bowls", cat: "Spirits", codexId: "aged" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "TEA", clue: "Ceylon black tea providing the weak water element in five-part punch", cat: "Mixers", codexId: "tea" },
        { id: "4D", num: 4, dir: "down", row: 3, col: 1, answer: "LIME", clue: "Persian citrus providing essential acidity to balance oleo sugar", cat: "Mixers", codexId: "lime" },
        { id: "5D", num: 5, dir: "down", row: 3, col: 3, answer: "SUG", clue: "Sugar crystals drawing essential aromatic terpenes out of citrus peels", cat: "Methods & Tools", codexId: "oleo" },
        { id: "6D", num: 6, dir: "down", row: 3, col: 5, answer: "GIN", clue: "Old Tom botanical spirit used in Victorian British punches", cat: "Spirits", codexId: "junip" }
      ]
    },
    {
      id: "puzzle-38-the-tokyo-ginza-bar",
      tier: "main",
      title: "The Tokyo Ginza Bar",
      blurb: "Ice sphere hand-carving, three-point hard shakes, and immaculate hospitality.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "DIAMOND", clue: "Multifaceted ice crystal sculpted by hand with a Japanese deba knife", cat: "Methods & Tools", codexId: "carv" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "CHILLED", clue: "Stemware kept in sub-zero freezers until the exact second of pouring", cat: "Methods & Tools", codexId: "cold" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "BARSPOO", clue: "Twisted spiral teardrop spoon twirling seamlessly in a Yarai glass", cat: "Methods & Tools", codexId: "stirs" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "TENDERS", clue: "Artisans dedicating lifetimes to the mastery of service and motion", cat: "History & Lore", codexId: "nod" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "DEC", clue: "Decanting spirits gently down the mixing glass interior wall", cat: "Methods & Tools", codexId: "pour" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "AIR", clue: "Aerating liquid inside shaker tins without chipping exterior ice corners", cat: "Methods & Tools", codexId: "shakers" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "OIL", clue: "Aromatic peel oil misted with pinpoint geometric precision", cat: "Methods & Tools", codexId: "peel" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "ICE", clue: "Block ice directional-frozen to ensure zero air bubbles or minerals", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "LOW", clue: "Low dilution rate achieved with dense, tempered block ice", cat: "Methods & Tools", codexId: "dilution" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "EAR", clue: "Listening closely to the shifting acoustic tone of ice in the tin", cat: "Methods & Tools", codexId: "ear" }
      ]
    },
    {
      id: "puzzle-39-the-cognac-cellar",
      tier: "main",
      title: "The Cognac Cellar",
      blurb: "Charente pot stills, Limousin oak barrels, rancio development, and aged eau-de-vie.",
      gridSize: { rows: 8, cols: 8 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "LIMOUSIN", clue: "Wide-grained French oak forest imparting structured wood tannins", cat: "Spirits", codexId: "limousin" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "CHARENTE", clue: "French river valley terroir where Ugni Blanc grapes thrive in chalk", cat: "History & Lore", codexId: "eau" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "ALAMBICS", clue: "Copper pot stills featuring swan necks and wine pre-heaters", cat: "Spirits", codexId: "pot" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "PARADISS", clue: "Dark, locked cellar storing the oldest demijohns dating across centuries", cat: "History & Lore", codexId: "paradis" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "LOC", clue: "Bonded lock protecting cellars where master blends age in wood", cat: "History & Lore", codexId: "bib" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "MAA", clue: "Maison cellar masters nosing hundreds of samples per vintage", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "UGN", clue: "Ugni Blanc grape: high-acid, low-sugar fruit ideal for pot distillation", cat: "Spirits", codexId: "eau" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "OAK", clue: "French Quercus robur staves imparting toasted notes and golden hues", cat: "Spirits", codexId: "aged" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "AGE", clue: "Decades spent quietly slumbering in damp Chai stone cellars", cat: "Spirits", codexId: "aged" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "EAU", clue: "Eau-de-vie: unaged distilled spirit entering new oak casks", cat: "Spirits", codexId: "eau" },
        { id: "7D", num: 7, dir: "down", row: 4, col: 0, answer: "AGE", clue: "Maturation indicator denoting VS, VSOP, or XO quality designations", cat: "Spirits", codexId: "aged" }
      ]
    },
    {
      id: "puzzle-40-the-tequillero-guild",
      tier: "main",
      title: "The Tequillero Guild",
      blurb: "Blue Weber agave piñas, masonry steam ovens, stone tahonas, and copper distillation.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "TAHONAS", clue: "Massive volcanic stone wheels crushing slow-cooked agave fibers", cat: "Methods & Tools", codexId: "tahona" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "HORNOS", clue: "Traditional brick steam masonry ovens caramelizing agave starches", cat: "Methods & Tools", codexId: "horno" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "BLANCOS", clue: "Unaged clear tequilas showcasing pure highlands and lowlands terroir", cat: "Spirits", codexId: "pura" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "COPITAS", clue: "Fluted shallow clay or glass vessels designed for agave aroma evaluation", cat: "Glassware", codexId: "clay" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "THE", clue: "The red volcanic soil of Jalisco producing sweet Weber piñas", cat: "History & Lore", codexId: "pura" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "HOR", clue: "Horno roasting converting complex inulin into rich fermentable sugars", cat: "Methods & Tools", codexId: "horno" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "NON", clue: "Non-additive purity verified by verified artisanal producers", cat: "Spirits", codexId: "pura" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "OAK", clue: "Spent bourbon barrels reused to age reposados and añejos", cat: "Spirits", codexId: "aged" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "POT", clue: "Copper pot still retaining vegetative, peppery agave congeners", cat: "Spirits", codexId: "pot" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "SIP", clue: "To savor mezcal or tequila slowly without lime or salt chasers", cat: "Methods & Tools", codexId: "sip" }
      ]
    },
    {
      id: "puzzle-41-golden-age-of-cocktails",
      tier: "main",
      title: "The Golden Age of Cocktails",
      blurb: "Jerry Thomas showmanship, Waldorf-Astoria glam, and pre-Prohibition guides.",
      gridSize: { rows: 8, cols: 8 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "WALDORFS", clue: "Historic Manhattan luxury hotel bar where legendary cocktail manuals were compiled", cat: "History & Lore", codexId: "waldorf" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "HOFFMANS", clue: "Famous Broadway sporting house saloon renowned for lavish punch bowls", cat: "History & Lore", codexId: "hoffman" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "MANUALSS", clue: "Vintage bartender guides establishing standardized recipe specifications", cat: "History & Lore", codexId: "manuals" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "SAVOYBAR", clue: "Iconic London hotel bar where Harry Craddock shook drinks during American dry years", cat: "History & Lore", codexId: "savoy" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "WHI", clue: "Whiskey cocktails dominating 19th-century saloon order boards", cat: "Spirits", codexId: "ryes" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "LOF", clue: "Lofty hospitality standards passed down through guild apprenticeships", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "DRY", clue: "Evolution from sweet vermouth drinks to bone-dry pre-dinner cocktails", cat: "Methods & Tools", codexId: "neat" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "OAK", clue: "Charred barrels supplying mellow vanilla warmth to American spirits", cat: "Spirits", codexId: "aged" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "MAS", clue: "Mint Smash: beloved 19th-century summer refresher", cat: "History & Lore", codexId: "mas" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "URN", clue: "Hot punch dispenser keeping spiced spirits steaming on tavern bars", cat: "Glassware", codexId: "urn" }
      ]
    },
    {
      id: "puzzle-42-the-botanical-conservatory",
      tier: "main",
      title: "The Botanical Conservatory",
      blurb: "Torino vermouth formulas, cinchona bark, wormwood artemisia, and Alpine herbs.",
      gridSize: { rows: 7, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "VERMOUT", clue: "Fortified wine aromatized with artemisia wormwood and alpine herbs", cat: "Mixers", codexId: "vermouth" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "GENTIAN", clue: "Yellow alpine mountain root supplying lingering digestive bitterness", cat: "Spirits", codexId: "gentian" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "CINCHON", clue: "South American tree bark supplying natural quinine for classic tonic", cat: "Mixers", codexId: "cinchona" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "HERBALS", clue: "Infusions of chamomile, rosemary, thyme, and elderflower blossoms", cat: "Methods & Tools", codexId: "herbal" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "VAG", clue: "Vague, closely guarded monastery formulations passed down through centuries", cat: "History & Lore", codexId: "chart" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "REN", clue: "Renting oak foudres for fractional maceration of botanicals", cat: "Methods & Tools", codexId: "soler" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "MNT", clue: "Mint sprigs slapped firmly to release aromatic top notes", cat: "Methods & Tools", codexId: "mint" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "ICE", clue: "Crystal-clear ice keeping delicate herbal volatile oils intact", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "TEA", clue: "Tannic base infusions providing non-alcoholic cocktail structure", cat: "Mixers", codexId: "tea" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "ANI", clue: "Anise seed providing licorice top notes in Mediterranean pastis", cat: "Spirits", codexId: "anise" }
      ]
    },
    {
      id: "puzzle-43-the-craft-ice-laboratory",
      tier: "main",
      title: "The Craft Ice Laboratory",
      blurb: "Clinebell directional freezing, chainsaw scoring, tempering, and surface physics.",
      gridSize: { rows: 8, cols: 7 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "FREEZIN", clue: "Directional freezing driving trapped air bubbles down into reject zones", cat: "Methods & Tools", codexId: "freezing" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "CLARITY", clue: "Optical transparency proving water is free of dissolved minerals and air", cat: "Methods & Tools", codexId: "clarity" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "TEMPERS", clue: "Letting ice rest at room temperature until it weeps to prevent cracking on pour", cat: "Methods & Tools", codexId: "temper" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "THERMAL", clue: "Thermal mass of large clear blocks slowing drink dilution to a crawl", cat: "Methods & Tools", codexId: "ices" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "FAC", clue: "Factory ice vs artisanal hand-cut directional freezing blocks", cat: "Methods & Tools", codexId: "freezing" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "ELA", clue: "Elastic surface tension of chilled spirits over melting ice surfaces", cat: "Methods & Tools", codexId: "pour" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "ZIT", clue: "Zero-impurity tolerance required in competition cocktail ice", cat: "Methods & Tools", codexId: "clarity" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "ROT", clue: "Rotating cubes smoothly around mixing glasses with spiral spoons", cat: "Methods & Tools", codexId: "stirs" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "ICE", clue: "Solid H2O: the single most critical ingredient in cocktail balance", cat: "Methods & Tools", codexId: "ices" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "SAW", clue: "Serrated knife or food-grade saw scoring giant blocks of clear ice", cat: "Methods & Tools", codexId: "carv" }
      ]
    },
    {
      id: "puzzle-44-the-hospitality-dynasty",
      tier: "main",
      title: "The Hospitality Dynasty",
      blurb: "Anticipatory service, welcoming sanctuary, impeccable mise-en-place, and regular care.",
      gridSize: { rows: 8, cols: 8 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "SANCTUAR", clue: "The bar counter as a warm, safe sanctuary for every guest", cat: "History & Lore", codexId: "bar" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "SERVICEE", clue: "Anticipatory service meeting guest needs before they are ever spoken", cat: "History & Lore", codexId: "nod" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "COMFORTS", clue: "Hospitality touches like chilled water, warm nuts, and purse hooks", cat: "History & Lore", codexId: "comfort" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "ENPLACES", clue: "Mise-en-place: maintaining every bottle and tool in its exact position", cat: "Methods & Tools", codexId: "misenplace" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "SSE", clue: "Sensory service excellence maintained through the height of dinner rushes", cat: "History & Lore", codexId: "nod" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "NRM", clue: "Normal welcoming greeting acknowledging a regular guest taking their stool", cat: "History & Lore", codexId: "nod" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "TVF", clue: "Total volume focus: executing high drink counts without sacrificing craft", cat: "History & Lore", codexId: "nye" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "ICE", clue: "Full ice wells topped off before the first guest walks through the door", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "MAN", clue: "Floor manager orchestrating seamless room rhythm and hospitality flow", cat: "History & Lore", codexId: "bar" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "BAR", clue: "The historic wooden bar top uniting guests from all walks of life", cat: "History & Lore", codexId: "bar" }
      ]
    },
    {
      id: "puzzle-45-the-master-mixologist-exam",
      tier: "main",
      title: "The Master Mixologist Exam",
      blurb: "Dilution kinetics, meniscus fills, aroma bouquets, wash lines, and emulsion physics.",
      gridSize: { rows: 9, cols: 8 },
      words: [
        { id: "1A", num: 1, dir: "across", row: 0, col: 0, answer: "DILUTION", clue: "Meltwater volume (typically 20-25%) unlocking delicate aroma esters", cat: "Methods & Tools", codexId: "dilution" },
        { id: "3A", num: 3, dir: "across", row: 2, col: 0, answer: "MENISCUS", clue: "Convex curved upper liquid surface of an accurately brim-filled jigger", cat: "Methods & Tools", codexId: "meniscus" },
        { id: "5A", num: 5, dir: "across", row: 4, col: 0, answer: "EMULSION", clue: "Binding oil and water molecules through vigorous dry shaking technique", cat: "Methods & Tools", codexId: "egg" },
        { id: "7A", num: 7, dir: "across", row: 6, col: 0, answer: "BOUQUETS", clue: "Aromatic sprigs of mint or rosemary greeting the guest's nose", cat: "Methods & Tools", codexId: "nose" },
        { id: "9A", num: 9, dir: "across", row: 8, col: 0, answer: "BALANCES", clue: "The golden harmony where acid, sweetness, proof, and chill unite", cat: "Methods & Tools", codexId: "balance" },
        { id: "1D", num: 1, dir: "down", row: 0, col: 0, answer: "DME", clue: "Dry Martini evolution from 19th-century sweeter Martinez formulas", cat: "History & Lore", codexId: "sour" },
        { id: "2D", num: 2, dir: "down", row: 0, col: 2, answer: "LNU", clue: "Level jigger pour ensuring exact recipe reproduction every single shift", cat: "Methods & Tools", codexId: "pour" },
        { id: "3D", num: 3, dir: "down", row: 0, col: 4, answer: "TIS", clue: "Tincture drops adding concentrated botanical intensity with an eye dropper", cat: "Mixers", codexId: "eye" },
        { id: "4D", num: 4, dir: "down", row: 2, col: 1, answer: "ICE", clue: "Clean, crystal-clear ice blocks determining thermodynamic chilling curves", cat: "Methods & Tools", codexId: "ices" },
        { id: "5D", num: 5, dir: "down", row: 2, col: 3, answer: "MUD", clue: "Muddling herb veins too harshly releases unwanted bitter chlorophyll", cat: "Methods & Tools", codexId: "mint" },
        { id: "6D", num: 6, dir: "down", row: 2, col: 5, answer: "OAK", clue: "Barrel wood staves imparting lactones, vanillin, and wood sugars", cat: "Spirits", codexId: "aged" }
      ]
    }
  ]
};
  codex: [
    /* 1. Core Classics & Originals */
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
    { id: "ipa", name: "IPA BEER COCKTAILS", category: "Mixers", subline: "Hoppy ale lengthener", glass: "Highball or Pint", method: "Topped over ice", ice: "Fresh Cubes", garnish: "Grapefruit twist", formula: "3.0 oz IPA Ale\n1.5 oz London Dry Gin\n0.75 oz Grapefruit\n0.5 oz Honey", tip: "Hop bitterness (IBUs) in IPAs balances citrus acidity and provides floral humulone aromas.", lore: "British brewers heavily hopped pale ales destined for India in the 1700s." },
    { id: "eye", name: "DROPPER & SALINE", category: "Methods & Tools", subline: "Calibrated micro-dosing", glass: "Boston Shaker", method: "Pipette drop", ice: "N/A", garnish: "None", formula: "20% Saline Solution (20g sea salt in 80g water)", tip: "3 to 5 drops of saline solution suppresses perceived bitterness and boosts citrus aromatics.", lore: "Modern mixologists borrowed saline pipettes from sensory cuisine to elevate drink balance." },
    { id: "egg", name: "ALBUMEN FOAM", category: "Methods & Tools", subline: "Silky cocktail foam texture", glass: "Coupe or Sour Glass", method: "Dry shake, then wet shake", ice: "Strained off ice", garnish: "Bitters drops", formula: "0.75 oz Egg White or Aquafaba\n2.0 oz Spirit\n0.75 oz Lemon\n0.75 oz Simple", tip: "Dry shake for 15 seconds to emulsify proteins, then add ice and shake hard.", lore: "Bartenders began emulsifying egg whites into spirit sours in the 1880s." },
    { id: "mint", name: "MINT SERVICE", category: "Methods & Tools", subline: "Aromatic herb crown handling", glass: "Julep Cup / Highball", method: "Gentle slap expression", ice: "Crushed pebble ice", garnish: "Bouquet of fresh mint", formula: "8-10 fresh spearmint leaves", tip: "Never pulverize mint leaves; tearing releases bitter plant chlorophyll. Clap gently.", lore: "The Mint Julep was Virginia's morning eye-opener in the early 1800s." },
    { id: "soda", name: "CLUB SODA", category: "Mixers", subline: "Mineralized carbonated lengthener", glass: "Highball", method: "Gently top and lift", ice: "Clear spear", garnish: "Citrus twist", formula: "Carbonated water + sodium bicarbonate", tip: "Keep soda bottles stored near 33°F (1°C). Colder liquid holds dissolved CO2 tighter.", lore: "Joseph Priestley discovered how to carbonate water in Leeds in 1767." },
    { id: "proof", name: "PROOF SYSTEM", category: "Spirits", subline: "Ethanol concentration metric", glass: "Any vessel", method: "Hydrometer measurement", ice: "N/A", garnish: "None", formula: "Proof = ABV% × 2 (US Standard)", tip: "Higher proof spirits resist ice dilution longer and hold delicate modifiers.", lore: "British Navy gunpowder would still ignite when soaked in 57.1% ABV rum ('Navy Proof')." },
    { id: "mas", name: "THE SMASH", category: "History & Lore", subline: "Seasonal crushed fruit & herb cousin", glass: "Rocks Glass", method: "Muddle & shake", ice: "Crushed Ice", garnish: "Herb sprig & berries", formula: "2.0 oz Bourbon\n0.75 oz Simple Syrup\n6 Mint Leaves\n3 Citrus Wedges", tip: "The Smash is an adaptable seasonal sister of the Julep featuring muddled seasonal citrus.", lore: "Celebrated in Jerry Thomas's 1862 guide as the ultimate summer tavern refresher." },
    { id: "nod", name: "THE BARTENDER'S NOD", category: "History & Lore", subline: "Unspoken hospitality law", glass: "Any vessel", method: "Eye contact acknowledgment", ice: "N/A", garnish: "None", formula: "1 direct eye-contact nod within 15 seconds of guest arrival", tip: "Even 4-deep on a busy night, catching a guest's eye resets their wait perception timer.", lore: "The cornerstone of hospitality etiquette across historical speakeasies and grand salons." },
    { id: "sip", name: "SENSORY SIP EVALUATION", category: "Methods & Tools", subline: "Palate assessment technique", glass: "Tasting stemware", method: "Straw draw & palate roll", ice: "Controlled temp", garnish: "Aromatic botanical", formula: "3-tier check: Nose bouquet, Mid-palate balance, Finish length", tip: "Roll liquid across the lateral edges of the tongue to evaluate acid brightness and spirit warmth.", lore: "Standardized by spirits guilds and guild sommeliers to evaluate structural integrity." },
    { id: "duo", name: "THE DUO CATEGORY", category: "Methods & Tools", subline: "Spirit + modifier drink family", glass: "Rocks Glass", method: "Stirred over large block", ice: "Large rock", garnish: "Twist or none", formula: "2.0 oz Spirit + 1.0 oz Liqueur (e.g. Rusty Nail, Black Russian)", tip: "Simple two-ingredient pairings require high-quality ingredients and cold dilution balance.", lore: "Formally classified by David Embury in 1948 in 'The Fine Art of Mixing Drinks'." },
    { id: "bite", name: "ETHANOL BITE", category: "Spirits", subline: "Pleasing spirit heat & backbone", glass: "Rocks or Glencairn", method: "Proof balancing", ice: "Dilution regulated", garnish: "None", formula: "Ethanol sensory threshold (typically 40% to 55% ABV)", tip: "A clean ethanol bite provides backbone to stop sweet modifiers from making drinks flabby.", lore: "Master blenders balance raw ethanol heat with oak aging and barrel sugars." },
    { id: "bond", name: "BOTTLED-IN-BOND", category: "Spirits", subline: "100-Proof historic guarantee", glass: "Rocks Glass", method: "Neat or Old Fashioned base", ice: "Single cube", garnish: "Lemon twist", formula: "100 Proof (50% ABV), 1 Distiller, 1 Season, Aged 4+ Years", tip: "The 100-proof standard guarantees intense grain character that won't get lost in cocktails.", lore: "America's first consumer protection statute (1897) to ban adulterated spirits." },
    { id: "ryes", name: "RYE GRAIN WHISKEY", category: "Spirits", subline: "Spicy American distilling standard", glass: "Coupe or Rocks", method: "Stirred Manhattan build", ice: "Strained off ice", garnish: "Brandied cherry", formula: "Minimum 51% rye grain mashbill aged in charred new oak", tip: "Rye's peppery, baking spice profile balances sweet Italian vermouth far cleaner than bourbon.", lore: "The dominant pre-Prohibition American whiskey powering original 1870s Manhattans." },
    { id: "bib", name: "1897 BIB ACT", category: "History & Lore", subline: "Treasury bonded warehouse law", glass: "N/A", method: "Government seal verification", ice: "N/A", garnish: "Green tax strip", formula: "Aged in federally bonded warehouses under US Treasury lock and key", tip: "Look for the emerald green tax stamp across the bottle neck as an authentic historical seal.", lore: "Championed by Colonel E.H. Taylor Jr. to combat rectifiers using tobacco juice and iodine." },
    { id: "tan", name: "BARREL TANNINS", category: "Spirits", subline: "Wood extraction astringency", glass: "Snifter or Glencairn", method: "Oak cask maturation", ice: "None", garnish: "None", formula: "Ellagic and gallic tannins extracted during summer cask expansion", tip: "Tannins give structural dryness on the finish, cleansing the palate for subsequent sips.", lore: "Coopers realized white oak yielded the perfect balance of drying tannins and sweet vanillin." },
    { id: "bar", name: "THE BAR COUNTER", category: "History & Lore", subline: "The sacred hospitality threshold", glass: "Any vessel", method: "Craft staging", ice: "Full ice well", garnish: "Clean caddy", formula: "42-inch height ergonomic hospitality line", tip: "The physical barrier that unites rather than separates, maintaining sanctuary on both sides.", lore: "Originated in 18th-century coaching inns as a wooden rail separating cask storage from patrons." },
    { id: "nye", name: "NEW YEAR'S SERVICE", category: "History & Lore", subline: "Peak volume speed craft", glass: "Flute / Coupe / Rocks", method: "Pre-batched execution", ice: "Deep reserve", garnish: "Speed expressions", formula: "4× normal volume speed rack execution", tip: "Batch spirit-forward cocktails and pre-chill glassware to keep standards high under pressure.", lore: "The ultimate industry shift where mise-en-place and teamwork determine survival." },
    { id: "coupe", name: "COUPE GLASS", category: "Glassware", subline: "Classic stemmed cocktail vessel", glass: "5.5 oz (160 ml) Coupe", method: "Pre-chill in freezer", ice: "Served 'Up' (No ice)", garnish: "Twist or Cherry", formula: "Ideal capacity: 5 to 6 oz with 0.5 oz wash line headroom", tip: "Always hold a coupe by the stem to avoid transferring body heat into the drink.", lore: "Designed for sparkling wine in England around 1663, not Marie Antoinette." },
    { id: "pints", name: "PINT & MIXING GLASS", category: "Glassware", subline: "Heavy gauge service & mixing", glass: "16 oz Shaker Pint", method: "Draft pour or Boston tin mate", ice: "Cubes", garnish: "Citrus wedge", formula: "16 fl oz capacity (US Standard) / 20 fl oz (Imperial)", tip: "Use heavy tempered mixing glasses when shaking to prevent thermal shock fractures.", lore: "The universal American tavern glass since the repeal of Prohibition." },
    { id: "tastes", name: "STRAW TASTING", category: "Methods & Tools", subline: "Quality assurance technique", glass: "Mixing tin or glass", method: "Atmospheric finger seal", ice: "Pre-strain", garnish: "None", formula: "2-3 drops drawn up through a clean straw", tip: "Dip straw, seal finger over top to trap liquid, lift to mouth and release to verify balance.", lore: "The professional mixologist's quality control checkpoint before serving a cocktail." },
    { id: "cap", name: "COBBLER SHAKER CAP", category: "Methods & Tools", subline: "Three-piece shaker vacuum seal", glass: "Cobbler Shaker", method: "Remove cap first to break vacuum", ice: "Cubes", garnish: "None", formula: "3-piece system: Tin base, built-in strainer top, sealing cap", tip: "Always pull the small top cap off BEFORE trying to remove the strainer lid to break thermal vacuum.", lore: "Patented in 1884 by Edward Hauck, popular in Japanese bartending for hard shakes." },
    { id: "urn", name: "PUNCH BOWL & URN", category: "Glassware", subline: "Communal celebratory vessel", glass: "Punch Bowl or Heated Urn", method: "Oleo-saccharum batching", ice: "Large clear block", garnish: "Nutmeg & citrus wheels", formula: "1 of Sour, 2 of Sweet, 3 of Strong, 4 of Weak (Classic rhyme)", tip: "The foundation of all cocktail history; communal bowls fostered fellowship in 1700s taverns.", lore: "Derived from Sanskrit 'pañc' meaning five ingredients: spirit, citrus, sugar, water, spice." },
    { id: "pot", name: "POT STILL SPIRITS", category: "Spirits", subline: "Batch copper distillation", glass: "Glencairn or Tulip", method: "Discontinuous batch boiling", ice: "None", garnish: "None", formula: "Direct boiling in copper swan neck kettle", tip: "Pot stills retain aromatic congeners and heavy esters, creating deeply rich rums and whiskeys.", lore: "Perfected in Middle Ages copper alembics, the historic soul of single malt and mezcal." },
    { id: "nose", name: "THE COCKTAIL NOSE", category: "Methods & Tools", subline: "Aroma bouquet appreciation", glass: "Stemmed glass", method: "Olfactory inspection", ice: "Properly rested", garnish: "Aromatic botanical", formula: "Over 80% of perceived flavor is retronasal and orthonasal aroma", tip: "Smell cocktails with your mouth slightly open to avoid olfactory fatigue from ethanol.", lore: "Jerry Thomas crowned early cocktails with seasonal berry and citrus tops for aroma." },

    /* 2. New Expanded Codex Records (Cocktail Mastery & Techniques) */
    { id: "brut", name: "BRUT SPARKLING WINE", category: "Spirits", subline: "Dry traditional method bubbly", glass: "Flute or Coupe", method: "Chilled top pour", ice: "None (Pre-chilled)", garnish: "Lemon ribbon", formula: "Sugar dosage: under 12 grams per liter", tip: "In sparkling cocktails like the French 75, brut wine balances sweet simple and tart lemon.", lore: "Developed in the mid-19th century by Champagne houses catering to British palates." },
    { id: "reds", name: "ROUGE & RED BITTERS", category: "Spirits", subline: "Crimson botanical cordials", glass: "Rocks or Coupe", method: "Stirred build", ice: "Rock or none", garnish: "Orange wheel", formula: "Co-macerated gentian, orange peel, and botanical bark", tip: "Adds vibrant crimson color and assertive bitterness to Negronis and Americanos.", lore: "Originally colored naturally using cochineal dye by 19th-century Italian distillers." },
    { id: "toss", name: "THROWING & TOSSING", category: "Methods & Tools", subline: "Acoustic aerating pour", glass: "Throwing tins", method: "High arc long pour", ice: "In upper tin only", garnish: "N/A", formula: "Pour back and forth across 2-3 feet 4 to 5 times", tip: "Aerates wine-based cocktails like the Bamboo without clouding clarity with tiny ice shards.", lore: "Popularized in 19th-century Spain and Catalan bars for vermouth service." },
    { id: "chil", name: "FROST & THERMAL TRANSFER", category: "Methods & Tools", subline: "Exterior glass condensation", glass: "Metal mug or coupe", method: "Pebble ice churning", ice: "Packed crushed ice", garnish: "Herb crown", formula: "Sub-32°F metal surface condensation", tip: "Churning crushed ice against thin metal conducts heat out of the liquid in seconds.", lore: "Southern plantation mint juleps were judged by the thickness of the frost wall." },
    { id: "mac", name: "BOTANICAL MACERATION", category: "Methods & Tools", subline: "Ethanol solvent extraction", glass: "Infusion jar", method: "Room temperature steep", ice: "None", garnish: "N/A", formula: "High proof neutral spirit + dry botanical roots/peels", tip: "High ABV (50-60%) extracts essential oils far faster than water-heavy low proof spirit.", lore: "Alchemists used cold maceration for centuries to compound medicinal herbal elixirs." },
    { id: "nail", name: "RUSTY NAIL CLASS", category: "Methods & Tools", subline: "Scotch & heather honey liqueur", glass: "Old Fashioned Glass", method: "Built over large rock", ice: "Single clear block", garnish: "Lemon twist", formula: "1.5 oz Blended Scotch\n0.75 oz Drambuie", tip: "A classic mid-century duo cocktail; stir gently to chill without over-diluting.", lore: "Adopted by the 1960s Rat Pack at New York’s 21 Club." },
    { id: "tall", name: "HIGHBALL ARCHITECTURE", category: "Glassware", subline: "Vertical carbonation channel", glass: "10-12 oz Collins Glass", method: "Built over clear spear", ice: "Column spear", garnish: "Citrus ribbon", formula: "1.5 to 2.0 oz Spirit topped with 3.5 to 4.0 oz carbonated mixer", tip: "A narrow vertical column minimizes liquid surface area, preserving effervescence.", lore: "Originated in British railway station bars where soda water was piped under pressure." },
    { id: "camp", name: "CAMPARI SPEC", category: "Spirits", subline: "Milanese bitter aperitivo", glass: "Rocks or Tumbler", method: "Stirred or Spritzed", ice: "Cubes", garnish: "Orange slice", formula: "24% ABV bitter spirit infused with cascarilla, chinotto, and gentian", tip: "Its assertive bitterness stimulates gastric juices before dinner.", lore: "Created by Gaspare Campari in Milan in 1860, the definitive Italian aperitivo." },
    { id: "mast", name: "MASTIC & RESIN", category: "Spirits", subline: "Aegean pine resin cordials", glass: "Cordial Glass", method: "Served chilled", ice: "None", garnish: "Lemon strip", formula: "Chios mastic resin distilled into crystal clear liqueur", tip: "Adds an earthy, pine-scented balsamic botanical note to Mediterranean sours.", lore: "Harvested exclusively on the Greek island of Chios since antiquity." },
    { id: "must", name: "GRAPE MUST & VERMOUTH", category: "Mixers", subline: "Unfermented sweet grape juice", glass: "Wine glass", method: "Cellar blending", ice: "N/A", garnish: "None", formula: "Fresh pressed grape must + neutral alcohol + botanicals", tip: "Provides velvety unfermented fruit sugars to vermouth and mistelle fortified wines.", lore: "Roman winemakers preserved fresh must by spiking it with high-proof spirits." },
    { id: "orge", name: "ORGEAT SYRUP", category: "Mixers", subline: "Almond and orange blossom emulsion", glass: "Tiki mug / Rocks", method: "Shaken build", ice: "Crushed pebble", garnish: "Mint bouquet", formula: "Toasted blanched almonds, sugar, rose water, and orange flower water", tip: "The almond oils create an opaque, milky emulsion that gives tiki cocktails rich body.", lore: "Originally made from barley (orge in French), evolved into almond milk in the 1800s." },
    { id: "rums", name: "RUM PROVENANCE", category: "Spirits", subline: "Sugarcane juice & molasses spirits", glass: "Snifter or Highball", method: "Fermented & distilled", ice: "Per drink", garnish: "Lime wedge", formula: "Agricole (fresh cane juice) vs Traditional (molasses/dreg)", tip: "Blending heavy Jamaican pot rum with light column rum creates deep complexity.", lore: "The economic lifeblood of the 17th-century Caribbean colonial trade." },
    { id: "our", name: "THE SOUR FORMULA", category: "Methods & Tools", subline: "The golden triangular ratio", glass: "Coupe or Sour", method: "Shaken over ice", ice: "Strained", garnish: "Bitters drops", formula: "2 parts Strong (Spirit)\n0.75 parts Sour (Citrus)\n0.75 parts Sweet (Syrup)", tip: "Master this single template and you can balance over 80% of classic shaken drinks.", lore: "British Royal Navy sailors combined rum rations with citrus juice to cure scurvy." },
    { id: "gum", name: "GOMME SYRUP", category: "Mixers", subline: "Acacia gum enriched sweetener", glass: "Coupe or Rocks", method: "Stirred or Shaken", ice: "N/A", garnish: "N/A", formula: "2:1 Demerara or Cane Syrup + hydrated Gum Arabic", tip: "Coats the palate and softens ethanol bite without adding cloying excess sweetness.", lore: "Standard sweetener in Jerry Thomas's 1862 guide before cheap corn syrups." },
    { id: "eas", name: "FALERNUM & SPICE", category: "History & Lore", subline: "Barbados clove & lime cordial", glass: "Tiki mug", method: "Swizzled over ice", ice: "Crushed", garnish: "Nutmeg grating", formula: "Rum infused with clove, ginger, almond, and fresh lime zest", tip: "Essential for tropical classics like the Zombie and Corn 'n Oil.", lore: "Crafted in Barbados in the 18th century as a sweet spiced table liqueur." },
    { id: "malt", name: "MALTED BARLEY", category: "Spirits", subline: "Germinated cereal grain mash", glass: "Glencairn", method: "Pot still batch", ice: "Optional water drop", garnish: "None", formula: "100% malted barley germinated to activate amylase enzymes", tip: "Imparts biscuity, toasted grain, and cereal notes to Irish and Scotch whiskies.", lore: "The ancient cornerstone of Gaelic distilling dating back to medieval monks." },
    { id: "warm", name: "HOT TODDY SERVICE", category: "Methods & Tools", subline: "Steamed winter spirit cups", glass: "Footed Glass Mug", method: "Built hot", ice: "None (Heated 160°F)", garnish: "Clove-studded lemon", formula: "2.0 oz Whiskey\n0.75 oz Honey\n0.5 oz Lemon\n4.0 oz Boiling Water", tip: "Pre-heat mugs with hot tap water first; cold glass drops the serve temperature instantly.", lore: "Prescribed by Scottish physicians in the 1700s as a restorative for winter colds." },
    { id: "mow", name: "DISTILLERY GRAIN HARVEST", category: "History & Lore", subline: "Agricultural terroir roots", glass: "Any", method: "Milling & Mashing", ice: "N/A", garnish: "N/A", formula: "Locally sourced cereal grains (rye, corn, wheat, barley)", tip: "Distillers work directly with farmers to select grain varietals with high starch yields.", lore: "Whiskey distillation began as an agricultural way to preserve surplus grain." },
    { id: "lar", name: "BAR LARDER ESSENTIALS", category: "Mixers", subline: "Spices, aromatics & tinctures", glass: "Prep containers", method: "Prep mise-en-place", ice: "N/A", garnish: "N/A", formula: "Whole cloves, green cardamom, star anise, and cinnamon sticks", tip: "Toast whole spices in a dry pan before infusing syrups to bloom aromatic oils.", lore: "Historic tavern masters kept spice lockboxes behind the counter under key." },
    { id: "tom", name: "TOM & JERRY BATTER", category: "History & Lore", subline: "Historic holiday warm egg batter", glass: "Ceramic Mug", method: "Built with hot milk/water", ice: "None", garnish: "Nutmeg grating", formula: "Egg whites whipped stiff + yolks + sugar + spices + Rum & Cognac", tip: "Fold egg whites gently into the spiced yolk mixture so the batter stays fluffy.", lore: "Invented by British writer Pierce Egan in the 1820s to promote his book." },
    { id: "cold", name: "FREEZER GIN TECHNIQUE", category: "Methods & Tools", subline: "Sub-zero viscous dilution", glass: "Nick & Nora", method: "Freezer storage 0°F", ice: "Zero dilution or stir", garnish: "Lemon coin", formula: "Gin + 15% pre-diluted filtered water stored at 0°F (-18°C)", tip: "Cold liquid thickens and turns silky, delivering intense aromatics without thermal shock.", lore: "Pioneered by legendary London hotel bars like The Connaught and Dukes." },
    { id: "oliv", name: "SPANISH QUEEN OLIVES", category: "Methods & Tools", subline: "Saline savory garnish", glass: "Coupe or Martini", method: "Speared on pick", ice: "N/A", garnish: "1 or 3 olives (Never even)", tip: "Bar etiquette: always serve an odd number of olives (1 or 3) for good fortune.", lore: "First appeared in dry martinis in late 1880s San Francisco saloons." },
    { id: "cool", name: "STIRRING KINETICS", category: "Methods & Tools", subline: "Laminar thermal exchange", glass: "Mixing glass", method: "Smooth circular glide", ice: "Solid dense cubes", garnish: "N/A", formula: "30 to 45 rotations over 20-25 seconds", tip: "Keep the back of the barspoon flush against the inside glass wall to avoid noise and bubbles.", lore: "Refined by early 20th-century hotel bartenders to preserve diamond-like clarity." },
    { id: "laid", name: "GARNISH PLACEMENT", category: "Methods & Tools", subline: "Aesthetic wash line balance", glass: "Any stemware", method: "Tweezer placement", ice: "Per spec", garnish: "Delicate flower/twist", formula: "Resting garnish along rim or surface without sinking", tip: "Guests drink with their eyes first; place garnishes intentionally to frame the wash line.", lore: "Japanese bar masters elevated cocktail garnish placement into an art form." },
    { id: "dive", name: "THE DIVE BAR SANCTUARY", category: "History & Lore", subline: "Unpretentious tavern spirit", glass: "Pint / Shot Glass", method: "Draft tap & quick pour", ice: "Well ice", garnish: "None", formula: "1 shot of Rye + 1 pint of Cold Draft Beer (The Boilermaker)", tip: "The soul of hospitality: warm welcomes, honest drinks, and zero pretension.", lore: "Emerged in 19th-century American cities as working-class gathering spots." },
    { id: "sour", name: "THE WHISKEY SOUR", category: "Methods & Tools", subline: "Bourbon, lemon & sugar balance", glass: "Rocks or Coupe", method: "Shaken hard", ice: "Fresh rock or Up", garnish: "Angostura drops", formula: "2.0 oz Bourbon\n0.75 oz Lemon Juice\n0.75 oz Simple Syrup", tip: "Taste the lemon juice before service; winter lemons are sweeter than summer crops.", lore: "First published in the Waukesha Plaindealer in 1870, perfected worldwide." },
    { id: "fast", name: "SHAKING VELOCITY", category: "Methods & Tools", subline: "Internal ice collision physics", glass: "Cobbler or Boston", method: "Hard horizontal snap", ice: "Cold dry cubes", garnish: "N/A", formula: "10-12 seconds of rapid, forceful linear agitation", tip: "Shake horizontally across your shoulder; listen for the ice cracking and emulsifying.", lore: "Jerry Thomas amazed spectators in the 1860s with lightning-fast theatrical shaking." },
    { id: "aqua", name: "AQUAFABA EMULSION", category: "Mixers", subline: "Vegan cocktail foam source", glass: "Coupe", method: "Dry shake, then wet shake", ice: "Strained", garnish: "Citrus wheel", formula: "0.75 oz Chickpea soaking liquid (Aquafaba) per drink", tip: "Produces identical silky texture and meringue head to egg whites with zero odor.", lore: "Discovered by French chef Joël Roessel in 2014, quickly embraced by craft bars." },
    { id: "mist", name: "ATOMIZER MISTS", category: "Methods & Tools", subline: "Micro-aerosol perfume", glass: "Stemmed glass", method: "Atomizer pump", ice: "Chilled glass", garnish: "Surface aroma", formula: "High proof spirit (Absinthe, Peated Scotch, Bitters) misted above glass", tip: "Pump the atomizer 3 inches above the drink so micro-droplets drift onto the wash line.", lore: "Allows powerful modifiers like absinthe to provide intense aroma without overwhelming the sip." },
    { id: "rims", name: "CRUSTA & SALINE BORDERS", category: "Glassware", subline: "Sensory boundary contrast", glass: "Coupe or Tumbler", method: "Half-edge swipe", ice: "Per build", garnish: "Salt, tajin, or sugar", formula: "Citrus cheek + flaky mineral salt", tip: "Never get salt inside the glass where it dissolves into the cocktail prematurely.", lore: "Invented by New Orleans bartender Joseph Santini in the 1850s." },
    { id: "sure", name: "CONFIDENT HOSPITALITY", category: "History & Lore", subline: "Poised service delivery", glass: "Any", method: "Eye contact & calm hands", ice: "N/A", garnish: "N/A", formula: "Steady hands, calm demeanor, and proactive guest care", tip: "A calm bartender calms a chaotic room; never rush with panicked motions.", lore: "The core tenet of grand hotel head barmen from the Savoy to the Ritz." },
    { id: "lime", name: "PERSIAN LIME SCIENCE", category: "Mixers", subline: "Fresh citric acidity", glass: "Shaker tin", method: "Hand pressed", ice: "N/A", garnish: "Wheel or wedge", formula: "pH 2.0 to 2.4 citric & malic acid profile", tip: "Rest freshly squeezed lime juice for 2-4 hours before service to allow bitter limonene to soften.", lore: "Citrus juice was mandated in the British Navy in 1795 to eradicate scurvy." },
    { id: "carv", name: "ICE CARVING CRAFT", category: "Methods & Tools", subline: "Deba knife ice sculpture", glass: "Rocks Glass", method: "Hand chiseled", ice: "Crystal clear block", garnish: "N/A", formula: "Hand-sculpted diamond facets reflecting bar lighting", tip: "Carve only tempered ice; sub-zero ice from a freezer will shatter under the blade.", lore: "Japanese barmen in Ginza transformed ice carving into a high culinary art." },
    { id: "rock", name: "THE SINGLE ROCK", category: "Glassware", subline: "Minimal surface area cooling", glass: "Double Old Fashioned", method: "Poured over block", ice: "2x2 inch clear cube", garnish: "Orange twist", formula: "Dense solid cube (0% internal air bubbles)", tip: "Melts up to 40% slower than small wet machine cubes, preventing over-dilution.", lore: "Embraced by modern craft bars to showcase premium spirits without watery dilution." },
    { id: "cor", name: "CORPSE REVIVER FAMILY", category: "History & Lore", subline: "Historic morning restorative sours", glass: "Coupe", method: "Shaken with absinthe rinse", ice: "Up", garnish: "Lemon twist", formula: "Equal parts Gin, Cointreau, Lillet Blanc, Lemon Juice + Absinthe", tip: "Harry Craddock warned: 'Four of these taken in swift succession will un-revive the corpse.'", lore: "Documented in Harry Craddock’s 1930 Savoy Cocktail Book." },
    { id: "rec", name: "RECIPE STANDARDIZATION", category: "History & Lore", subline: "Precision spec cards", glass: "Any", method: "Jigger accuracy", ice: "N/A", garnish: "Standardized", formula: "Standardized specs laminated at every well station", tip: "Consistency builds guest trust; a cocktail must taste identical regardless of who pours it.", lore: "Modern craft bars utilize strict spec sheets to preserve cocktail integrity across shifts." },
    { id: "rip", name: "HERB TEARING TECHNIQUE", category: "Methods & Tools", subline: "Gentle essential oil extraction", glass: "Mixing glass / Julep", method: "Hand torn along veins", ice: "Per spec", garnish: "Herb bouquet", formula: "Gently tearing leaves to open cell walls without bruising", tip: "Never pulverize herbs in a blender; bitter chlorophyll will ruin the drink balance.", lore: "Adopted in Mediterranean and Caribbean mixology to release pure botanical aromas." },
    { id: "cup", name: "THE SILVER CUP", category: "Glassware", subline: "Frosted metal chalice", glass: "12 oz Julep Cup", method: "Packed with crushed ice", ice: "Pebble ice cone", garnish: "Spearmint bouquet", formula: "Solid sterling silver or stainless steel chalice", tip: "Hold only by the top rim or bottom foot so your fingers don't melt the frost layer.", lore: "Presented as trophies in 19th-century Kentucky horse racing and county fairs." },
    { id: "cane", name: "PURE CANE SUGAR", category: "Spirits", subline: "Raw sucrose syrup", glass: "Prep bottle", method: "Cold dissolved", ice: "N/A", garnish: "N/A", formula: "2 parts pure cane sugar to 1 part water (Rich 2:1 syrup)", tip: "2:1 rich cane syrup has a higher sugar density that resists spoilage without boiling.", lore: "Sugarcane cultivation transformed Caribbean distillation starting in the 1640s." },
    { id: "col", name: "COLLINS VESSEL", category: "Glassware", subline: "Tall cylindrical service", glass: "12 oz Collins Glass", method: "Built over ice", ice: "Spear or cubes", garnish: "Lemon wheel & cherry", formula: "Tall narrow glass holding 10 to 14 fl oz", tip: "Designed specifically for long, refreshing drinks lengthened with sparkling soda.", lore: "Named after John Collins, head waiter at Limmer’s Hotel in 1830s London." },
    { id: "num", name: "CALIBRATED JIGGER LINES", category: "Methods & Tools", subline: "Interior etched increments", glass: "Japanese Jigger", method: "Level pour to line", ice: "N/A", garnish: "N/A", formula: "Markings at 0.25, 0.5, 0.75, 1.0, 1.5, and 2.0 oz", tip: "Always read jigger lines at eye level to guarantee exact recipe balance.", lore: "Modern Japanese style jiggers replaced inaccurate thimble measures in the 2000s." },
    { id: "eyed", name: "OPTIC CLARITY EVALUATION", category: "Methods & Tools", subline: "Visual wash line inspection", glass: "Stemware", method: "Held to light", ice: "Up", garnish: "Clean drop", formula: "Bright, sparkling clarity with zero unwanted sediment", tip: "Hold the drink up to the light before serving; cloudy liquid indicates broken ice or poor straining.", lore: "The visual inspection standard enforced by master mixologist guilds." },
    { id: "slow", name: "SLOW STIRRING CADENCE", category: "Methods & Tools", subline: "Laminar flow dilution", glass: "Mixing glass", method: "Gentle rhythmic spin", ice: "Clear blocks", garnish: "N/A", formula: "Silent gliding motion without splashing or aerating", tip: "Keep your hand relaxed and let the spiral shaft guide the spoon around the glass perimeter.", lore: "Pioneered in Tokyo bars to craft perfectly transparent, silk-smooth Manhattans." },
    { id: "stem", name: "STEMMED COCKTAIL GLASS", category: "Glassware", subline: "Thermal isolation handle", glass: "Nick & Nora / Coupe", method: "Held by stem only", ice: "Served up", garnish: "Citrus twist", formula: "Long glass stem elevating the bowl from body heat", tip: "Always instruct servers to carry and present glasses by the stem, never the bowl.", lore: "Originated in 17th-century Venetian glassware to keep chilled drinks cold." },
    { id: "rib", name: "HEAVY BASE TUMBLER", category: "Glassware", subline: "Weighted rocks glassware", glass: "Double Old Fashioned", method: "Built in glass", ice: "Large rock", garnish: "Orange swath", formula: "Weighted base providing tactile heft and stability", tip: "The thick glass base insulates melting ice from warm table surfaces.", lore: "Standard issue in 19th-century saloons to survive heavy bar service." },
    { id: "elm", name: "HISTORIC COOPERAGE WOOD", category: "Spirits", subline: "Hardwood barrel stave lore", glass: "Glencairn", method: "Wood aging", ice: "N/A", garnish: "N/A", formula: "Coopers experimenting with varied woods before white oak standardization", tip: "White oak won out because its cellular structure is naturally liquid-tight.", lore: "Early distillers used whatever local timber was available, including elm, chestnut, and ash." },
    { id: "spea", name: "ICE SPEAR SCULPTING", category: "Methods & Tools", subline: "Monolithic highball ice", glass: "Collins Glass", method: "Carved from block", ice: "Full length spear", garnish: "Citrus ribbon", formula: "Ice pillar cut 1/4-inch shorter than the glass height", tip: "Slide the ice spear into the glass at an angle to avoid shattering the bottom.", lore: "Highball bars in Tokyo popularized single ice columns to maintain continuous chill." },
    { id: "dee", name: "DEEP CHILL PHYSICS", category: "Methods & Tools", subline: "Sub-freezing glass temperatures", glass: "Freezer stemware", method: "Pre-service freeze", ice: "0°F (-18°C)", garnish: "Frost wall", formula: "Chilling glasses to 0°F keeps cocktails below 32°F for over 15 minutes", tip: "Never pour hot washed glassware into cold service; store dedicated racks in the freezer.", lore: "The secret to London hotel martinis that stay ice cold down to the final drop." },
    { id: "clay", name: "OAXACAN CLAY COPITA", category: "Glassware", subline: "Artisanal mezcal vessel", glass: "Clay Copita", method: "Sipped neat", ice: "None", garnish: "Orange slice & sal de gusano", formula: "Locally dug red or black clay fired in wood kilns", tip: "The wide rim disperses high ethanol vapors, allowing earthy agave notes to bloom.", lore: "Handmade in rural Oaxaca by Zapotec potters for centuries." },
    { id: "smok", name: "EARTHEN AGAVE SMOKE", category: "Spirits", subline: "Pit roasting aromatics", glass: "Copita", method: "Earthen cone roast", ice: "None", garnish: "None", formula: "Agave hearts roasted over river stones and oak embers for 3-5 days", tip: "Smokiness should frame the agave, never overpower the green botanical soul of the plant.", lore: "Ancient Mesoamerican roasting technique preserved by indigenous mezcaleros." },
    { id: "pura", name: "100% AGAVE PURITY", category: "Spirits", subline: "Zero additive distillation", glass: "Snifter or Copita", method: "Single or double pot", ice: "None", garnish: "None", formula: "Distilled solely from fermented blue weber agave without cane sugar", tip: "Look for '100% de Agave' on the label; 'Mixto' tequilas permit 49% cheap sugarcane filler.", lore: "Standardized by Mexican Norma Oficial Mexicana (NOM) laws to protect heritage." },
    { id: "alm", name: "ALAMBIQUE POT STILL", category: "Spirits", subline: "Copper distillation kettle", glass: "Copita", method: "Batch distillation", ice: "N/A", garnish: "N/A", formula: "Direct wood-fired copper kettle with swan neck condenser", tip: "Copper reacts with sulfur compounds during boiling, purifying the spirit vapor.", lore: "Introduced to the Americas by Spanish distillers in the 1500s." },
    { id: "sweet", name: "SWEET ROSSO VERMOUTH", category: "Mixers", subline: "Torino style fortified wine", glass: "Coupe or Tumbler", method: "Refrigerated bottle", ice: "Per build", garnish: "Orange twist", formula: "Fortified Italian wine infused with caramel, artemisia, and bitter roots", tip: "Always refrigerate opened vermouth; fortified wine oxidizes into vinegar within weeks at room temp.", lore: "Created by Antonio Benedetto Carpano in Turin in 1786." },
    { id: "stirs", name: "CIRCULAR STIR TECHNIQUE", category: "Methods & Tools", subline: "Gentle laminar dilution", glass: "Yarai mixing glass", method: "Finger-tip spiral spin", ice: "Large cubes", garnish: "N/A", formula: "Pushing and pulling the barspoon silently around the glass rim", tip: "Keep your arm still; the movement should come entirely from your fingers rolling the shaft.", lore: "The benchmark of elegance taught in classical European and Japanese cocktail academies." },
    { id: "cherr", name: "LUXARDO MARASCA CHERRY", category: "Methods & Tools", subline: "Candied marasca garnish", glass: "Coupe", method: "Speared on pick", ice: "N/A", garnish: "1 brandied cherry", formula: "Sour marasca cherries steeped in rich marasca syrup", tip: "Never use neon red artificial sundae cherries; real Luxardo cherries provide rich stone fruit depth.", lore: "Produced in Torreglia, Italy by the Luxardo family since 1821." },
    { id: "sas", name: "SASSAFRAS & ROOTS", category: "Mixers", subline: "Woodland bittering bark", glass: "Dash bottle", method: "Tincture steep", ice: "N/A", garnish: "N/A", formula: "Wild sassafras, burdock, and sarsaparilla root maceration", tip: "Adds nostalgic root beer and wintergreen aromas to craft house bitters.", lore: "Indigenous American botanical used by colonial apothecaries to brew tonics." },
    { id: "sec", name: "TRIPLE SEC CURAÇAO", category: "Spirits", subline: "Bitter orange peel liqueur", glass: "Coupe / Shaker", method: "Distilled orange oils", ice: "N/A", garnish: "Lime wheel", formula: "Neutral spirit distilled with dried peels of bitter Laraha oranges", tip: "Triple Sec translates to 'triple dry', containing less sugar than Dutch dark curaçao.", lore: "Developed in 19th-century France by distilleries like Combier and Cointreau." },
    { id: "equal", name: "EQUAL PARTS RATIO", category: "Methods & Tools", subline: "Symmetrical cocktail build", glass: "Rocks Glass", method: "Stirred over ice", ice: "Large block", garnish: "Orange twist", formula: "1:1:1 Ratio (1.0 oz Spirit, 1.0 oz Modifier, 1.0 oz Aperitif)", tip: "Used in timeless recipes like the Negroni, Boulevardier, and Last Word.", lore: "Celebrated for its democratic elegance: easy to memorize and impossible to forget." },
    { id: "amaro", name: "ITALIAN AMARO FAMILY", category: "Spirits", subline: "Herbal bittersweet digestifs", glass: "Cordial or Rocks", method: "Sipped neat or with twist", ice: "Optional rock", garnish: "Orange peel", formula: "Neutral spirit or wine base macerated with gentian, rhubarb, and citrus peels", tip: "Ranging from light citrusy Montenegro to dark smoky Fernet, amari aid digestion.", lore: "Centuries-old recipes originally compounded by Italian apothecaries and monks." },
    { id: "uni", name: "UNIVERSAL CRAFT LAWS", category: "History & Lore", subline: "Bartender guild principles", glass: "Any", method: "Measured execution", ice: "Clean", garnish: "Fresh", formula: "Quality ingredients + Exact measurement + Proper temperature = Perfection", tip: "Never cut corners on prep; fresh citrus and clear ice elevate simple pours into art.", lore: "The shared code of hospitality uniting bartenders across every era and continent." },
    { id: "tea", name: "TEA BOTANICAL BASES", category: "Mixers", subline: "Tannic non-alcoholic structure", glass: "Highball or Coupe", method: "Cold brewed", ice: "Cubes", garnish: "Lemon wheel", formula: "Loose leaf black, green, or lapsang souchong tea cold steeped for 12 hours", tip: "Tea tannins provide the drying mouthfeel normally supplied by barrel-aged spirits.", lore: "British punch makers in the 1700s used hot black tea as the foundational lengthener." },
    { id: "junip", name: "JUNIPER BERRY SCIENCE", category: "Spirits", subline: "Pinene botanical soul of gin", glass: "Tulip or Highball", method: "Vapor infused", ice: "Per spec", garnish: "Juniper berries", formula: "Juniperus communis cones providing alpha-pinene and myrcene aromatics", tip: "Crush dried berries lightly between fingers before infusing syrups to release resinous pine oils.", lore: "Dutch physician Franciscus Sylvius distilled juniper spirits in the 1650s as medicine." },
    { id: "still", name: "COPPER CARTER-HEAD STILL", category: "Spirits", subline: "Botanical vapor infusion", glass: "Snifter", method: "Continuous or batch", ice: "N/A", garnish: "N/A", formula: "Alcohol vapors pass through a suspended copper basket of fresh botanicals", tip: "Vapor infusion extracts delicate floral top notes without boiling and stewing the herbs.", lore: "Patented by the Carter brothers in 1831, perfecting delicate modern gin distilling." },
    { id: "tonic", name: "CINCHONA TONIC WATER", category: "Mixers", subline: "Quinine botanical lengthener", glass: "Highball Glass", method: "Poured gently down spoon", ice: "Spear or cubes", garnish: "Lime wheel", formula: "Carbonated water, sugar, and natural quinine extracted from cinchona bark", tip: "Always pour tonic slowly down the side of the glass to preserve tight sparkling bubbles.", lore: "British colonial soldiers in India mixed bitter medicinal quinine with gin and sugar." },
    { id: "corns", name: "KENTUCKY CORN MASH", category: "Spirits", subline: "Sweet bourbon grain foundation", glass: "Rocks or Glencairn", method: "Charred oak aged", ice: "Cube or Neat", garnish: "None", formula: "Minimum 51% yellow dent field corn fermented with sour mash backset", tip: "Corn starches convert into sweet, luscious bourbon notes of caramel, butter, and toffee.", lore: "Kentucky pioneers found corn grew abundantly in the rich limestone soil." },
    { id: "chars", name: "BARREL CHAR LEVELS", category: "Spirits", subline: "Open flame wood carbonization", glass: "Glencairn", method: "Barrel firing", ice: "N/A", garnish: "N/A", formula: "Char #1 (15 sec) up to Char #4 'Alligator' (55 sec open flame burn)", tip: "Heavy char creates a micro-porous carbon filter that removes impurities while releasing wood sugars.", lore: "Cooperages torch barrels with roaring natural gas burners before filling with white dog." },
    { id: "ester", name: "RUM ESTER CHEMISTRY", category: "Spirits", subline: "Aromatic fermentation funk", glass: "Snifter", method: "Long dunder fermentation", ice: "None", garnish: "None", formula: "High ester counts (up to 1600 g/hL AA) creating ripe banana and pineapple funk", tip: "High-ester Jamaican pot rum punches through citrus and tiki spices like no other spirit.", lore: "Hampden Estate and Long Pond in Jamaica are world-famous for heritage ester fermentation." },
    { id: "vodka", name: "VODKA RECTIFICATION", category: "Spirits", subline: "Neutral spirit charcoal filtration", glass: "Martini / Copper Mug", method: "Multi-column distilled", ice: "Sub-zero cold", garnish: "Lemon twist", formula: "Distilled to 96% ABV then diluted with pure glacial or reverse-osmosis water", tip: "Top vodkas are evaluated by texture and mouthfeel rather than overpowering aroma.", lore: "Poland and Russia have fiercely debated the birth of vodka since the 1400s." },
    { id: "rinse", name: "ABSINTHE GLASS COAT", category: "Methods & Tools", subline: "Aromatic interior wash", glass: "Rocks or Coupe", method: "Swirled & discarded", ice: "Chilled glass", garnish: "N/A", formula: "0.25 oz Absinthe or Herbsaint swirled to coat the glass walls, excess dumped", tip: "Dump the excess rinse or drink it as a barback treat; don't leave liquid pooling in the base.", lore: "Antoine Peychaud popularized absinthe rinses in 19th-century New Orleans Sazeracs." },
    { id: "anise", name: "GREEN ANISE SEED", category: "Spirits", subline: "Anethole licorice botanical", glass: "Copita or Coupe", method: "Vapor distilled", ice: "Louches with water", garnish: "Star anise pod", formula: "Pimpinella anisum supplying essential anethole terpenes", tip: "Anethole is soluble in alcohol but insoluble in water; adding cold water creates a milky louche.", lore: "The holy trinity of absinthe: grande wormwood, green anise, and sweet Florence fennel." },
    { id: "peych", name: "PEYCHAUD'S BITTERS", category: "Mixers", subline: "Creole gentian & cherry bitters", glass: "Dash bottle", method: "Direct dash into glass", ice: "N/A", garnish: "None", formula: "Bright crimson gentian, cherry, and anise bitters bottled at 35% ABV", tip: "Lighter and more floral than Angostura; essential for an authentic New Orleans Sazerac.", lore: "Created by Haitian apothecary Antoine Amédée Peychaud in New Orleans in the 1830s." },
    { id: "swizz", name: "THE SWIZZLE CHURN", category: "Methods & Tools", subline: "Quararibea turbinata branch spin", glass: "Collins or Julep", method: "Two-hand palm friction", ice: "Crushed pebble", garnish: "Mint & bitters", formula: "Spinning a multi-pronged wooden swizzle stick rapidly between your palms", tip: "The spinning prongs pull crushed ice through the liquid, rapidly frosting the glass exterior.", lore: "Caribbean plantation cocktail technique dating back to 18th-century Rum Swizzles." },
    { id: "grape", name: "RUBY GRAPEFRUIT PROFILE", category: "Mixers", subline: "Naringin bitter-sweet citrus", glass: "Highball", method: "Fresh squeezed", ice: "Cubes", garnish: "Grapefruit half-wheel", formula: "Grapefruit juice + pinch of sea salt to suppress bitterness", tip: "Grapefruit contains naringin; adding a few drops of saline solution softens harsh bitter edges.", lore: "A natural hybrid of sweet orange and pomelo originating in Barbados in the 1700s." },
    { id: "black", name: "BLACKSTRAP MOLASSES RUM", category: "Spirits", subline: "Dark viscous cane spirit", glass: "Rocks / Tiki mug", method: "Shaken with pineapple", ice: "Crushed", garnish: "Pineapple fronds", formula: "Heavy pot-still rum enriched with blackstrap molasses caramel", tip: "Provides dramatic layered floats and dark stormy color to tropical tiki builds.", lore: "Blackstrap is the dark, bitter byproduct of the third boiling of raw sugarcane syrup." },
    { id: "juice", name: "PINEAPPLE FROTH KINETICS", category: "Mixers", subline: "Bromelain enzyme aeration", glass: "Shaker tin", method: "Vigorous wet shake", ice: "Cubes", garnish: "Fronds", formula: "Fresh pineapple juice containing natural foaming enzymes", tip: "Pineapple juice produces thick, velvety foam when shaken hard without needing egg whites.", lore: "Central to classic Malaysian tiki drinks like the 1970s Jungle Bird at the Kuala Lumpur Hilton." },
    { id: "float", name: "BARSPOON LAYER FLOAT", category: "Methods & Tools", subline: "Liquid density gravity layering", glass: "Any", method: "Poured over inverted spoon", ice: "Per spec", garnish: "Surface layer", formula: "Pouring low-density, high-proof spirit gently over dense sugary cocktail liquid", tip: "Invert a barspoon just above the drink surface and pour slowly down the spiral stem.", lore: "Used in 19th-century Pousse-Café service to create up to seven distinct colored layers." },
    { id: "chart", name: "GREEN CHARTREUSE", category: "Spirits", subline: "130-Herb Carthusian elixir", glass: "Coupe or Snifter", method: "Shaken or Neat", ice: "Up or None", garnish: "None", formula: "55% ABV herbal liqueur macerated and aged in oak by two monks", tip: "One of the only liqueurs in the world that continues to age and improve inside the bottle.", lore: "Formulated in 1605 as an elixir of long life, crafted exclusively by Carthusian monks." },
    { id: "maras", name: "MARASCHINO DISTILLATE", category: "Spirits", subline: "Marasca cherry stone distillate", glass: "Coupe", method: "Dash measure", ice: "Up", garnish: "Cherry", formula: "Distillation of crushed marasca cherry fruit, leaves, and pits (32% ABV)", tip: "Not sweet cherry syrup; real Maraschino is dry, floral, and deeply aromatic with almond notes.", lore: "Originated in Zadar on the Dalmatian coast in the 16th century." },
    { id: "fours", name: "THE EQUAL FOUR-PARTS", category: "History & Lore", subline: "Architectural 0.75 oz balance", glass: "Coupe", method: "Hard shake & double strain", ice: "Served up", garnish: "Brandied cherry", formula: "0.75 oz Gin + 0.75 oz Green Chartreuse + 0.75 oz Maraschino + 0.75 oz Lime", tip: "A brilliant format; the intense herbal, sweet, botanical, and sour components lock together.", lore: "Created by Frank Fogarty at the Detroit Athletic Club during Prohibition." },
    { id: "finos", name: "FINO SHERRY SPEC", category: "Spirits", subline: "Biological flor aging", glass: "Copita", method: "Served cold 45°F", ice: "None", garnish: "Green olive", formula: "15% ABV fortified Palomino wine protected under a yeast veil (flor)", tip: "Bone dry, saline, and bready; pairs impeccably with tonic water and gin in cobblers.", lore: "Aged in the maritime bodegas of Jerez and El Puerto de Santa María." },
    { id: "soler", name: "THE SOLERA SYSTEM", category: "History & Lore", subline: "Fractional cask blending", glass: "Copita", method: "Cellar aging", ice: "N/A", garnish: "N/A", formula: "Drawing wine from bottom barrels (solera) and topping with younger tiers (criaderas)", tip: "Guarantees continuous vintage consistency and complex wood integration over decades.", lore: "Developed by Spanish bodega coopers in Andalusia in the 18th century." },
    { id: "nutty", name: "OXIDATIVE SHERRY NOTES", category: "Spirits", subline: "Oloroso & Amontillado aging", glass: "Copita", method: "Cellar oxidation", ice: "Ambient", garnish: "Toasted almond", formula: "Fortified to 17%+ ABV to kill flor and expose wine directly to oxygen in oak", tip: "Yields deep aromas of roasted hazelnuts, pipe tobacco, dried fig, and leather.", lore: "Amontillado begins under flor then matures oxidatively, combining two sherry worlds." },
    { id: "islay", name: "ISLAY PEAT DISTILLATION", category: "Spirits", subline: "Phenolic maritime smoke", glass: "Glencairn / Rocks", method: "Peat fire kiln drying", ice: "Optional float", garnish: "Candied ginger", formula: "Barley kilned over burning Islay peat bogs (35 to 55+ PPM phenols)", tip: "In cocktails like the Penicillin, a 0.25 oz float delivers immense aroma with every sip.", lore: "Scottish island distillers turned to ancient peat bogs when timber was scarce." },
    { id: "honey", name: "HONEY GINGER SYRUP", category: "Mixers", subline: "3:1 Clover honey ginger emulsion", glass: "Prep bottle", method: "Hand blended", ice: "N/A", garnish: "N/A", formula: "3 parts clover honey + 1 part fresh ginger root juice + 1 part warm water", tip: "Never boil honey; gentle warmth dissolves the syrup while preserving delicate floral enzymes.", lore: "Created by modern classic pioneer Sam Ross at Milk & Honey New York in 2005." },
    { id: "viole", name: "CRÈME DE VIOLETTE", category: "Spirits", subline: "Alpine violet flower liqueur", glass: "Coupe", method: "Measured barspoon", ice: "Up", garnish: "Luxardo cherry", formula: "Maceration of wild violet flowers in neutral spirit and sugar (20% ABV)", tip: "Use sparingly (0.25 oz max); too much violette turns cocktails soapy and overly floral.", lore: "Hugo Ensslin published the Aviation recipe in 1916 featuring this sky-blue floral liqueur." },
    { id: "rouge", name: "ROUGE VERMOUTH PROFILE", category: "Mixers", subline: "Fortified botanic red wine", glass: "Coupe or Rocks", method: "Refrigerated bottle", ice: "Per spec", garnish: "Orange swath", formula: "White wine base fortified and colored with dark burnt sugar caramel and wormwood", tip: "Store open bottles with vacuum stoppers in the fridge to stop vinegar conversion.", lore: "The heart of the Manhattan, Negroni, and Boulevardier for over 140 years." },

    /* 3. Grand Service & Master Mixologist Additions */
    { id: "shakers", name: "BOSTON SHAKER MECHANICS", category: "Methods & Tools", subline: "Two-piece metal tin system", glass: "Service glassware", method: "Vigorous diagonal shake", ice: "Large cubes", garnish: "N/A", formula: "28 oz metal base + 18 oz metal cheater tin", tip: "Metal-on-metal cools faster and releases more easily than metal-on-glass Boston tins.", lore: "Developed in American saloons in the 1870s to speed up volume service." },
    { id: "bitters", name: "HOUSE BITTERS BLENDS", category: "Mixers", subline: "Aromatic cocktail seasoning", glass: "Japanese dash bottle", method: "Dashed over tins", ice: "N/A", garnish: "N/A", formula: "Equal parts Angostura, Orange bitters, and Peychaud's (The House Blend)", tip: "Bitters are the salt and pepper of mixology; they bridge disparate spirits and citrus.", lore: "Originated as patent medicines in the 1700s before transforming early cocktails." },
    { id: "juleps", name: "MINT JULEP CHALICE", category: "Glassware", subline: "Frosted sterling cup", glass: "12 oz Silver Cup", method: "Packed crushed ice", ice: "Pebble ice", garnish: "Slapped mint bouquet", formula: "2.5 oz Bourbon\n0.5 oz Rich Mint Syrup\nCrushed ice packed firmly", tip: "Dust powdered sugar over the mint bouquet for a stunning frosted morning presentation.", lore: "The official cocktail of the Kentucky Derby since 1938." },
    { id: "sub", name: "SUB-RECIPE MISE-EN-PLACE", category: "Methods & Tools", subline: "Craft bar prep foundations", glass: "Squeeze bottles", method: "Pre-shift batching", ice: "N/A", garnish: "N/A", formula: "Syrups, cordials, infusions, and clarified juices prepared before service", tip: "Label every bottle with date, ingredient name, and preparer initials.", lore: "Borrowed from French classical kitchen brigade systems by modern cocktail bars." },
    { id: "bus", name: "BAR STATION HYGIENE", category: "History & Lore", subline: "Clean well service rhythm", glass: "N/A", method: "Constant reset", ice: "N/A", garnish: "N/A", formula: "Clean bar top + Dry rail + Stocked ice = Fluid service speed", tip: "Clean as you go; a cluttered bar top produces slow tickets and sloppy pours.", lore: "The golden rule drilled into apprentices by generations of head bartenders." },
    { id: "tai", name: "TRADER VIC'S MAI TAI", category: "History & Lore", subline: "1944 Oakland rum legend", glass: "Double Old Fashioned", method: "Shaken with crushed ice", ice: "Crushed", garnish: "Spent lime shell & mint", formula: "2.0 oz Aged Rum\n0.75 oz Lime\n0.5 oz Curaçao\n0.25 oz Orgeat\n0.25 oz Simple", tip: "Invert the spent lime half inside the drink to represent a tropical island.", lore: "Named when Carrie Guild tasted it and exclaimed: 'Maita'i roa a'e!' (Out of this world!)." },
    { id: "ear", name: "ACOUSTIC SHAKE MONITORING", category: "Methods & Tools", subline: "Auditory cocktail diagnosis", glass: "Shaker tin", method: "Active listening", ice: "Solid cubes", garnish: "N/A", formula: "Listening for the dull hollow thud to transition into sharp crisp ice fracture", tip: "When the pitch of the ice rattling inside the tin becomes high and sharp, the drink is ready.", lore: "Master barmen can tell if a drink is properly chilled purely by sound from across the room." },
    { id: "soj", name: "SOJU DISTILLATION", category: "Spirits", subline: "Korean rice spirit tradition", glass: "Small shot cup", method: "Chilled pour", ice: "None", garnish: "None", formula: "Traditional rice or sweet potato distillation (16% to 25% ABV)", tip: "Poured with two hands holding the bottle as a sign of mutual hospitality respect.", lore: "Distillation was introduced to the Korean peninsula by Mongol invaders in the 13th century." },
    { id: "spheres", name: "SPHERIFICATION CAVIAR", category: "Methods & Tools", subline: "Modernist cocktail caviar", glass: "Tasting spoon", method: "Sodium alginate bath", ice: "None", garnish: "Micro herbs", formula: "Cocktail base + Calcium Lactate dropped into a 0.5% Sodium Alginate water bath", tip: "Rinse spheres in neutral water immediately to stop the gelation process from hardening the core.", lore: "Invented in 1942, popularized by Chef Ferran Adrià at elBulli in 2003." },
    { id: "clarify", name: "MILK PUNCH CLARIFICATION", category: "Methods & Tools", subline: "Casein curd filtration", glass: "Nick & Nora / Rock", method: "Acid curdling & strain", ice: "Clear block", garnish: "Expressed lemon", formula: "Hot milk curdled with citrus-rich cocktail punch, filtered through curds", tip: "Casein protein curds act as a natural filter, stripping tannins while leaving velvet texture.", lore: "English playwright Aphra Behn documented milk punch clarification back in 1688." },
    { id: "rotavap", name: "ROTARY EVAPORATION", category: "Methods & Tools", subline: "Low-temperature vacuum distillation", glass: "Flute / Coupe", method: "Vacuum boiling 85°F", ice: "N/A", garnish: "Delicate botanical", formula: "Distilling delicate herbs (cucumber, basil, mint) without cooking or stewing them", tip: "Lowering atmospheric pressure allows ethanol to boil at room temperature.", lore: "Pioneered in organic chemistry laboratories, adopted by modernist cocktail masters." },
    { id: "fat", name: "FAT WASHING TECHNIQUE", category: "Methods & Tools", subline: "Lipid spirit extraction", glass: "Mason jar", method: "Freezer separation", ice: "N/A", garnish: "Savory rim", formula: "Warm melted butter or bacon fat mixed with spirit, frozen solid, fat skimmed off", tip: "The alcohol extracts fat-soluble aromatic flavor compounds while leaving zero greasy residue.", lore: "Created by Don Lee at PDT (Please Don't Tell) in New York with Benton's bacon bourbon in 2007." },
    { id: "oleo", name: "OLEO-SACCHARUM CRAFT", category: "Methods & Tools", subline: "Citrus oil sugar extraction", glass: "Punch bowl", method: "Cold sugar maceration", ice: "Large punch block", garnish: "Nutmeg grating", formula: "Peels of 6 lemons rubbed with 1 cup granulated sugar, rested for 4 hours", tip: "The dry sugar crystals draw aromatic essential oils out of the citrus pores through osmosis.", lore: "The universal foundation of punch recipes documented across the 18th century." },
    { id: "nutmeg", name: "FRESH GRATED NUTMEG", category: "Mixers", subline: "Myristicin aromatic spice", glass: "Mug or Coupe", method: "Microplane grating", ice: "Per spec", garnish: "Dusting on foam", formula: "Whole nutmeg seed freshly grated across milk punch, eggnog, or flips", tip: "Never use stale pre-ground powder; grating whole seeds releases volatile aromatic oils.", lore: "The Dutch fought bitter naval wars in the 1600s to monopolize the Banda nutmeg islands." },
    { id: "bijou", name: "THE BIJOU CLASSIC", category: "History & Lore", subline: "Jewel cocktail of 1890s", glass: "Coupe", method: "Stirred with bitters", ice: "Served up", garnish: "Cherry & twist", formula: "1.0 oz Gin (Diamond)\n1.0 oz Green Chartreuse (Emerald)\n1.0 oz Sweet Vermouth (Ruby)", tip: "A deeply complex, high-proof stirred classic; requires heavy dilution to tame its power.", lore: "Invented by Harry Johnson in his 1900 Bartenders’ Manual, named for the three jewel colors." },
    { id: "limousin", name: "LIMOUSIN OAK STAVES", category: "Spirits", subline: "Wide-grain French cooperage", glass: "Cognac Snifter", method: "Cask resting", ice: "None", garnish: "None", formula: "Quercus robur oak from the Limousin forest in central France", tip: "Wide wood grain allows rapid tannin and vanillin extraction into young eau-de-vie.", lore: "The gold standard timber used by historic Cognac houses for centuries." },
    { id: "paradis", name: "THE PARADIS CELLAR", category: "History & Lore", subline: "Centuries-old demijohn reserves", glass: "Tulip Glass", method: "Ambient neat sip", ice: "None", garnish: "None", formula: "100+ year-old cognacs stored in wicker-covered glass demijohns", tip: "Once eau-de-vie is transferred from oak barrels to glass demijohns, aging stops completely.", lore: "The innermost sanctum of great cognac houses, holding spirits distilled in the 1800s." },
    { id: "tahona", name: "VOLCANIC TAHONA WHEEL", category: "Methods & Tools", subline: "Artisanal agave milling", glass: "Copita", method: "Mule or tractor drawn", ice: "N/A", garnish: "N/A", formula: "Two-ton volcanic basalt wheel slowly rolling over roasted agave hearts", tip: "Tahona crushing separates fibers gently without shredding bitter plant lignin into the juice.", lore: "The ancient milling technique used in Jalisco since the dawn of tequila production." },
    { id: "horno", name: "MASONRY STEAM HORNO", category: "Methods & Tools", subline: "Slow brick oven baking", glass: "Copita", method: "Low pressure steam", ice: "N/A", garnish: "N/A", formula: "Cooking agave piñas at 200°F (93°C) for 36 to 48 hours", tip: "Slow roasting avoids scorching sugars, producing sweet notes of honey, pumpkin, and roasted yam.", lore: "Traditional brick hornos preserve artisanal tequila flavor far better than steel autoclaves." },
    { id: "waldorf", name: "WALDORF-ASTORIA BAR", category: "History & Lore", subline: "Pre-Prohibition glamour hub", glass: "Stemmed crystal", method: "Precision service", ice: "Block ice", garnish: "Luxardo cherry", formula: "Birthplace of the Rob Roy, Waldorf Cocktail, and Bronx Cocktail", tip: "The classic four-deep brass bar rail where high society and master bartenders met.", lore: "Opened on Fifth Avenue in 1893, memorialized in Albert Stevens Crockett’s bar book." },
    { id: "hoffman", name: "HOFFMAN HOUSE SALOON", category: "History & Lore", subline: "Broadway Gilded Age landmark", glass: "Chalice or Coupe", method: "Master craft", ice: "Shaved pond ice", garnish: "Seasonal fruit", formula: "Famous for William Schmidt 'The Only William' and lavish artwork", tip: "Gilded age saloons elevated bartending into a revered, highly paid professional craft.", lore: "Located on Madison Square, famous for Bouguereau’s painting 'Nymphs and Satyr'." },
    { id: "manuals", name: "THE HISTORIC BAR BOOKS", category: "History & Lore", subline: "Standardized mixology bibles", glass: "Any", method: "Exact proportion", ice: "Per spec", garnish: "Per spec", formula: "The written legacy of Jerry Thomas (1862), Harry Johnson (1882), and Savoy (1930)", tip: "Study original 19th-century formulas to understand how cocktail structures evolved.", lore: "Bar manuals elevated mixology from oral tradition into codified culinary science." },
    { id: "savoy", name: "SAVOY COCKTAIL BOOK", category: "History & Lore", subline: "1930 Harry Craddock compendium", glass: "Coupe", method: "Hard shake", ice: "Up", garnish: "Twist", formula: "750 timeless recipes compiled during European hotel golden age", tip: "Harry Craddock fled American Prohibition to reign over the Savoy American Bar in London.", lore: "The art-deco masterpiece book that remains the world's most referenced cocktail guide." },
    { id: "vermouth", name: "TURIN & CHAMBÉRY VERMOUTH", category: "Mixers", subline: "Fortified botanical wine craft", glass: "Wine glass / Coupe", method: "Fortified & infused", ice: "Optional rock", garnish: "Citrus slice", formula: "75% wine base fortified to 16-18% ABV with mistelle and wormwood herbs", tip: "Sweet vermouth needs bitter artemisia herbs to balance its rich caramel sugar content.", lore: "Originating in northern Italy and southeast France, vermouth defined 19th-century drinks." },
    { id: "gentian", name: "ALPINE GENTIAN ROOT", category: "Spirits", subline: "Gentiana lutea bittering rhizome", glass: "Rocks / Tumbler", method: "Alcohol maceration", ice: "Cubes", garnish: "Lemon wheel", formula: "Yellow gentian roots harvested in the Alps providing intense clean bitterness", tip: "Gentian delivers non-citrus bitterness that cleanses the palate and stimulates digestion.", lore: "The core bittering root in French Suze, Italian Campari, and Angostura bitters." },
    { id: "cinchona", name: "CINCHONA BARK & QUININE", category: "Mixers", subline: "South American fever tree bark", glass: "Highball", method: "Decoction", ice: "Spear", garnish: "Lime", formula: "Cinchona officinalis bark boiled into bitter quinine syrup", tip: "Quinine flouresces bright blue under black ultraviolet light.", lore: "Quechua people introduced cinchona bark to Jesuit missionaries in Peru in the 1600s." },
    { id: "herbal", name: "HERBAL TINCTURE EXTRACTION", category: "Methods & Tools", subline: "Single botanical micro-extracts", glass: "Dropper bottle", method: "High proof steep", ice: "N/A", garnish: "N/A", formula: "1 part dried botanicals (lavender, sage, thyme) to 4 parts 100-proof spirit", tip: "Tinctures allow bartenders to add pure aromatic botanical top notes without sweetness.", lore: "Medieval apothecaries utilized herbal alcohol tinctures as concentrated herbal remedies." },
    { id: "freezing", name: "DIRECTIONAL FREEZING", category: "Methods & Tools", subline: "Clinebell thermal physics", glass: "Insulated cooler", method: "Top-down freezing", ice: "Dense clear block", garnish: "N/A", formula: "Insulating bottom and sides so water freezes top-down, pushing air to bottom", tip: "Saw off the cloudy bottom 20% to leave a block of 100% optically clear craft ice.", lore: "Invented by ice sculptor Charles Clinebell, revolutionizing modern cocktail ice." },
    { id: "clarity", name: "ICE CLARITY OPTICS", category: "Methods & Tools", subline: "Mineral & air bubble expulsion", glass: "Rocks", method: "Slow freezing", ice: "Crystal clear block", garnish: "None", formula: "Zero dissolved air pockets; 100% pure frozen water crystal structure", tip: "Clear ice has zero air bubbles, meaning it melts at a predictable, uniform slow speed.", lore: "Frederic Tudor sold New England lake ice worldwide by demonstrating its clear purity." },
    { id: "temper", name: "ICE TEMPERING SCIENCE", category: "Methods & Tools", subline: "Thermal shock prevention", glass: "Prep block", method: "Resting on board", ice: "Sweating 32°F ice", garnish: "N/A", formula: "Resting freezer-cold ice (0°F) at room temp until the outer surface is wet and glistening", tip: "Pouring warm liquid over untempered sub-zero ice causes immediate violent fracturing.", lore: "Japanese ice masters always temper blocks for 15 minutes before touching with a knife." },
    { id: "comfort", name: "HOSPITALITY SANCTUARY", category: "History & Lore", subline: "The guest experience creed", glass: "Any", method: "Attentive empathy", ice: "Fresh", garnish: "Deliberate", formula: "Attentive care + Warm greeting + Clean surroundings = Guest loyalty", tip: "People may forget what drink they ordered, but they never forget how you made them feel.", lore: "The core philosophy articulated by legendary restaurateur Danny Meyer." },
    { id: "misenplace", name: "BAR MISE-EN-PLACE", category: "Methods & Tools", subline: "Everything in its station spot", glass: "Well station", method: "Ergonomic staging", ice: "Full bins", garnish: "Fresh caddy", formula: "Bottles, jiggers, strainers, and syrups placed within arm's reach without looking", tip: "A great bartender can work an entire shift blindfolded because every tool has a home.", lore: "French culinary principle adapted by mid-century cocktail lounges to manage volume." },
    { id: "dilution", name: "DILUTION KINETICS", category: "Methods & Tools", subline: "Water as essential ingredient", glass: "Mixing glass or shaker", method: "Temperature monitoring", ice: "Dense cubes", garnish: "N/A", formula: "Cocktails should attain exactly 20% to 25% water dilution for optimal balance", tip: "Without water dilution, high-proof spirits paralyze tastebuds and taste harsh and burning.", lore: "Modern bar science pioneer Dave Arnold codified the thermal physics of cocktail dilution." },
    { id: "meniscus", name: "THE POSITIVE MENISCUS", category: "Methods & Tools", subline: "Surface tension accuracy", glass: "Japanese Jigger", method: "Edge-to-edge fill", ice: "N/A", garnish: "N/A", formula: "Pouring liquid until surface tension creates an upward convex dome over the rim", tip: "Underfilling by just 1/8-inch throws off a 2:1:1 cocktail ratio by over 15%.", lore: "Precision measurement rule practiced by Japanese master mixologists." },
    { id: "balance", name: "THE COCKTAIL BALANCE", category: "Methods & Tools", subline: "Harmonic sensory equilibrium", glass: "Any", method: "Palette evaluation", ice: "Per spec", garnish: "Complementary", formula: "Harmony of Sweet (Sugar), Sour (Acid), Strong (Ethanol), and Weak (Water)", tip: "No single element should overpower the others; each sip should invite the next.", lore: "The timeless mixological goal sought by master bartenders from 1806 to today." }
  ],

  /* =========================================================================
     HOSPITALITY MASTERY RANKS, DOMAINS & SERVICE HONORS
     ========================================================================= */
  ranks: [
    { level: 1, title: "Barback Apprentice", xpRequired: 0, icon: "🌱" },
    { level: 2, title: "Junior Mixologist", xpRequired: 150, icon: "🍋" },
    { level: 3, title: "Senior Bartender", xpRequired: 400, icon: "🍹" },
    { level: 4, title: "Head Mixologist", xpRequired: 850, icon: "🍸" },
    { level: 5, title: "Master of Spirits", xpRequired: 1500, icon: "👑" }
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
    { id: "vault_master", icon: "🏆", name: "Vault Master", desc: "Solve 10 or more curated puzzle services" },
    { id: "scholar", icon: "📖", name: "Codex Scholar", desc: "Unlock 25 or more bartender codex cards" },
    { id: "grand_scholar", icon: "📚", name: "Grand Scholar", desc: "Unlock 50 or more bartender codex cards" },
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
  savedGrids: {}, // puzzleId -> { userGrid, timerSeconds, hintsUsed, errorsCount, revealedCells }

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
    this.currentPuzzle = null;
    this.savePersistence();
  }
};

/* ==========================================================================
   4. CROSSWORD SOLVING & BOARD ENGINE
   ========================================================================== */
const CrosswordEngine = {
  boardMap: {},

  loadPuzzle(puzzleId, isReplay = false) {
    const puzzle = CONTENT_DATA.puzzles.find(p => p.id === puzzleId) || CONTENT_DATA.puzzles[0];
    GameState.currentPuzzle = puzzle;
    GameState.activePuzzleId = puzzle.id;
    GameState.isSolved = isReplay ? false : GameState.solvedPuzzleIds.has(puzzle.id);
    GameState.isPaused = false;

    // Restore saved in-progress board if present and not replaying fresh
    const saved = !isReplay ? GameState.savedGrids[puzzle.id] : null;
    if (saved && !GameState.isSolved) {
      GameState.userGrid = { ...saved.userGrid };
      GameState.timerSeconds = saved.timerSeconds || 0;
      GameState.hintsUsed = saved.hintsUsed || 0;
      GameState.errorsCount = saved.errorsCount || 0;
      GameState.revealedCells = new Set(saved.revealedCells || []);
    } else if (GameState.isSolved && !isReplay) {
      GameState.userGrid = {};
      GameState.timerSeconds = 0;
      GameState.hintsUsed = 0;
      GameState.errorsCount = 0;
      GameState.revealedCells = new Set();
    } else {
      GameState.userGrid = {};
      GameState.timerSeconds = 0;
      GameState.hintsUsed = 0;
      GameState.errorsCount = 0;
      GameState.revealedCells = new Set();
      delete GameState.savedGrids[puzzle.id];
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
      // If already solved and not explicitly replaying, fill whole grid for review
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
            words: [word]
          };
        } else {
          if (i === 0 && !this.boardMap[key].num) {
            this.boardMap[key].num = word.num;
          }
          if (!this.boardMap[key].words.includes(word)) {
            this.boardMap[key].words.push(word);
          }
        }
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
    const availWidth = Math.max(180, stage.clientWidth - 8);
    const availHeight = Math.max(160, stage.clientHeight - 8);

    const gap = 2;
    const cellByW = Math.floor((availWidth - (cols - 1) * gap) / cols);
    const cellByH = Math.floor((availHeight - (rows - 1) * gap) / rows);
    const cellSize = Math.max(24, Math.min(cellByW, cellByH, 54));

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
    if (GameState.isPaused) return;
    const key = `${r},${c}`;
    const cellData = this.boardMap[key];
    if (!cellData || !cellData.words || cellData.words.length === 0) return;

    SoundEngine.playClick();

    if (GameState.activeCell.r === r && GameState.activeCell.c === c) {
      // Cycle through words passing through this cell
      const currentIdx = cellData.words.findIndex(w => w.id === GameState.activeWord?.id);
      const nextIdx = (currentIdx + 1) % cellData.words.length;
      GameState.activeWord = cellData.words[nextIdx];
      GameState.activeDirection = GameState.activeWord.dir;
    } else {
      GameState.activeCell = { r, c };
      // Prefer word in current active direction, otherwise take first word of cell
      const matchingWord = cellData.words.find(w => w.dir === GameState.activeDirection) || cellData.words[0];
      GameState.activeWord = matchingWord;
      GameState.activeDirection = matchingWord.dir;
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

    // Intersecting cross words
    const crossWords = currentData ? currentData.words.filter(w => w.id !== activeWord?.id) : [];

    cells.forEach(cell => {
      const r = parseInt(cell.dataset.row, 10);
      const c = parseInt(cell.dataset.col, 10);
      const isCurrentActive = r === active.r && c === active.c;

      cell.classList.remove("active-cell", "word-highlight", "cross-highlight");

      if (isCurrentActive) {
        cell.classList.add("active-cell");
      } else if (activeWord && this.isCellInWord(r, c, activeWord)) {
        cell.classList.add("word-highlight");
      } else if (crossWords.some(cw => this.isCellInWord(r, c, cw))) {
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
    const { r, c } = GameState.activeCell;
    const cellData = this.boardMap[`${r},${c}`];
    if (!cellData || cellData.words.length <= 1) {
      this.navigateClue(1);
      return;
    }
    SoundEngine.playClick();
    const currentIdx = cellData.words.findIndex(w => w.id === GameState.activeWord?.id);
    const nextIdx = (currentIdx + 1) % cellData.words.length;
    GameState.activeWord = cellData.words[nextIdx];
    GameState.activeDirection = GameState.activeWord.dir;
    this.updateClueBar();
    this.highlightActiveCells();
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
    if (GameState.unlockedCodex.size >= 12) GameState.unlockedBadges.add("scholar");
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
    if (codexProg) codexProg.textContent = `${GameState.unlockedCodex.size}/34 Specs Unlocked`;

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
          CrosswordEngine.loadPuzzle(GameState.currentPuzzle.id, true);
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
        const currId = GameState.currentPuzzle?.id;
        const currIdx = CONTENT_DATA.puzzles.findIndex(p => p.id === currId);
        const nextIdx = (currIdx + 1) % CONTENT_DATA.puzzles.length;
        CrosswordEngine.loadPuzzle(CONTENT_DATA.puzzles[nextIdx].id);
        this.switchTab("play");
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
          <button class="btn btn-primary vault-play-btn" data-id="${p.id}" data-replay="${isSolved ? 'true' : 'false'}" type="button">${isSolved ? 'Replay' : 'Solve Service'}</button>
          <span class="daily-reward-text">${p.gridSize.rows}×${p.gridSize.cols} GRID</span>
        </div>
      `;
      list.appendChild(article);
    });

    document.querySelectorAll(".vault-play-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        SoundEngine.playClick();
        const id = e.target.dataset.id;
        const isReplay = e.target.dataset.replay === "true";
        CrosswordEngine.loadPuzzle(id, isReplay);
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
