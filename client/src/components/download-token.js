import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import jwt from "jsonwebtoken";


const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class TokenFile extends React.Component {
  

  downloadToken() {
    var  pathArray = window.location.hash.split("/");
    let activityName =  pathArray[2];
   
    var token = localStorage.getItem("token");
     var decoded = jwt.verify(token, 'shhhhh');
    var userName = decoded.userName;
       console.log(activityName);
    fetch(`/get_data/${activityName}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        
        var data1 = myJson["token"];
        
        var data =   data1;

        var fileDownload = require('js-file-download');
        fileDownload(data, 'config.json');
      })
      window.location = `/#/user-view/${userName}`
  }





  render() {
    

    const { classes } = this.props;
    return (


      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
                      Thank you for your Subscription.            
                    </Typography>
                    <Typography variant="subheading">
                      Your activity has been subscribed. You can now use activities as per your subscription
  
                    </Typography>
                    <Button  color = "primary" variant = "raised" onClick = {() => this.downloadToken()}>
                      Download Token
                    </Button> 
          </Paper>
        </main>
      </React.Fragment>
        );
      }
    }
    
TokenFile.propTypes = {
          classes: PropTypes.object.isRequired,
      };
      
export default withStyles(styles)(TokenFile);
