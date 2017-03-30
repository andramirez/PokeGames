import * as React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';

export class Login extends React.Component{
    constructor(props, context){
        super(props, context);
    }
    responseFacebook(response){
        console.log(response);
        //Code implementation here
        //window.location.href = "https://www.facebook.com"; checking response
        if(response.accessToken.length > 0){
            //window.location.href = "https://www.facebook.com";
            console.log(response.accessToken);
        }
        else{
            window.location.reload();
        }
    }
    
    render(){
        return (
            <div id="fbl" className="fbl">
                <FacebookLogin socialId="1566496380057860"
                language="en_US"
                scope="public_profile, email"
                responseHandler={this.responseFacebook}
                xfbml={true}
                version="v2.8"
                class="facebook-login"
                buttonText="Login With Facebook"/>
            </div>
        );
    }
}
