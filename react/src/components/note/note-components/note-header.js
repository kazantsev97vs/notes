import React from "react";
import ContentEditableArea from "../../content-editable-area";

const NoteHeader = ({textareaPlaceholder, getValue, value, display, clear}) => {
    if (!display) return null;
    return (
        <div className={`note-header-body ${display ? '' : 'display-none'}`}>

            <ContentEditableArea
                id='note-header-area'
                textareaPlaceholder={textareaPlaceholder}
                getValue={getValue}
                setValue={value}
                clear={clear}
            />

        </div>
    );
};

export default NoteHeader;