import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Registry from "./AppplicationDetails";
import RegisterWithSpecs from "./ActivitySpecRegistration"; 

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



class UserView extends React.Component {
  
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  pathArray = window.location.hash.split("/");
  userName =  this.pathArray[2];
  
  render() {

    const { value } = this.state;

    return (
      <div >
        <AppBar position="sticky">       
        <div className="tabs">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Register  Applications " />
            <Tab label="Register Application Details " />
           </Tabs>
           </div>
        </AppBar>
        {value === 0 && <TabContainer><Registry></Registry></TabContainer>}
        {value === 1 && <TabContainer><RegisterWithSpecs></RegisterWithSpecs></TabContainer>}
      </div>
    );
  }
}



export default UserView;