// @flow
import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import { uid } from "react-uid";
import type { DataSetList_list } from '__generated__/DataSetList_list.graphql.js';

import DataSet from './DataSet';

const DataSetList = (props: DataSetList_list) => {
  return (<ul>
    {
      props.list.datasets.edges.map( item => {
        return (<li key={ uid(item) }>
                    <DataSet item={item.node} />
                </li>)
      })
    }
  </ul>)
};

export default createFragmentContainer(
DataSetList,
graphql`
  fragment DataSetList_list on Query
    @argumentDefinitions(
      first: { type: "Int!" }
      after: { type: "String" }
      categoryId: { type: "ID" }
    ) {
      datasets(first: $first, after: $after, categoryId: $categoryId)
          @connection(key: "DataSetList_datasets") {
      	edges {
          node {
            ...DataSet_item
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
  }
`);
