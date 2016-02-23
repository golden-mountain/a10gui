import React, { Component, PropTypes } from 'react';

export default class PortItem extends Component {

  static propTypes = {
    value: PropTypes.any
  }

  render() {
    const {
      port,
      serviceGroup,
      templates
    } = this.props.value.value;


    return (
      <tr>
        <td>Port:{ port }</td>
        <td>Service Group:{ serviceGroup }</td>
        <td>Templates:{ templates }</td>
        <td><a href="#">Edit</a> | <a href="#">Delete</a></td>
      </tr>
    );
  }

}
