import {AuthController} from "../index";

export default class UserController extends AuthController {

    USER_URL = "users/";

    /** CRUD: ---------------------------------------------------------------------- */

    getUserById = async (userId) => {
        const response = await this.GET(this.USER_URL + userId);
        return this.promise(response);
    };

    getUserByUsername = async (username) => {

        console.log(username)

        const response = await this.POST(this.USER_URL + "username", username);

        console.log(response)
        return this.promise(response);
    };

    updateUser = async (user) => {
        const response = await this.PUT(this.USER_URL + user.id, user);
        return this.promise(response);
    };

    deleteUser = async (userId) => {
        const response = await this.DELETE(this.USER_URL + userId);
        return this.promise(response);
    };


    /** NOTES: --------------------------------------------------------------------- */

    saveNote = async (userId, note) => {
        const response = await this.POST(this.USER_URL + userId + '/note', note);
        return this.promise(response);
    };

    deleteNote = async (userId, note) => {
        const response = await this.DELETE(this.USER_URL + userId + '/note', note);
        return this.promise(response);
    };

    /** LABELS: -------------------------------------------------------------------- */

    addLabel = async (userId, label) => {
        const response = await this.POST(this.USER_URL + userId + '/label', label);
        return this.promise(response);
    };

    removeLabel = async (userId, label) => {
        const response = await this.DELETE(this.USER_URL + userId + '/label', label);
        return this.promise(response);
    };

    updateLabel = async (userId, label) => {
        const response = await this.PUT(this.USER_URL + userId + '/label', label);
        return this.promise(response);
    };
}