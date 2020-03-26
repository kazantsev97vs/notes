import React, {Component} from "react";
import './note.css';
import '../app/colors.css';

import {Type} from "../../utils";
import NoteModel from "../../models/note-model";

import NoteHeader from "./note-components/note-header";
import NoteBody from "./note-components/note-body";
import NoteFooter from "./note-components/note-footer";
import withService from "../../additional-components/hoc/withService";
import compose from "../../utils/compose";
import {connect} from "react-redux";
import {updateUserColorList, updateUserNoteList} from "../../redux/actions";
import ColorModel from "../../models/color-model";
import Rubbish from './icons/rubbish';

class Note extends Component {

    state = {
        note: new NoteModel(),

        // Вспомогательные: -------------------------------
        isNoteOpen: false,

        isShowHeader: false,
        isShowBody: false,
        isShowFooter: false,

        isAttached: false,

        isNoteChanged: false,
        clear: false

        // isHeaderChanged: false,
        // isBodyChanged: false,
        // isCreationDateChanged: false,
        // isLastModifiedDateChanged: false,
        // isLabelChanged: false,
        // isBackgroundColorChanged: false,
        // isColorChanged: false,
        // isImagesChanged: false,
    };

    setHeader = (value) => {
        const note = {...this.state.note};

        if (note.header !== value) {
            note.header = value;
            this.setState({note, isNoteChanged: true});
        }
    };
    setBody   = (value) => {
        const note = {...this.state.note};
        if (note.body !== value) {
            note.body = value;
            this.setState({note, isNoteChanged: true});
        }
    };
    setBackground = (color) => {
        const note = {...this.state.note};
        note.backgroundColor = new ColorModel(color.id, color.name, color.color);
        this.setState({note, isNoteChanged: true});
    };
    setColor = (color) => {
        const note = {...this.state.note};
        if (note.color !== color) {
            note.color = new ColorModel(color.id, color.name, color.color);
            this.setState({note, isNoteChanged: true});
        }
    };

    addLabel = (label) => {
        const { note: {id} } = this.state;
        const {addLabelToNoteLabelList, deleteLabelFromNoteLabelList,
            updateUserNoteList, noteList, index} = this.props;

        const note = {...this.state.note};
        const labelList = note.labelList;

        // Если ярлык уже на заметке
        if (labelList.find(item => item.id === label.id)) {
            // удалим его
            const labelList = note.labelList.filter(labelItem => labelItem.id !== label.id);
            note.labelList = labelList;
            this.setState({note: note});

            if (id) {
                deleteLabelFromNoteLabelList(id, label)
                    .then(labelList => {
                        console.log(labelList);

                        note.labelList = labelList;

                        updateUserNoteList([
                            ...noteList.slice(0, index),
                            note,
                            ...noteList.slice(index + 1)
                        ]);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }

        } else {
            // Если ярлыка нет на заметке, то добавим его
            const labelList = [...note.labelList, label];
            note.labelList = labelList;
            this.setState({note: note});

            if (id) {
                addLabelToNoteLabelList(id, label)
                    .then(labelList => {
                        console.log(labelList);

                        note.labelList = labelList;

                        updateUserNoteList([
                            ...noteList.slice(0, index),
                            note,
                            ...noteList.slice(index + 1)
                        ]);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    };

    // deleteLabel = (label) => {
    //     const { note: {id} } = this.state;
    //     const {deleteLabelFromNoteLabelList} = this.props;
    //
    //     if (id) {
    //         deleteLabelFromNoteLabelList(id, label)
    //             .then(labelList => {
    //                 const note = {...this.state.note};
    //                 note.labelList = labelList;
    //                 this.setState({note: note});
    //             })
    //             .catch(res => {
    //                 console.log(res);
    //             });
    //     }
    //
    //
    // };

    render() {
        const {note} = this.props;
        const {
            note: {
                id, header, body, labelList, creationDate,
                lastModifiedDate, backgroundColor, color
            },
            isNoteOpen, isShowHeader, isShowBody, isShowFooter, clear
        } = this.state;

        const bodyPlaceholder   = 'Заметка...';
        const headerPlaceholder = isNoteOpen ? 'Введите заголовок...' : bodyPlaceholder;
        const noteOpen =          isNoteOpen ? 'note-open' : '';
        const onClick = isNoteOpen ? null : this.onNoteOpen;
        const onMouseEnter = !isNoteOpen && note ? this.onNoteOpen : null;
        const onMouseLeave = isNoteOpen && note ? this.onNoteClose : null;

        console.log(this.state.note)

        return (
            <div
                id={id}
                className={`note ${backgroundColor.color}-background-color ${color.color}-color ${noteOpen}`}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >

                {
                    note &&
                    <button
                        className="drop-note"
                        onClick={this.onNoteDelete}
                    >
                        <Rubbish color={"white"}/>
                    </button>
                }

                <NoteHeader
                    display={isShowHeader}
                    textareaPlaceholder={headerPlaceholder}
                    getValue={this.setHeader}
                    value={header}
                    clear={clear}
                />

                <NoteBody
                    display={isShowBody}
                    textareaPlaceholder={bodyPlaceholder}
                    getValue={this.setBody}
                    value={body}
                    clear={clear}
                />

                <div className='note-labels'>
                    {
                        labelList.map(label => {
                            return (
                                <span
                                    key={label.id}
                                    className="note-label"
                                    onClick={() => this.addLabel(label)}
                                >
                                    {label.name}
                                </span>
                            );
                        })
                    }
                </div>

                <NoteFooter
                    noteId={id}
                    opacity={!!note}
                    display={isShowFooter}
                    onNoteClose={this.onNoteClose}
                    onBackgroundPaletteItemSelect={this.setBackground}
                    onColorPaletteItemSelect={this.setColor}
                    addLabel={this.addLabel}
                />

            </div>
        );
    }

    componentDidMount() {
        const {note} = this.props;

        if (note) {
            this.setState({
                isShowHeader: !!note.header,
                isShowBody: !!note.body,
                note,
            });
        } else {
            this.setState({
                isShowHeader: true,
                isShowBody: false
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {availableColorList, note} = this.props;
        const {clear} = this.state;

        if (!note && !prevProps.availableColorList && availableColorList) {
            this.setState({note: this.createDefaultNote()});
        }

        if (!prevState.clear && clear) {
            this.setState({clear: false, note: this.createDefaultNote()})
        }

    }

    createDefaultNote = () => {
        const {availableColorList} = this.props;
        const note = new NoteModel();
        note.backgroundColor = availableColorList[0];
        note.color = availableColorList[1];
        return note;
    };

    updateNote = (index) => {
        const {updateNote, noteList, id} = this.props;
        const {note} = this.state;

        updateNote(id, note)
            .then(response => {
                console.log(response);
                updateUserNoteList([
                    ...noteList.slice(0, index),
                    response.note,
                    ...noteList.slice(index + 1)
                ]);
                updateUserColorList(response.colors);
            })
            .catch(err => {
                console.log(err);

            })
    };

    // Методы:

    /**
     * Открыть заметку
     * @param event
     */
    onNoteOpen = (event) => {
        event.stopPropagation();

        this.setState({
            isNoteOpen: true,
            isShowHeader: true, isShowBody: true, isShowFooter: true
        });

        window.addEventListener('click', this.onCheckNoteClose);
    };

    /**
     * Закрыть заметку
     * @param event
     */
    onNoteClose = (event) => {
        if (event) event.stopPropagation();

        window.removeEventListener('click', this.onCheckNoteClose);

        const {note: {header, body}} = this.state;

        // Если заметка была изменена
        if (this.state.isNoteChanged) {

            // Заметка из списка заметок
            if (this.props.note) {
                this.updateNote();
                // Создается новая заметка
            } else {
                this.saveNote();
            }
        }

        this.setState({
            isNoteOpen: false,
            isShowHeader: !!header || !body,
            isShowBody: !!body,
            isShowFooter: false,
            isNoteChanged: false
        });
    };

    saveNote = () => {
        const {id, noteList, saveNote, updateUserNoteList, updateUserColorList} = this.props;
        const {note} = this.state;

        if (note.header || note.body) {
            saveNote(id, note)
                .then((response) => {

                    console.log("note.header || note.body", note.header, note.body)
                    updateUserNoteList([response.note, ...noteList ]);
                    updateUserColorList(response.colors);

                    this.setState({
                        note: this.createDefaultNote(),
                        clear: true,
                        isShowBody: false
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    };

    onNoteDelete = () => {
        const {id, noteList, deleteNote, updateUserNoteList, updateUserColorList, index} = this.props;

        deleteNote(id, this.state.note)
            .then((response) => {
                this.setState({note: new NoteModel()});

                updateUserNoteList([...noteList.slice(0, index), ...noteList.slice(index + 1)]);
                updateUserColorList(response.colors);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    /**
     * Проверка: следует закрывать заметку или нет
     * @param event
     */
    onCheckNoteClose = (event) => {
        let element = event.target;
        let classList = element.classList;

        while (element) {
            // Если текущий элемент - компонент-заметка
            if (classList.contains("note-open")) break;

            // запоминаем родительский узел
            element = element.parentNode;

            // Если родительского класса нет (был удален из DOM)
            if (!element) break;

            // и список его классов
            classList = element.classList;

            // Если у элемента нет классов или текущий элемент - компонент-app
            if (Type.isUndefined(classList) || classList.contains('app')) {
                this.onNoteClose();
                break;
            }
        }
    };
}

const mapMethodsToProps = ({
       noteController : { updateNote, addLabelToNoteLabelList, deleteLabelFromNoteLabelList },
       userController : { saveNote, deleteNote }
}) => ({ saveNote, deleteNote, updateNote, addLabelToNoteLabelList, deleteLabelFromNoteLabelList });

const mapStateToProps = ({
        user: {id, noteList},
        colors: {availableColorList}
}) => ({ id, noteList, availableColorList });

const mapDispatchToProps = {
    updateUserNoteList,
    updateUserColorList,
};

export default compose(
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(Note);