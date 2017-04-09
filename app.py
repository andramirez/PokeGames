import os, random
import flask 
import flask_socketio, requests
import pokeAPI
import flask_sqlalchemy
import random, os, flask, flask_socketio, flask_sqlalchemy,requests, time
from random import randint, choice
from flask_socketio import send

import botcommands
import urlparse
import json


app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = flask_sqlalchemy.SQLAlchemy(app)

class Message(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	text = db.Column(db.String(300))
	picture = db.Column(db.String(200))
	name = db.Column(db.String(100))
	apiLink = db.Column(db.String(500))

	def __init__(self, p,n,t,al=''):
		self.text = t
		self.picture = p
		self.name = n
		self.apiLink = al

	def __repr__(self):
		return '<%s %s: %s>' % (self.picture, self.name, self.text)






#user vars
user_list = []

#game vars
maps = {}

#player vars
team = []
inventory = []

@app.route('/')
def index():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print 'Someone connected!'

@socketio.on('disconnect')
def on_disconnect():
    print 'Someone disconnected!'

@socketio.on('play')
def play(data):
    key = data['key']
    if key in maps: #if grid for login already exists, load 
        grid = maps[key]
    else: #else create and save
        key = generateKey()
        grid = createGrid('medium') 
        maps[key] = grid
    socketio.emit('game start', {'session': key, 'board': grid})

@socketio.on('make choice')
def make_choice(data):
    if data['choice'] == 'poke':
        get_pokemon(data['terrain'])
    elif data['choice'] == 'item':
        get_item(data['terrain'])
    elif data['choice'] == 'rest':
        get_rest(data['terrain'])

@socketio.on('fb_user_details')
def fb_user_details(data):
    print data
    user_list.append({
        'name': data['user'],
        'picture': data['pic'],
        'email' : data['email'],
        'identifier' : data['fb_id'],
        'source': 'facebook'
    })
    print user_list

@socketio.on('g_user_details')
def g_user_details(data):
    print data
    user_list.append({
        'name': data['user'],
        'picture': data['pic'],
        'email': data['email'],
        'identifier': data['g_identifier'],
        'source': 'Google'
    })
    print user_list

def get_pokemon(terrain):
    pokemon = pokeAPI.terrainToType(terrain) #get a pokemon's name based on terrain
    team.append(pokemon)
    socketio.emit('new poke', {'team': team})
    
def get_item(terrain):
    item = 'Potion' #change later
    inventory.append(item)
    socketio.emit('new item', {'inventory': inventory})

def get_rest(terrain):
    socketio.emit('rest')

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
	
	
all_messages = []
all_connected_users = { };
all_numbers = []

# fetch all message from database and store them in dictionary 
# and append to a list
def fetchAllMessages():
	messages = Message.query.all()
	temp = []

	for message in messages:
		temp.append({
		'name': message.name,
		'picture': message.picture,
		'msg': message.text,
		'link' : message.apiLink
		})

	return temp

# broadcasst the messages
def fetchAndEmit():
	all_messages[:] = fetchAllMessages()

	socketio.emit('all messages', {
	'messages': all_messages
	})

# add message to our database
def addMessage(userPicture, name, msg):
	message = Message(userPicture,name, msg)
	db.session.add(message)
	db.session.commit()

# add message to our database
def addBotMessage(msg):
	BOT_PICTURE = '/static/bot.jpg'
	BOT_NAME = 'Bender_from_futurama'
	addMessage(BOT_PICTURE,BOT_NAME,msg)

# add message to our database
def addBotMessageAPI(link):
	BOT_PICTURE = '/static/bot.jpg'
	BOT_NAME = 'Bender_from_futurama'
	addPictureMessage(BOT_PICTURE,BOT_NAME,link)

# add message to our database
def addPictureMessage(userPicture, name, apiLink):
	message = Message(userPicture,name, '', apiLink)
	db.session.add(message)
	db.session.commit()
	
# When a new message is received this function
# stores it in the database, checks to see if it a bot command
# or a link. 
@socketio.on('new msg')
def on_new_msg(data):
	facebookAPI = 'https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token='
	googleAPI = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='

	msg = data['msg']
	USERNAME =  ''
	picture =  ''
	msg = msg.strip()
	if(data['google_user_token'] == '' and data['facebook_user_token'] == '' ):
		send('received message')

	else:
		if(data['google_user_token'] == ''):
			response = requests.get( facebookAPI + data['facebook_user_token'])
			json = response.json()
			USERNAME =  json['name']
			picture = json['picture']['data']['url']

		else:
			response = requests.get(googleAPI + data['google_user_token'])
			json = response.json()
			picture = json['picture']
			USERNAME = json['name']

	url = msg
	parts = urlparse.urlsplit(url)

	# it is not a url so add it and emit
	if not parts.scheme or not parts.netloc:

		if('!! say' in msg):
			x = 10
		else:
			addMessage(picture,USERNAME, msg)

	else:
		print "yes an url"
		addPictureMessage(picture,USERNAME,url)
	#fetchAndEmit()
	# handle bot command
	if(msg[:2] == '!!'):
		response = botcommands.processBotCommand(msg)
		if(len(response) > 4):
			if(response[:4] == 'http'):
				addBotMessageAPI( response )
			else:
				addBotMessage(response)
		else:
			addBotMessage(response)

	fetchAndEmit()

if __name__ == '__main__': # __name__!
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )

