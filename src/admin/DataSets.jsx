/**
 * @flow
 */
import React, { useState } from 'react';
import {graphql, createPaginationContainer} from 'react-relay';
import { uid } from "react-uid";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import DataSet from './DataSet';
import EditDataSet from './EditDataSet';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

const DataSets = (props) => {

  const classes = props.classes;
  const [show, setShow] = useState(false);

  const showDataSetEditor = () => {
    setShow(true);
  }
  const hideDataSetEditor = () => {
    setShow(false);
  }

  const _loadMore = () => {
    props.relay.hasMore() &&
    !props.relay.isLoading() &&
    props.relay.loadMore(2, () => null);
  }

  return (<div className={classes.root}>
            <EditDataSet show={show}
                         callback={hideDataSetEditor} />

            <Grid container spacing={24}>
            {
              props.root.datasets.edges.map( dataset => {
                return <Grid item xs={3} key={ uid(dataset) }>
                          <DataSet item={dataset.node} />
                      </Grid>
              })
            }
            </Grid>
            <Button disabled={!props.relay.hasMore()}
                    onClick={_loadMore}>Load More...</Button>
            <Fab onClick={showDataSetEditor}
                 color="secondary" aria-label="Add"
                 className={classes.fab}>
              <AddIcon />
            </Fab>
          </div>)
};

export default createPaginationContainer(withStyles(styles)(DataSets),
  graphql`
  fragment DataSets_root on Query
     @argumentDefinitions(
         first: { type: "Int!" }
         after: { type: "String" }
       ) {
          datasets(first: $first, after: $after) @connection(
            key: "DataSets_datasets"
            filters: []
          ) {
          	edges {
              node {
                ...DataSetItem_item
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
    query DataSetsList_Query($first: Int!,
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
  })
