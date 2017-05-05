import * as React from 'react';
import { Socket } from './Socket';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            image: '',
            pos: '99,99',
            coords: '99,99',
            choice: '',
            terrain: '',
            board: [[]]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick(event) {
        event.preventDefault();
        this.setState({
            terrain: event.target.alt,
            coords: event.target.id
        });
        document.getElementById('action').style.visibility = "visible";
        document.getElementById('battle').style.visibility = "hidden";
        document.getElementById('vs').innerHTML = "Select a Pokemon from your team!";
        document.getElementById('win').innerHTML = "";
        Socket.emit('get id');
    }
    handleChange(event) {
        this.setState({choice: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        Socket.emit('make choice', {
            'choice': this.state.choice,
            'terrain': this.state.terrain,
            'coords': this.state.coords,
            'id' : this.state.id
        });
        document.getElementById('action').style.visibility = "hidden";
        document.getElementById('select').value = ""; //Reset Action to Null - form
        this.state.choice = ""; //Reset Action to Null - var
    }
    componentDidMount() {
        Socket.on('game start', (data) => {
            this.setState({
                board: data['board']
            });
        });
        Socket.on('draw pos', (data) => {
            if (data['image']== '/static/image/swords.png'){
                document.getElementById('battle').style.visibility = "visible";
                Socket.emit('battle start', {
                    'id' : this.state.id
                });
            }
            this.setState({
                pos: data['pos'],
                image: data['image']
            });
        });
        Socket.on('update id', (data) => {
            this.setState({
                id: data['id']
            });
        });
        Socket.on('battle end', (data) => {
            document.getElementById('vs').innerHTML = data['vs'];
            document.getElementById('win').innerHTML = data['win'];
            Socket.emit('deselect','');
        });
    }
    
    render() {
        let pos = this.state.pos;
        let img = this.state.image;
        let board = this.state.board.map((n,i) => 
            <tr>{n.map((m, j) => <td>{i+','+j == pos ? <img src={img}></img> : <img src={'/static/image/'+m+'.jpg'} alt={m} id={i+','+j} onClick={this.handleClick}></img>}</td>)}</tr>
        );
            
        return (
            <div>
                <div id='action'>
                    <form onSubmit={this.handleSubmit}>
                        <select id='select' onChange={this.handleChange}>
                            <option value=''>No Action</option>
                            <option value='poke'>Search for Pokemon</option>
                            <option value='item'>Look for Supplies</option>
                            <option value='rest'>Rest to Recover</option>
                        </select>
                        <button>Choose an Action</button>
                    </form>
                </div>
                <div id='battle'>
                    <div id='vs'>Select a Pokemon from your team!</div>
                    <div id='win'></div>
                </div>
                <table>
                    <tbody>
                        {board}
                    </tbody>
                </table>
                
            </div>
        );
    }
}