import React, { Component, PropTypes } from 'react';

export default class FormComponentCandidate extends Component {
  static propTypes = {
    addComponent: PropTypes.func.isRequired
  }

  onClickAddComponent() {
    const { addComponent } = this.props;
    const { componentName, componentType, componentOptions } = this.refs;
    const options = componentOptions.value && JSON.parse(componentOptions.value);
    addComponent(componentName.value, componentType.value, options);
  }

  render() {
    return (
      <div>
        <label>Name</label><br />
        <input type='text' ref='componentName'/><br/>
        <label>component</label><br/>
        <select ref='componentType'>
          <option value=''></option>
          <option value='text'>text</option>
          <option value='number'>number</option>
          <option value='checkbox'>checkbox</option>
          <option value='select'>select</option>
        </select><br /><br/>
        <textarea
          style={ { width: '90%', height: 100 } }
          ref='componentOptions'
          placeholder='{"options": ["Mr","Mrs","Ms"]}'/>
        <br />
        <button onClick={ this.onClickAddComponent.bind(this) }>Add</button>
      </div>
    );
  }
}
