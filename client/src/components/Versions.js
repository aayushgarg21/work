import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import { Link } from "react-router-dom";



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  constructor(props) {
    super(props)
    
      this.state = {
        versions: []
      }
    
  }
  pathArray = window.location.hash.split("/");
  applicationName = this.pathArray[2];

  componentDidMount() {
    console.log(this.applicationName);
    fetch(`/version/${this.applicationName}`, {
      method: 'GET',


    }).then((response) => {
      return response.json();
    })
      .then((myJson) => {
        this.setState({ versions: myJson });
      })

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {
          this.state.versions.map((version) => {
            return (
              <List component="nav">
                <ListItem button>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <Link to={`/app-view/${this.applicationName}/${version}`}>
                    <ListItemText inset primary={version} onClick={() => window.location.reload()} />
                  </Link>
                </ListItem>

              </List>

            )

          })

        }
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
