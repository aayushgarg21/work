import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from "./../components/Avatar";
import jwt from "jsonwebtoken";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';



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

class SignIn extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      appName: "",
      flag: false,
      open: false,
      openSnack: false,
      openTooltip: false
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleTooltipClose = () => {
    this.setState({ openTooltip: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openTooltip: true });
  };



  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false, openSnack: false })
  };


  onEnter(event) {


    var text = document.getElementById("appName").value;
    this.setState({ appName: text, flag: true });
    var token = localStorage.getItem("token");
    var decoded = jwt.verify(token, 'shhhhh');
    var flag = true;
    var name = decoded.userName;
    fetch(`/register-name/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        myJson.forEach(element => {
          if (element.activityName === text) {
            flag = false;
          }
        })
        if (flag === false) {
          this.setState({ openSnack: true });

        }
        else {
          window.location = `/#/user-view/register/${text}`;
        }
      })
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.onEnter();

    }
  }







  render() {

    const { classes } = this.props;
    return (


      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar />
            <Typography variant="headline">Register New Application</Typography>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password"> Application Name</InputLabel>
              <Input
                name="password"
                type="email"
                id="appName"
                autoComplete="current-password"
                onKeyPress={this.enterPressed.bind(this)}

              />
            </FormControl>


            <Tooltip
              onClose={this.handleTooltipClose}
              onOpen={this.handleTooltipOpen}
              open={this.state.Tooltip}
              title="Register Specifications" >

              <Button
                variant="raised"
                color="primary"
                id="next"
                onClick={(e) => this.onEnter()}
                className = "next"
              >
                Next
           </Button>
            </Tooltip>
            <br></br>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={this.state.openSnack}
              autoHideDuration={600}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Application Already Exsists</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />





          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);