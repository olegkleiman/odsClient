/**
 * @flow
 */
import React, { useState } from 'react';
import {graphql, createFragmentContainer } from 'react-relay';
import { withRouter } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import type { Logins_list } from '__generated__/Logins_list.graphqljs';
import environment from '../Environment';
import ValidateUserMutation from './mutations/ValidateUserMutation';

const Logins = (props) => {

  const [user, setUser] = useState();

  if( user ) { // will be set after successful login response
     if( props.list[0].email.indexOf(user.email) !== -1 ) {
       localStorage.setItem('odsUserToken', user.accessToken);
       localStorage.setItem('odsUserPicture', user.pictureUrl);
       localStorage.setItem('odsAuthProvider', user.provider);

       props.history.push('/dashboard');
    }
  }

  const facebookResponse = (response) => {

    const user = {
      email: response.email,
      accessToken: response.accessToken,
      pictureUrl: response.picture.data.url,
      role: 'admin',
      provider: 'facebook'
    };
    setUser(user);
    ValidateUserMutation.commit(environment,
      {
        email: user.email,
        role: user.role
      });

  }

  const googleResponse = (response) => {

    if( response.error ) {
      console.log(response.error);
      return;
    }
    const user = {
      email: response.profileObj.email,
      accessToken: response.tokenId,
      pictureUrl: response.profileObj.imageUrl,
      role: 'admin',
      provider: 'google'
    };
    setUser(user);
    ValidateUserMutation.commit(environment,
      {
        email: user.email,
        role: user.role
      });

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

export default createFragmentContainer(withRouter(Logins),
graphql`
  fragment Logins_list on ValidatedUser @relay(plural: true) {
    name
    role
    email
  }
`);
