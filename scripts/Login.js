import * as React from 'react';

export class Login extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));
        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 20,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn
        });
    }
    
    onSignIn(googleUser){
        console.log("User signed into Google");
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        document.getElementById('FBGlogin').style.display="none";
    }
    
    onStatusChange(response){
        console.log(response);
        if(response.status=='connected'){
            console.log('connected');
            document.getElementById('FBGlogin').style.display="none";
        }
        else{
            console.log('App is either not authorized or user isnt logged in');
        }
    }
    
    render(){
        return (
            <div>
                <div id="FBGlogin">
                    <div
                        className="fb-login-button"
                        data-max-rows="1"
                        data-size="medium"
                        data-show-faces="false"
                        data-auto-logout-link="true">
                    </div>
                    <div id="g-signin2"></div>
                </div>
            </div>
        );
    }
}