import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import jwt from "jsonwebtoken";
import SearchBar from 'material-ui-search-bar'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close'




const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 0px',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSnack: false,
      categoryList: [],
      message: "",
      Searchname: "test",

    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseSnack = this.handleCloseSnack.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };



  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };
  style_search = {
    marginRight: 200

  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose1 = () => {
    localStorage.clear("token");
    window.location = "/#/";
    this.setState({ anchorEl: null });
  };
  state = {
    anchorEl: null,
  };
  name = "";
  userName = "";
  flag = false;
  displaydata() {
    var token = localStorage.getItem("token");
    if (token !== null) {
      var decoded = jwt.verify(token, 'shhhhh');
      this.name = decoded.email;
      this.userName = decoded.userName;
      this.flag = true;
    }
  }
  handleSearch(value) {
   
   if (value.length < 3)
   {
    this.setState({ openSnack: true, message: "Parameter too short" });
   }
   else
   {
     window.location.reload();
    window.location = `/#/search?select=${value}&page=1`
   }
  }

  handleCloseSnack() {
    this.setState({ openSnack: false })
  }

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>

        {this.displaydata()}

        <div style={{ height: 60 }}>
          <List style={{ marginLeft: 20 }}>
            <Typography style={{ marginLeft: 30 }} >
              Streamer
        </Typography></List>
        </div>
        <Divider />



        <List style={{ marginLeft: 20, hieght: 60 }} className="drawer">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><path d="M6 26h4v-4H6v4zm0 8h4v-4H6v4zm0-16h4v-4H6v4zm8 8h28v-4H14v4zm0 8h28v-4H14v4zm0-20v4h28v-4H14z" /></svg>
          <Link to={"/user"}><Typography color="primary" style={{ padding: 6 }}>Registered Applications</Typography></Link></List>
        <Divider />
        <List style={{ marginLeft: 20, hieght: 60 }} className="drawer">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" style={{ padding: 'auto' }} height="30" viewBox="0 0 48 48"><path d="M18 23.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm12 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16 0-.58.04-1.15.1-1.71 4.71-2.09 8.47-5.95 10.42-10.74 3.62 5.1 9.57 8.45 16.31 8.45 1.55 0 3.06-.19 4.5-.53.43 1.44.67 2.96.67 4.53 0 8.82-7.18 16-16 16z" /></svg>
          <Typography style={{ padding: 6 }} >{this.userName}</Typography></List>
        <Divider />
        <List style={{ marginLeft: 20, hieght: 60 }} className="drawer">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><path d="M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 8L24 26 8 16v-4l16 10 16-10v4z" /></svg>
          <Typography style={{ padding: 6 }}>{this.name}</Typography></List>
        <Divider />
        <List style={{ marginLeft: 20, hieght: 60 }} className="drawer">
         <Link to ={`/user-view/${this.userName}`}> <Typography style={{ padding: 6 }}>Register New Application</Typography></Link></List>       
        <Divider />

      </div>
    );
    return (
      <div >
        <AppBar
          position="sticky"
          className="appbar"

        >
          <Toolbar >
            <div className="toolbar">

              {(localStorage.getItem("token") !== null) ?
                <IconButton align="left" onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon style={{ color: "#000000" }} />
                </IconButton >
                : <div></div>
              }
              <img src={require("./../img/s")} style={{ width: 40, height: 40 }} className="logo" alt = "logo"></img>

            </div>

            <Typography style={{ margin: 10, fontSize: 27, color: "#777777" }} className="main_title" >Streamer</Typography>

             <SearchBar
                onRequestSearch={(value) => { this.handleSearch(value) }}
                style={{
                  margin: '0 auto',
                  width: 750,
                  height: 40,
                  boxShadow: "none",
                  backgroundColor: "#F5F5F5", borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                  marginTop: -4,
                }}
                className="search" />
             
            <Link to={"/help"} style = {{textDecoration : "none"}}>
            <Button variant = "raised" style = {{backgroundColor : "#9db6b8"}}>  <Typography className="main_title" style = {{textDecoration : "none"}} >Docs</Typography></Button>
            </Link>
            {
              (localStorage.getItem("token") !== null)
                ?
                <div className="logout">
                  <Button
                    aria-haspopup="true"
                    onClick={this.handleClick}>
                    <Avatar />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose1}>Logout</MenuItem>
                  </Menu>
                </div>

                : <div></div>

            }




          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.openSnack}
          autoHideDuration={2000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnack}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SwipeableTemporaryDrawer);
