// @flow
import {commitMutation, graphql} from 'react-relay';
import type { ValidateUserMutationResponse } from '__generated__/ValidateUserMutation.graphql.js'

const mutation = graphql`
  mutation ValidateUserMutation(
    $input: String!
  )
  {
    validateUserEmail(input: $input) {
      id
      name
      role
      email
    }
  }
`;

const commit = (environment: Environment,
                email: string): Disposable => {
  const variables = {
      input: email
    };

  commitMutation(environment,
    {
      mutation,
      variables,
      updater: (proxyStore: RecordSourceSelectedProxy) => {
          // Get payload after mutation
          const payload = proxyStore.getRootField('validateUserEmail');
          const _role = payload.getValue('role');
          // Do not update Store if validated used has no 'admin' role
          if( _role !== 'admin') {
            return;
          }
          // Otherwise - continue to update Store
          const _emails = payload.getValue('email');
          const _id = payload.getValue('id');
          const _name = payload.getValue('name');

          // Reading Proxy's Values off the Relay Store
          const root = proxyStore.getRoot();
          const validatedUserRecords = root.getLinkedRecords('validatedUsers');

          // Change the user's in the Store according to received payload.
          // This will cause to subscription established by a Logins_list Fragment to fire.
          if( validatedUserRecords && validatedUserRecords.length > 0 ) {
            const userRecord = validatedUserRecords[0];
            userRecord.setValue(_id, "id");
            userRecord.setValue(_emails, "email");
            userRecord.setValue(_name, "name");
            userRecord.setValue(_role, "role");
          }
      },
      onCompleted: (response, errors) => {
        if( errors && errors.length > 0 ) {
          errors.map( error => {
            console.error(error.message);
          })

        }
      }
    }
  )
}

export default {commit};
