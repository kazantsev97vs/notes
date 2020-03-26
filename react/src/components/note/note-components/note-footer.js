import React from "react";
import paletteIcon from "../icons/palette.svg";
import penIcon from "../icons/pen.svg";
import Palette from "../../palette-component";
import Dots from "../icons/dots";

const NoteFooter = ({
        onNoteClose, onBackgroundPaletteItemSelect, onColorPaletteItemSelect,
        display, opacity, noteId, addLabel
}) => {
    if (!display && !opacity) return null;

    return (
        <div
            className={`note-footer`}
            style={{opacity: display ? 1 : 0}}
        >

            <div className='footer-elements'>

                <div className='footer-elements-left'>

                    <BackgroundPalette
                        icon={paletteIcon}
                        onPaletteItemSelect={onBackgroundPaletteItemSelect}
                    />

                    <PenPalette
                        icon={penIcon}
                        onPaletteItemSelect={onColorPaletteItemSelect}
                    />

                    {
                        display && <Dots noteId={noteId} addLabel={addLabel}/>
                    }


                </div>

                <div className='footer-elements-right'>
                    <div className='button-close-wrapper'>
                        <button
                            className='note-button-close'
                            onClick={onNoteClose}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default NoteFooter;

const PenPalette = ({icon, onPaletteItemSelect}) => {
    return  <Palette
        icon={icon}
        onPaletteItemSelect={onPaletteItemSelect}
    />
};

const BackgroundPalette = ({icon, onPaletteItemSelect}) => {
    return  <Palette
        icon={icon}
        onPaletteItemSelect={onPaletteItemSelect}
    />
};