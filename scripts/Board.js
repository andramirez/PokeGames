import * as React from 'react';
import { Socket } from './Socket';

export class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [[]]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        alert("CLICK");
        Socket.emit('get pokemon', {
            'terrain': event.target.alt
        });
    }
    componentDidMount() {
        Socket.on('game start', (data) => {
            this.setState({
                board: data['board']
            });
        });
    }
    
    render() {
        let board = this.state.board.map((n,i) => 
            <tr>{n.map((m, j) => <td><img src={'/static/image/'+m+'.jpg'} alt={m} id={i+','+j} onClick={this.handleSubmit}></img></td>)}</tr>
        );
            
        return (
            <div>
                <table>
                    <tbody>
                        {board}
                    </tbody>
                </table>
            </div>
        );
    }
}