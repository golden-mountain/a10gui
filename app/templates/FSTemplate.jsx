import React, {Component} from 'react';
import {Col} from 'widgets/layouts';
import {templates} from 'Subschema';
const {FieldSetTemplate} = templates;

export default class FSTemplate extends FieldSetTemplate {


    render() {
        var {size, legend, buttons, className, ...rest} = this.props.field || {};

        return legend ? 
            <Col size={size}>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">{legend}</h3>
                  </div>
                  <div className="panel-body">
                    {this.props.children}
                    {this.renderButtons(buttons)}
                  </div>
                </div>
            </Col> :
            <Col size={size}>                
                {this.props.children}
                {this.renderButtons(buttons)}  
            </Col>

    }
}