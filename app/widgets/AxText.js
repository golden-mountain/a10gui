"use strict";
import React, { Component } from 'react';
import Subschema from 'subschema/dist/subschema-server';
import TextField from 'material-ui/lib/text-field';

const {decorators, PropTypes } = Subschema;
const {provide, listeners } = decorators;


@provide.type
export default class AxText extends React.Component {
    static inputClassName = ' ';

    static propTypes = {
        onChange: PropTypes.valueEvent
    }

    constructor(props, ...rest) {
        super(props, ...rest);
        var state = this.state || (this.state = {});
        state.value = props.value;

    }

    componentWillReceiveProps(newProps) {
        if (newProps.value !== this.props.value) {
            this.setState({value: newProps.value});
        }
    }

    handleDataChange = (e)=> {
        var value = e.target.value;
        //Not a valid number but valid to become a number
        if (value === '') {
            this.props.onChange(null);
        } else {
            this.props.onChange(value);
            // this.forceUpdate();
            return false;
        }
    }

    render() {
        var {onChange, value, ...props} = this.props;
        return <TextField {...props} value={this.state.value} onChange={this.handleDataChange}/>
    }


} 
