/**
 * @flow
 */
import React, { useState } from 'react';
import {commitMutation, graphql} from 'react-relay';
import moment from 'moment';
import environment from '../Environment';
import AddDataSetMutation from './mutations/AddDataSetMutation';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select'

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
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const EditDataSet = (props) => {

  const callback = props.callback;
  const classes = props.classes;
  const categories = props.categories;
  const categoryOptions = categories.map( category => {
    return {
      value: category.id,
      label: category.name
    }
  });

  const [addModalOpen, setModalOpen] = useState(true);//props.show);

  const [name, setName] = useState('');
  const [hebName, setHebName] = useState('');
  const [description, setDescription] = useState('');
  const [hebDescription, setHebDescriptionChanged] = useState('');
  const [categoryIds, setCategoryIds] = useState();

  const handleModalClose = () => {
    setModalOpen(false);
    callback();
  }

  const updateDataSet = () => {
    const newDataSet = {
        name: name,
        heb_name: hebName,
        description: description,
        heb_description: hebDescription,
        type: "REPORT",
        whenPublished: moment().format('YYYY-MM-DD'),
        categoryIds: categoryIds,
    };
    AddDataSetMutation.commit(environment ,newDataSet);
  }

  const nameChanged = (event) => {
    setName(event.target.value);
  }

  const hebNameChanged = (event) => {
    setHebName(event.target.value);
  }

  const descriptionChanged = (event) => {
    setDescription(event.target.value);
  }

  const hebDescriptionChanged = (event) => {
    setDescription(event.target.value);
  }

  const categoriesChanged = (items) => {
    const ids = items.map( item => parseInt(item.value,10) );
    setCategoryIds(ids);
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
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  required
                  onChange={nameChanged}
                  margin="dense"
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  onChange={hebNameChanged}
                  margin="dense"
                  id="heb_name"
                  label="Hebrew Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                  <Select isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    name="categories"
                    onChange={categoriesChanged}
                    options={categoryOptions} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={descriptionChanged}
                  margin="dense"
                  multiline
                  rowsMax="4"
                  id="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={hebDescriptionChanged}
                  margin="dense"
                  multiline
                  rowsMax="4"
                  id="description"
                  label="Hebrew Description"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>


          </Dialog>);

};

export default withStyles(styles, { withTheme: true })(EditDataSet);
