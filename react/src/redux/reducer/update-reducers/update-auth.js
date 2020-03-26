import {FETCH_LOGIN_USER, FETCH_LOGOUT_USER} from "../../action-types";

export const updateAuth = (state, action) => {

    if (state === undefined) {
        return {
            isAuthorized: false,
            error: null,
        }
    }

    switch (action.type) {

        case FETCH_LOGIN_USER:
            return {
                isAuthorized: true,
                error: null
            };

        case FETCH_LOGOUT_USER:
            return {
                isAuthorized: false,
                error: action.payload
            };


        default:
            return state.auth;
    }
};