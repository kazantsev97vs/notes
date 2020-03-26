import {FETCH_LOGIN_USER, FETCH_LOGOUT_USER} from '../action-types';

const loginUser = ()  => ({type: FETCH_LOGIN_USER});
const logoutUser = (err) => ({type: FETCH_LOGOUT_USER, payload: err});

export {
    loginUser,
    logoutUser,
};