import * as React from 'react';
import { Socket } from './Socket';

export class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: {}
        };
        Socket.on('set grid', (data) => {
            this.setState({
                grid: data['grid']
            });
        })
    }
    render() {
        let grid = this.state.grid;
        return (
            <div>
                Grid Placeholder
            </div>
        );
    }
}