import React from "react";
import {Route, Switch} from 'react-router-dom';
import {HomePage, SearchPage} from './pages';

const Router = () => {
    return (
        <div className='main-router'>

            <Switch>
                <Route
                    path='/'
                    component={HomePage}
                    exact
                />
                <Route
                    path='/search'
                    component={SearchPage}
                    exact
                />
            </Switch>

        </div>

    );
};

export default Router;