import React from "react";
import {Switch, Route} from 'react-router';
import Auth from "./Auth";
import {SignIn, Home, SignUp, Reset, ProductEdit} from './templates';

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signup"} component={SignUp}/>
            <Route exact path={"/signin"} component={SignIn}/>
            <Route exact path={"/signin/reset"} component={Reset}/>
            <Auth>
                <Route exact path={"(/)?"} component={Home}/>
                <Route exact path={"/product/edit"} component={ProductEdit}/>
            </Auth>
        </Switch>
    )
}

export default Router;