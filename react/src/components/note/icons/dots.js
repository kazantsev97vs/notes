import React, {Component} from "react";
import './dots.css';
import {updateUserColorList, updateUserNoteList} from "../../../redux/actions";
import compose from "../../../utils/compose";
import withService from "../../../additional-components/hoc/withService";
import {connect} from "react-redux";

class Dots extends Component {

    state = {
        color: "#ffffff",
        isListOpen: false,
        isAddLabelOpen: false
    };

    onToggleList = () => {
        this.setState(state => ({isListOpen: !state.isListOpen}))
    };

    onAddLabel = () => {
        this.setState(state => ({isAddLabelOpen: !state.isAddLabelOpen}))
    };

    onAddLabelItem = (label) => {
        const {addLabel} = this.props;
        addLabel(label);
    };

    render() {
        const {color, isListOpen, isAddLabelOpen} = this.state;
        const {labelList} = this.props;

        return (
            <div
                className='dots'
                onClick={this.onToggleList}
            >
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" y="0px" x="0px"
                     viewBox="0 0 18 18" enableBackground="new 0 0 18 18" fill={color}>
                    <path
                        d="m9 5.5c1 0 1.8-0.8 1.8-1.8s-0.8-1.7-1.8-1.7-1.8 0.8-1.8 1.8 0.8 1.7 1.8 1.7zm0 1.7c-1 0-1.8 0.8-1.8 1.8s0.8 1.8 1.8 1.8 1.8-0.8 1.8-1.8-0.8-1.8-1.8-1.8zm0 5.3c-1 0-1.8 0.8-1.8 1.8s0.8 1.7 1.8 1.7 1.8-0.8 1.8-1.8-0.8-1.7-1.8-1.7z"/>
                </svg>

                {
                    isListOpen &&
                    <div className='list-block'>
                        <ul className='list'>
                            <li
                                className='label-item'
                                onClick={this.onAddLabel}
                            >
                                Добавить ярлык</li>
                        </ul>
                    </div>
                }
                {
                    isAddLabelOpen &&
                    <div className='list-block add-label'>
                        <ul className='list'>
                            {
                                labelList.map(label => {
                                    return (
                                        <li
                                            onClick={() =>this.onAddLabelItem(label)}
                                            className='label-item'
                                            key={label.id}
                                        >
                                            {label.name}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

const mapMethodsToProps = ({
    noteController : { addLabelToNoteLabelList, deleteLabelFromNoteLabelList },
}) => ({ addLabelToNoteLabelList, deleteLabelFromNoteLabelList });

const mapStateToProps = ({
    user: {id, labelList},
}) => ({ id, labelList });

const mapDispatchToProps = {
    updateUserNoteList,
    updateUserColorList,
};

export default compose(
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(Dots);