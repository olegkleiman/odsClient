/**
 * @flow
 */
import React, { useState, useEffect } from 'react';
import {commitMutation, graphql} from 'react-relay';
import moment from 'moment';
import classNames from 'classnames';
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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  select: {
    marginTop: '8px',
    marginBottom: '4px'
  },
});

const EditDataSet = (props) => {

  const dataset = props.dataset;
  const callback = props.callback;
  const classes = props.classes;
  const categories = props.categories;
  const categoryOptions = categories.map( category => {
    return {
      value: category.id,
      label: category.name
    }
  });

  const [openDialog, setOpenDialog] = useState(props.show);
  useEffect( () => {
    setOpenDialog(props.show);
    if( dataset ) {
      setName(dataset.name);
      setHebName(dataset.heb_name);
      setDescription(dataset.description);
      setHebDescriptionChanged(dataset.heb_description);
    } else {
      setName(null);
      setHebName(null);
      setDescription(null);
      setHebDescriptionChanged(null);
    }
  })

  const [name, setName] = useState('');
  const [hebName, setHebName] = useState('');
  const [description, setDescription] = useState('');
  const [hebDescription, setHebDescriptionChanged] = useState('');
  const [categoryIds, setCategoryIds] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  const handleModalClose = () => {
    setOpenDialog(false);
    if( callback )
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

  const addVisualization = () => {

  }

  const selectClassNames = classNames({
    [`basic-multi-select ${classes.select}`]: true
  })

  return (<Dialog aria-labelledby="form-dialog-title"
                  fullScreen
                  open={openDialog}
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
            <Tabs selectedIndex={tabIndex}
                  onSelect={tabIndex => setTabIndex(tabIndex)}>
              <TabList>
                <Tab>Basic</Tab>
                <Tab>Visualizations</Tab>
              </TabList>

              <TabPanel>
                <Grid container spacing={24}>
                  <Grid item xs={4}>
                    <TextField
                      autoFocus
                      required
                      defaultValue={name}
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
                      defaultValue={hebName}
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
                        className={selectClassNames}
                        classNamePrefix="select"
                        name="categories"
                        onChange={categoriesChanged}
                        options={categoryOptions} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      defaultValue={description}
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
                      defaultValue={hebDescription}
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
              </TabPanel>
              <TabPanel>
                <Grid container spacing={24}>
                  <Fab onClick={addVisualization}
                       color="secondary" aria-label="Add"
                       className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </Grid>
              </TabPanel>
            </Tabs>

          </Dialog>);

};

export default withStyles(styles, { withTheme: true })(EditDataSet);
