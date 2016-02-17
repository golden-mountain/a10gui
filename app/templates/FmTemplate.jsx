"use strict";

import React, {Component} from 'react';
import {templates} from 'Subschema';

export default class FmTemplate extends templates.FormTemplate {

    render() {
        var {children, name, fieldAttrs, enctype, className, action, method, onSubmit, ...props} = this.props;
        return (
            <form name={name} action={action} enctype={enctype} method={method} onSubmit={onSubmit}
                      className={className} {...fieldAttrs}>
                    <div className='row'>
                        {children}
                    </div>
            </form>
        );
    }
}