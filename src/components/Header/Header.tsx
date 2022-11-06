import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const Header = () => {
  return (
    <AppBar position="static" style={{ alignItems: 'center' }}>
      <Toolbar>
        <Typography variant="h6">Hacker News</Typography>
      </Toolbar>
    </AppBar>
  );
};
