import React, {Component} from 'react';
import {types} from 'Subschema';
let {Content} = types;

const style = {
    group: 'form-group field-name ',
    label: "col-sm-2 control-label",
    error: 'error-block help-block',
    help: 'help-block',
    hasTitle: "col-sm-10",
    noTitle: "col-sm-12"
};

const styles = {
    withAddIconContainer: {
        position: 'relative',
        paddingRight: '55px'
    },
    iconButton: {
        position: 'absolute',
        top: '0px',
        right: '15px'
    }
};

export default class MyEditorTemplate extends Component {
    render() {
        var {name, title, help, error, errorClassName, message, fieldClass,  children, field:{btnAdd}} = this.props;
        if (!title) {
            title = ''
        }
        let buttons = '', aidBtnStyle={};
        if (btnAdd) {
            buttons = <button className='btn btn-sm btn-default' style={styles.iconButton}><span className='glyphicon glyphicon-plus'></span></button>;
            aidBtnStyle = styles.withAddIconContainer;
        }

        return (<div
            className={style.group+" " + (error != null ? errorClassName || '' : '') }>
            <Content content={title} type="label" className={style.label} htmlFor={name}/>

            <div className={title ? style.hasTitle : style.noTitle} style={aidBtnStyle} >
                {children}
                {buttons}
                {help === false ? null : <Content content={error ? error : help || ''} key='error-block' type='p'
                                                  className={error ? style.error : style.help}/>}
            </div>
        </div>);
    }
}