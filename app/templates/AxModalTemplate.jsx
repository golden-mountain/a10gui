"use strict";
import React, {Component, Children} from 'react';
import {styles, types, decorators, NewChildContext, PropTypes, Editor, ValueManager, templates } from 'subschema/dist/subschema-server';
let style = styles['ModalTemplate'];
let Content = types.Content;
let Buttons = templates.ButtonsTemplate;

class ModalTemplate extends Component {

    static contextTypes = {
        valueManager: PropTypes.valueManager,
        parentValueManager: PropTypes.valueManager,
        loader: PropTypes.loader
    };

    static propTypes = {
        onCommit: PropTypes.event,

    };
    static defaultProps = {
        onCommit(){
        }
    }
    handleClose = (e)=> {
        e && e.preventDefault();        
        let value = this.context.parentValueManager.path(this.props.dismissValuePath);
        if (typeof this.props.dismissValuePath == 'function') {
            value = this.props.dismissValuePath.call(this, value);
        }
        this.context.parentValueManager.update(this.props.dismiss, value);
    }
    handleBtnClose = (e, action) => {
        switch (action) {
            case 'submit':
            {
                this.props.onSubmit(e);
            }
            case 'close':
            case 'cancel':
                this.handleClose(e);
                break;
        }

    }

    renderFooter(buttons) {
        if (!buttons) return null;
        return <div className={style.footer}><Buttons buttons={buttons} onButtonClick={this.handleBtnClose}/></div>
    }

    render() {
        var {title, buttons, path,value, children, ...rest} = this.props;
        return <div className={`${style.namespace} ${style.overlay}`} style={{display:'block'}}>
            <div className={style.backdrop}></div>
            <div className={style.dialog} role="document" style={{zIndex:2000}}>
                <div className={style.content}>
                    <div className={style.header}>
                        <button onClick={this.handleClose} className={style.close} name={this.props.dismiss}
                                value={value}
                                aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        {title ? <Content type='h4'  {...rest} content={title}/> : null }
                    </div>
                    <div className={style.body}>
                        {children}
                    </div>
                    {this.renderFooter(buttons)}
                </div>
            </div>
        </div>
    }
}

//module.exports = ModalTemplate;
export default class ModalTemplateWrapper extends Component {
    static contextTypes = {
        loader: PropTypes.loader,
        valueManager: PropTypes.valueManager
    };
    static propTypes = {
        title: PropTypes.node,
        buttons: PropTypes.buttons,
        path: PropTypes.path,
    }

    render() {
        var {...context} = this.context;
        var {conditional, ...props} = this.props;
        return <NewChildContext {...context} path={props.path}>
            <ModalTemplate {...props}/>
        </NewChildContext>
    }
}