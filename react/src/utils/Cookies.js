/**
 * document.cookie предоставляет доступ к куки
 *
 * операция записи изменяет только то куки, которое было указано.
 * имя и значение куки должны быть закодированы.
 * одно куки вмещает до 4kb данных, разрешается более 20 куки на сайт (зависит от браузера).
 *
 * Настройки куки:
 *
 * path=/, по умолчанию устанавливается текущий путь, делает куки видимым только по указанному пути и ниже.
 * domain=site.com, по умолчанию куки видно только на текущем домене, если явно указан домен, то куки видно и на поддоменах.
 * expires или max-age устанавливает дату истечения срока действия, без них куки умрёт при закрытии браузера.
 * secure делает куки доступным только при использовании HTTPS.
 * samesite запрещает браузеру отправлять куки с запросами, поступающими извне, помогает предотвратить XSRF-атаки.
 *
 */

class Cookies {

    /**
     * возвращает куки с указанным name,
     * или undefined, если ничего не найдено
     * @param name
     * @returns {any}
     */
    getCookie(name = "") {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        if (matches) {
            const decodedValue = decodeURIComponent(matches[1]);

            try {
                return  JSON.parse(decodedValue);
            } catch (e) {
                return decodedValue
            }
        }

        return undefined;
    }

    /**
     * Устанавливает куки с именем name и значением value,
     * с настройкой path=/ по умолчанию:
     * @param name
     * @param value
     * @param options={path,domain,expires,secure,samesite}
     */
    setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(JSON.stringify(value));

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    /**
     * Чтобы удалить куки, мы можем установить отрицательную дату истечения срока действия.
     * Когда мы обновляем или удаляем куки, нам следует использовать
     * только такие же настройки пути и домена, как при установки куки.
     * @param name
     */
    deleteCookie(name) {
        this.setCookie(name, "", {
            'max-age': -1
        })
    }

    getCookies = () => {

        const cookies = {};

        // строка, куки разделены ";"
        const decodedCookies = decodeURIComponent(document.cookie);

        if (!decodedCookies) return undefined;

        // массив пар ключ=значение
        const cookiesArray = decodedCookies.split(";");

        cookiesArray.forEach(item => {

            // Разбиваем пару на массив [ ключ, значение ]
            const pairKeyValue = item.split("=");

            // Убираем лишние пробелы вокруг
            const key = pairKeyValue[0].trim();
            let value = pairKeyValue[1].trim();

            try {
                // Пробуем преобразовать в объект
                cookies[key] = JSON.parse(value);

            } catch (ex) {
                // Если не получилось, значит оставляем строку
                cookies[key] = value;
            }
        });

        return cookies;
    };


    // _cookies = {};
    //
    // _cookiesString = null;
    //
    // constructor() {
    //     this.checkCookiesForRelevance();
    // }
    //
    // /**
    //  * Проверяет куки на актуальность
    //  */
    // checkCookiesForRelevance = () => {
    //
    //     // Если куки изменились
    //     if (document.cookie !== this._cookiesString) {
    //
    //         this._cookies = {};
    //         this._cookiesString = document.cookie;
    //
    //         // Если куки есть
    //         if (this._cookiesString) {
    //             // То обносвляем их
    //             this.cookieToObject();
    //         }
    //     }
    // };
    //
    // /**
    //  * Превращает куки в объект
    //  */
    //
    // get (key) {
    //     this.checkCookiesForRelevance();
    //     return this._cookies[key];
    // }
    //
    // set (key, value) {
    //
    //     const stringifyValue = JSON.stringify(value);
    //
    //     const encodedStringifyValue = encodeURIComponent(stringifyValue);
    //
    //     document.cookie = key + "=" + encodedStringifyValue;
    // }
    //
    // all () {
    //     this.checkCookiesForRelevance();
    //     return this._cookies;
    // }
}

export default Cookies;