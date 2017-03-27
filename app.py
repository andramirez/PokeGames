import os, random
import flask 
import flask_socketio

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

maps = {}

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route("/play")
def play():
    key = generateKey()
    grid = createGrid('medium') 
    maps[key] = grid
    return flask.render_template("game.html", grid = grid, key = key)

@app.route("/play/<string:key>")
def load(key):
    #if grid for login already exists, load, else create and save to db (index being a randomly generated key)
    if maps[key]:
        grid = maps[key]
    return flask.render_template("game.html", grid = grid, key = key)
    
@socketio.on('connect')
def on_connect():
    print 'Someone connected!'

@socketio.on('disconnect')
def on_disconnect():
    print 'Someone disconnected!'

def createGrid(size):
    # Define Lists
    units = {'small': 5, 'medium': 6, 'large': 7}
    terrain = ['water','sand','grass','trees','mountain','snow']
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

socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)

