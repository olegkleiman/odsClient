/**
 * @flow
 */
import React, { useState } from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { uid } from "react-uid";
import environment from '../Environment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import type { DashboardQueryResponse } from '__generated__/DashboardQueryResponse.graphql.js'
import DataSet from './DataSet';
import EditDataSet from './EditDataSet';

const DashboardQuery = graphql`
  query DashboardQuery {
    datasets {
      ...DataSetItem_item
    }
  }
`;

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
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

const Dashboard = (props) => {

  const [addModalOpen, setModalOpen] = useState(false);

  const classes = props.classes;

  const showAddDialog = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const addDataSet = () => {
    console.log('adding');
  }

  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  return (<QueryRenderer
              environment={environment}
              query={DashboardQuery}
              variables={{}}
              render={ ({error, props}) => {
                  if (error) {
                      return <div>{error}</div>;
                  }
                  if (!props) {
                      return (<div>Loading...</div>);
                  }

                  return (<div className={classes.root}>
                            <Dialog aria-labelledby="form-dialog-title"
                                    fullScreen
                                    TransitionComponent={Transition}
                                    open={addModalOpen}
                                    onClose={handleModalClose}>
                                <AppBar className={classes.appBar}>
                                  <Toolbar>
                                    <IconButton color="inherit" onClick={handleModalClose} aria-label="Close">
                                      <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" className={classes.flex}>
                                      Add New DataSet
                                    </Typography>
                                    <Button color="inherit" onClick={addDataSet}>
                                      save
                                    </Button>
                                  </Toolbar>
                                </AppBar>
                                <TextField
                                  autoFocus
                                  required
                                  margin="dense"
                                  id="name"
                                  label="Name"
                                  variant="outlined"
                                  fullWidth
                                />
                                <TextField
                                  required
                                  margin="normal"
                                  id="heb_name"
                                  label="Hebrew Name"
                                  variant="outlined"
                                  fullWidth
                                />
                                <TextField
                                  required
                                  margin="normal"
                                  multiline
                                  rowsMax="4"
                                  id="description"
                                  label="Description"
                                  variant="outlined"
                                  fullWidth
                                />

                            </Dialog>
                            <Grid container spacing={24}>>
                            {
                              props.datasets.map( dataset => {
                                return <Grid item xs={3} key={ uid(dataset) }>
                                          <DataSet item={dataset} />
                                      </Grid>
                              })
                            }
                            </Grid>
                            <Fab onClick={showAddDialog} color="secondary" aria-label="Add"
                                  className={classes.fab}>
                              <AddIcon />
                            </Fab>
                        </div>)
              }}>
          </QueryRenderer>)
};

export default withStyles(styles, { withTheme: true })(Dashboard);
