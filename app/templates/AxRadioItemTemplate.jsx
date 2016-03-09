"use strict";
import React, {Component} from 'react';
import {styles, types, decorators} from 'subschema/dist/subschema-server';
const Content = types.Content;

styles.namespace = 'radio-inline';

@decorators.provide.template
class AxRadioItemTemplate extends Component  {

	render() {
	    var {label, labelHTML,children, checked, checkedClass, id} = this.props;
	    label = labelHTML ? labelHTML : label;
	    checkedClass = checkedClass || '';
	    label = typeof label === 'string' ? [{children: true}, label] : label;

	    return (<div className={styles.namespace+' '+(checked ? checkedClass || styles.checked : styles.unchecked)}>
	        <Content type='label' content={label}>
	            {children}
	        </Content>
	    </div>);
	}
}

export default AxRadioItemTemplate;