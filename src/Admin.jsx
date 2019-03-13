/**
 * @flow
 */
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import environment from './Environment';
import Logins from './admin/Logins';

const AdminQuery = graphql`
  query AdminQuery {
    validatedUsers {
      ...Logins_list @module(name: "Logins.react")
    }
  }
`;

const Admin = (props) => {

  return <QueryRenderer
              environment={environment}
              query={AdminQuery}
              variables={{}}
              render = { ({error, props}) => {
                  if (error) {
                      return <div>{error}</div>;
                  }
                  if (!props) {
                      return (<div>Loading...</div>);
                  }

                  return <Logins list={props.validatedUsers} />;
              }}
          />

};

export default Admin;
