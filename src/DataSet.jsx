import React, { useState, useEffects} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import { Link } from 'react-router-dom';
import { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

import { DataConsumer } from './DataContext';

const DataSet = (props) => {

  return (
    <DataConsumer>
        { ({direction})  => {

            const dsName = ( direction === 'ltr' ) ? props.item.name : props.item.heb_name;

            return(<>
                    <div>{props.item.type}</div>
                    <Link to={`/ds/${props.item.id}`}>{dsName}</Link>
                  </>)
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
  }
`);
