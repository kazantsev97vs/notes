import React from "react";
import ContentEditableArea from "../../content-editable-area";

const NoteBody = ({textareaPlaceholder, getValue, value, display, clear}) => {

    if (!display) return null;

    return (
        <div className={`note-body ${display ? '' : 'display-none'}`}>

            <ContentEditableArea
                id='note-body-area'
                textareaPlaceholder={textareaPlaceholder}
                getValue={getValue}
                setValue={value}
                clear={clear}
            />

        </div>
    );
};

export default NoteBody;