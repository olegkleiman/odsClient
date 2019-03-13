/**
 * @flow
 */
import React from 'react';
import {graphql, createFragmentContainer } from 'react-relay';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import type { Logins_list } from '__generated__/Logins_list.graphqljs';
import environment from '../Environment';
import ValidateUserMutation from './mutations/ValidateUserMutation';

const Logins = (props) => {

  const facebookResponse = (response) => {
    console.log(response);
    // if( response.id ) {
    //   localStorage.setItem('odsAuthProvider', 'facebook');
    //   localStorage.setItem('odsUserToken', response.accessToken);
    //   localStorage.setItem('odsUserPicture', response.picture.data.url);
    //   props.history.push('/dashboard');
    // }
  }

  const googleResponse = (response) => {

    if( response.error ) {
      console.log(response.error);
      return;
    }
    const user = {
      email: response.profileObj.email,
      role: 'admin'
    };
    ValidateUserMutation.commit(environment ,user);
    // if( response.googleId ) {
    //   localStorage.setItem('odsAuthProvider', 'google');
    //   localStorage.setItem('odsUserToken', response.tokenId);
    //   localStorage.setItem('odsUserPicture', response.profileObj.imageUrl);
    //   props.history.push('/dashboard');
    // }
  }

  return(<>
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
      </>);
};

export default createFragmentContainer(Logins,
graphql`
  fragment Logins_list on ValidatedUser @relay(plural: true) {
    name
    role
    email
  }
`);
