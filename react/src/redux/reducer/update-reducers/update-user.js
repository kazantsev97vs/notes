import {
    FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS,
    UPDATE_USER_NOTE_LIST, UPDATE_USER_LABEL_LIST, UPDATE_USER_COLOR_LIST
} from "../../action-types";
import UserModel from "../../../models/user-model";

export const updateUser = (state, action) => {

    if (state === undefined) {
        return new UserModel();
    }

    switch (action.type) {

        case FETCH_USER_REQUEST:
            return {
                ...state.user,
                loading: true,
                error: null
            };

        case FETCH_USER_SUCCESS:
            return {
                ...action.payload,
                loading: false,
                error: null
            };

        case FETCH_USER_FAILURE:
            return {
                ...state.user,
                loading: false,
                error: action.payload
            };

        case UPDATE_USER_NOTE_LIST:
            return {
                ...state.user,
                noteList: action.payload
            };

        case UPDATE_USER_LABEL_LIST:
            return {
                ...state.user,
                labelList: action.payload
            };

        case UPDATE_USER_COLOR_LIST:
            return {
                ...state.user,
                colorList: action.payload
            };

        default:
            return state.user;
    }
};