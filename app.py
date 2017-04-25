import os, random
import flask 
import requests
import smtplib
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


##setting up default user - pokegames (for chat)
usersList.append({
        'name': "PokeGames Alert",
        'picture': "https://pro-rankedboost.netdna-ssl.com/wp-content/uploads/2016/07/PokeBall.png",
        'email' : "Pokegames438@gmail.com",
        'identifier' : "BOT",
        'source': '"BOT',
        'socket' : "0000"
    })

messageList = []

#game vars
maps = {}
userPositions = {}

#player vars
playerData = {}

@app.route('/')
def index():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    playerID = request.sid
    location = str(randint(0,5))+','+str(randint(0,5))
    playerData[playerID] = {'team':[],'inventory':[],'image':'/static/image/placeholder.jpg','name':'Placeholder Name','health':100,'location':location,'currentSession':'','battleID':playerID+'battle' }
    on_join({'username':playerData[playerID]['name'],'room':playerID})
    on_join({'username':playerData[playerID]['name'],'room':playerData[playerID]['battleID']}) #room for battle notifs
    print playerID+' connected!'

@socketio.on('disconnect')
def on_disconnect():
    on_leave(request.sid)
    print playerData[request.sid]['name'] + ' disconnected!'

@socketio.on('play')
def play(data):
    key = data['key']
    if key in maps: #if grid for login already exists, load     
        grid = maps[key]
    else: #else create and save
        key = generateKey()
        grid = createGrid('medium') 
        maps[key] = grid
    playerData[request.sid]['currentSession'] = key
    on_join({'username':playerData[request.sid]['name'],'room':playerData[request.sid]['currentSession']})
    userPositions[request.sid] = playerData[request.sid]['location']
    socketio.emit('draw pos', {'image': playerData[request.sid]['image'], 'pos': playerData[request.sid]['location']}, room=request.sid) #draw at starting location
    socketio.emit('game start', {'session': key, 'board': grid}, room=playerData[request.sid]['currentSession'])

@socketio.on('make choice')
def make_choice(data):
    if (data['id'] == request.sid):
        print playerData[request.sid]['name'] + ' clicked something.'
        image = playerData[request.sid]['image']
        room = request.sid
        battle_init = True 
        #calculate distance between data['coords'] and location
        pre = data['coords'].split(',')
        post = playerData[request.sid]['location'].split(',')
        distance = abs(int(pre[0]) - int(post[0])) + abs(int(pre[1]) - int(post[1]))
        playerData[request.sid]['location'] = data['coords']
        socketio.emit('draw pos', {'image': playerData[request.sid]['image'], 'pos': playerData[request.sid]['location']}, room=request.sid)
        playerData[request.sid]['health'] -= distance*5
        if (playerData[request.sid]['health'] < 0):
            playerData[request.sid]['health'] = 0
        socketio.emit('update health', {'health': playerData[request.sid]['health']}, room=request.sid)
        userPositions[request.sid] = playerData[request.sid]['location'] = data['coords']
        for key, value in userPositions.items():
            if (value == playerData[request.sid]['location'] and playerData[request.sid]['currentSession'] == playerData[key]['currentSession'] and key != request.sid): #if same location, same game, different players
                if (playerData[key]['battleID'] != key+'battle' or playerData[request.sid]['battleID'] != request.sid+'battle'): #if either player is already in battle
                    battle_init = False #cant battle here
        for key, value in userPositions.items():
            if (value == playerData[request.sid]['location'] and playerData[request.sid]['currentSession'] == playerData[key]['currentSession'] and key != request.sid): #if same location, same game, different players
                if battle_init: #if no existing battles on this square      
                    image = '/static/image/swords.png'
                    playerData[request.sid]['battleID'] = room = key+'battle'
                    #join other player's pvp room
                    on_join({'username':playerData[request.sid]['name'],'room':room})
        socketio.emit('draw pos', {'image': image, 'pos': playerData[request.sid]['location']}, room=room)
        if data['choice'] == 'poke':
            get_pokemon(data['terrain'])
        elif data['choice'] == 'item':
            get_item(data['terrain'])
        elif data['choice'] == 'rest':
            get_rest()
            
@socketio.on('battle start')
def battle(data):
    if (data['id'] == request.sid):
        print playerData[request.sid]['name'] + ' entered a battle.'
        if (data['battle_action'] == 'fight' and len(playerData[request.sid]['team'])>0): #if you want to fight and HAVE pokemon
            print playerData[request.sid]['name'] + ' is ready to fight!'
            # socketio.emit('choose fighter', {'id':request.sid,'team':playerData[request.sid]['team']}, room=playerData[request.sid]['battleID'])
        on_leave(playerData[request.sid]['battleID'])
        
@socketio.on('get id')
def send_id():
    print request.sid
    socketio.emit('update id', {'id': request.sid}, room=request.sid)

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
    playerData[request.sid]['image']=json['pic']
    playerData[request.sid]['name']=json['user']
    
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    if (username == 'Placeholder Name'):
        socketio.emit('join', {'message': ''}, room=room)
        socketio.emit('sessionForEmail',room , room=room)
    else:
        socketio.emit('join', {'message': username + ' has entered the room: ' + room}, room=room)
    
def on_leave(room):
    if ('battle' in room):
        if (room[0:-6] != request.sid): #if leaving someone else's battle room
            playerData[request.sid]['battleID'] = request.sid+'battle' #reset battleID
            leave_room(room)
    else:
        leave_room(room)

def get_pokemon(terrain):
    pokemon = pokeAPI.terrainToType(terrain) #get a pokemon's name based on terrain
    if len(playerData[request.sid]['team']) < 6:
        playerData[request.sid]['team'].append(pokemon)
    # else:
        #ask player to select a team member to replace or select no
    socketio.emit('new poke', {'team': playerData[request.sid]['team']}, room=request.sid)
    
def get_item(terrain):
    item = 'static/image/potion.png' #change later
    if len(playerData[request.sid]['inventory']) < 3:
        playerData[request.sid]['inventory'].append(item)
    socketio.emit('new item', {'inventory': playerData[request.sid]['inventory']}, room=request.sid)

def get_rest():
    if playerData[request.sid]['health'] < 100:
        playerData[request.sid]['health'] += 20
        if (playerData[request.sid]['health'] > 100):
            playerData[request.sid]['health'] = 100
    socketio.emit('update health', {'health': playerData[request.sid]['health']}, room=request.sid)

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
                socketio.emit('passedMessageList', messageList, room=playerData[request.sid]['currentSession'])
                print messageList
                return
            messageList.append({
            'message' : passedContents,
            'socket'  : request.sid,
            'user'   : getUsernameFromID(request.sid),
            'picture' : getUserPhotoFromID(request.sid),
            })
            socketio.emit('passedMessageList', messageList, room=playerData[request.sid]['currentSession'])
            return
@socketio.on("Alert")
def handle_game_alert(data): 
    rec_data = data
    messageList.append({
            'message' : data,
            'socket'  : "0000",
            'user'   : getUsernameFromID("0000"),
            'picture' : getUserPhotoFromID("0000"),
            })
    socketio.emit('passedMessageList', messageList, room=request.sid)
    print "hi" + rec_data
    
    
    
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
            
            
@socketio.on('sendEmail')
def sendMail(data):
    recep_email = data['email']
    print recep_email
    session = data['session']
    subject = "You've been invited to play PokeGames! "
    message = "Come join me at pokegames! https://still-beyond-48460.herokuapp.com my Game ID is " + session
    recp_message  = 'Subject: {}\n\n{}'.format(subject, message)
    email_address = "pokegames438@gmail.com"
    email_pass = "PokeGames438!!"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_address, email_pass)
    server.sendmail(email_address, recep_email, recp_message)
    server.quit()
    
            
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

