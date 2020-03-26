import React from "react";
import Note from "../note";

const NotesListItem = ({note}) => {

    // const {
    //     header,
    //     body,
    //     creationDat,
    //     lastModifiedDate,
    //     label,
    //     backgroundColor,
    //     color,
    //     images,
    //     isNoteOpen
    // } = note;

    return <Note note={note}/>;

    // return (
    //     <Fragment>
    //         <span>{header}</span>
    //         <span>{body}</span>
    //         <span>{creationDat}</span>
    //         <span>{lastModifiedDate}</span>
    //         <span>{label}</span>
    //         <span>{backgroundColor}</span>
    //         <span>{color}</span>
    //         <span>{images}</span>
    //         <span>{isNoteOpen}</span>
    //     </Fragment>
    // );
};

export default NotesListItem;