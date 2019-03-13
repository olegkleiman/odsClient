import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
              <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                  >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={menuAnchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}>
                <MenuItem  onClick={handleMenuClose}>
                  LogOut
                </MenuItem>
              </Menu>
        </Grid>)
};

export default withStyles(styles)(UserProfile);
