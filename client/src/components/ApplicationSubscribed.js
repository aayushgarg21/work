import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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
  state = {
    open: true,
  };
  constructor(props) {
    super(props)
    this.state = { subscriptions: [] }
  }

  componentDidMount() {
    var name = this.props["appName"];
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem("token"));
    fetch(`/subscription/${name}`, {
      method: 'GET',
      headers: myHeaders,

    }).then((response) => {
      return response.json();
    })
      .then((myJson) => {
        this.setState({ subscriptions: myJson });
      })
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div >
        <h4 className="title"> Subscriptions </h4>

        <List
          component="nav"
          subheader={<ListSubheader component="div"></ListSubheader>}>
          {
            this.state.subscriptions.map((subscription) => {
              return (<div>
                <ListItem button onClick={this.handleClick}>
                  <ListItemText inset primary={Object.keys(subscription)} />
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subscription[Object.keys(subscription)].map((activties) => {
                      return (<ListItem button className={classes.nested}>
                        <ListItemText inset primary={activties} />
                      </ListItem>);
                    }

                    )}

                  </List>
                </Collapse>
              </div>);

            })
          }

        </List>

      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);