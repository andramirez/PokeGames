import * as React from 'react';
import { Grid } from './Grid';
import { Form } from './Form';
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
export class Sound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track : " "
        };
    }
    //here were checking to see if someone sent spotify data and if so, let's capture that data
    componentDidMount() {
    Socket.on('fromSpotify' ,(data) =>{
        this.setState({
            'track' : data 
            });
            //let's make the spotify widget visible 
        document.getElementById("Spotifyframe").style.visibility ="visible";
    });
    }

     //here is where we piece everything together and render the spotify button on the screen, search box and button. 
      render() {
        return (
        <div>    
       <iframe src="https://embed.spotify.com/?uri=spotify%3Aalbum%3A3qW0KwoP8BdFzqZSDh1ScI" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
            </div>
        );
    }
}
