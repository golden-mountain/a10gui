"use strict";
import React, {Component} from 'react';
import {styles, types, decorators} from 'subschema/dist/subschema-server';
let style = styles['EditorTemplate'];

@decorators.provide.template
export default class FieldGroupEditorTemplate extends Component {
    render() {
        var {name, title, help, error, errorClassName, message, fieldClass,  children, ...rest} = this.props;
        let labelContent = '';
        if (!title) {
            return (<div
                className={style.group+" " + (error != null ? errorClassName || '' : '')}>
                    {children}
                    {help === false ? null : <types.Content content={error ? error : help || ''} key='error-block' type='div'
                                                      className={error ? style.error : style.help}/>}
            </div>);            
        } else {
            return (<div
                className={style.group+" " + (error != null ? errorClassName || '' : '')}>
                <types.Content content={title} type="label" className={style.label} htmlFor={name}/>

                <div className={title ? style.hasTitle : style.noTitle}>
                    <div className='fg-123'>{children}</div>
                    {help === false ? null : <types.Content content={error ? error : help || ''} key='error-block' type='div'
                                                      className={error ? style.error : style.help}/>}
                </div>
            </div>);
        }

    }
}