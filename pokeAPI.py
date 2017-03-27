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
    pid = random.randint(1, 718) #retrieves random pokemon id
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
    pid = random.randint(1, 718) #retrieves random pokemon id
    pokemon = pykemon.get(pokemon_id=pid)
    return pokemon.name

#returns the type of pokemon will be found at given terrain
def terrainToType(terrain):
    terrain = terrain.lower()
    if terrain == "lake":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "water"
        else:
            pType = "flying"
    elif terrain == "desert":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "ground"
        else:
            pType = "fire"
    elif terrain == "plains":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "grass"
        else:
            pType = "normal"
    elif terrain == "forest":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "bug"
        else:
            pType = "fairy"
    elif terrain == "mountain":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "rock"
        else:
            pType = "fighting"
    elif terrain == "mountain-peak":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "ice"
        else:
            pType = "dragon"
    elif terrain == "city":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "electric"
        else:
            pType = "steel"
    elif terrain == "swamp":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "poison"
        else:
            pType = "dark"
    elif terrain == "unknown":
        drawing = random.randint(1,2);
        if drawing == 1:
            pType = "ghost"
        else:
            pType = "psychic"
            
    return getNameByType(pType)