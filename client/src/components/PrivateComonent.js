import React from "react";
import {Route,Redirect} from "react-router-dom";
const loggedin = () =>
{
      var token = localStorage.getItem("token");
      if (token == null)
         return (false);
     else
         return (true);
    
}
const PrivateComponenet = ({component : Component}) =>
(
    <Route 
    render = {()=>(
       loggedin()
       ?<Component/>
       :<Redirect to = {{
        pathname: '/'
  
    }}/>

    )} 
    
    />
)
   
export default PrivateComponenet;


