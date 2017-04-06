import pykemon
import random

#functions implementing pokeAPI to gather pokemon data
#718 pokemon in database

##returns pokemon name, hp, types, moves(2)
def getStatsByName(name):
    pokemon = pykemon.get(pokemon=name.lower())
    moveSet = []
    count = 0
    move=""
    while count < 2:
        if move not in moveSet and move != "":
            moveSet.append(move)
            count+=1
        else:
            key = random.randint(0,(len(pokemon.moves.keys())-1)) 
            move = pokemon.moves.keys()[key]
    
    return pokemon.name, pokemon.hp, pokemon.types.keys(), moveSet

#returns pokemon name(1) by type
def getNameByType(pType):
    types = {
        'water' :["squirtle", "wartortle", "blastoise", "psyduck", "golduck", "poliwag", "poliwhirl", "poliwrath", "tentacool", 
            "tentacruel", "slowpoke", "slowbro", "seel", "dewgong", "shellder", "cloyster", "krabby", "kingler", "horsea", "seadra", 
            "goldeen", "seaking", "staryu", "starmie", "magikarp", "gyarados", "lapras", "vaporeon", "omanyte", "omastar", "kabuto", 
            "kabutops", "totodile", "croconaw", "feraligatr", "chinchou", "lanturn", "marill", "azumarill", "politoed", "wooper", 
            "quagsire", "slowking", "qwilfish", "corsola", "remoraid", "octillery", "mantine", "kingdra", "suicune", "mudkip", 
            "marshtomp", "swampert", "lotad", "lombre", "ludicolo", "wingull", "pelipper", "surskit", "carvanha", "sharpedo", 
            "wailmer", "wailord", "barboach", "whiscash", "corphish", "crawdaunt", "feebas", "milotic", "castform", "spheal", 
            "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "kyogre", "piplup", "prinplup", 
            "empoleon", "bibarel", "buizel", "floatzel", "shellos", "gastrodon", "finneon", "lumineon", "mantyke", "palkia", 
            "phione", "manaphy", "oshawott", "dewott", "samurott", "panpour", "simipour", "tympole", "palpitoad", "seismitoad", 
            "tirtouga", "carracosta", "ducklett", "swanna", "frillish", "jellicent", "alomomola"
        ],
        'fire' :["charmander", "charmeleon", "charizard", "vulpix", "ninetales", "growlithe", "arcanine", "ponyta", "rapidash", 
            "marowak", "magmar", "flareon", "moltres", "cyndaquil", "quilava", "typhlosion", "slugma", "magcargo", "houndour", 
            "houndoom", "magby", "entei", "ho-oh", "torchic", "combusken", "blaziken", "numel", "camerupt", "torkoal", "castform", 
            "chimchar", "monferno", "infernape", "magmortar", "rotom", "heatran", "victini", "tepig", "pignite", "emboar", "pansear", 
            "simisear", "darumaka", "litwick", "lampent", "chandelure", "heatmor", "larvesta", "volcarona", "reshiram"
        ],
        'fighting' :["mankey", "primeape", "poliwrath", "machop", "machoke", "machamp", "hitmonlee", "hitmonchan", "heracross", 
            "tyrogue", "hitmontop", "combusken", "blaziken", "breloom", "makuhita", "hariyama", "meditite", "medicham", "monferno", 
            "infernape", "riolu", "lucario", "croagunk", "toxicroak", "gallade", "pignite", "emboar", "timburr", "gurdurr", "conkeldurr", 
            "throh", "sawk", "scraggy", "mienfoo", "mienshao", "cobalion", "terrakion", "virizion"
        ],
        'grass' :["bulbasaur", "ivysaur", "venusaur", "oddish", "gloom", "vileplume", "paras", "parasect", "bellsprout", "weepinbell", 
            "victreebel", "exeggcute", "exeggutor", "tangela", "chikorita", "bayleef", "meganium", "bellossom", "hoppip", "skiploom", "jumpluff", 
            "sunkern", "sunflora", "celebi", "treecko", "grovyle", "sceptile", "lotad", "lombre", "ludicolo", "seedot", "shiftry", 
            "shroomish", "breloom", "roselia", "cacnea", "cacturne", "lileep", "cradily", "tropius", "turtwig", "grotle", "torterra", "budew", 
            "roserade", "cherubi", "cherrim", "carnivine", "snover", "abomasnow", "tangrowth", "leafeon", "rotom", "snivy", 
            "servine", "serperior", "pansage", "simisage", "sewaddle", "swadloon", "leavanny", "cottonee", "whimsicott", "petilil", "lilligant", 
            "maractus", "deerling", "sawsbuck", "foongus", "amoonguss", "ferroseed", "ferrothorn", "virizion"
        ],
        'poison' :["bulbasaur", "ivysaur", "venusaur", "weedle", "kakuna", "beedrill", "ekans", "arbok","nidorina", "nidoqueen", 
            "nidorino", "nidoking", "zubat", "golbat", "oddish", "gloom", "vileplume", "venonat", "venomoth", "bellsprout", "weepinbell", "victreebel", 
            "grimer", "muk", "gastly", "haunter", "gengar", "koffing", "weezing", "spinarak", "ariados", "crobat", "qwilfish", "dustox", "roselia", 
            "gulpin", "swalot", "seviper", "budew", "roserade", "stunky", "skuntank", "skorupi", "drapion", "croagunk", "toxicroak", "venipede", 
            "whirlipede", "scolipede", "trubbish", "garbodor", "foongus", "amoonguss"
        ],
        'flying' :["charizard", "butterfree", "pidgey", "pidgeotto", "pidgeot", "spearow", "fearow", "zubat", "golbat","farfetchd", "doduo", 
            "dodrio", "scyther", "gyarados", "aerodactyl", "articuno", "zapdos", "moltres", "dragonite", "hoothoot", "noctowl", "ledyba", "ledian", 
            "crobat", "togetic", "natu", "xatu", "hoppip", "skiploom", "jumpluff", "yanma", "murkrow", "gligar", "delibird", "mantine", "skarmory", 
            "lugia", "ho-oh", "beautifly", "taillow", "swellow", "wingull", "pelipper", "masquerain", "ninjask", "swablu", "altaria", "tropius", 
            "salamence", "rayquaza", "starly", "staravia", "staraptor", "mothim", "combee", "vespiquen", "drifloon", "drifblim", "honchkrow", 
            "chatot", "mantyke", "togekiss", "yanmega", "gliscor", "rotom", "pidove", "tranquill", "unfezant", "woobat", "swoobat", 
            "sigilyph", "archen", "archeops", "ducklett", "swanna", "emolga", "rufflet", "braviary", "vullaby", "mandibuzz"
        ],
        'normal' :["pidgey", "pidgeotto", "pidgeot", "spearow", "fearow", "rattata", "raticate", "jigglypuff", "wigglytuff", "meowth", "persian", 
            "farfetchd", "doduo", "dodrio", "lickitung", "chansey", "kangaskhan", "tauros", "eevee", "porygon", "snorlax", "sentret", 
            "furret", "hoothoot", "noctowl", "igglybuff", "aipom", "girafarig", "dunsparce", "ursaring", "miltank", "blissey", "zigzagoon", 
            "linoone", "taillow", "swellow", "slakoth", "vigoroth", "slaking", "whismur", "loudred", "exploud", "azurill", "skitty", "delcatty", "spinda", 
            "swablu", "zangoose", "castform", "kecleon", "starly", "staravia", "staraptor", "bidoof", "ambipom", "buneary", "lopunny", "glameow", 
            "purugly", "happiny", "chatot", "munchlax", "lickilicky", "porygon-z", "regigigas", "arceus", "patrat", "watchog", "lillipup", "herdier", 
            "stoutland", "pidove", "tranquill", "unfezant", "audino", "minccino", "cinccino", "deerling", "sawsbuck", "bouffalant", "rufflet", "braviary"
        ],
        'bug' :["caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "paras", "parasect", "venonat", "venomoth", "scyther", "pinsir", 
            "ledyba", "ledian", "spinarak", "ariados", "pineco", "forretress", "scizor", "shuckle", "heracross", "wurmple", "silcoon", "beautifly", 
            "cascoon", "dustox", "surskit", "masquerain", "nincada", "ninjask", "shedinja", "volbeat", "illumise", "anorith", "kricketot", 
            "kricketune", "burmy", "mothim", "combee", "vespiquen", "skorupi", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", 
            "scolipede", "dwebble", "crustle", "karrablast", "escavalier", "joltik", "galvantula", "shelmet", "accelgor", "durant", "larvesta", 
            "volcarona", "genesect"
        ],
        'ground' :["sandshrew", "sandslash", "nidoqueen", "nidoking", "diglett", "dugtrio", "geodude", "graveler", "golem", "onix", "cubone", 
            "marowak", "rhyhorn", "rhydon", "gligar", "steelix", "swinub", "piloswine", "phanpy", "donphan", "larvitar", "pupitar", "marshtomp", 
            "swampert", "nincada", "numel", "camerupt", "trapinch", "vibrava", "flygon", "barboach", "whiscash", "baltoy", "claydol", "groudon", 
            "torterra", "gastrodon", "gible", "gabite", "garchomp", "hippopotas", "hippowdon", "rhyperior", "gliscor", "mamoswine", "drilbur", 
            "excadrill", "palpitoad", "seismitoad", "sandile", "krokorok", "krookodile", "stunfisk", "golett", "golurk"
        ],
        'rock' :["geodude", "graveler", "golem", "onix", "rhyhorn", "rhydon","omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", 
            "shuckle", "magcargo", "corsola", "larvitar", "pupitar", "tyranitar", "nosepass", "aron", "lairon", "aggron", "lunatone", "solrock", 
            "lileep", "cradily", "anorith", "relicanth", "regirock", "cranidos", "rampardos", "shieldon", "bastiodon", "rhyperior", "probopass", 
            "boldore", "gigalith", "dwebble", "crustle", "tirtouga", "carracosta", "archen", "archeops", "terrakion"
        ],
        'dark' :["umbreon", "murkrow", "sneasel", "houndour", "houndoom", "tyranitar", "poochyena", "mightyena", "nuzleaf", "shiftry", 
            "carvanha", "sharpedo", "cacturne", "crawdaunt", "absol", "honchkrow", "stunky", "skuntank", "spiritomb", "drapion", "weavile", 
            "darkrai", "purrloin", "liepard", "sandile", "krokorok", "krookodile", "scraggy", "scrafty", "zorua", "zoroark", "pawniard", 
            "bisharp", "vullaby", "mandibuzz", "deino", "zweilous", "hydreigon", "sableye"
        ],
        'ice' :["dewgong", "cloyster", "jynx", "lapras", "articuno", "sneasel", "swinub", "piloswine", "delibird", "smoochum", "snorunt", 
            "glalie", "spheal", "sealeo", "walrein", "snover", "abomasnow", "weavile", "glaceon", "mamoswine", "froslass", "vanillite", 
            "vanillish", "vanilluxe"
        ],
        'dragon' :["dratini", "dragonair", "dragonite", "kingdra", "vibrava", "flygon", "altaria", "bagon", "shelgon", "salamence", "latias", 
            "latios", "rayquaza", "gible", "gabite", "garchomp", "dialga", "palkia", "axew", "fraxure", "haxorus"
        ],
        'ghost' :["gastly", "haunter", "gengar", "misdreavus", "shedinja", "sableye", "shuppet", "banette", "duskull", "dusclops", "drifloon", 
            "drifblim", "mismagius", "froslass", "dusknoir", "yamask", "cofagrigus", "frillish", "jellicent", "litwick", "lampent", 
            "chandelure"
        ],
        'psychic':["slowpoke", "slowbro", "drowzee", "hypno", "exeggcute", "exeggutor", "starmie", "jynx", "mewtwo", "mew", "natu", 
            "xatu", "espeon", "slowking", "wobbuffet", "girafarig", "smoochum", "lugia", "celebi", "ralts", "kirlia", "gardevoir", "meditite", 
            "medicham", "baltoy", "claydol", "chimecho", "wynaut", "beldum", "metang", "metagross", "latias", "latios", "jirachi", "chingling", 
            "bronzor", "bronzong", "gallade", "uxie", "mesprit", "azelf", "cresselia", "victini", "munna", "musharna", "woobat", "swoobat", 
            "sigilyph", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "elgyem", "beheeyem"
        ],
        'electric' :["magnemite", "magneton", "pikachu", "raichu", "voltorb", 'electrode', "electabuzz", "jolteon", "zapdos", "chinchou", "lanturn", 
            "pichu", "mareep", "flaaffy", "ampharos", "elekid", "raikou", "manectric", "plusle", "minun", "pachirisu", "magnezone", 
            "electivire", "rotom", "blitzle", "zebstrika", "emolga", "joltik", "galvantula", "tynamo", "eelektrik", "eelektross", "stunfisk", "zekrom"
        ],
        'steel' :["magnemite", "magneton", "forretress", "steelix", "scizor", 'skarmory', "mawile", "aron", "lairon", "aggron", "beldum", "metang", 
            "metagross", "registeel", "jirachi", "empoleon", "shieldon", "bastiodon", "lucario", "magnezone", "probopass", "dialga", "heatran", 
            "excadrill", "escavalier", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "pawniard", "bisharp", "durant", "cobalion", "genesect", 
            "bronzor", "bronzong"
        ],
        'fairy' :["clefairy", "clefable", "jigglypuff", "wigglytuff", "mr.mime", "cleffa", "igglybuff", "togepi", "togetic", "marill", "azumarill", 
            "snubbull", "granbull", "ralts", "kirlia", "gardevoir", "azurill", "mawile", "togekiss", "cottonee", "whimsicott"
        ]
    }
    
    return types[pType][random.randint(0, len(types[pType])-1)].title()
    

#returns random pokemon name
def getRandomPokemon():
    pid = random.randint(1, 718) #retrieves random pokemon id
    pokemon = pykemon.get(pokemon_id=pid)
    return pokemon.name

#returns the type of pokemon will be found at given terrain
def terrainToType(terrain):
    terrain = terrain.lower()
    terrains = {
        'lake': {
                    1:"water",
                    2:"flying"
                },
        'desert': {
                    1:"ground",
                    2:"fire"
                },
        'plains': {
                    1:"grass",
                    2:"normal"
                },
        'forest': {
                    1:"bug",
                    2:"fairy"
                },
        'mountain': {
                    1:"rock",
                    2:"fighting"
                    },
        'mountain-peak': {
                    1:"ice",
                    2:"dragon"
                },
        'city': {
                    1:"steel",
                    2:"electric"
                },
        'swamp': {
                    1:"poison",
                    2:"dark"
                },
        'unknown': {
                    1:"ghost",
                    2:"psychic"
                }
        }
    drawing = random.randint(1,2)
    pType = terrains[terrain][drawing]

            
    return getNameByType(pType)
