/**
 * @flow
 */
import React, { useState, useEffects} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import { Link } from 'react-router-dom';
import { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

import type { DataSet_item } from './DataSet_item.graphql.js'
import { DataConsumer } from './DataContext';

const DataSet = (props) => {

  return (
    <DataConsumer>
        { ({direction})  => {

            const dsName = ( direction === 'ltr' ) ? props.item.name : props.item.heb_name;

            return(<div>
                    <Link to={`/ds/${props.item.id}`}>{dsName} ({props.item.type})</Link>
                  </div>)
            }
          }

    </DataConsumer>
  );

};

export default createFragmentContainer(
DataSet,
graphql`
  fragment DataSet_item on DataSet {
    id
    name
    heb_name
    type
    description
    heb_description
    whenPublished
  }
`);
