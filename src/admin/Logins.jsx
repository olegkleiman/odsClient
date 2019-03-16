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

  const validatedUser = props.list[0];

  if( user ) { // will be set after successful login response
     if( validatedUser.email.indexOf(user.email) !== -1 ) {
       if( validatedUser.role === 'admin') {
         localStorage.setItem('odsUserToken', user.accessToken);
         localStorage.setItem('odsUserPicture', user.pictureUrl);
         localStorage.setItem('odsAuthProvider', user.provider);

         props.history.push('/dashboard');
      } else {
        console.log(`Validated used has no 'admin' role`);
      }
    }
  }

  const facebookResponse = (response) => {

    const user = {
      email: response.email,
      accessToken: response.accessToken,
      pictureUrl: response.picture.data.url,
      provider: 'facebook'
    };
    setUser(user);
    ValidateUserMutation.commit(environment,
                                user.email);

  }

  const googleResponse = async (response) => {

    if( response.error ) {
      console.log(response.error);
      return;
    }

    // const tokenUrl = `https://www.googleapis.com/oauth2/v4/token?code=${response.code}&client_id=1049230588636-gprtqumhag54a8g4nlpu7d8pje0vpmak.apps.googleusercontent.com&redirect_uri=http://localhost:8887`;
    // await fetch(tokenUrl,
    // {
    //   method: "POST",
    //   headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // })
    // final PostMethod post = new PostMethod("https://www.googleapis.com/oauth2/v4/token");
    // post.addRequestHeader("content-type", "application/x-www-form-urlencoded");
    // post.addParameter("code", code);
    // post.addParameter("client_id", client_id);
    // post.addParameter("client_secret", client_secret);
    // post.addParameter("redirect_uri", redirectUrl);
    // post.addParameter("grant_type", "authorization_code");

    const user = {
      email: response.profileObj.email,
      accessToken: response.tokenObj.id_token,
      pictureUrl: response.profileObj.imageUrl,
      provider: response.tokenObj.idpId
    };
    setUser(user);
    ValidateUserMutation.commit(environment,
                                user.email);

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
          theme='dark'
          responseType='id_token token'
          accessType='offline'
          prompt="consent"
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
