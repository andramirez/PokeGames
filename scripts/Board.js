import * as React from 'react';
import { Socket } from './Socket';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            pos: '99,99',
            choice: '',
            terrain: '',
            coords: '99,99',
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
    }
    handleChange(event) {
        this.setState({choice: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        Socket.emit('make choice', {
            'choice': this.state.choice,
            'terrain': this.state.terrain,
            'coords': this.state.coords
        });
       
        document.getElementById('action').style.visibility = "hidden";
        document.getElementById('select').value = ""; //Reset Action to Null
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
                image: data['image']
            });
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
                            <option value=''>--</option>
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
                
                <div className="energyContainer">
                  <h2 className="stats title">Energy:</h2>
                  <div className="stats energy1">20%</div>
                  <div className="stats energy2">40%</div>
                  <div className="stats energy3">60%</div>
                  <div className="stats energy4">80%</div>
                  <div className="stats energy5">100%</div>
                </div>
            </div>
        );
    }
}