import React from 'react';
import { withRouter } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';

const Logout = (props) => {

  const isAuthenticated = localStorage.getItem('odsUserToken');
  if( !isAuthenticated )
    return null;

  const logout = () => {
     console.log('logout');
     localStorage.removeItem('odsUserToken');
     localStorage.removeItem('odsUserPicture');
     localStorage.removeItem('odsAuthProvider');

     props.history.push('/admin');
  }

  return (<div style={{
                margin: '10px'
              }}>
          <GoogleLogout
              clientId="1049230588636-gprtqumhag54a8g4nlpu7d8pje0vpmak.apps.googleusercontent.com"
              buttonText="Logout"
              theme='dark'
              icon={true}
              onLogoutSuccess={logout} />
        </div>)

}

export default withRouter(Logout);
