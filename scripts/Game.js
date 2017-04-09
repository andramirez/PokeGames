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
            'inventory': []
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
    }
    
    render() {
        let team = this.state.team.map((n, index) => 
            <li key={index}>{n}</li>
        );
        let inventory = this.state.inventory.map((n, index) => 
            <li key={index}>{n}</li>
        );
        let session = this.state.session;
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
             <SubButton/>
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
