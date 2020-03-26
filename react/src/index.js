import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import {AuthController, ColorController, NoteController, UserController} from "./services";
import ErrorBoundary from "./additional-components/error-boundary";
import {AppProvider} from "./additional-components/app-context";
import App from "./components/app";
import store from "./redux/store";

const controllers = {
    authController: new AuthController(),
    userController: new UserController(),
    noteController: new NoteController(),
    colorController: new ColorController(),
};

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <CookiesProvider>
                <AppProvider value={controllers}>
                        <Router>
                            <App />
                        </Router>
                </AppProvider>
            </CookiesProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);