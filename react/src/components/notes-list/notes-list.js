import React, {Component} from "react";
import NotesListItem from "../notes-list-item";
import {connect} from "react-redux";
import withService from "../../additional-components/hoc/withService";
import {updateUserNoteList, updateUserLabelList, updateUserColorList} from '../../redux/actions';
import compose from "../../utils/compose";
import './notes-list.css';
import Note from "../note";

class NotesList extends Component {

    componentDidMount() {

    }

    render() {
        const { noteList } = this.props;

        return (
            <div className='note-list'>
                {
                    noteList.map((note, index) => {
                        return (
                            <Note key={note.id} index={index} note={note}/>
                        );
                    })
                }
            </div>
        );
    }
}

const mapMethodsToProps = null;

const mapStateToProps = ({user: {noteList}}) => {
    return {noteList};
};

const mapDispatchToProps = {
    updateUserNoteList, updateUserLabelList, updateUserColorList,
};

export default  compose(
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
) (NotesList);