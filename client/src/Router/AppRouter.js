import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Appbar from "./../components/Appbar"
import Register from "./../components/Register";
import UserView from "../components/UserView";
import PrivateRouter from "./../components/PrivateComonent";
import ActivitySpec from "./../components/ActivitySpecRegistration";
import Download from "./../components/download-token";
import UserProfile from "./../components/UserProfile";
import Version from "./../components/VersionView";
import Search from "./../components/Search";
import App from "./../App";
import Help from "./../components/Help";


class AppRouter extends React.Component {



    render() {


        return (
            <div>

                <HashRouter>
                    <div>
                        <Appbar />


                        <Switch>

                            <Route path="/" component={App} exact={true} />
                            <Route path="/register" component={Register} />
                            <PrivateRouter path="/user-view/register/:appName" component={ActivitySpec} />
                            <PrivateRouter path="/user-view/:id" component={UserView} />
                            <Route path="/app-view/:id/:version" component={Version} />
                            <PrivateRouter path="/download/:appName" component={Download} />
                            <PrivateRouter path="/user" component = {UserProfile}/>
                            <Route path="/search" component = {Search}/>
                            <Route path="/help" component =  {Help} />





                        </Switch>
                    </div>
                </HashRouter>
            </div>
        );
    }
};
export default AppRouter;
