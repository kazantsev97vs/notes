/**
 * Заметка
 */
import ColorModel from "./color-model";

class NoteModel {

    id = null;

    /**
     * Заголовок заметки
     * @type {string}
     */
    header = "";

    /**
     * Текст заметки
     * @type {string}
     */
    body = "";

    /**
     * Дата создания заметки
     * @type {Date}
     */
    creationDate = new Date();

    /**
     * Дата последнего обновления заметки
     * @type {Date}
     */
    lastModifiedDate = new Date();

    // ---------------------------

    /**
     * Ярлык заметки - нужен для категоризации заметок, поиска
     * @type {string}
     */
    labelList = [];

    /**
     * Цвет фона заметки - нужен для поиска заметок
     * @type {string}
     */
    backgroundColor = new ColorModel();

    /**
     * Цвет текста заметки
     * @type {string}
     */
    color = new ColorModel();

    // /**
    //  * Картинки заметки - загрузка файла
    //  * @type {{alt: string, url: string}[]}
    //  */
    // images = [];
}

export default NoteModel;