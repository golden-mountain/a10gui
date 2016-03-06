import React from 'react';
// import ObjectType from './object.jsx';
import {tutils, Editor, types, decorators }  from 'subschema/dist/subschema-server';
import FieldGroupEditorTemplate from 'templates/FieldGroupEditorTemplate';
let _path = tutils.path;

@decorators.provide.type
export default class FieldGroup extends types.Object {   

    addEditor(field, f) {
        if (field == null) {
            return null;
        }
        return <Editor ref={f} key={'key-' + f} path={_path(this.props.path, f)}
                       field={field}
                       name={f}
                       template={field.template ? field.template : 'FieldGroupEditorTemplate' }
        />
    }

    render() {
        var {schema, subSchema, title, fields, submitButton, conditional, template, ...props} = this.props;
        return <div className='form-group'>
            <label className='col-sm-2 control-label'>{title}</label>
            <div className='col-sm-10 form-inline'>
                {this.schema && this.schema.schema ? this.renderSchema() : null}
                {this.props.children}
            </div>
        </div>
    }
}
