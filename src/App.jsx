/**
 * @flow
 */
import React, { useState } from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Link } from 'react-router-dom';
import { Route, Switch, withRouter } from 'react-router-dom';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import classNames from 'classnames';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";
import { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

import { DataProvider} from './DataContext';
import translations from './translations';

import Home from './Home';
import Category from './Category';
import DataSetContent from './DataSetContent';
import SearchResults from './SearchResults';

import Admin from './Admin';
import Dashboard from './admin/Dashboard';
import UserProfile from './UserProfile';
import Logout from './admin/Logout';

import "react-tabs/style/react-tabs.css";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    }
  })

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  languageSwitch: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit,
    cursor: 'pointer'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
})

const App = (props) => {

  const { classes } = props;

  const { t } = useTranslation();
  const [direction, setDirection] = useState(DIRECTIONS.LTR);
  const [searchQuery, setSearchQuery] = useState('');

  const changeLang = () => {

    if( direction == DIRECTIONS.RTL ) {
      i18n.changeLanguage('en');
      setDirection(DIRECTIONS.LTR);
    } else {
      i18n.changeLanguage('he');
      setDirection(DIRECTIONS.RTL);
    }
  }

  const searchSubmit = (event) => {
    if( event.key == 'Enter' ) {
      event.preventDefault();
      props.history.push('/search');
    }
  }

  const searchChanged = (event) => {
    setSearchQuery(event.target.value);
  }

  return (<DataProvider value={{
                                direction: direction,
                                searchQuery: searchQuery}
                              }>
            <div dir={direction} className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                  </IconButton>
                  <Link to={'/'} style={{textDecoration: 'none'}}>
                    <Typography className={classes.title} variant="h6" noWrap>
                      TLV OpenData
                    </Typography>
                  </Link>
                  <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                        <InputBase
                          placeholder="Search…"
                          onKeyPress={searchSubmit}
                          onChange={searchChanged}
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                      />
                  </div>
                  <div>
                    <Logout />
                  </div>
                  <div>
                    <UserProfile />
                  </div>
                  <div className={classes.languageSwitch}
                        onClick={changeLang}>{t('Switch')}</div>
                </Toolbar>

              </AppBar>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/category/:categoryId' component={Category} />
                <Route path="/ds/:dsId" component={DataSetContent} />
                <Route path='/search' component={SearchResults} />
                <Route path='/admin' component={Admin} />
                <Route path='/dashboard' component={Dashboard} />
              </Switch>
            </div>
        </DataProvider>)
}

export default withStyles(styles)(withRouter(App));
