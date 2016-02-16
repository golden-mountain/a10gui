import React, { Component, PropTypes } from 'react';
import { Form, ValueManager as valueManager } from 'subschema/dist/subschema-server';
import SwitchButton from 'widgets/SwitchButton';

// loader, templates
class SubschemaPage extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  static propTypes = {
    data: PropTypes.object
  }

  componentWillMount() {
    this.valueManager = valueManager(this.props.data);
    this._listeners = [
      this.valueManager.addListener('name', function (value) {
        console.log('name', value);
      }),
      this.valueManager.addListener(null, function (value) {
        console.log('all', value);
      })
    ];
  }
  componentWillUnmount() {
    this._listeners.forEach((v) => v.remove());
  }

  handleSubmit(e, ...objects) {
    e && e.preventDefault();
    console.log('submit was called', objects);
    alert('handle submit');
  }

  render() {
    const schema = {
      schema: {
        title: { type: 'Select', options: [ 'Mr', 'Mrs', 'Ms' ] },
        name: 'Text',
        email: { validators: [ 'required', 'email' ] },
        birthday: 'Date',
        password: 'Password',
        areYouSure: {
          type: 'SwitchButton',
          onText: 'On',
          offText: 'Off',
          title: 'Are you sure?'
        },
        address: { 
          type: 'Object',
          subSchema: {
            street: {
              type: 'Text',
              validators: [ 'required' ]
            },
            city: 'Text',
            zip: {
              type: 'Text',
              validators: [ 'required', /\d{5}(-\d{4})?/ ]
            }
          }
        },
        notes: { type: 'List', itemType: 'Text' }
      },
      fieldsets: [
         { legend: 'Name', fields: [ 'title', 'email', 'name', 'password' , 'areYouSure' ] },
         { legend: 'Address', fields: [ 'address.street', 'address.city', 'address.zip' ] }
      ]

    };
    return (
        <Form
          action='/submit/path'
          method='post'
          onSubmit={ ::this.handleSubmit }
          valueManager={ this.valueManager }
          schema= { schema } >
          <button type='submit'>Submit</button>
        </Form>

    );
  }

}

export default SubschemaPage;
