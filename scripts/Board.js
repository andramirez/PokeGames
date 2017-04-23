import * as React from 'react';
import { Socket } from './Socket';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            pos: '99,99',
            coords: '99,99',
            choice: '',
            ba: '',
            terrain: '',
            board: [[]]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeBattle = this.handleChangeBattle.bind(this);
        this.handleSubmitBattle = this.handleSubmitBattle.bind(this);
    }
    handleClick(event) {
        event.preventDefault();
        this.setState({
            terrain: event.target.alt,
            coords: event.target.id
        });
        document.getElementById('action').style.visibility = "visible";
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
        document.getElementById('select').value = ""; //Reset Action to Null
    }
    handleChangeBattle(event) {
        this.setState({ba: event.target.value});
    }
    handleSubmitBattle(event) {
        event.preventDefault();
        Socket.emit('battle start', {
            'battle_action': this.state.ba,
            'id' : this.state.id
        });
        document.getElementById('battle').style.visibility = "hidden";
        document.getElementById('b_select').value = ""; //Reset Action to Null
    }
    componentDidMount() {
        Socket.on('game start', (data) => {
            this.setState({
                board: data['board']
            });
        });
        Socket.on('draw pos', (data) => {
            this.setState({
                pos: data['pos'],
                image: data['image'],
                name: data['name']
            });
        });
        Socket.on('update id', (data) => {
            this.setState({
                id: data['id']
            });
        });
    }
    
    render() {
        let pos = this.state.pos;
        let img = this.state.image;
        let name = this.state.name;
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
                <table>
                    <tbody>
                        {board}
                    </tbody>
                </table>
                <div id='battle'>
                    <form onSubmit={this.handleSubmitBattle}>
                        <select id='b_select' onChange={this.handleChangeBattle}>
                            <option value='run'>Run Away</option>
                            <option value='fight'>Fight</option>
                        </select>
                        <button>Choose an Action</button>
                    </form>
                </div>
            </div>
        );
    }
}