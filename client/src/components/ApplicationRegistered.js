import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";







const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { applications: [], list: {}, openTooltip: false }

  }
  handleTooltipClose = () => {
    this.setState({ openTooltip: false });
  };

  handleTooltipOpen = () => {
    this.setState({ openTooltip: true });
  };
  componentDidMount() {
    var name = this.props["userName"];
    fetch(`/user-profile/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({ applications: myJson });
      })
  }
  downloadToken(activityName) {
    var name = activityName;
    console.log(name);
    fetch(`/get_data/${name}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);

        var data1 = myJson["token"];

        var data = data1;

        var fileDownload = require('js-file-download');
        fileDownload(data, 'config.json');
      })
  } 
  
  render() {
    const { classes } = this.props;
   
    
    return (
      
      <div >
         <Paper className={classes.root}>
          <Table >
            <TableHead >
              <TableRow >
              <TableCell>Application Name</TableCell>
                <TableCell numeric>Registered Date</TableCell>
                <TableCell numeric>Download Token</TableCell>

              </TableRow>
            </TableHead>
            <TableBody >
            {this.state.applications.map(t => {
                return (

                  <TableRow >
                    <TableCell component="th" scope="row">
                    {(t.activityName === "No Registrations") 

                      ?<h4>No Registraions</h4> 
                      :<Link to={`/app-view/${t.activityName}/${t.version}`}> {t.activityName}</Link>
                    }
                    </TableCell>

                    <TableCell numeric>{t.date}</TableCell>
                    <TableCell numeric>
                      <Tooltip
                        onClose={this.handleTooltipClose}
                        onOpen={this.handleTooltipOpen}
                        open={this.state.Tooltip}
                        title="Download Token" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z" onClick={() => this.downloadToken(t.activityName)} style={{ padding: 30 }} /></svg>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}

            </TableBody>
          </Table>
        </Paper>
      </div>

    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);