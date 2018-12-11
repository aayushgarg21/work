import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import jwt from "jsonwebtoken";
import Paper from '@material-ui/core/Paper';
import Avatar from "./../components/Avatar";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";




class ApplicationSpecRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSnack: false,
            openTooltip: false,
            ableRegister: true,
            message  : "",


        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
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



    pathArray = window.location.hash.split("/");
    activityName = this.pathArray[3];

    handlename() {

        var token = localStorage.getItem("token");
        var decoded = jwt.verify(token, 'shhhhh');
        var userName = decoded.userName;
        var applicationName = {
            userName: userName,
            name: this.activityName
        }
        fetch('/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationName)
        }).then(res => {
            window.location = `/#/download/${this.activityName}`



        });
    }


    handleregister() {
        window.location = `/#/download/${this.activityName}`
    }
    handleChange() {
        this.setState({ ableRegister: false })
        document.getElementById("able").disabled = false;
        let fileInput = document.getElementById('file');
        var file = fileInput.files[0];
        var jsyaml = require('js-yaml');
        var reader = new FileReader();
        reader.onloadend = function (e) {
            let text = reader.result;
            var data = jsyaml.load(text);
            var check = true;
            
             if(data.version  == null || data.description == null || data.activityname == null ||  data.userName == null )
             {
              check = false;
              
             }
            else if(data.document_description.subscription == null && data.publish == null) {
                check = false;
                   
            }
            else if(data.document_description.subscription !== null)
            {
               console.log(data.document_description.subscription);
            }
            else if (data.document_description == null || data.document_description.activities_description == null  )
            {
               check = false;
              
            }
            if (data.document_description.activities_description !== null)
            {
                data.document_description.activities_description.map((element) =>
                {
                    if(element.activity_code == null || element.description == null  || element.name == null || element.example == null || element.activity_schema == null)
                    check = false 
                 })
         }
                

            let applicationName = {
                yaml: text,
                token: localStorage.getItem("token"),
            }
                   

             if(check)   
             {
            fetch('/register-yaml', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicationName)
            }).then(res => {
                (res.status === 401) ? console.log("Application Already Registered") : console.log("Done");



            });
        }
        else{
            alert("Enter Valid Yaml");
            window.location.reload();
        }
        
         }
        reader.readAsText(file);


    }
    render() {

        return (
            <div>
                <Paper className="user">
                    <div class="user">
                        <Avatar />

                        <Typography variant="title" gutterBottom className="title" style={{ marginLeft: 80 }}>
                            Define Activity Schema
                    </Typography>

                        <form class="form">



                            <input type="file"
                                name="myFile"
                                id="file"
                                onChange={() => { this.handleChange() }}
                            />
                            <Link to={"/help"}>

                                <Tooltip
                                    onClose={this.handleTooltipClose}
                                    onOpen={this.handleTooltipOpen}
                                    open={this.state.Tooltip}
                                    title="Help" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" /></svg>
                                </Tooltip>
                            </Link>


                            <a href="https://drive.google.com/file/d/1kNMZ4n464x7Dbj4hcHfiPmJuzfoExmWL/view?usp=sharing" download>
                                <Button class="btn" id="btn_download" color="primary" >Download Sample Schema</Button>
                            </a>



                            <div className="toolbar_skip">
                                <Tooltip
                                    onClose={this.handleTooltipClose}
                                    onOpen={this.handleTooltipOpen}
                                    open={this.state.Tooltip}
                                    title="Regiister without Specs" >
                                    <Button className="btn_skip" variant="raised" id="able" disabled={this.state.ableRegister} color="primary" onClick={e => this.handleregister()}>Register</Button>
                                </Tooltip>
                                <Tooltip
                                    onClose={this.handleTooltipClose}
                                    onOpen={this.handleTooltipOpen}
                                    open={this.state.Tooltip}
                                    title="Regiister without Specs" >
                                    <Button className="btn_skip" variant="raised" color="primary" onClick={e => this.handlename()}>Skip</Button>
                                </Tooltip>
                            </div>
                        </form>
                    </div>
                </Paper>
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
                    message={this.state.message}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}
export default ApplicationSpecRegister;