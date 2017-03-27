import * as React from 'react';
import { Socket } from './Socket';

export class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: [[]]
        };
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
            <tr> {n.map((m, j) => <td ><img src={'/static/image/'+m+'.jpg'}></img></td>)} </tr>
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