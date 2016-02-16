import React, {Component} from 'react';
import {Col} from 'widgets/layouts';
import {templates} from 'Subschema';
const {FieldSetTemplate} = templates;

export default class FSTemplate extends FieldSetTemplate {


    render() {
        var {size, legend, buttons, className, ...rest} = this.props.field || {};

        let res = '';
        if (legend) {
            res = <div className="panel-heading">
                    <h3 className="panel-title">{legend}</h3>
                </div>;      
        }

        return legend !== undefined ? 
            <Col size={size}>
                <div className="panel panel-default">
                  {res}
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