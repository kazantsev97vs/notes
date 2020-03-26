import React, {Component} from "react";
import './search-input.css';
import ClearSvg from "./clear-svg";
import SearchSvg from "./search-svg";

export default class Input extends Component {

    state = {
        value: '',
        isOnFocus: false,
        isShowClearButton: false
    };

    render() {
        const {value, isOnFocus, isShowClearButton} = this.state;
        const {placeholder} = this.props;
        const background = isOnFocus ? 'white-background-color' : '';
        const color = isOnFocus ? '#5f6368' : 'rgba(255,255,255, 0.87)';

        return (
            <div
                className={`search-wrapper ${background}`}
                onClick={this.onClick}
            >

                <button className='search-button'>
                    <SearchSvg color={color}/>
                </button>

                <input
                    onKeyPress={this.onKeyPress}
                    className={`search-inner`}
                    placeholder={placeholder}
                    style={{color}}
                    onChange={this.onInput}
                    value={value}
                />

                <button
                    className='clear-button'
                    style={{display: isShowClearButton ? 'block' : 'none'}}
                    onClick={this.onButtonClearClick}
                >
                    <ClearSvg color={color}/>
                </button>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.setValue) this.setState({value: this.props.setValue})
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.setValue !== this.props.setValue) this.setState({value: this.props.setValue})
    }

    onClick = (e) => {
        e.stopPropagation();
        window.addEventListener('mouseup', this.onBlur);
        this.setState({isOnFocus: true});

        if (this.props.onClick) this.props.onClick();
    };

    onBlur = (e) => {
        window.removeEventListener('mouseup', this.onBlur);
        this.setState({isOnFocus: this.isContainsSearchWrapper(e.target)});
    };

    onKeyPress = (e) => {
        // Если нажали на Enter
        if (e.charCode === 13) {
            if (this.props.getValue) this.props.getValue(this.state.value);
            this.setState({value: '', isShowClearButton: false});
        }
    };

    onInput = (e) => {
        const value = e.target.value;
        this.setState({value, isShowClearButton: !!value});
    };

    onButtonClearClick = () => {
        if (this.props.onButtonClearClick) {
            this.props.onButtonClearClick();
        } else {
            this.setState({value: '', isShowClearButton: false});
        }
    };

    isContainsSearchWrapper (element) {
        if (!element) return false;

        const classList = element.classList;

        // Если есть classList
        if (classList !== undefined ) {

            if (classList.contains('search-wrapper')) return true;

            if (classList.contains('app')) return false;

            this.isContainsSearchWrapper(element.parentElement)
        }

        return false;
    }
}