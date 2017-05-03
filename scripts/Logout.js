import * as React from 'react';
import cookie from 'react-cookie';

export class Logout extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        document.getElementById('content').style.display='none';
        document.getElementById('game').style.display='none';
        document.getElementById('login').style.display='block';
    }
    render(){
        return(
            <button className="greenButton" onClick={this.handleClick}>Logout of Game</button>     
        );
    }
}