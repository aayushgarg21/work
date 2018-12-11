import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './../../src/landingpage.css';
import { Link } from "react-router-dom";

 
class DemoCarousel extends Component {
    render() {
        return (
          <div>
                 <div class="context">
        <h1 style = {{textAlign:"left", marginLeft : 30}}>Streamer</h1>
        <h3 style = {{textAlign:"left", marginLeft : 30,padding : 17}}>The primary objective of the Data Platform is solving the problem of building interconnected intelligent applications which can subscribe to activities of other applications deployed as part of the StackRoute 2.0 Platform, to reduce workflow friction and performance overhead. The secondary objective, is to build Client Libraries that would help developers to quickly integrate their applications with the Data Platform, to build reactive functionalities within applications.</h3>
        <h1 style = {{padding : 17,textAlign:"left", marginLeft : 30}}>Quick Start</h1>
        <h3 style = {{padding : 17,textAlign:"left",marginLeft : 30}}>1. Register Your Application and Generate Token</h3>
        <h3 style = {{padding : 17,textAlign:"left",marginLeft : 30}}>2. Implement Activities Genertor</h3>
        <h3 style = {{padding : 17,textAlign:"left",marginLeft : 30}}>3. Get Reports</h3>
        <a href= "#" class="myButton">Signin</a>
        <a href= "/#/register" class="myButton">Register</a>

    </div>



<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
          </div>
            
        );
    }
}
export default DemoCarousel