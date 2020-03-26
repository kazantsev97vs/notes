import {loginUser, logoutUser} from './auth';
import {fetchUserRequest, fetchUserSuccess, fetchUserError, updateUserNoteList, updateUserLabelList, updateUserColorList} from './user';
import {fetchColorsRequest, fetchColorsSuccess, fetchColorsError} from './colors';

export {
    // AUTH
    loginUser, logoutUser,

    // USER:
    fetchUserRequest, fetchUserSuccess, fetchUserError,
    updateUserNoteList, updateUserLabelList, updateUserColorList,

    // COLORS:
    fetchColorsRequest, fetchColorsSuccess, fetchColorsError,
};