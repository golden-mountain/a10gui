"use strict";
import React, { Component } from 'react';
import Subschema, { types } from 'subschema/dist/subschema-server';

const {decorators, PropTypes, tutils} = Subschema;
const {Select} = types;
const {provide} = decorators;
const {extend} = tutils;

@provide.type
class EditableSelect extends React.Component {
    static inputClassName = ' ';

    static propTypes = {
        onChange: PropTypes.valueEvent
    };

    static defaultProps = {

    };

    //This is bound to the object instance
    handleClick = (e)=> {
        //This updates the valueManager
        this.props.onChange(this.isChecked(this.props.value) ? '' : 'on');
    };

    render() {
        var props = this.props;
        var isChecked = this.isChecked(props.value);

        //you prolly won't do it this way, but use classes instead, but the demo platform
        // has its limitations.
        var container = extend({}, styles.container, isChecked ? styles.on : styles.off);
        var button = extend({}, styles.button, isChecked ? styles.buttonOn : styles.buttonOff);

        return <div className={props.className} style={styles.fieldContainer}>
            <div style={container} onClick={this.handleClick}>
                <input name={props.name} type="hidden" value={this.props.value}/>
                {isChecked === true ? props.onText : props.offText}
                <span style={button}/>
            </div>
        </div>
    }

}


export default EditableSelect;
