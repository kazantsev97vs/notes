import {updateUser} from "./update-reducers/update-user";
import {updateNotes} from "./update-reducers/update-notes";
import {updateColors} from "./update-reducers/update-colors";
import {updateAuth} from "./update-reducers/update-auth";

const reducer = (state, action) => {

    return {

        auth: updateAuth(state, action),

        user: updateUser(state, action),

        notes: updateNotes(state, action),

        colors: updateColors(state, action),

    };

};

export default reducer;