import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 0.1,
    marginRight: theme.spacing(5),
  },
  box: {
    maxHeight: 100,
    marginLeft: theme.spacing(30),
  },
  listItemText: {
    fontSize: '0.8em',
  },
  logoutButton: {
    marginLeft: theme.spacing(20),

  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            AlphaBet
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Profile</Button>
          <Button color="inherit">Editors</Button>
          <Button color="inherit">Feed</Button>
          <Button className={classes.menuButton} color="inherit">Market</Button>
          <Box className={classes.box} my={-5}>
            <List component="nav">
              <Box mb={-2}>
              <ListItem>
                <ListItemText classes={{primary:classes.listItemText}} primary="Balance: "></ListItemText>
              </ListItem>
              </Box>
              <Box mt={-1}>
              <ListItem>
                <ListItemText classes={{primary:classes.listItemText}} primary="AlphaBet: "></ListItemText>
              </ListItem>
              </Box>
            </List>
          </Box>
          <Button size="small" variant="contained" color="secondary" className={classes.logoutButton}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
    ); 
  }   