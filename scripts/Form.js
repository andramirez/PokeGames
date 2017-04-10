// handles rules of game creation
import * as React from 'react';

import { Socket } from './Socket';

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        event.preventDefault();
        this.setState({key: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        Socket.emit('play', {
            'key': this.state.key,
            'size': this.state.size
        });
        document.getElementById('content').style.display = "none";
        document.getElementById('game').style.display = "block";
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend><h1>PokeGames Set-Up</h1></legend>
                    <div class="settings-Container">
                        <div class="settings-GameName">
                            <legend>Game Name:</legend> 
                            <input type="textarea" name="name"/>
                        </div>
                        <div class="settings-Players">
                            <form>
                                Number of Players: 
                                <input type="number"  min="2" max="36" step="1" value="10"/>
                            </form>
                        </div>
                        <div class="settings-hp">
                            <form>
                                Start HP: 
                                <input type="number"  min="10" max="100" step="10" value="50"/>
                            </form>
                        </div>
                        <div class="settings-Song">
                            Starting Song: 
                            <input type="textarea" name="song"/>
                        </div>
                    </div>
                    
                    Existing Game Key: <input type="text" name="key" onChange={this.handleChange}></input>
                    <br/>
                    <button>Play</button>
                </fieldset>
            </form>
        );
    }
}
