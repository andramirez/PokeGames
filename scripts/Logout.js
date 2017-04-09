import * as React from 'react';
import cookie from 'react-cookie';

export class Logout extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        cookie.remove('userID', {path: '/'});
        document.getElementById('content').style.display='none';
        document.getElementById('game').style.display='none';
        document.getElementById('login').style.display='block';
    }l
    render(){
        return(
            <button onClick={this.handleClick}>Logout of Game</button>     
        );
    }
}