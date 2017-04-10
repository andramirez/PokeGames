import * as React from 'react';
import { Board } from './Board';
import { Sound } from './Sound';
import { Socket } from './Socket';
import { Logout } from './Logout';
import {Chatroom} from './Chat';
export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'session': '',
            'team': [],
            'inventory': [],
            'messageHolder' : []
        };
    }

    componentDidMount() {
        Socket.on('game start', (data) => { 
            this.setState({
                'session': data['session']
            });
        });
        Socket.on('rest', (data) => { 
            alert("REST");
        });
        Socket.on('new item', (data) => { 
            if (Math.floor(Math.random() * 10) > 7){ //percent chance of finding an item
                alert("NEW ITEM");
                this.setState({
                    'inventory': data['inventory']
                });
            }
            else 
                alert("Nothing found...");
            
        });
        Socket.on('new poke', (data) => { 
            alert("NEW POKEMON");
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
        let session = this.state.session;
        
        
        
        
         let messageData = this.state.messageHolder.map(
            (n, index) => 
                <p id="msgtext" key={index}><img id="photo" style={{width : 50, height: 50}} src={n.picture}/><b><font size="2">{n.user}</font><br /></b>{n.message}</p>
            );
        return (
            <div>
                <Board/>
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
            <h3> In game Chat! </h3>
            </div>
            <div className="scroll">
            
                {messageData}
                </div>
                <div className="scrollInput">
                <input name="text" size="80" id="sendMessageBox" placeholder="enter message here"/>
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
