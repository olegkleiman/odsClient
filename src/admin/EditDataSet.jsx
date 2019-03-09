/**
 * @flow
 */
import React from 'react';
import {commitMutation, graphql} from 'react-relay';
import environment from '../Environment';
import type { DataSetInput } from '__generated__/EditDataSetMutation.graphql.js'

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const mutation = graphql`
  mutation EditDataSetMutation(
    $input: DataSetInput!
  ) {
    addDataSet(input: $input)
  }
`;

const EditDataSet = (props) => {

  const updateDataSet = () => {

    const variables = {
        input: {
          name: "one",
          heb_name: "two"
        },
      };

    commitMutation(environment,
      {
        mutation,
        variables,
        onCompleted: (response, errors) => {
          console.log('Response received from server.')
        },
        onError: err => console.error(err),
      });

  }

  return <>Edit</>

};

export default EditDataSet;
