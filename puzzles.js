/**
 * THE DAILY COCKTAIL CROSSWORD — CONTENT REPOSITORY
 * Master Cocktail Curriculum (Categories 1 - 32)
 *
 * Each Day delivers three grids:
 *   1. MINI (5x5): Rapid aperitif puzzle
 *   2. MIDI (7x7): Symmetrical cocktail modifier and spirit study
 *   3. MAIN (12x12): Complete symmetrical NYT-standard lounge crossword
 *
 * MAINTENANCE RULE: You can append new puzzle objects to COCKTAIL_CROSSWORD_PUZZLES
 * at any time without altering index.html, style.css, or script.js.
 */

window.COCKTAIL_CROSSWORD_PUZZLES = [
  // ==========================================
  // DAY 1: FOUNDATIONS & CITRUS ARCHITECTURE
  // ==========================================
  {
    id: "cocktail_day_1",
    dayIndex: 1,
    theme: "Foundations & Sours",
    curriculumTier: "Level 1 — Accessible Foundations",
    dateLabel: "Day 1 Dispatch",
    tiers: {
      // --- MINI 5x5 ---
      mini: {
        size: 5,
        curriculumCategory: "1. Cocktail Fundamentals",
        difficulty: "Beginner",
        solution: [
          ["S","O","U","R","S"],
          ["P","E","E","L","S"],
          ["A","G","A","V","E"],
          ["T","O","N","I","C"],
          ["S","T","I","R","S"]
        ],
        blocks: [], // Open 5x5 mini
        clues: {
          across: [
            { num: 1, clue: "Cocktail archetype composed of spirit, citrus, and sweet" },
            { num: 6, clue: "Citrus garnishes expressed over the glass" },
            { num: 7, clue: "Plant nectar sweetening a Tommy's Margarita" },
            { num: 8, clue: "Quinine-flavored partner to dry gin" },
            { num: 9, clue: "Prepares a Martini using a barspoon rather than a shaker" }
          ],
          down: [
            { num: 1, clue: "Protective bar splash guards or vintage gaiters" },
            { num: 2, clue: "Digestif or aperitif wine style modifier" },
            { num: 3, clue: "Glass container holding spirit batches (abbr.)" },
            { num: 4, clue: "Whiskey style celebrated in a classic Sazerac" },
            { num: 5, clue: "Fizzing cocktail additions like club soda" }
          ]
        }
      },

      // --- MIDI 7x7 (Rotational Symmetry) ---
      midi: {
        size: 7,
        curriculumCategory: "6. Citrus & Acid",
        difficulty: "Easy",
        solution: [
          ["S","A","Z","E","R","A","C"],
          ["A","G","A","V","E","S","O"],
          ["L","A","S","T","W","O","R"],
          ["T","V","E","#","A","P","E"],
          ["S","E","S","S","I","O","N"],
          ["P","A","T","R","O","N","S"],
          ["Y","R","E","S","T","E","D"]
        ],
        blocks: [
          [3, 3] // Center pivot 180° symmetrical block
        ],
        clues: {
          across: [
            { num: 1, clue: "New Orleans classic rinsed with herbsaint or absinthe" },
            { num: 6, clue: "Succulents harvested to bake into mezcal" },
            { num: 7, clue: "___ Word: equal parts gin, green Chartreuse, maraschino, lime" },
            { num: 8, clue: "Aperitivo Italian bitter wine style (var.)" },
            { num: 9, clue: "Low-ABV daytime cocktail category" },
            { num: 11, clue: "Bar patrons or celebrated luxury tequila brand" },
            { num: 12, clue: "Tequila aged at least two months in oak (Reposado meaning)" }
          ],
          down: [
            { num: 1, clue: "Margarita glass rim savory coating" },
            { num: 2, clue: "Bitters compound derived from Mexican gentian root" },
            { num: 3, clue: "Lemon or orange citrus outer peel" },
            { num: 4, clue: "Compound liqueurs extracted into fortified wines" },
            { num: 5, clue: "Sweet modifier brand distilled with bitter orange peels" },
            { num: 6, clue: "Bitters droplet measure dispensed from a dash bottle" },
            { num: 10, clue: "Bar counter measurement unit or draft tap handle" }
          ]
        }
      },

      // --- MAIN 12x12 (180° Rotational Symmetry) ---
      main: {
        size: 12,
        curriculumCategory: "4. Cocktail Families & Specs",
        difficulty: "Medium",
        solution: [
          ["M","A","N","H","A","T","T","A","N","#","G","T"],
          ["A","V","I","A","T","I","O","N","E","#","I","N"],
          ["R","U","M","#","E","L","I","X","I","R","N","E"],
          ["G","A","R","N","I","S","H","#","T","O","N","E"],
          ["A","N","G","O","S","T","U","R","A","#","A","R"],
          ["R","O","C","K","S","#","R","I","M","M","E","R"],
          ["I","N","F","U","S","E","S","#","S","O","U","R"],
          ["T","E","A","#","B","A","R","S","P","O","O","N"],
          ["A","S","S","A","I","#","S","H","A","K","E","R"],
          ["S","T","I","R","R","E","R","#","C","O","U","P"],
          ["H","I","G","H","B","A","L","L","#","R","Y","E"],
          ["S","R","#","S","A","Z","E","R","A","C","#","D"]
        ],
        blocks: [
          [0, 9], [1, 9], [2, 2],
          [3, 7], [4, 9], [5, 5],
          [6, 6], [7, 2], [8, 4],
          [9, 9], [10, 7], [11, 2], [11, 10]
        ],
        clues: {
          across: [
            { num: 1, clue: "Rye, sweet vermouth, and Angostura bitters stirred to perfection" },
            { num: 8, clue: "Gin classic tinged sky-blue with crème de violette" },
            { num: 10, clue: "Sugarcane spirit foundational to Daiquiris and Ti' Punches" },
            { num: 11, clue: "Aromatic herbal tincture crafted by historical apothecaries" },
            { num: 13, clue: "Citrus twist or brandied cherry finishing a serve" },
            { num: 14, clue: "Trinidad's world-renowned aromatic bitters dynasty" },
            { num: 16, clue: "Standard lowball serving glass format" },
            { num: 17, clue: "Bar tool used to coat glass edges with sea salt or Tajín" },
            { num: 18, clue: "Steeps botanicals or fruits into high-proof spirits" },
            { num: 20, clue: "Spirit, acid, sweet trio perfected in the Daiquiri" },
            { num: 21, clue: "Hot Toddy base or Earl Grey cocktail infusion" },
            { num: 22, clue: "Twisted spiral metal rod crafted for smooth stirring and layering" },
            { num: 24, clue: "Two-piece Boston or three-piece Cobbler essential" },
            { num: 26, clue: "Stemmed curved glass designed for drinks served 'up'" },
            { num: 27, clue: "Tall fizzy serve combining whiskey or gin with effervescence" },
            { num: 28, clue: "Spicy grain mashbill delivering pepper notes to cocktails" },
            { num: 29, clue: "Peychaud's and rye classic served in an absinthe-rinsed glass" }
          ],
          down: [
            { num: 1, clue: "Tequila, Cointreau, and fresh lime juice on the rocks with salt" },
            { num: 2, clue: "Modifier liqueur family including Curaçao, Triple Sec, and Maraschino" },
            { num: 3, clue: "Ice quality featuring crystal clarity and slow dilution" },
            { num: 4, clue: "Bar strainer fitted with a wire coil spring" },
            { num: 5, clue: "Herb smacked between palms to release oils for a Mint Julep" },
            { num: 6, clue: "Stiff, unaged corn distillate historically illicitly produced" },
            { num: 7, clue: "Fortified wine aromatized with botanicals, sweet or dry" },
            { num: 8, clue: "High-proof neutral grain spirit distilled to 95% ABV" },
            { num: 9, clue: "Bitters apothecary measure equivalent to roughly 1/32 oz" },
            { num: 12, clue: "Classic French aperitif wine enriched with quinine" },
            { num: 15, clue: "Double-strainer cone ensuring silky cocktail texture without ice shards" },
            { num: 19, clue: "Measurement jigger standard ratio on modern Japanese barware" },
            { num: 23, clue: "Italian bitter aperitivo giving the Spritz its bright sunset hue" },
            { num: 25, clue: "Aromatic juniper essence perfuming London Dry" }
          ]
        }
      }
    }
  },

  // ==========================================
  // DAY 2: AMARI, APERITIFS & BITTER TRADITIONS
  // ==========================================
  {
    id: "cocktail_day_2",
    dayIndex: 2,
    theme: "Bitters, Vermouth & Amari",
    curriculumTier: "Level 2 — Developing Knowledge",
    dateLabel: "Day 2 Dispatch",
    tiers: {
      mini: {
        size: 5,
        curriculumCategory: "11. Aperitifs & Amari",
        difficulty: "Easy",
        solution: [
          ["A","M","A","R","O"],
          ["C","A","M","P","I"],
          ["I","T","A","L","Y"],
          ["D","O","R","A","D"],
          ["S","P","O","O","N"]
        ],
        blocks: [],
        clues: {
          across: [
            { num: 1, clue: "Italian herbal bitter liqueur category sipped post-dinner" },
            { num: 6, clue: "Crimson bitter liqueur central to the Negroni (var.)" },
            { num: 7, clue: "Homeland of Vermouth di Torino and Aperitivo culture" },
            { num: 8, clue: "Golden rum classification or tequila designation" },
            { num: 9, clue: "Long spiral utensil used to crack ice and dilute gently" }
          ],
          down: [
            { num: 1, clue: "Citric or malic balancing agent in fresh citrus" },
            { num: 2, clue: "Fresh herb crushed in a Derby Mint Julep" },
            { num: 3, clue: "Aromatic red vermouth modifier in a Boulevardier" },
            { num: 4, clue: "Bourbon or rye grain recipe mash component" },
            { num: 5, clue: "Citrus garnish peel cut into a disk or twist" }
          ]
        }
      },

      midi: {
        size: 7,
        curriculumCategory: "10. Vermouth & Fortified Wine",
        difficulty: "Medium",
        solution: [
          ["N","E","G","R","O","N","I"],
          ["A","M","A","R","E","T","T"],
          ["P","U","N","C","H","E","S"],
          ["E","L","I","#","I","R","E"],
          ["R","S","T","I","R","R","S"],
          ["O","U","N","C","E","S","S"],
          ["L","P","E","E","L","E","D"]
        ],
        blocks: [
          [3, 3]
        ],
        clues: {
          across: [
            { num: 1, clue: "Equal parts gin, sweet vermouth, and Campari classic" },
            { num: 6, clue: "Almond-apricot liqueur featured in a classic Sour" },
            { num: 7, clue: "Communal historical bowls built from spirit, citrus, sugar, tea, and spice" },
            { num: 8, clue: "Botanical tincture extraction drop" },
            { num: 9, clue: "Prepares a delicate Manhattan in a Yarai mixing pitcher" },
            { num: 11, clue: "Liquid volume increments calibrated across jigger walls" },
            { num: 12, clue: "Stripped the zest from an orange for aromatic oil expression" }
          ],
          down: [
            { num: 1, clue: "Bright orange, gentian-kissed aperitivo created in Padua" },
            { num: 2, clue: "Emulsifier foam creating cloud tops on Gin Fizzes and Sours" },
            { num: 3, clue: "Botanical heart of London Dry gin distilled from cones" },
            { num: 4, clue: "Spirit, citrus, sweet trinity family" },
            { num: 5, clue: "Cognac region distilled French modifier liqueurs" },
            { num: 6, clue: "Classic coupe stemmed glassware designed for drinks served chilled without ice" },
            { num: 10, clue: "Fermented barley wort ready for whisky pot distillation" }
          ]
        }
      },

      main: {
        size: 12,
        curriculumCategory: "11. Aperitifs & Amari",
        difficulty: "Challenging",
        solution: [
          ["B","O","U","L","E","V","A","R","D","I","E","R"],
          ["A","M","A","R","O","#","V","E","R","M","O","U"],
          ["R","A","M","A","Z","Z","O","T","T","I","#","M"],
          ["M","N","#","C","A","M","P","A","R","I","#","S"],
          ["A","G","A","V","E","#","P","I","C","O","N","#"],
          ["N","E","G","R","O","N","I","#","E","G","G","S"],
          ["S","N","A","P","#","O","L","I","V","E","S","#"],
          ["#","T","V","E","R","M","O","U","T","H","#","T"],
          ["J","U","L","E","P","#","S","L","I","N","G","I"],
          ["U","R","A","#","F","E","R","N","E","T","#","K"],
          ["G","L","A","S","S","W","A","R","E","#","U","P"],
          ["S","P","R","I","T","Z","#","S","P","E","C","S"]
        ],
        blocks: [
          [1, 5], [2, 10], [3, 2], [3, 10],
          [4, 5], [4, 11], [5, 7], [6, 4], [6, 11],
          [7, 0], [7, 10], [8, 5], [9, 3], [9, 10],
          [10, 9], [11, 6]
        ],
        clues: {
          across: [
            { num: 1, clue: "Bourbon, Campari, and sweet vermouth stirred icon" },
            { num: 8, clue: "Bittersweet Italian digestive liqueur" },
            { num: 9, clue: "Historic Milanese amaro flavored with 33 roots and herbs" },
            { num: 12, clue: "Vibrant red aperitivo essential to an Americano" },
            { num: 13, clue: "Desert plant piñas roasted for artisanal mezcal" },
            { num: 14, clue: "Bitter orange French aperitif central to the Brooklyn cocktail" },
            { num: 15, clue: "Count Camillo's legendary 1919 gin-spiked Americano twist" },
            { num: 17, clue: "Shaken vigorously for rich albumin texture in Pisco Sours" },
            { num: 18, clue: "Saline savory garnish skewered for a classic Dirty Martini" },
            { num: 20, clue: "Fortified wine aromatized with wormwood and herbs" },
            { num: 22, clue: "Crushed-ice bourbon serve chilled in a pewter beaker" },
            { num: 24, clue: "Long fizzy classic including the historic Singapore serve" },
            { num: 26, clue: "Minty, intensely herbal amaro beloved by bartenders" },
            { num: 28, clue: "Coupes, Nick & Noras, and Collins vessels on backbars" },
            { num: 29, clue: "Served chilled after shaking or stirring with no ice in the glass" },
            { num: 30, clue: "Prosecco, aperitivo, and soda water effervescent aperitif" },
            { num: 31, clue: "Bartender's exact volume measurements and ratios for a drink" }
          ],
          down: [
            { num: 1, clue: "Bartender behind the wood orchestrating high-volume service" },
            { num: 2, clue: "Spanish fortified wine ranging from bone-dry Fino to Pedro Ximénez" },
            { num: 3, clue: "Cocktail family containing spirit, citrus, sugar, and fizzy soda" },
            { num: 4, clue: "Gentian-forward yellow French aperitif liqueur (var.)" },
            { num: 5, clue: "Citrus oil expulsion ritual over a drink's crown" },
            { num: 6, clue: "Italian digestive herbal category sipped neat" },
            { num: 7, clue: "Bitter wood root used as bittering agent in tonics and amari" },
            { num: 10, clue: "Historic cocktail style sweetened with ginger beer and lime in copper mugs" },
            { num: 11, clue: "Polynesian-themed escapist cocktail movement pioneered by Donn Beach" },
            { num: 16, clue: "Aperol, Prosecco, club soda ritual served in wine goblets" },
            { num: 19, clue: "Shaker style featuring an unweighted metal tin and cheater tin" },
            { num: 21, clue: "Botanical spirit category aromatized predominantly with juniper" },
            { num: 23, clue: "French aromatized wine brand, dry or sweet" },
            { num: 25, clue: "Bar measure standard equal to two standard shots (var.)" },
            { num: 27, clue: "Tiki syrup made from crushed almonds, sugar, and orange blossom water" }
          ]
        }
      }
    }
  },

  // ==========================================
  // DAY 3: TIKI, RUM & TROPICAL ARCHITECTURE
  // ==========================================
  {
    id: "cocktail_day_3",
    dayIndex: 3,
    theme: "Tiki, Tropical & Cane Spirits",
    curriculumTier: "Level 4 — History & Production",
    dateLabel: "Day 3 Dispatch",
    tiers: {
      mini: {
        size: 5,
        curriculumCategory: "27. Tiki & Tropical Cocktails",
        difficulty: "Medium",
        solution: [
          ["M","A","I","T","A"],
          ["A","G","A","V","E"],
          ["Z","O","M","B","I"],
          ["E","V","A","P","O"],
          ["R","U","M","S","#"]
        ],
        blocks: [[4, 4]],
        clues: {
          across: [
            { num: 1, clue: "Trader Vic's 1944 rum masterpiece with orgeat and Curaçao" },
            { num: 6, clue: "Base succulent for Tequila and Raicilla" },
            { num: 7, clue: "Donn Beach skull-busting punch packed with three rums" },
            { num: 8, clue: "Concentrates spirit vapors inside a copper pot still (abbr.)" },
            { num: 9, clue: "Sugarcane distillates blended across Caribbean islands" }
          ],
          down: [
            { num: 1, clue: "Spicy Caribbean falernum clove and ginger modifier" },
            { num: 2, clue: "Herb essential to Cuban Mojitos" },
            { num: 3, clue: "Crushed frozen water cooling tropical serves" },
            { num: 4, clue: "Bitters dash measure dispensed over swizzles" },
            { num: 5, clue: "Polynesian style wood carved drinking vessels" }
          ]
        }
      },

      midi: {
        size: 7,
        curriculumCategory: "27. Tiki & Tropical Cocktails",
        difficulty: "Medium",
        solution: [
          ["O","R","G","E","A","T","S"],
          ["R","H","U","M","A","G","R"],
          ["G","A","R","N","I","S","H"],
          ["S","W","I","Z","Z","L","E"],
          ["H","A","V","A","N","A","S"],
          ["A","K","E","N","U","I","S"],
          ["P","E","E","L","S","#","#"]
        ],
        blocks: [
          [6, 5], [6, 6]
        ],
        clues: {
          across: [
            { num: 1, clue: "Almond, rosewater, and sugar emulsions essential to Mai Tais" },
            { num: 6, clue: "Martinique spirit distilled directly from fresh sugarcane juice (var.)" },
            { num: 7, clue: "Elaborate tropical bouquet of mint sprigs, orchids, and fruit" },
            { num: 8, clue: "Bermudan tall serve churned with a multi-pronged wooden branch" },
            { num: 9, clue: "Historic Cuban capital renowned for the Floridita and Daiquiri" },
            { num: 10, clue: "Tahitian phrase for 'the absolute best' inspiring the Mai Tai" },
            { num: 11, clue: "Citrus outer layers expressing fragrant aromatic oils" }
          ],
          down: [
            { num: 1, clue: "Bitter orange liqueur distilled from dried Lahara peels" },
            { num: 2, clue: "Tiki cocktail style blending dark rums, lime, passionfruit, and fassionola" },
            { num: 3, clue: "Sweet pomegranate syrup crafting vibrant crimson cocktail hues" },
            { num: 4, clue: "Aged Cuban rum and cola highball with fresh lime juice" },
            { num: 5, clue: "Tiki father who founded Don the Beachcomber in Hollywood" }
          ]
        }
      },

      main: {
        size: 12,
        curriculumCategory: "27. Tiki & Tropical Cocktails",
        difficulty: "Challenging",
        solution: [
          ["T","I","K","I","#","P","A","I","N","K","I","L"],
          ["R","U","M","S","#","L","I","M","E","J","U","I"],
          ["A","G","R","I","C","O","L","E","#","U","L","E"],
          ["D","E","M","E","R","A","R","A","#","L","E","M"],
          ["E","R","G","#","O","R","G","E","A","E","P","O"],
          ["R","F","A","L","E","R","N","U","M","#","A","N"],
          ["V","I","C","#","S","W","I","Z","Z","L","E","S"],
          ["I","Z","O","M","B","I","E","#","P","O","R","T"],
          ["C","U","R","A","C","A","O","#","A","N","G","O"],
          ["#","L","A","S","T","W","O","R","D","#","S","U"],
          ["N","E","G","R","O","N","I","#","I","C","E","D"],
          ["C","O","U","P","E","#","B","A","R","S","P","O"]
        ],
        blocks: [
          [0, 4], [1, 4], [2, 8], [3, 8],
          [4, 3], [4, 9], [5, 9], [6, 3], [7, 7],
          [8, 7], [9, 0], [9, 9], [10, 7], [11, 5]
        ],
        clues: {
          across: [
            { num: 1, clue: "Polynesian-pop tropical bar culture born in 1930s California" },
            { num: 5, clue: "British Virgin Islands signature cocktail built with Pusser's rum, coconut, pineapple, OJ" },
            { num: 11, clue: "Sugarcane spirit distillates aged in charred American white oak" },
            { num: 12, clue: "Tart souring juice central to Ti' Punches and Daiquiris" },
            { num: 13, clue: "French AOC style of rum made from pure fresh cane juice rather than molasses" },
            { num: 14, clue: "Guyanese dark rum renowned for rich brown sugar and pot still ester depth" },
            { num: 15, clue: "Almond and orange-blossom syrup enriching tropical serves (var.)" },
            { num: 16, clue: "Barbadian spice syrup infused with cloves, almond, lime, and ginger" },
            { num: 18, clue: "Trader ___: legendary bar pioneer Victor Bergeron who named the Mai Tai" },
            { num: 19, clue: "Cocktails frosted by spinning a wooden bois lélé stick between palms" },
            { num: 21, clue: "Donn Beach's formidable 1934 cocktail limited to two per customer" },
            { num: 23, clue: "Portuguese fortified wine sometimes used in historic cobblers" },
            { num: 24, clue: "Liqueur made from bitter sun-dried Laraha orange peels" },
            { num: 26, clue: "Trinidad aromatic bitters brand dash for pink crowns" },
            { num: 27, clue: "Detroit Athletic Club equal-parts classic with gin, lime, Green Chartreuse, maraschino" },
            { num: 28, clue: "Count Camillo's equal parts aperitif" },
            { num: 29, clue: "Served over crushed or cubed frozen water" },
            { num: 30, clue: "Stemmed glass curved for drinks served 'up' without ice" }
          ],
          down: [
            { num: 1, clue: "Trader Vic Bergeron's nickname or his Oakland bar empire" },
            { num: 2, clue: "Sugar cane juice spirit distilled in Martinique" },
            { num: 3, clue: "Spiced ginger syrup or Mexican herbal bitter" },
            { num: 4, clue: "Crushed pebble ice packed into tiki mugs" },
            { num: 6, clue: "Fresh passionfruit and tropical red syrup popular in tiki drinks" },
            { num: 7, clue: "Brazilian national sugarcane spirit distilled in pot stills for Caipirinhas" },
            { num: 8, clue: "Dark navy rum proof standard once ignited with gunpowder" },
            { num: 9, clue: "High-ester Jamaican rum distillate notes reminiscent of ripe tropical fruit" },
            { num: 10, clue: "Carved wooden tiki drinking cup" },
            { num: 17, clue: "Swizzle stick cut from the native Caribbean plant Quararibea turbinata" },
            { num: 20, clue: "Pungent aromatic bark tincture bottle found in every cocktail lounge" },
            { num: 22, clue: "Mint sprig bouquet smacked to release vibrant aromatics" },
            { num: 25, clue: "Classic Mexican tequila, grapefruit soda, and lime highball" }
          ]
        }
      }
    }
  },

  // ==========================================
  // DAY 4: TECHNIQUE, AGING & DISTILLATION
  // ==========================================
  {
    id: "cocktail_day_4",
    dayIndex: 4,
    theme: "Distillation, Ice & Bar Technique",
    curriculumTier: "Level 3 — Technique & Service",
    dateLabel: "Day 4 Dispatch",
    tiers: {
      mini: {
        size: 5,
        curriculumCategory: "17. Shaking, Stirring & Building",
        difficulty: "Medium",
        solution: [
          ["S","T","I","R","S"],
          ["H","A","W","T","H"],
          ["A","G","A","V","E"],
          ["K","E","R","S","#"],
          ["E","S","T","E","R"]
        ],
        blocks: [[3, 4]],
        clues: {
          across: [
            { num: 1, clue: "Chills and dilutes spirit-forward cocktails without aeration" },
            { num: 6, clue: "Spring-loaded cocktail strainer fitted onto shaker tins (abbr.)" },
            { num: 7, clue: "Heart of mezcal roasted in underground earthen pits" },
            { num: 8, clue: "Boston or Cobbler drink mixing vessels" },
            { num: 9, clue: "Aromatic volatile chemical compound imparting fruity funk to rums" }
          ],
          down: [
            { num: 1, clue: "Violently aerates and chills citrus-based cocktails" },
            { num: 2, clue: "Distillation device separating ethanol vapors from fermented wash" },
            { num: 3, clue: "Frozen water blocks ensuring controlled thermal dilution" },
            { num: 4, clue: "Grain mash giving pepper and spice to rye whiskies" },
            { num: 5, clue: "Fine mesh tea strainer catching mint shards and citrus pulp" }
          ]
        }
      },

      midi: {
        size: 7,
        curriculumCategory: "19. Ice & Dilution",
        difficulty: "Medium",
        solution: [
          ["J","I","G","G","E","R","S"],
          ["U","L","E","P","S","#","T"],
          ["L","A","R","G","E","I","R"],
          ["E","S","T","E","R","N","A"],
          ["P","O","T","S","T","I","I"],
          ["S","P","I","R","I","T","N"],
          ["#","#","C","O","U","P","E"]
        ],
        blocks: [
          [1, 5], [6, 0], [6, 1]
        ],
        clues: {
          across: [
            { num: 1, clue: "Hourglass-shaped precision measurement bar tools" },
            { num: 6, clue: "Southern crushed-ice mint and bourbon classic vessels" },
            { num: 7, clue: "Format of crystal clear ice used for slow melting in Old Fashioneds" },
            { num: 8, clue: "Fruity aromatic flavor congeners born during long rum fermentation" },
            { num: 9, clue: "Batch distillation kettle made of copper, crafting rich spirits" },
            { num: 10, clue: "High-proof alcoholic liquid derived from fermented wash distillation" },
            { num: 11, clue: "Stemmed glass crafted for drinks served chilled without ice" }
          ],
          down: [
            { num: 1, clue: "Classic bourbon serve frosted with shaved ice in silver cups" },
            { num: 2, clue: "Clear ice cube carved with a Japanese hand saw" },
            { num: 3, clue: "Grain bill ingredient providing malted enzymes to distillers" },
            { num: 4, clue: "Green French herbal liqueur distilled by Carthusian monks from 130 plants" },
            { num: 5, clue: "Strainer fitted over a mixing glass with a tight stabilizing coil" }
          ]
        }
      },

      main: {
        size: 12,
        curriculumCategory: "28. Distilling",
        difficulty: "Expert",
        solution: [
          ["D","I","S","T","I","L","L","A","T","I","O","N"],
          ["E","T","H","A","N","O","L","#","E","S","T","E"],
          ["M","I","X","I","N","G","G","L","A","S","S","#"],
          ["E","R","A","#","U","N","A","G","E","D","#","C"],
          ["R","A","T","I","O","S","#","H","A","W","T","H"],
          ["A","R","E","C","O","N","D","E","N","S","E","R"],
          ["R","A","#","E","G","G","W","H","I","T","E","S"],
          ["A","N","G","O","S","T","U","R","A","#","T","T"],
          ["#","G","A","R","N","I","S","H","#","F","I","Z"],
          ["C","O","P","P","E","R","P","O","T","S","#","L"],
          ["O","L","D","F","A","S","H","I","O","N","E","D"],
          ["N","E","G","R","O","N","I","#","P","E","E","L"]
        ],
        blocks: [
          [1, 7], [2, 11], [3, 3], [3, 10],
          [4, 6], [5, 2], [6, 2], [7, 9],
          [8, 0], [8, 8], [9, 10], [10, 11], [11, 7]
        ],
        clues: {
          across: [
            { num: 1, clue: "Thermal process separating alcohol from water based on boiling points" },
            { num: 7, clue: "Potable chemical alcohol produced through yeast fermentation" },
            { num: 8, clue: "Aromatic congener creating tropical fruit character in rum" },
            { num: 9, clue: "Heavy crystal beaker used with a barspoon to prepare Martinis" },
            { num: 11, clue: "White dog or un-aged corn whiskey" },
            { num: 12, clue: "Precision measurements and proportions between sweet, sour, and spirit" },
            { num: 14, clue: "Coiled spring strainer resting on a shaker tin (abbr.)" },
            { num: 15, clue: "Still component cooling alcohol vapor back into liquid spirit" },
            { num: 18, clue: "Emulsifying foaming agent creating silky meringue crowns on Sours" },
            { num: 20, clue: "Trinidad's world-renowned aromatic bitters dynasty" },
            { num: 22, clue: "Expressed peel, brandied cherry, or fragrant herb branch" },
            { num: 24, clue: "Effervescent gin classic featuring citrus and soda water" },
            { num: 25, clue: "Traditional stills creating heavy, characterful single malts and rums" },
            { num: 27, clue: "Whiskey, sugar, bitters, and water: the original 1806 cocktail spec" },
            { num: 28, clue: "Equal-parts Italian aperitif icon" },
            { num: 29, clue: "Citrus ribbon cut to spray aromatics over a drink" }
          ],
          down: [
            { num: 1, clue: "Rich, unrefined cane sugar syrup hailing from Guyana" },
            { num: 2, clue: "Loss of spirit volume to barrel evaporation during maturation" },
            { num: 3, clue: "Boston or Cobbler ice-chilling tool" },
            { num: 4, clue: "Tequila cooked in traditional stone hornos or modern autoclaves" },
            { num: 5, clue: "Subtle addition of water to cocktails through proper stirring or shaking" },
            { num: 6, clue: "Fine-mesh conical strainer filtering citrus pulp" },
            { num: 10, clue: "High-proof spirit cut with pure water to reach bottle proof" },
            { num: 13, clue: "Spicy American whiskey grain mash style" },
            { num: 16, clue: "Initial toxic spirit vapor discarded during distillation run" },
            { num: 17, clue: "Final heavier distillation fraction containing harsh fusel oils" },
            { num: 19, clue: "Glassware category named for Nick & Nora Charles in The Thin Man" },
            { num: 21, clue: "Peychaud's and rye icon rinsed with absinthe" },
            { num: 23, clue: "Sweet almond and flower water syrup" },
            { num: 26, clue: "Tall fizzy highball vessel style" }
          ]
        }
      }
    }
  },

  // ==========================================
  // DAY 5: PROHIBITION, SPEAKEASIES & LORE
  // ==========================================
  {
    id: "cocktail_day_5",
    dayIndex: 5,
    theme: "Speakeasy Era & Forgotten Lore",
    curriculumTier: "Level 4 — History & Production",
    dateLabel: "Day 5 Dispatch",
    tiers: {
      mini: {
        size: 5,
        curriculumCategory: "26. Prohibition & Speakeasy Era",
        difficulty: "Easy",
        solution: [
          ["S","A","Z","E","R"],
          ["A","L","C","O","H"],
          ["G","I","N","G","E"],
          ["E","X","I","L","E"],
          ["S","P","E","A","K"]
        ],
        blocks: [],
        clues: {
          across: [
            { num: 1, clue: "New Orleans historic rye and Peychaud's serve (var.)" },
            { num: 6, clue: "Potable ethanol compound" },
            { num: 7, clue: "Pungent root brewed into sodas for Dark 'n Stormies and Mules" },
            { num: 8, clue: "Destination of American bartenders fleeing Prohibition to Paris and London" },
            { num: 9, clue: "Speakeasy prefix for illicit underground drinking dens" }
          ],
          down: [
            { num: 1, clue: "Aromatic savory herb occasionally infused in syrups" },
            { num: 2, clue: "Botanical spirit category produced in bathtubs during the Dry Law" },
            { num: 3, clue: "Citrus peel twists expressing fragrant oils" },
            { num: 4, clue: "Distiller's wooden maturation casks" },
            { num: 5, clue: "Spicy grain mash distillate beloved in Manhattans" }
          ]
        }
      },

      midi: {
        size: 7,
        curriculumCategory: "26. Prohibition & Speakeasy Era",
        difficulty: "Medium",
        solution: [
          ["B","E","E","S","K","N","E"],
          ["O","L","D","F","A","S","H"],
          ["O","L","I","V","E","S","#"],
          ["T","E","Q","U","I","L","A"],
          ["L","A","S","T","W","O","R"],
          ["E","P","E","E","L","E","D"],
          ["G","S","A","Z","E","R","A"]
        ],
        blocks: [
          [2, 6]
        ],
        clues: {
          across: [
            { num: 1, clue: "Prohibition gin classic sweetened with honey and brightened with lemon" },
            { num: 6, clue: "The primordial whiskey, sugar, and bitters serve (abbr.)" },
            { num: 7, clue: "Savory olive brine garnishes skewered for Dirty Martinis" },
            { num: 8, clue: "Jalisco blue agave spirit popular in Tommy's Margaritas" },
            { num: 9, clue: "Equal parts Green Chartreuse, maraschino, lime, and gin classic" },
            { num: 10, clue: "Zested lemon or orange twist over a cocktail" },
            { num: 11, clue: "New Orleans historic rye icon (abbr.)" }
          ],
          down: [
            { num: 1, clue: "Illicit smuggling of moonshine and rum during the 18th Amendment" },
            { num: 2, clue: "Egg white meringue foam toppings on Peruvian Sours" },
            { num: 3, clue: "Historic bitter wine aperitifs aromatized with botanicals" },
            { num: 4, clue: "Savory salted rim on a coupette" },
            { num: 5, clue: "Bartender's measure jigger" }
          ]
        }
      },

      main: {
        size: 12,
        curriculumCategory: "25. Cocktail History & Origins",
        difficulty: "Expert",
        solution: [
          ["B","E","E","S","K","N","E","E","S","#","G","I"],
          ["O","U","L","E","V","A","R","D","I","E","R","N"],
          ["O","R","I","G","I","N","A","L","#","G","A","R"],
          ["T","O","X","I","C","#","T","W","E","L","V","E"],
          ["L","U","I","G","I","#","S","A","Z","E","R","A"],
          ["E","C","O","R","P","S","E","R","E","V","I","V"],
          ["G","H","A","W","T","H","O","R","N","E","#","E"],
          ["G","A","B","S","I","N","T","H","E","#","U","P"],
          ["E","R","A","#","R","I","M","S","#","T","I","K"],
          ["R","A","M","O","S","G","I","N","F","I","Z","Z"],
          ["S","P","E","A","K","E","A","S","Y","#","E","S"],
          ["#","S","T","I","R","R","E","D","#","R","Y","E"]
        ],
        blocks: [
          [0, 9], [1, 11], [2, 8], [3, 5],
          [4, 5], [5, 11], [6, 10], [7, 9],
          [8, 3], [8, 8], [9, 11], [10, 9], [11, 0], [11, 8]
        ],
        clues: {
          across: [
            { num: 1, clue: "Prohibition cocktail whose sweet honey masked harsh bathtub gin" },
            { num: 6, clue: "Erskine Gwynne's 1927 Paris classic with bourbon, Campari, and sweet vermouth" },
            { num: 9, clue: "The primordial 1806 definition of a cocktail" },
            { num: 10, clue: "Prohibition toxic wood alcohol additives denatured by government order" },
            { num: 12, clue: "Historic highball glassware volume (12 ounces)" },
            { num: 13, clue: "New Orleans absinthe-rinsed rye cocktail (abbr.)" },
            { num: 14, clue: "No. 2 morning reviver shaken with gin, Lillet, Cointreau, lemon, and absinthe" },
            { num: 17, clue: "Spring-loaded strainer patented in 1892 for Boston shakers" },
            { num: 18, clue: "The Green Fairy: anise spirit banned in the US until 2007" },
            { num: 20, clue: "Chilled cocktail served without ice in a stemmed glass" },
            { num: 21, clue: "Coated edges of glassware with salt, sugar, or cocoa" },
            { num: 23, clue: "Henry C. Ramos's legendary 1888 12-minute shaken orange flower water fizz" },
            { num: 25, clue: "Secret underground saloon operating during the Volstead Act" },
            { num: 26, clue: "Preparation style for Manhattans and Martinis ensuring clarity without bubbles" },
            { num: 27, clue: "Peppery American whiskey grain central to historic pre-Prohibition cocktails" }
          ],
          down: [
            { num: 1, clue: "Smugglers running Caribbean rum and Canadian whisky into the dry US" },
            { num: 2, clue: "Savory celery and tomato highball born at Harry's New York Bar in Paris" },
            { num: 3, clue: "Almond and orange flower water syrup essential to tropical serves" },
            { num: 4, clue: "Spirit, citrus, sweet fundamental archetype" },
            { num: 5, clue: "Spiced and aromatic bitters droplets dispensed into cocktails" },
            { num: 7, clue: "Herb smacked between palms for Mint Juleps and Mojitos" },
            { num: 8, clue: "Fortified wine aromatized with wormwood and herbs" },
            { num: 11, clue: "London Dry botanical heart" },
            { num: 15, clue: "White dog distillate before aging in charred oak barrels" },
            { num: 16, clue: "Classic French anise aperitif created after absinthe's ban" },
            { num: 19, clue: "Bourbon and crushed-ice serve sipped through silver straws in the American South" },
            { num: 22, clue: "Bar measurement jigger calibrated with liquid drams and ounces" },
            { num: 24, clue: "Spicy Mexican spirit distilled from artisanal earthen-pit roasted agave" }
          ]
        }
      }
    }
  }
];