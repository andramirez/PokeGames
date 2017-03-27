import * as React from 'react';
import { Grid } from './Grid';
import { Form } from './Form';
import { Sound } from './Sound';
import { Socket } from './Socket';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'session': ''
        };
    }

    componentDidMount() {
        Socket.on('game start', (data) => { 
            this.setState({
                'session': data['session']
            });
            Socket.emit('draw board', {'board': data['board']});
        });
    }
    
    render() {
        let session = this.state.session;
        return (
            <div>
            Game ID: {session}
            <Form/>
            <Grid/>
            <div className = "spotifyContainer">
                  <Sound/> 
            </div>
        </div>
    )}
}

