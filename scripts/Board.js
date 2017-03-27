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
        alert("Get Pokemon");
        // Socket.emit('get pokemon', {
            
        // });
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
            <tr> {n.map((m, j) => <td ><a href='' onClick={this.handleSubmit}><img src={'/static/image/'+m+'.jpg'}></img></a></td>)} </tr>
        );
            
        return (
            <div>
                <table>
                    {board}
                </table>
            </div>
        );
    }
}