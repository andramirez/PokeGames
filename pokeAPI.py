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
    gen = {
        1: {
            'min':1,
            'max':151
        },
        2: {
            'min':152,
            'max':251
        },
        3: {
            'min':252,
            'max':386
        },
        4: {
            'min':387,
            'max':493
        },
        5: {
            'min':494,
            'max':649
        },
        6: {
            'min':650,
            'max':718
        },
    }
    drawing = random.randint(1,6)
    pid = random.randint(gen[drawing]['min'],gen[drawing]['min']) #retrieves random pokemon id
    pokemon = pykemon.get(pokemon_id=pid)
    match = False
    while match == False:
        for key in pokemon.types.keys():
            if key == pType:
                return pokemon.name
            else:
                pid = random.randint(1, 718) #retrieves random pokemon id
                pokemon = pykemon.get(pokemon_id=pid)
    

#returns random pokemon name
def getRandomPokemon():
    pid = random.randint(gen[drawing]['min'],gen[drawing]['min']) #retrieves random pokemon id
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
