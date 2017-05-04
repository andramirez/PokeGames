import * as React from 'react';
import { Board } from './Board';
import { Sound } from './Sound';
import { Socket } from './Socket';
import { Logout } from './Logout';
import { Chatroom } from './Chat';
import {SendEmail} from './SendEmail';
import SkyLight from 'react-skylight';
export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'id':'',
            'session': '',
            'team': [],
            'inventory': [],
            'messageHolder' : [],
            'isGameLaunched': false,
            'health': 100,
            'select':0
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.useItem = this.useItem.bind(this);
    }
    handleSelect(event) {
        event.preventDefault();
        Socket.emit('attack', {'id':this.state.id, 'fighter':event.target.id});
    }
    componentDidMount() {
        Socket.on('join', (data) => { 
            if (data['message']!=''){
                Socket.emit("Alert", data['message']);
            }
        });
        Socket.on('game start', (data) => { 
            this.setState({
                'session': data['session'],
                'isGameLaunched': true,
            });
              document.getElementById("session").value = data['session'];
        });
        Socket.on('sessionForEmail', (data) => {
            
          document.getElementById("session").value = (data); 
        });
        Socket.on('update health', (data) => { 
            this.setState({
                'health': data['health']
            });
        });
        Socket.on('new item', (data) => { 
            if (Math.floor(Math.random() * 10) > 7){ //percent chance of finding an item
                this.setState({
                    'inventory': data['inventory']
                });
                Socket.emit("AlertSelf", "New Item!! " + data['inventory'].slice(-1)[0]);
            }
            else 
                Socket.emit("AlertSelf", "no items found... :(");
        });
        Socket.on('remove item', (data) =>{
            this.setState({
                'inventory': data['inventory']
            });
            Socket.emit("AlertSelf", "removed Item from inventory");
        });
        Socket.on('new poke', (data) => { 
            this.setState({
                'team': data['team']
            });
           /* Socket.emit("AlertSelf", "New Pokemon!! " + data['team'].slice(-1)[0]);*/
        });
        Socket.on('passedMessageList', (data) => {
            this.setState({
                'messageHolder' : data,
            });
        });
        Socket.on('choose fighter', (data) => { 
            this.setState({
                'id': data['id'],
                'team': data['team'],
                'select': 1
            });
        });
        Socket.on('deselect',(data) => { 
            this.setState({
                'select': 0
            });
        });
        Socket.on('game over', (data) =>{
            alert("Game Over!");
        });
    }

handleSubmit(event) {
event.preventDefault();
var message = document.getElementById("sendMessageBox").value;
Socket.emit('newMessage', message);
document.getElementById("sendMessageBox").value = " ";
}

useItem(){
    window.console.log("Item has been clicked");
    Socket.emit('use_item',{
          'id': this.state.id
    });
}
    render() {
        let select = this.state.select;
        let team = this.state.team.map((n, index) => 
            <li key={index}>{select ? <a href='' id={index} onClick={this.handleSelect}>{n}</a> : n}</li>
        );
        let inventory = this.state.inventory.map((n, index) => 
            <li><img src={n} onClick={this.useItem}/></li>
        );
        let health = this.state.health;
        let session = this.state.session;
    
        let energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div className="stats energy8"> </div>
              <div className="stats energy9"> </div>
              <div className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        if(this.state.health < 90)
        {
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div className="stats energy8"> </div>
              <div className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 80)
        {
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 70){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 60){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 50){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 40){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 30){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 20){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div className="stats energy2"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health < 10){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div className="stats energy1"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy2"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "grey"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        if(this.state.health == 0){
            energy = 
            <div className="energyContainer">
            <h2 className="stats title">Energy:</h2>
              <div style={{backgroundColor: "black"}} className="stats energy1"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy2"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy3"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy4"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy5"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy6"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy7"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy8"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy9"> </div>
              <div style={{backgroundColor: "black"}} className="stats energy10"> </div>
              <h2>{health}</h2>
             </div>;
        }
        let messageData = this.state.messageHolder.map(
            (n, index) => 
                <p id="msgtext" key={index}><img id="photo" style={{width : 50, height: 50}} src={n.picture}/><b><font size="2">{n.user}</font><br /></b>{n.message}</p>
            );
            
        var myBigGreenDialog = {
          backgroundColor: 'rgba(190, 190, 190, .85)',
          color: 'black',
          width: '70%',
          height: '600px',
          marginTop: '-300px',
          marginLeft: '-35%',
        };
        return (
            <div>
                <div className = "buttons">
                    <div className = "tutorial">
                        <section>
                          <button className="greenButton" onClick={() => this.refs.customDialog.show()}>Tutorial</button>
                        </section>
                        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref="customDialog" title="PokeGames Tutorial">
                          <div className="tutorial text"><h1>Game Objective:</h1><br/>
                          Battle other players using Pokemon until one player remains<br/>
                          <h1>Walkthrough:</h1><br/>
                          Click squares to move. <br/><br/>
                          <img src="/static/image/user.png"/> => <img src="static/image/desert.jpg"/> <br/>
                          <img src="/static/image/plains.jpg"/> => <img src="/static/image/user.png"/> <br/><br/>
                          With each move, energy is lost depending on how far the player moves. <br/><br/>
                          <img className ="bar"src="/static/image/bar1.PNG"/> => <img className="bar" src="/static/image/bar2.PNG"/><br/><br/>
                          Once the Square is clicked, the player gets one of three choices: Find Pokemon, Search for Supplies, or to Rest. <br/><br/>
                          <img className ="drop"src="/static/image/drop.png"/><br/><br/>
                            <h1>Find Pokemon:</h1><br/>
                            When the user selects the Find Pokemon Option, they are given a Pokemon based on the terrain they are currently in. <br/>
                            The type breakdown is as follows:<br/>
                            <table>
                            <tr>
                            <td className="data">
                            <div><img src="/static/image/lake.jpg"/></div>
                            <div>Lake</div>
                            <div>Water and Flying Types</div>
                            </td>
                            <td className="data">
                            <div><img src="static/image/desert.jpg"/></div>
                            <div>Desert</div>
                            <div>Ground and Fire Types</div>
                            </td>
                            <td className="data">
                            <div><img src="/static/image/plains.jpg"/></div>
                            <div>Plains</div>
                            <div>Grass and Normal Types</div>
                            </td>
                            </tr>
                            <tr>
                            <td className="data">
                            <div><img src="static/image/forest.jpg"/></div>
                            <div>Desert</div>
                            <div>Bug and Fairy Types</div>
                            </td>
                            <td className="data">
                            <div><img src="/static/image/mountain.jpg"/></div>
                            <div>Mountain</div>
                            <div>Rock and Fighting Types</div>
                            </td>
                            <td className="data">
                            <div><img src="static/image/mountain-peak.jpg"/></div>
                            <div>Mountain Peak</div>
                            <div>Ice and Dragon Types</div>
                            </td>
                            </tr>
                            <tr>
                            <td className="data">
                            <div><img src="/static/image/factory.jpg"/></div>
                            <div>Factory</div>
                            <div>Steel and Electric Types</div>
                            </td>
                            <td className="data">
                            <div><img src="static/image/swamp.jpg"/></div>
                            <div>Swamp</div>
                            <div>Poison and Dark Types</div>
                            </td>
                            <td className="data">
                            <div><img src="static/image/unknown.jpg"/></div>
                            <div>Unknown</div>
                            <div>Ghost and Psychic Types</div>
                            </td>
                            </tr>
                            </table>
                            <h1>Search for Supplies</h1><br/>
                            Gathering items is rare.<br/> Items found are potions that raise the players' Energy by 10 Points.<br/>
                            <img src="/static/image/potion.png"/><br/>Often, it can be easier to choose the Rest Option if low on Energy.<br/>
                            <h1>Rest</h1><br/>
                            Resting allows the player to restore 20 Points to their energy.<br/>
                            <h1>Battle</h1><br/>
                            When a player lands on the same square as another player, a battle is initiated. <br/>
                            <img src="/static/image/swords.png"/><br/>
                            During the battle, the players choose which pokemon they want to battle with and attack their opponent
                            until one player loses all energy. <br/>
                            If one player does not have any pokemon, the battle is cancelled. 
                        </div>
                        </SkyLight>
                    </div>
                    <div className = "logoutContainer">
                        <Logout/>
                    </div>
                    <div className = "email">
                        <SendEmail/>
                    </div>
                </div>
                <Board/>
                <div className="statBar">
                    {energy}
                </div>
                <div className="statInfo">
                    Game ID: {session}
                    <br />
                    Pokemon: <ul>{team}</ul>
                    <br />
                    Inventory: <ul>{inventory}</ul>
                </div>
                <div className = "spotifyContainer">
                      <Sound/> 
                </div>
            <form onSubmit={this.handleSubmit}>
            <div className="chatHeading">
            <h3> Poke Chat </h3>
            </div>
            <div className="scroll">
                {messageData}
                </div>
                <div className="scrollInput">
                <input name="text" size="40" id="sendMessageBox" placeholder="enter message here"/>
                         <SubButton /> <br />
                         </div>
                         </form>
            </div>
    )}
}
    
export class SubButton extends React.Component {
    render() {
        return (
            <button className="greenButton">Send it!</button>
        );
    }
}
