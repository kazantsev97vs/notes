import {AuthController} from "../index";

export default class ColorController extends AuthController {

    COLOR_URL = "colors/";

    /** CRUD: ---------------------------------------------------------------------- */

    getAllColors = async () => {
        const response = await this.GET(this.COLOR_URL);
        return this.promise(response);
    };

    getColor = async (name) => {
        const response = await this.GET(this.COLOR_URL + name);
        return this.promise(response);
    };

}