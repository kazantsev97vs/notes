import React from "react";
import {Route, Switch} from 'react-router-dom';

import LoginComponent from "./pages/login-component/login-component";
import SignComponent from "./pages/sign-component/sign-component";

const AuthRouter = () => {

    return (
        <Switch>
            <Route
                path='/login'
                component={LoginComponent}
                exact
            />
            <Route
                path='/sign'
                component={SignComponent}
                exact
            />
        </Switch>
    );
};

export default AuthRouter;