"use strict";
import React, { Component } from 'react';
import Subschema, { types } from 'subschema/dist/subschema-server';

const {decorators, PropTypes, tutils} = Subschema;
const {Select} = types;
const {provide} = decorators;
const {extend, returnFirst, isArray} = tutils;

@provide.type
export default class EditableSelect extends Component {


    static propTypes = {
        options: PropTypes.options,
        multiple: PropTypes.bool,
        onChange: PropTypes.valueEvent,
        placeholder: PropTypes.placeholder
    }

    static defaultProps = {
        options: [],
        multiple: false
    }

    handleSelect = (e)=> {
        var {multiple, placeholder} = this.props;
        if (multiple) {
            //normalize multiple  selection
            var values = [], options = e.target.options, i = 0, l = options.length, option;
            for (; i < l; i++) {
                option = options[i];
                if (option.selected) {
                    if (option.label != placeholder)
                        values.push(option.value);
                }
            }
            this.props.onChange(values);
            return
        } else if (e.target.value === placeholder) {
            this.props.onChange(null);
            return;
        }

        this.props.onChange(e.target.value);
    }

    renderOptions(value) {
        var {multiple, options, placeholder} = this.props;

        options = options || [];
        var hasValue = false, ret = options.map(multiple ? (o, i)=> {
            return <option key={'s' + i} value={o.val}>{o.label}</option>;
        } : (o, i)=> {
            if (!hasValue && o.val + '' == value + '') hasValue = true;
            return <option key={'s' + i} value={o.val}>{o.label}</option>
        });

        if (placeholder) {
            ret.unshift(<option key={'null-' + options.length}>
                {placeholder}</option>);
        }
        return ret;
    }

    handleCreate = (e) => {
        this.props.onChange('model_show');
        e.preventDefault();
    }

    render() {
        var { onChange,value, ...props} = this.props;
        if (props.multiple && !isArray(value)) {
            value = value ? [value] : value;
        }
        console.log(value, 'change');
        return <div className="input-group">
            <select className='form-control' {...props} value={value} onChange={this.handleSelect} >
                {this.renderOptions(value)}
            </select>
            <a  href='#' onClick={::this.handleCreate} className="input-group-addon">A</a>
            <a  href='#' onClick={::this.handleCreate} className="input-group-addon">E</a>
        </div>
    }

}
