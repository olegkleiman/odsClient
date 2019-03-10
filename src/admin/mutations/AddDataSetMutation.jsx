// @flow
import {commitMutation, graphql} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
import type { DataSetInput } from '__generated__/AddDataSetMutation.graphql.js'

const mutation = graphql`
  mutation AddDataSetMutation(
    $input: DataSetInput!
  ) {
    addDataSet(input: $input) {
    	dataSetEdge {
        __typename
        cursor
        node {
          name
          heb_name
          type
        }
      }
    }
  }
`;

const sharedUpdater = (
  store: RecordSourceSelectorProxy,
  newEdge: RecordProxy,
) => {
  const root = store.getRoot();
  const conn = ConnectionHandler.getConnection(root, 'DataSets_datasets');
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

let tempID = 0;

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

        const payload = proxyStore.getRootField('addDataSet');
        const newEdge = payload.getLinkedRecord('dataSetEdge');

        sharedUpdater(proxyStore, newEdge);
      },
      // optimisticUpdater: (proxyStore: RecordSourceSelectorProxy) => {
      //   const id = 'client:root:' + tempID++;
      //   const node = proxyStore.create(id, 'DataSet');
      //   node.setValue(name, 'name');
      //   node.setValue(id, 'id');
      //
      //   const newEdge = proxyStore.create('client:root:' + tempID++, 'DataSetEdge');
      //   newEdge.setLinkedRecord(node, 'node');
      //   sharedUpdater(proxyStore, newEdge);
      // },
      onCompleted: (response, errors) => {
        if( errors && errors.length > 0 ) {
          errors.map( error => {
            console.error(error.message);
          })

        }
      }
    });
}

export default {commit};
