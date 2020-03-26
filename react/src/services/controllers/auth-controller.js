import Service from "../service";
import Cookies from "../../utils/Cookies";


class AuthController extends Service {

    AUTH_URL = "authentication/";

    cookies = new Cookies();

    registration = async (user) => {
        const response = await super.POST (this.AUTH_URL + "registration", user);
        return this.promise(response);
    };

    login = async (loginUser) => {

        const response =  await super.POST(this.AUTH_URL + "login", loginUser);

        // Если пользователь авторизован, и токен пришел
        if (response.status === 200 && response.message === "success" && response.result) {

            const userInfo = {
                username: loginUser.username,
                token: response.result
            };

            this.cookies.setCookie("userInfo", userInfo);
        }

        return this.promise({...response, result: response.message});
    };

    logout = async () => {
        const response = await this.POST (this.AUTH_URL + "logout");

        this.cookies.deleteCookie("userInfo");

        return this.promise(response);
    };

    GET = ( url, headers ) => super.GET ( url, this.withTokenHeader(headers) );

    POST = ( url, body, headers ) => super.POST ( url, body, this.withTokenHeader(headers) );

    PUT = ( url, body, headers ) => super.PUT ( url, body, this.withTokenHeader(headers) );

    DELETE = ( url, body, headers ) => super.DELETE ( url, body, this.withTokenHeader(headers) );

    withTokenHeader ( headers ) {

        const userInfo = this.cookies.getCookie("userInfo");

        if ( userInfo && userInfo.token ) {
            headers = {
                "Authorization": "Bearer " + userInfo.token,
                ...headers
            };
        }

        return headers;
    }
}

export default AuthController;
