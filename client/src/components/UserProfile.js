import React from "react"
import Avatar from "./Avatar";
import jwt from "jsonwebtoken";
import ApplicationRegistered from "./ApplicationRegistered";
import Typography from '@material-ui/core/Typography';


class userProfile extends React.Component {
  
  name = ""
  getname() {
    var token = localStorage.getItem("token");
    var decoded = jwt.verify(token, 'shhhhh');
    this.name = decoded.userName;
  }
  



  render() {

    return (
      <div style={{ padding: 50 }}>
        <div >
         
            <Avatar />
            {this.getname()}
           
            <Typography variant = "h5">{this.name}</Typography>
            <Typography variant = "h6" className = "register"> Registered Applications: </Typography>
            <ApplicationRegistered userName={this.name} />
          

        </div>

      </div>
    );
  }
}
export default userProfile;