import {AuthController} from "../index";

export default class NoteController extends AuthController {

    NOTE_URL = "notes/";

    updateNote = async (id, note) => {
        const response = await this.PUT(this.NOTE_URL + id, note);
        return this.promise(response);
    };

    /* NOTE-LABELS: ---------------------------------------- */

    addLabelToNoteLabelList = async (noteId, label) => {
        const response = await this.POST(this.NOTE_URL + noteId, label);
        return this.promise(response);
    };

    deleteLabelFromNoteLabelList = async (noteId, label) => {
        const response = await this.DELETE(this.NOTE_URL + noteId, label);
        return this.promise(response);
    };

    findAllByHeader = async (header) => {
        console.log(header);
        const response = await this.POST(this.NOTE_URL + "headers", header);
        console.log(response);
        return this.promise(response);
    };

    findAllByBackgroundColor = async (color) => {
        console.log(color);
        const response = await this.POST(this.NOTE_URL + "colors", color);
        console.log(response);
        return this.promise(response);
    };

    findAllByLabelList = async (label) => {
        console.log(label);
        const response = await this.POST(this.NOTE_URL + "labels", label);
        console.log(response);
        return this.promise(response);
    };

}

// notes = [
//     {
//         id: 1,
//         header: "java test",
//         body: "java body test",
//         creationDate: 'Thu Mar 12 2020 07:03:47 GMT+0700 (Новосибирск, стандартное время)',
//         lastModifiedDate: 'Thu Mar 12 2020 07:03:47 GMT+0700 (Новосибирск, стандартное время)',
//         label: "java label",
//         backgroundColor: "default-background-color",
//         color: "white-color",
//         images: [],
//         isNoteOpen: false,
//         isShowBody: true,
//         isShowFooter: false,
//         isAttached: false
//     },
//     {
//         id: 2,
//         header: "javaScript test",
//         body: "javaScript body test",
//         creationDate: 'Thu Mar 12 2020 07:03:47 GMT+0700 (Новосибирск, стандартное время)',
//         lastModifiedDate: 'Thu Mar 12 2020 07:03:47 GMT+0700 (Новосибирск, стандартное время)',
//         label: "javaScript label",
//         backgroundColor: "default-background-color",
//         color: "white-color",
//         images: [],
//         isNoteOpen: false,
//         isShowBody: true,
//         isShowFooter: false,
//         isAttached: false
//     }
// ];