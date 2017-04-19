import os, random
import flask 
import requests
import pokeAPI
from flask import request
import flask_sqlalchemy
import random, os, flask, flask_socketio, flask_sqlalchemy,requests, time
from random import randint, choice
from flask_socketio import send, join_room, leave_room
import botcommands
import urlparse
import json


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

#user vars
usersList = []
messageList = []

#game vars
maps = {}

#player vars
playerID = 0
playerData = {}

@app.route('/')
def index():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    global playerID
    playerID = request.sid
    location = str(randint(0,5))+','+str(randint(0,5))
    playerData[playerID] = {'team':[],'inventory':[],'image':'/static/image/placeholder.jpg','name':'Placeholder Name','health':100,'location':location,'currentSession':''}
    on_join({'username':playerData[playerID]['name'],'room':playerID})
    print playerID+' connected!'
  

@socketio.on('disconnect')
def on_disconnect():
    print playerData[playerID]['name'] + ' disconnected!'

@socketio.on('play')
def play(data):
    global playerID
    global playerData
    key = data['key']
    if key in maps: #if grid for login already exists, load 
        grid = maps[key]
    else: #else create and save
        key = generateKey()
        grid = createGrid('medium') 
        maps[key] = grid
    playerData[playerID]['currentSession'] = key
    on_join({'username':playerData[playerID]['name'],'room':playerData[playerID]['currentSession']})
    socketio.emit('draw pos', {'image': playerData[playerID]['image'], 'pos': playerData[playerID]['location']}, room=playerID) #draw at starting location
    socketio.emit('game start', {'session': key, 'board': grid}, room=playerData[playerID]['currentSession'])
    

@socketio.on('make choice')
def make_choice(data):
    global playerID
    global playerData
    print playerData[playerID]['name'] + ' clicked something.'
    
    #calculate distance between data['coords'] and location
    pre = data['coords'].split(',')
    post = playerData[playerID]['location'].split(',')
    distance = abs(int(pre[0]) - int(post[0])) + abs(int(pre[1]) - int(post[1]))
    playerData[playerID]['health'] -= distance*5
    if (playerData[playerID]['health'] < 0):
        playerData[playerID]['health'] = 0
    socketio.emit('update health', {'health': playerData[playerID]['health']}, room=playerID)
    
    playerData[playerID]['location'] = data['coords']
<<<<<<< HEAD
    socketio.send('draw pos', {'image': playerData[playerID]['image'], 'pos': playerData[playerID]['location']})
=======
    socketio.emit('draw pos', {'image': playerData[playerID]['image'], 'pos': playerData[playerID]['location']}, room=playerID)
>>>>>>> 00648c3f5b928ea1791ea3daef4c9c92356654f7
    if data['choice'] == 'poke':
        get_pokemon(data['terrain'])
    elif data['choice'] == 'item':
        get_item(data['terrain'])
    elif data['choice'] == 'rest':
        get_rest()

@socketio.on('fb_user_details')
def fb_user_details(data):
    json = data
    usersList.append({
        'name': json['user'],
        'picture': json['pic'],
        'email' : json['email'],
        'identifier' : json['fb_id'],
        'source': 'facebook',
        'socket' : request.sid
    })

@socketio.on('g_user_details')
def g_user_details(data):
    json = data
    usersList.append({
        'name': json['user'],
        'picture': json['pic'],
        'email': json['email'],
        'identifier': json['g_identifier'],
        'source': 'Google',
        'socket' : request.sid
    })
    playerData[playerID]['image']=json['pic']
    playerData[playerID]['name']=json['user']
    
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    if (username == 'Placeholder Name'):
        socketio.emit('join', {'message': 'Welcome to PokeGames, your ID is ' + room}, room=room)
    else:
        socketio.emit('join', {'message': username + ' has entered the room: ' + room}, room=room)
    
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    socketio.emit('join', {'message': username + ' has left the room: ' + room}, room=room) #wont show to self, because you left room

def get_pokemon(terrain):
    pokemon = pokeAPI.terrainToType(terrain) #get a pokemon's name based on terrain
    if len(playerData[playerID]['team']) < 6:
        playerData[playerID]['team'].append(pokemon)
    # else:
        #ask player to select a team member to replace or select no
    socketio.emit('new poke', {'team': playerData[playerID]['team']}, room=playerID)
    
def get_item(terrain):
    item = 'potion' #change later
    if len(playerData[playerID]['inventory']) < 3:
        playerData[playerID]['inventory'].append(item)
    socketio.emit('new item', {'inventory': playerData[playerID]['inventory']}, room=playerID)

def get_rest():
    if playerData[playerID]['health'] < 100:
        playerData[playerID]['health'] += 20
        if (playerData[playerID]['health'] > 100):
            playerData[playerID]['health'] = 100
    socketio.emit('update health', {'health': playerData[playerID]['health']}, room=playerID)

def createGrid(size):
    
    # Define Lists
    units = {'small': 5, 'medium': 6, 'large': 7}
    terrain = ['lake','desert','plains','forest','mountain','mountain-peak','factory','swamp','unknown']
    grid = []
    
    for row in range(units[size]):
        # Create each row as list
        grid.append([])
        for column in range(units[size]):
            # Append a terrain to the current row as new item
            select = random.randrange(len(terrain))
            grid[row].append(terrain[select])
    return grid
def generateKey():
    key = os.urandom(24).encode('hex')
    return key
    
    
##Message Handlers

@socketio.on("newMessage")
def handle_message(messageData):
    passedContents = messageData
    if (getUsernameFromID(request.sid)):
            if ("https" or "http" or ".com" in passedContents):
                link = passedContents
                messageList.append({
                'message' : link,
                'socket'  : request.sid,
                'user'   : getUsernameFromID(request.sid),
                'picture' : getUserPhotoFromID(request.sid),
                })
                socketio.emit('passedMessageList', messageList, room=playerData[playerID]['currentSession'])
                print messageList
                return
            messageList.append({
            'message' : passedContents,
            'socket'  : request.sid,
            'user'   : getUsernameFromID(request.sid),
            'picture' : getUserPhotoFromID(request.sid),
            })
            socketio.emit('passedMessageList', messageList, room=playerData[playerID]['currentSession'])
            return
            
def getUsernameFromID(socket_id):
    passedID = socket_id
    if (socket_id != None):
        for connections in usersList:
            if (connections['socket'] == passedID):
                user = connections['name']
                return user
    else:
        return False
        
def getUserPhotoFromID(socket_id):
    if (socket_id == ""):
        return False
    passedID = socket_id
    for connections in usersList:
        if (connections['socket'] == passedID):
            photoLink = connections['picture']
            print photoLink
            return photoLink
            
# Function that Javar wrote. Fetches data from the Spotify API and display it
@socketio.on('Spotify')
def spotify(data):
	tracks =[]
	searchType = data['searchType']
	searchQuery =  data['searchQuery']
	searchQuery1 = searchQuery.replace("+", "%20")
	response = requests.get("https://api.spotify.com/v1/search?q="+searchQuery1+"&type="+searchType)
	json = response.json()
	if 'tracks' in json and 'items' in json['tracks']:
		for item in json['tracks']['items']:
			print item['uri']
    		tracks.append(item['uri'])
	my_headers = {"Accept" : "application/json", "Authorization" : "Bearer BQCm9bzjiDxNb9FurI8AWVgraOhvdZyzpBBNq753DwEXocrLa8kyPNOalfXuevtiZ10Kt8FIuvM1RMnv6mWiVsz9bXU8VQzEv3xdHAE5Qs4-eFI4dh3spBArHnzQLl6gGqvddte-H7JZQVzJEsxobx1TSStfVqonFzxWdH418b5RtzgZMHFgnKtV-6qW9g_axQ1bKwQ4Fm8e1NI"}
	url = "https://api.spotify.com/vwe/tracks/1zHlj4dQ8ZAtrayhuDDmkY"
	track_response = requests.get(url, headers= my_headers)
	spotify_links = track_response.json()
	random_track = random.choice(tracks)
	random_track_link = "https://embed.spotify.com/?uri="+random_track
	socketio.emit('fromSpotify', random_track_link)
	
	


if __name__ == '__main__': # __name__!
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )


from flask_socketio import Namespace, emit
class MyCustomNamespace(Namespace):
    def on_connect(self):
        print "Someone connected to the namespace!"
        pass

    def JoinedNameSpace(self, data):
        emit('Hello from the class', data)

socketio.on_namespace(MyCustomNamespace('/' + Namespace))