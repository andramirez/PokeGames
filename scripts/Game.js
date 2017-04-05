import * as React from 'react';
import { Board } from './Board';
import { Sound } from './Sound';
import { Socket } from './Socket';

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
            alert("NEW ITEM");
            this.setState({
                'inventory': data['inventory']
            });
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
                Game ID: {session}
                <br />
                Pokemon: <ul>{team}</ul>
                <br />
                Inventory: <ul>{inventory}</ul>
                <Board/>
                <div className = "spotifyContainer">
                      <Sound/> 
                </div>
            </div>
    )}
}

