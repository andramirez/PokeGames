import * as React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import { GoogleLogin } from 'react-google-login-component';
import cookie from 'react-cookie';
import { Content } from './Content';
import { Socket } from './Socket';


export class Login extends React.Component{
    constructor(props, context){
        super(props, context);
    }
    
 
    
    componentDidMount(){
        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 20,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.responseGoogle
        }); 
    }
    
    responseFacebook(response){
        console.log(response);
        if(response.accessToken.length > 0){
           document.getElementById('login').style.display = 'none';
           document.getElementById('content').style.display = 'block';
           var fb_username = response.name;
           var fb_email = response.email;
           var fb_pic_url = response.picture.data.url;
           var fb_user_id = response.id;
           console.log('info I want:', fb_username, fb_email, fb_pic_url, fb_user_id);
           Socket.emit('fb_user_details', {
               'user': fb_username,
               'pic' : fb_pic_url,
               'email': fb_email,
               'source': 'facebook',
               'fb_id': fb_user_id
           });
        }
        else{
            console.log(response);
        }
    }
    
    
    onSignIn(googleUser){
        console.log('In Google Sign in');
    }
    
    responseGoogle(googleUser){
         document.getElementById('login').style.display = 'none';
           document.getElementById('content').style.display = 'block';
        let auth = gapi.auth2.getAuthInstance();
        let google_user = auth.currentUser.get();
        let g_profile = googleUser.getBasicProfile();
        console.log('Auth instance:',google_user);
        console.log('GoogleUser:', googleUser);
        console.log('GoogleProfile:', g_profile);
        var id_token = googleUser.getAuthResponse().id_token;
        console.log('auth_response', googleUser.getAuthResponse());
        console.log("id_token:", id_token);
        var google_user_info_url = `https://www.googleapis.com/plus/v1/people/me?access_token=${googleUser.getAuthResponse().access_token}`;
        var g_user_name = googleUser.w3['ig'];
        var g_user_email = googleUser.w3['U3'];
        var g_user_pic = googleUser.w3['Paa'];
        console.log('googleName:', g_user_name, 'googleEmail:', g_user_email, 'gPic:', g_user_pic);
        console.log('google_user_info_url:', google_user_info_url);
    if(id_token.length > 0){
            Socket.emit('g_user_details', {
                'user': g_user_name,
                'pic': g_user_pic,
                'email': g_user_email,
                'source': 'Google',
                'g_identifier': id_token
            });
    }
     else{
            console.log(googleUser);
        }
    }

    
    render(){
        return (
            <div>
            
                <div id="login_buttons" >
                <div className = "loginBtn loginBtn--facebook">
                    <FacebookLogin socialId="1566496380057860"
                    language="en_US"
                    scope="public_profile, email"
                    fields="name,email,picture"
                    responseHandler={this.responseFacebook}
                    xfbml={true}
                    version="v2.8"
                    class="facebook-login"
                    buttonText="Login With Facebook"/>
                    </div>
                    <div id="g-signin2" data-onSuccess={this.responseGoogle} data-theme="dark"/>
                </div>
            </div>
        );
        
    }
}
