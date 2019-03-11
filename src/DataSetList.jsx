// @flow
import React from 'react';
import { graphql, createPaginationContainer } from 'react-relay';
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

export default createPaginationContainer(
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
  `,
  {
    direction: 'forward',
    query: graphql`
    query DataSetList_Query($first: Int!,
                      $after: String) {
      	...DataSets_root @arguments(first: $first,
                                 after: $after)
      }
    `,
    getFragmentVariables: (prevVars, totalCount) => {
      return {
        ...prevVars,
        count: totalCount
      }
    },
    getVariables: (props, {count, cursor}, fragmentVariables) => {
      return {
        first: count,
        after: cursor,
        firstComment: 1
      }
    }
  }
);
