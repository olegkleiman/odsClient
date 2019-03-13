/**
 * @flow
 */
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

const Admin = (props) => {

  const facebookResponse = (response) => {
    console.log(response);
    if( response.id ) {
      localStorage.setItem('odsAuthProvider', 'facebook');
      localStorage.setItem('odsUserToken', response.accessToken);
      localStorage.setItem('odsUserPicture', response.picture.data.url);
      props.history.push('/dashboard');
    }
  }

  const googleResponse = (response) => {
    console.log(response);
    if( response.googleId ) {
      localStorage.setItem('odsAuthProvider', 'google');
      localStorage.setItem('odsUserToken', response.tokenId);
      localStorage.setItem('odsUserPicture', response.profileObj.imageUrl);
      props.history.push('/dashboard');
    }
  }

  return (<>
        <FacebookLogin
            appId="2148500592147265"
            autoLoad={false}
            fields="name,email,picture"
            callback={facebookResponse} />
          <GoogleLogin
              clientId="1049230588636-gprtqumhag54a8g4nlpu7d8pje0vpmak.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={googleResponse}
              onFailure={googleResponse} />
          </>)
};

export default Admin;
