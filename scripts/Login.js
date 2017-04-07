import * as React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';
import cookie from 'react-cookie';
import { Content } from './Content';

export class Login extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        this.state = {userID : cookie.load('userID')};
    }
    
    responseFacebook(response){
        console.log(response);
        if(response.accessToken.length > 0){
           document.getElementById('login').style.display = 'none';
           document.getElementById('content').style.display = 'block';
           cookie.save('userID', response.accessToken, { path: '/' });
        }
        else{
            console.log(response);
        }
    }
    
    responseGoogle(googleUser){
        var id_token = googleUser.getAuthResponse().id_token;
        if(id_token.length>0){
            document.getElementById('login').style.display='none';
            document.getElementById('content').style.display = 'block';
            cookie.save('userID', id_token, { path: '/' });
        }
        else{
            console.log(googleUser.getAuthResponse());
        }
    }
    
    render(){
        if(!this.state.userID){
        return (
            <div>
                <div id="fbl">
                    <FacebookLogin socialId="1566496380057860"
                    language="en_US"
                    scope="public_profile, email"
                    responseHandler={this.responseFacebook}
                    xfbml={true}
                    version="v2.8"
                    class="facebook-login"
                    buttonText="Login With Facebook"/>
                </div>
                <div id="gl">
                    <GoogleLogin socialId="689477792087-6lkj6410qknjtkdn7cg9o0jdinqavd3q.apps.googleusercontent.com"
                    class="google-login"
                    scope="profile"
                    responseHandler={this.responseGoogle}
                    buttonText="Login With Google"/>
                </div>
            </div>
        );
        }
        else if(this.state.userID){
            return <Content />;
        }
    }
}
