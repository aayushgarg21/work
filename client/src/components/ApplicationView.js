import React from "react";
import Table from "./Table"



class AppView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            applicationName: "",
            versionUsed: "",
        }
    }




    componentDidMount() {

        var pathArray = window.location.hash.split("/");
        var Name = pathArray[2];
        var version = pathArray[3];
        this.setState({ versionUsed: version, applicationName: Name });


    }


    render() {

        return (

            (this.state.versionUsed) ?
                <div className="app-view">

                    <h2 > {this.state.applicationName} <sub>{this.state.versionUsed}</sub></h2>
                    <Table
                        applicationName={this.state.applicationName}
                        version={this.state.versionUsed}
                    />

                </div> :
                <div></div>
        );
    }
}
export default AppView;