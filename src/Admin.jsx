/**
 * @flow
 */
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const Admin = (props) => {
  const responseFacebook = (response) => {
    console.log(response);
    localStorage.setItem('user', response.userID);
    if( response.userID ) {
      props.history.push('/dashboard');
    }
  }

  const componentClicked = (event) => {
    console.log(event);
  }

  return (<FacebookLogin
    appId="580234625792248"
    autoLoad={true}
    fields="name,email,picture,friends"
    onClick={componentClicked}
    callback={responseFacebook} />)
};

export default Admin;
