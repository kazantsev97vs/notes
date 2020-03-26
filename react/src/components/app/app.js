import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import { withCookies } from 'react-cookie';

import withService from "../../additional-components/hoc/withService";
import {AuthRouter, Router} from "../../router";
import {
    loginUser,
    fetchColorsRequest,
    fetchColorsError,
    fetchColorsSuccess,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserError,
    logoutUser
} from "../../redux/actions";
import compose from "../../utils/compose";
import './app.css';
import Header from "../header";
import MenuLeftBlock from "../menu-left-block";

class App extends Component {
    
    state = {
        isMenuOpen: false
    };

    onToggleMenu = () => {
        this.setState(({isMenuOpen}) => ({isMenuOpen: !isMenuOpen}));
    };



    render() {
        const {isMenuOpen} = this.state;
        const {isAuthorized} = this.props;

        if (!isAuthorized) {
            return (
                <React.Fragment>
                    {/*<Redirect to="/login" />*/}
                    <AuthRouter/>
                </React.Fragment>
            );
        }

        return (
            <div className='app'>
                <Header onToggleMenu={this.onToggleMenu}/>

                <div className='app-blocks'>
                    <div
                        className='left-block'
                        style={{marginLeft: isMenuOpen ? '0px' : '-200px'}}
                    >
                        <MenuLeftBlock />
                    </div>

                    <div className='right-block'>
                        {/*<Redirect to="/" />*/}
                        <Router/>
                    </div>
                </div>


            </div>
        );
    }

    componentDidMount() {
        const {loginUser, logoutUser, cookies, getUserByUsername, fetchUserSuccess, fetchUserError} = this.props;

        const userInfo = cookies.getCookie('userInfo');
        console.log(userInfo);

        // Если в куках есть 'userInfo'
        if (userInfo) {
            // Проверяем на актуальность токен
            fetchUserRequest();
            getUserByUsername(userInfo.username)
                .then(res => {
                    console.log(res);
                    loginUser();
                    fetchUserSuccess(res)
                })
                .catch(error => {
                    // Токен не актуален
                    logoutUser(error.name + " : " + error.message);
                    fetchUserError(error.name + " : " + error.message);
                    cookies.deleteCookie('userInfo');
                });
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            cookies, getUserByUsername, isAuthorized, loginUser, logoutUser,
            fetchUserRequest, fetchUserSuccess, fetchUserError,
            getAllColors, fetchColorsRequest, fetchColorsError, fetchColorsSuccess
        } = this.props;

        const userInfo = cookies.getCookie('userInfo');
        if (!isAuthorized && userInfo) {

            // Проверяем на актуальность токен
            fetchUserRequest();
            getUserByUsername(userInfo.username)
                .then(res => {
                    console.log(res);
                    loginUser();
                    fetchUserSuccess(res)
                    window.history.go('/');
                })
                .catch(error => {
                    // Токен не актуален
                    logoutUser(error.name + " : " + error.message);
                    fetchUserError(error.name + " : " + error.message);
                    cookies.deleteCookie('userInfo');
                });
        }

        // если сейчас пользователь стал авторизован
        if (isAuthorized && !prevProps.isAuthorized) {

            getUserByUsername(userInfo.username)
                .then(res => {
                    console.log(res);
                    fetchUserSuccess(res)
                })
                .catch(error => {
                    // Токен не актуален
                    logoutUser(error.name + " : " + error.message);
                    fetchUserError(error.name + " : " + error.message);
                    cookies.deleteCookie('userInfo');
                });

            fetchColorsRequest();
            getAllColors()
                .then(response => {
                    console.log(response);
                    fetchColorsSuccess(response);
                })
                .catch(err => {
                    console.log(err);
                    fetchColorsError(err);
                });
        }

    }
}

const mapMethodsToProps = ({
       authController : { cookies },
       noteController : { save, update, getAllNotes },
       userController : { getUserByUsername, addLabel },
       colorController: { getAllColors }

}) => ({
    cookies,
    save, update, getAllNotes,
    getUserByUsername, addLabel,
    getAllColors
});

const mapStateToProps = ({auth: {isAuthorized} }) => ({ isAuthorized });

const mapDispatchToProps = {
    loginUser, logoutUser,
    fetchUserError, fetchUserSuccess, fetchUserRequest,
    fetchColorsRequest, fetchColorsError, fetchColorsSuccess
};

export default compose(
    withCookies,
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(App);