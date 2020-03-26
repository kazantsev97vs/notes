import {

    FETCH_NOTES_FAILURE,
    FETCH_NOTES_REQUEST,
    FETCH_NOTES_SUCCESS,

} from "../../action-types";

export const updateNotes = (state, action) => {

    if (state === undefined) {
        return {
            list: [],
            loading: false,
            error: null,
        }
    }

    switch (action.type) {

        case FETCH_NOTES_REQUEST:
            return {
                list: [],
                loading: true,
                error: false
            };

        case FETCH_NOTES_SUCCESS:
            return {
                list: action.payload,
                loading: false,
                error: false
            };

        case FETCH_NOTES_FAILURE:
            return {
                list: [],
                loading: false,
                error: false
            };

        default:
            return state.notes;
    }
};