/**
 * @flow
 */
import React, { useState, useEffect } from 'react';
import {graphql, createFragmentContainer } from 'react-relay';
import { withRouter } from "react-router-dom";
import jwtDecode from 'jwt-decode';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { GoogleLogin } from 'react-google-login';

import type { Logins_list } from '__generated__/Logins_list.graphqljs';
import environment from '../Environment';
import ValidateUserMutation from './mutations/ValidateUserMutation';

const styles = {
  card: {
    minWidth: 275,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const Logins = (props) => {

  const classes = props.classes;

  const [user, setUser] = useState();

  const validatedUser = props.list[0];

  if( user ) { // will be set after successful login response
     if( validatedUser.email.indexOf(user.email) !== -1 ) {
       if( validatedUser.role === 'admin') {
         localStorage.setItem('odsUserToken', user.accessToken);
         localStorage.setItem('odsUserPicture', user.pictureUrl);
         localStorage.setItem('odsAuthProvider', user.provider);

         props.history.push('/dashboard');
      }
    }
  }

  const [noAdminMessageHidden, setNoAdminMessageHidden] = useState(true);
  useEffect( () => {
    const validatedUser = props.list[0];
    if( validatedUser.email[0] !== ''  // intially get 'empty' user
       && validatedUser.role !== 'admin' ) {
      setNoAdminMessageHidden(false);
    }
  }, [props.list[0]]); // Only re-run the effect if validated user changes

  const googleResponse = async (response) => {

    if( response.error ) {
      console.log(response.error);
      return;
    }

    const resp = await fetch('http://localhost:4000/x', {
      method: 'post',
      headers: {
        'x-code': response.code
      }
    })
    const jsonToken = await resp.json()
    const decoded = jwtDecode(jsonToken.id_token);

    const user = {
      email: decoded.email,
      accessToken: jsonToken.id_token,
      pictureUrl: decoded.picture,
      provider: 'google'
    };

    setUser(user);
    ValidateUserMutation.commit(environment,
                                user.email);

  }

  return(<Card className={classes.card}>
          <CardContent>
              <GoogleLogin
                  clientId="1049230588636-gprtqumhag54a8g4nlpu7d8pje0vpmak.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  theme='dark'
                  accessType='offline'
                  responseType='code'
                  onSuccess={googleResponse}
                  onFailure={googleResponse} />
          </CardContent>
          <CardActions>
              <div hidden={noAdminMessageHidden}>
                Provided user is not administrator.
              </div>
          </CardActions>
      </Card>);
};

export default createFragmentContainer(withRouter(withStyles(styles)(Logins)),
graphql`
  fragment Logins_list on ValidatedUser @relay(plural: true) {
    name
    role
    email
  }
`);
