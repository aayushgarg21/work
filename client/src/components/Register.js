
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';








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


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSnack: false,

        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false, openSnack: false })
    };

    handleRegister(event) {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var userName = document.getElementById("org-name").value;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value)) {

            let user = {
                email: email,
                password: password,
                userName: userName
            }
            fetch('/Signup', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.message === "failed") {
                        this.setState({ openSnack: true, message: "User  or Email Already Exsist" });

                    }
                    else {
                        window.location = "/#/";

                    }


                });


        }
        else {
            this.setState({ openSnack: true, message: "Enter Valid Email" });

        }
    }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.handleRegister();

    }
  }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Register</Typography>

                        <FormControl margin="normal" required fullWidth>
                            < TextField id="org-name" required={true} placeholder=" user*" />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField id="email" name="email" placeholder=" email*" />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                name="password"
                                type="password"
                                id="password"
                                placeholder=" password* "
                                onKeyPress={this.enterPressed.bind(this)}
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            onClick={(event) => this.handleRegister(event)}                            >
                            Resgister
                              </Button>

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={this.state.openSnack}
                            autoHideDuration={2000}
                            onClose={this.handleClose}
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

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
