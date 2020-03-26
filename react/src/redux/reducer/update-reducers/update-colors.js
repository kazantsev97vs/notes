import {FETCH_COLORS_REQUEST, FETCH_COLORS_SUCCESS, FETCH_COLORS_FAILURE} from "../../action-types";

export const updateColors = (state, action) => {

    if (state === undefined) {
        return {
            availableColorList: null,
            loading: false,
            error: null,
        }
    }

    switch (action.type) {

        case FETCH_COLORS_REQUEST:
            return {
                availableColorList: null,
                loading: true,
                error: null
            };

        case FETCH_COLORS_SUCCESS:
            return {
                availableColorList: action.payload,
                loading: false,
                error: null
            };

        case FETCH_COLORS_FAILURE:
            return {
                availableColorList: null,
                loading: false,
                error: action.payload
            };

        default:
            return state.colors;
    }
};