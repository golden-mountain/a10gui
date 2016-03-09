import React, { Component, PropTypes } from 'react';
import { Form, ValueManager as valueManager } from 'subschema/dist/subschema-server';
import { RaisedButton } from 'material-ui/lib';

import * as aw from 'widgets';
import * as at from 'templates';

class VirtualServerPage extends Component {

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
        name:  { type: 'Text', placeholder:'try to input zli', validators: [ 'required' ]  },
        wildcard:  { type: 'Checkbox', placeholder:'demo for material ui'},
        addressType: { 
          checkedClass: "checked",
          itemTemplate: 'AxRadioItemTemplate',
          options: [
            { label: "IPv4", val:1},
            { label: "IPv6", val:2},
          ],
          "type": "Radio"
        },
        ipAddress: {title:'IP Address', type: 'Text'},
        netmask: 'Text',
        action: { 
          checkedClass: "checked",
          itemTemplate: 'AxRadioItemTemplate',
          options: [
            { val: 'enable', label:"Enable" },
            { val: 'disable', label: "Disable"},
            { val: 'disable-when-any-port-down', label:'Disable When Any Port Down'},
            { val: 'disable-when-all-ports-down', label: 'Disable When All Port Down'}
          ],
          "type": "Radio"
        },
        //// advance fields
        disableArp: {title: 'Disable ARP', type:'Checkbox'},
        statsDataAction: {
          title: 'Stats Data Action',
          checkedClass: "checked",
          itemTemplate: 'AxRadioItemTemplate',
          options: [
            { val: 'enable', label:"Enable" },
            { val: 'disable', label: "Disable"},
          ],
          "type": "Radio"
        },
        extendedStats: {title: 'Extended Stats', type:'Checkbox'},
        redistributionFlagged: {title: 'Redistribution Flagged', type:'Checkbox'},
        vrid: {
            title: 'VRID',
            options: [
                {
                    val: 0,
                    label: "Option 1"
                },
                {
                    val: 1,
                    label: "Option 2"
                },
                {
                    val: 2,
                    label: "Option 33"
                }
            ],
            type: 'EditableSelect'
        },    
        vridTemplate: {
            type: "Object",
            title: false,
            conditional: {
                listen: 'vrid',
                operator: '/model_show/',
                template: 'AxModalTemplate',
                dismiss: 'vrid',
                dismissValuePath: 'virtualServerTemplate.name',
                title: "See the modal?",
                buttons: {
                    buttonsClass:'pull-right btn-group',
                    buttons: [
                        {
                            label: "Cancel",
                            action: 'cancel',
                            className: 'btn'
                        },
                        {
                            label: "Save",
                            action: 'submit',
                            className: 'btn btn-primary'
                        }
                    ]
                }
            },

            fields: "name, city, state, zip",
            subSchema: {
                name: {type: 'Text', validators: ['required']},
                city: 'Text',
                state: {
                    options: ['CA', 'NV', 'DE'],
                    type: 'Select'
                },
                zip: {
                    type: 'Text',
                    validators: ['required', {type: 'regexp', regexp: '/^[0-9]{5}(-([0-9]{4}))?$/'}]
                }
            }
        },        
        description: 'Text',

        // editable port
        virtualService:  {
          type: 'EditableTable'
        }
      },

      data: {
          action: 'enable',
          addressType: 2,
          statsDataAction: 'enable'
      },

      fieldsets: [
          {  
            size:6, 
            fieldsets: [
              {fields: [ 'name', 'wildcard', 'addressType', 'ipAddress', 'netmask', 'action' ],  legend: '' },
              {fields: [ 'disableArp', 'statsDataAction', 'extendedStats', 'redistributionFlagged', 'vrid', 'vridTemplate', 'description' ],  legend: 'Advanced Fields'},
              // {
              //   fields: [ 'address.street', 'address.city', 'address.zip' ],  legend: 'Address'
              // }
            ]
          },
          { 
            legend: 'Virtual Port',  
            type: 'EditableTable',
            size:6, 
            fields: [ 'virtualService' ] 
          }
      ]

    };

    this.valueManager.setValue(schema.data);
    
    return (
        <Form
          action='/submit/path'
          method='post'
          onSubmit={ ::this.handleSubmit }
          valueManager={ this.valueManager }
          className='container-fluid'
          schema={ schema } >
          <div className='col col-md-12 '>
            <div className='pull-right'>
              <RaisedButton label='Create' type='submit' primary={ true } />
              <RaisedButton label='Cancel' />
            </div>
          </div>
        </Form>

    );
  }

}

export default VirtualServerPage;
