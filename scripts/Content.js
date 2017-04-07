import * as React from 'react';
import { Form } from './Form';
import { Sound } from './Sound';
import { Logout } from './Logout';

export class Content extends React.Component {

    render() {
        return (
        <div>
            <Form/>
            <Logout/>
        </div>
    )}
}

