import pykemon
import random

#functions implementing pokeAPI to gather pokemon data
#718 pokemon in database

##returns pokemon name, hp, types, moves(3)
def getStatsByName(name):
    pokemon = pykemon.get(pokemon=name.lower())
    moveSet = []
    count = 0
    move=""
    while count < 3:
        if move not in moveSet and move != "":
            moveSet.append(move)
            count+=1
        else:
            key = random.randint(0,len(pokemon.moves.keys())-1) 
            move = pokemon.moves.keys()[key]
    
    return pokemon.name, pokemon.hp, pokemon.types.keys(), moveSet

#returns pokemon name by type
def getNameByType(types):
    pid = random.randint(1, 718) #retrieves random pokemon id
    pokemon = pykemon.get(pokemon_id=pid)
    match = False
    name = "";
    while match == False:
        for key in pokemon.types.keys():
            if key == types:
                name = pokemon.name
                match = True
            else:
                pid = random.randint(1, 718) #retrieves random pokemon id
                pokemon = pykemon.get(pokemon_id=pid)
                
    return pokemon.name

#returns random pokemon name
def getRandomPokemon():
    pid = random.randint(1, 718) #retrieves random pokemon id
    pokemon = pykemon.get(pokemon_id=pid)
    
    return pokemon.name

