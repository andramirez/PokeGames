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
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Create Game</legend>
                    <input type="text" name="key" onChange={this.handleChange}></input>
                    <button>Play</button>
                </fieldset>
            </form>
        );
    }
}
