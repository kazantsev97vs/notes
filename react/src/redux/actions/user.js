import {
    FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS,
    UPDATE_USER_NOTE_LIST, UPDATE_USER_LABEL_LIST, UPDATE_USER_COLOR_LIST
} from '../action-types';

const fetchUserRequest = ()      => ({type: FETCH_USER_REQUEST});
const fetchUserSuccess = (user)  => ({type: FETCH_USER_SUCCESS, payload: user});
const fetchUserError   = (error) => ({type: FETCH_USER_FAILURE, payload: error});

const updateUserNoteList   = (list) => ({type: UPDATE_USER_NOTE_LIST, payload: list});
const updateUserLabelList   = (list) => ({type: UPDATE_USER_LABEL_LIST, payload: list});
const updateUserColorList   = (list) => ({type: UPDATE_USER_COLOR_LIST, payload: list});

export {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserError,
    updateUserNoteList,
    updateUserLabelList,
    updateUserColorList,
};