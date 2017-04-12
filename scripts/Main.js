import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Content } from './Content';
import { Game } from './Game';
import { Login } from './Login';

ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Game />, document.getElementById('game'));
ReactDOM.render(<Login />, document.getElementById('login'));