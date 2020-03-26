import React, {Component} from "react";
import './menu-left-block.css';
import Input from "../search-input";
import {updateUserLabelList} from "../../redux/actions";
import compose from "../../utils/compose";
import {withCookies} from "react-cookie";
import withService from "../../additional-components/hoc/withService";
import {connect} from "react-redux";
import LabelModel from "../../models/label-model";

class MenuLeftBlock extends Component {

    render() {
        const {labelList} = this.props;

        return (
            <div className='menu-left-block'>

                <h4 className='label-header'>Ярлыки</h4>

                <Input getValue={this.onAddLabel} placeholder='Добавить ярлык...'/>

                <div className='list'>
                    {
                        labelList.map((label, index) => {
                            return (
                                <Input
                                    key={label.id}
                                    getValue={(value) => this.onUpdateLabel(index, label, value)}
                                    placeholder={label.name}
                                    setValue={label.name}
                                    onButtonClearClick={() => this.onButtonDeleteClick(index, label)}
                                />

                            );
                        })
                    }
                </div>

            </div>
        );
    }

    onUpdateLabel = (index, label, value) => {
        const {id, updateLabel} = this.props;

        console.log(index, label, value)

        const labelModel = new LabelModel();
        labelModel.id = label.id;
        labelModel.name = value;

        updateLabel(id, labelModel)
            .then(updatedLabel => {
                console.log(updatedLabel)
                this.updateLabelFromUserLabelList(index, updatedLabel);
            })
            .catch(err => {
                console.log(err)
            });
    };

    updateLabelFromUserLabelList = (index, label) => {
        const {labelList, updateUserLabelList} = this.props;
        const userLabelList = [
            ...labelList.slice(0, index),
            label,
            ...labelList.slice(index + 1),
        ];

        updateUserLabelList(userLabelList)
    };

    onAddLabel = (label) => {
        const {id, addLabel} = this.props;
        const labelModel = new LabelModel();
        labelModel.name = label;

        addLabel(id, labelModel)
            .then(addedLabel => {
                this.addLabelToUserLabelList(addedLabel);
            })
            .catch(err => {
                console.log(err)
            });
    };
    onButtonDeleteClick = (index, label) => {
        const {id, removeLabel} = this.props;

        removeLabel(id, label)
            .then(removedLabel => {
                this.removeLabelFromUserLabelList(index);
            })
            .catch(err => {
                console.log(err)
            });
    };

    addLabelToUserLabelList = (addedLabel) => {
        const {labelList, updateUserLabelList} = this.props;
        const userLabelList = [...labelList, addedLabel];
        updateUserLabelList(userLabelList)
    };
    removeLabelFromUserLabelList = (index) => {
        const {labelList, updateUserLabelList} = this.props;
        const userLabelList = [
            ...labelList.slice(0, index),
            ...labelList.slice(index + 1),
        ];
        updateUserLabelList(userLabelList)
    };
}

const mapMethodsToProps = ({userController : { addLabel, removeLabel, updateLabel }}) =>
    ({addLabel, removeLabel, updateLabel});

const mapStateToProps = ({user : { id, labelList } }) => ({ id, labelList });

const mapDispatchToProps = {updateUserLabelList};

export default compose(
    withCookies,
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(MenuLeftBlock);