    import * as React from 'react';
    import { Socket } from './Socket';
export class SendEmail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
         Socket.emit('get id');
    }

handleSubmitEmail(event) {
    event.preventDefault();
    function validateEmail(email) {
    var re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
    }
    var email = document.getElementById("emailbox").value;
    console.log(validateEmail(email));
    if (validateEmail(email) === true){
    Socket.emit('sendEmail', {
            'email': email,
            'session': document.getElementById("session").value,
        });
    alert("Invite Sent to " + document.getElementById("emailbox").value  + "!");
    document.getElementById("emailbox").value = "";
    }
    else{
        alert("Invalid email, message not sent!");
    document.getElementById("emailbox").value = "";
    }
}
   render() {
        return (
            	<div className='emailForm' >
            	<form onSubmit={this.handleSubmitEmail}>
				<div id='emailFormInner' className='emailFormInner'>
				</div>
				<br />
				<b>Invite a friend! </b><input type = "text" placeholder = "Enter Friend's email!" id="emailbox"/>
				<input type = "text" id="session" hidden/>
			     <input type="submit" name='Send Email'/>
				</form>
			</div>
        );
    }
}
