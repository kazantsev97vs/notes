import React, {Component} from "react";
import './content-editable-area.css';
import {logoutUser} from "../../redux/actions";

/**
 * Класс заменяющий textarea
 */
class ContentEditableArea extends Component {

    state = {
        isShowPlaceholder: true,
        value: "",
    };

    render() {
        const {id, textareaPlaceholder} = this.props;
        const {isShowPlaceholder, value} = this.state;

        console.log(value);

        return (
            <div className='content-editable-area-wrapper'>
                {
                    isShowPlaceholder &&
                    <div className='content-editable-area placeholder'>{textareaPlaceholder}</div>
                }

                <div
                    id={id}
                    className='content-editable-area inner'
                    contentEditable
                    autoFocus
                    aria-multiline
                    spellCheck
                    role={"textbox"}
                    dangerouslySetInnerHTML={{__html: value}}
                    onInput={this.onChange}
                    // onBlur={this.onBlur}
                />
            </div>
        );
    }

    // LIFE CYCLE:

    componentDidMount() {
        this.initialization(this.props.setValue);
        console.log(this.props.setValue)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.clear) {
            this.contentEditableArea.innerHTML = "";
            this.initialization("");
        }
    }

    // METHODS:

    /**
     * Присваивание содержимого для текстовой области и установка флага показа placeholder-а
     * @param value
     */
    initialization = (value) => this.setState({value, isShowPlaceholder: !value});

    /**
     * Рекурсивный поиск текста в узле
     * @param node
     * @returns {boolean}
     */
    findText (node) {
        // Если текущее имя узла текст
        if (node.nodeName === "#text") return true;

        // Если узел имеет дочерние узлы
        if (node.hasChildNodes()) {

            // Запоминаем дочерние узлы
            const childNodes = node.childNodes;

            // Проходимся по каждому дочернему узлу
            for (let i = 0; i < childNodes.length; i++) {
                if (this.findText(childNodes[i])) return true;
            }
        }

        return false;
    }

    /**
     * При изменении текстовой области, будет отображен "placeholder"
     * или скрыт в зависимости от наличия содержимого,
     * последнее будет сохранено в state.value
     * @param event
     */
    onChange = (event) => {
        this.contentEditableArea = event.target;
        this.setState({isShowPlaceholder: !this.findText(event.target)});

        if (this.props.getValue) this.props.getValue(this.contentEditableArea.innerHTML);

    };

    /**
     * Вернуть содержимое текстовой области
     * @param event
     */
    onBlur = (event) => {
        if (this.props.getValue) this.props.getValue(event.target.innerHTML);
    };
}


export default ContentEditableArea;