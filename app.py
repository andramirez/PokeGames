import os, random
import flask 
import flask_socketio, requests
import pokeAPI

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

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

def get_pokemon(data):
    if len(team) > 6:
        pokemon = pokeAPI.terrainToType(data['terrain']) #get a pokemon's name based on terrain
        team.append(pokemon)
    socketio.emit('new poke', {'team': team})
    
def get_item(data):
    item = 'Potion' #change later
    inventory.append(item)
    socketio.emit('new item', {'inventory': inventory})

def get_rest(data):
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
	url = "https://api.spotify.com/v1/tracks/1zHlj4dQ8ZAtrayhuDDmkY"
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

