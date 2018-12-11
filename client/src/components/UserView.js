import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ApplicationDetails from "./../components/AppplicationDetails";
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
  
         

  handleChange = (event, value) => {
    this.setState({ value });
  };
  pathArray = window.location.hash.split("/");
  userName =  this.pathArray[2];
  
  render() {


    return (
      <div >
       <ApplicationDetails/>
      </div>
    );
  }
}



export default UserView;