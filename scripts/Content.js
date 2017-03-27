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
    //this is what handles our spotify search button queries. Once the user hits submit that data is sent through a socket to the server and processed server side. 
     handleSubmitMusic(event) {
         event.preventDefault();
         var searchType = document.getElementById('SearchFor').value;
         var searchQuery = document.getElementById('searchQuery').value;
        Socket.emit('Spotify' , {
            'searchType' : searchType, 
            'searchQuery' : searchQuery,
        });
     }
     //here is where we piece everything together and render the spotify button on the screen, search box and button. 
      render() {
        return (
        <div>    
        <div>
        <br />
        <br />
         <iframe id ="Spotifyframe" src={this.state.track}  frameborder="0" allowtransparency="true"></iframe>
         </div>
         <div className = "spotifyinput">
            <form onSubmit={this.handleSubmitMusic}>
                <select id = "SearchFor">
                <option value="Track" >Track</option>
                </select>
                <input type = "text" id = "searchQuery" name="searchQuery"/>
                <input type="submit" id = "submit" value = "search song!" />
            </form>
            </div>
            <div>
            </div>
            </div>
        );
    }
}
