import * as React from 'react';
import { Board } from './Board';
import { Sound } from './Sound';
import { Socket } from './Socket';
import { Logout } from './Logout';
import { Chatroom } from './Chat';
import {SendEmail} from './SendEmail';
export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'id':'',
            'session': '',
            'team': [],
            'inventory': [],
            'messageHolder' : [],
            'isGameLaunched': false,
            'health': 100,
            'select':0
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(event) {
        event.preventDefault();
        Socket.emit('attack', {'id':this.state.id, 'fighter':event.target.id});
    }
    componentDidMount() {
        Socket.on('join', (data) => { 
            if (data['message']!=''){
                Socket.emit("Alert", data['message']);
            }
        });
        Socket.on('game start', (data) => { 
            this.setState({
                'session': data['session'],
                'isGameLaunched': true,
            });
              document.getElementById("session").value = data['session'];
        });
        Socket.on('sessionForEmail', (data) => {
            
          document.getElementById("session").value = (data); 
        });
        Socket.on('update health', (data) => { 
            this.setState({
                'health': data['health']
            });
        });
        Socket.on('new item', (data) => { 
            if (Math.floor(Math.random() * 10) > 7){ //percent chance of finding an item
                this.setState({
                    'inventory': data['inventory']
                });
                Socket.emit("AlertSelf", "New Item!! " + data['inventory']);
            }
            else 
                Socket.emit("AlertSelf", "no data found... :(");
        });
        Socket.on('new poke', (data) => { 
            this.setState({
                'team': data['team']
            });
            Socket.emit("AlertSelf", "New Pokemon!! " + data['team'].slice(-1)[0]);
        });
        Socket.on('passedMessageList', (data) => {
            this.setState({
                'messageHolder' : data,
            });
        });
        Socket.on('choose fighter', (data) => { 
            this.setState({
                'id': data['id'],
                'team': data['team'],
                'select': 1
            });
        });
    }

handleSubmit(event) {
event.preventDefault();
var message = document.getElementById("sendMessageBox").value;
Socket.emit('newMessage', message);
document.getElementById("sendMessageBox").value = " ";
}
    render() {
        let select = this.state.select;
        let team = this.state.team.map((n, index) => 
            <li key={index}>{select ? <a href='' id={index} onClick={this.handleSelect}>{n}</a> : n}</li>
        );
        let inventory = this.state.inventory.map((n, index) => 
            <li><img src={n}/></li>
        );
        let health = this.state.health;
        let session = this.state.session;
    
        let energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div className="stats energy8"> </div>
              <div className="stats energy9"> </div>
              <div className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        if(this.state.health < 90)
        {
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div className="stats energy8"> </div>
              <div className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 80)
        {
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 70){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 60){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 50){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 40){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 30){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 20){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 10){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy2"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health == 0){
            energy = 
            <div className="energyContainer">
              <div style={{backgroundColor: "black"}} className="stats energy1"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy2"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        let messageData = this.state.messageHolder.map(
            (n, index) => 
                <p id="msgtext" key={index}><img id="photo" style={{width : 50, height: 50}} src={n.picture}/><b><font size="2">{n.user}</font><br /></b>{n.message}</p>
            );
        return (
            <div>
                <Board/>
                <div className="statBar">
                <h2 className="stats title">Energy:</h2>
                {energy}
                </div>
                Game ID: {session}
                <br />
                Pokemon: <ul>{team}</ul>
                <br />
                Inventory: <ul>{inventory}</ul>
                <div className = "spotifyContainer">
                      <Sound/> 
                </div>
            <form onSubmit={this.handleSubmit}>
            <div className="chatHeading">
            <h3> Poke Chat </h3>
            </div>
            <div className="scroll">
                {messageData}
                </div>
                <div className="scrollInput">
                <input name="text" size="40" id="sendMessageBox" placeholder="enter message here"/>
                         <SubButton /> <br />
                         </div>
                         </form>
                <div className = "logoutContainer">
                    <Logout/>
                </div>
                <SendEmail/>
            </div>
    )}
}
    
export class SubButton extends React.Component {
    render() {
        return (
            <button>Send it!</button>
        );
    }
}
