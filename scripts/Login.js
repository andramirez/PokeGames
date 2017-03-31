import * as React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';

export class Login extends React.Component{
    constructor(props, context){
        super(props, context);
    }
    
    responseFacebook(response){
        console.log(response);
        //Code implementation here
        console.log(response.accessToken);
        //window.location.href = "https://www.facebook.com"; checking response
        if(response.accessToken.length > 0){
           // window.location.href = "https://www.facebook.com";
           //console.log(response.accessToken);
           //return response.accessToken;
           document.getElementById('login').style.display = 'none';
        }
        else{
            window.location.reload();
        }
    }
    
    responseGoogle(googleUser){
        var id_token = googleUser.getAuthResponse().id_token;
        console.log({"accessToken": id_token});
        console.log(googleUser.getAuthResponse());
        if(googleUser.getAuthResponse().id_token.length>0){
            document.getElementById('login').style.display='none';
        }
    }
    
    handleSubmit(event){
        event.preventDefault();
    }
    render(){
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
}