
export default class Type {

    static Number    = 'Number';
    static String    = 'String';
    static Text      = 'Text';
    static Object    = 'Object';
    static Array     = 'Array';
    static FormData  = 'FormData';
    static Boolean   = 'Boolean';
    static Null      = 'Null';
    static Undefined = 'Undefined';
    static Function  = 'Function';

    static isNumber  = (value) => {
        if (isNaN(value)) return false;
        return this.determineType(value) === Type.Number;
    };
    static isString    = (value) => this.determineType(value) === Type.String;
    static isText      = (value) => this.determineType(value) === Type.Text;
    static isObject    = (value) => this.determineType(value) === Type.Object;
    static isArray     = (value) => this.determineType(value) === Type.Array;
    static isFormData  = (value) => this.determineType(value) === Type.FormData;
    static isBoolean   = (value) => this.determineType(value) === Type.Boolean;
    static isNull      = (value) => this.determineType(value) === Type.Null;
    static isUndefined = (value) => this.determineType(value) === Type.Undefined;
    static isFunction  = (value) => this.determineType(value) === Type.Function;

    /**
     * Определение типа значения
     * @param value
     * @returns {string}
     */
    static determineType(value) {

        switch (Object.prototype.toString.call(value)) {

            case '[object Number]':     return Type.Number;

            case '[object String]':     return Type.String;

            case '[object Text]':     return Type.Text;

            case '[object Object]':     return Type.Object;

            case '[object Array]':      return Type.Array;

            case '[object FormData]':   return Type.FormData;

            case '[object Boolean]':    return Type.Boolean;

            case '[object Null]':       return Type.Null;

            case '[object Undefined]':  return Type.Undefined;

            case '[object Function]':   return Type.Function;

            default: return 'Oops';
        }
    }
}