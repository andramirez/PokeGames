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
                    Existing Game Key: <input type="text" name="key" onChange={this.handleChange}></input>
                    <br/>
                    <button>Play</button>
                </fieldset>
            </form>
        );
    }
}