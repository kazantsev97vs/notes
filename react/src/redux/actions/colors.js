import {FETCH_COLORS_FAILURE, FETCH_COLORS_SUCCESS, FETCH_COLORS_REQUEST} from '../action-types';


const fetchColorsRequest = ()      => ({type: FETCH_COLORS_REQUEST});
const fetchColorsSuccess = (colorList)  => ({type: FETCH_COLORS_SUCCESS, payload: colorList});
const fetchColorsError   = (error) => ({type: FETCH_COLORS_FAILURE, payload: error});

export {
    fetchColorsRequest,
    fetchColorsSuccess,
    fetchColorsError,
};