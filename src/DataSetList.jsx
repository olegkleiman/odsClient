// @flow
import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import { Link } from "react-router-dom";
import type { DataSetList_list } from '__generated__/DataSetList_list.graphql.js';

const DataSetList = (props: DataSetList_list) => {
  return (<ul>
    {
      props.list.map( (item, index) => {
        return (<li>
                <Link to={`/ds/${item.id}`} key={index} >{item.name}</Link>
              </li>)
      })
    }
  </ul>)
};

export default createFragmentContainer(
DataSetList,
graphql`
  fragment DataSetList_list on DataSet @relay(plural: true) {
    name
    id
  }
`);
