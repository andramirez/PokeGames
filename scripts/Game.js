import * as React from 'react';
import { Board } from './Board';
import { Sound } from './Sound';
import { Socket } from './Socket';
import { Logout } from './Logout';
import { Chatroom } from './Chat';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'session': '',
            'team': [],
            'inventory': [],
            'messageHolder' : [],
            'isGameLaunched': false,
            'health': 100
        };
    }

    componentDidMount() {
        Socket.on('join', (data) => { 
            alert(data['message']);
        });
        Socket.on('game start', (data) => { 
            this.setState({
                'session': data['session'],
                'isGameLaunched': true
            });
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
            }
            else 
                alert("Nothing found...");
        });
        Socket.on('new poke', (data) => { 
            this.setState({
                'team': data['team']
            });
        });
        Socket.on('passedMessageList', (data) => {
            this.setState({
            messageHolder : data,
            });
            console.log(data);
        });
    }

handleSubmit(event) {
event.preventDefault();
var message = document.getElementById("sendMessageBox").value;
console.log(message);
Socket.emit('newMessage', message);
document.getElementById("sendMessageBox").value = " ";
}
    render() {
        let team = this.state.team.map((n, index) => 
            <li key={index}>{n}</li>
        );
        let inventory = this.state.inventory.map((n, index) => 
            <li key={index}>{n}</li>
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
              <h2>{health}</h2>
             </div>;
        if(this.state.health < 80)
        {
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 60){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 40){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 20){
            energy = 
            <div className="energyContainer">
              <div className="stats energy1"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy2"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
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
                         </div></form>
                <div className = "logoutContainer">
                    <Logout/>
                </div>
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
