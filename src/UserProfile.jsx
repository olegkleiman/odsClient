import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

const ITEM_HEIGHT = 48;

const UserProfile = (props) => {
  const { classes } = props;
  const pictureUrl = localStorage.getItem('odsUserPicture');
  if( !pictureUrl )
    return null;

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuClick = () => {
    setMenuAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const open = Boolean(menuAnchorEl);

  return (<Grid container justify="center" alignItems="center">
              <Avatar src={pictureUrl} className={classes.avatar} />
          </Grid>)
};

export default withStyles(styles)(UserProfile);
