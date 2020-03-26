import React, {Component} from "react";
import './palette-component.css';
import compose from "../../utils/compose";
import {connect} from "react-redux";

class Palette extends Component {

    state = {
        isShowPaletteBlock: false,
    };

    onHover = () => this.setState({isShowPaletteBlock: true});
    onHoverLose = () => this.setState({isShowPaletteBlock: false});

    render() {
        const {isShowPaletteBlock} = this.state;
        const {icon, onPaletteItemSelect, availableColorList} = this.props;

        return (
            <div
                className='palette'
                onMouseEnter={this.onHover}
                onMouseLeave={this.onHoverLose}
            >
                <img src={icon} alt="palette"/>

                    <div className='place'>
                        {
                            isShowPaletteBlock &&
                            <PaletteBlock
                                colors={availableColorList}
                                onPaletteItemSelect={onPaletteItemSelect}
                            />
                        }
                    </div>

            </div>
        );
    }
}

const PaletteRowItem = ({rowItem, onClick}) => {
    return (
        <div
            className={`palette-item ${rowItem.color}-background-color`}
            onClick={() => onClick(rowItem)}
        >
            {/*<div className='description'>*/}
            {/*    <span>{text}</span>*/}
            {/*</div>*/}
        </div>
    );
};

const PaletteRow = ({rowItems, onClick}) => {
    return (
        <div className='palette-row'>
            {rowItems.map((rowItem, index) =>
                <PaletteRowItem
                    key={index}
                    rowItem={rowItem}
                    onClick={onClick}
                />)
            }
        </div>
    );
};

const PaletteBlock = ({colors, onPaletteItemSelect, colsNumber = 3}) => {

    const rows = [];
    let temp = [];

    for (let i = 0; i < colors.length; i++) {
        temp.push(colors[i]);

        if ((i + 1) % colsNumber === 0) {
            rows.push(temp);
            temp = [];
        }
    }

    if (temp.length > 0) rows.push(temp);

    return (// onMouseEnter={onHover}
        <div className='palette-block'>
            {
                rows.map((item, index) =>
                    <PaletteRow
                        key={index}
                        rowItems={item}
                        onClick={onPaletteItemSelect}
                    />)
            }
        </div>
    );
};

const mapStateToProps = ({colors: {availableColorList} }) => ({ availableColorList });

const mapDispatchToProps = {};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Palette);