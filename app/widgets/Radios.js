"use strict";
import React, { Component } from 'react';
import Subschema, { Form, loader } from 'subschema/dist/subschema-server';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

const {decorators, PropTypes, tutils} = Subschema;
const {provide} = decorators;
const {extend} = tutils;
const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

//This adds it to the loader, loader.addType still works.
@provide.type
class Radios extends React.Component {
    //Prevents form-control from being passed to className.
    static inputClassName = ' ';

    static propTypes = {
        //This tells subschema to not process e.target.value, but just take the value.
        onChange: PropTypes.valueEvent,
        //Normal React.PropTypes
        value: React.PropTypes.string
    };

    static defaultProps = {

    };



    render() {
        return (
            <RadioButtonGroup name="notRight" style={styles.block}>
              <RadioButton
                value="reverse"
                style={styles.radioButton}
              />
            </RadioButtonGroup>
        );
    }

} 

export default Radios;
