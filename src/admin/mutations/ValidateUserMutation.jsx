// @flow
import {commitMutation, graphql} from 'react-relay';
import type { UserInput } from '__generated__/ValidateUserMutation.graphql.js'

const mutation = graphql`
  mutation ValidateUserMutation(
    $input: UserInput!
  )
  {
    validateUser(input: $input) {
      id
      name
      role
      email
    }
  }
`;

const commit = (environment: Environment,
                input: DataSetInput): Disposable => {
  const variables = {
      input: input
    };

  commitMutation(environment,
    {
      mutation,
      variables,
      updater: (proxyStore: RecordSourceSelectedProxy) => {
          // Get payload after mutation
          const payload = proxyStore.getRootField('validateUser');
          const _emails = payload.getValue('email');
          const _id = payload.getValue('id');
          const _name = payload.getValue('name');
          const _role = payload.getValue('role');

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
