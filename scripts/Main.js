import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Content } from './Content';
import { Game } from './Game';

ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Game />, document.getElementById('game'));
