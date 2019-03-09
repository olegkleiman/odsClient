/**
 * @flow
 */
import React, { useState } from 'react';
import {commitMutation, graphql} from 'react-relay';
import environment from '../Environment';
import type { DataSetInput } from '__generated__/EditDataSetMutation.graphql.js'

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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

const mutation = graphql`
  mutation EditDataSetMutation(
    $input: DataSetInput!
  ) {
    addDataSet(input: $input)
  }
`;

const EditDataSet = (props) => {

  const callback = props.callback;
  const classes = props.classes;

  const [addModalOpen, setModalOpen] = useState(true);//props.show);

  const handleModalClose = () => {
    setModalOpen(false);
    callback();
  }

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
        updater: (store: RecordSourceSelectedProxy) => {
          console.log('updater');
        },
        onCompleted: (response, errors) => {
          console.log('Response received from server.')
        },
        onError: err => console.error(err),
      });

  }

  return (<Dialog aria-labelledby="form-dialog-title"
                  fullScreen
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
                <Button color="inherit" onClick={updateDataSet}>
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
          </Dialog>);

};

export default withStyles(styles, { withTheme: true })(EditDataSet);
