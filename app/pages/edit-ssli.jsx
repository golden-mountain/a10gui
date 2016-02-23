import React, { Component, PropTypes } from 'react';
import { Form, ValueManager as valueManager } from 'subschema/dist/subschema-server';

import PortItem from '../components/PortItem.jsx';

// loader, templates
class EditSsliPage extends Component {


  handleSubmit(e, ...objects) {
    e && e.preventDefault();
    console.log('submit was called', objects);
    alert('handle submit');
  }

  render() {
    const schema = {
      schema: {
        serviceType: {
          type: 'Text'
        },
        Name: {
          type: 'Select',
          options: [ 1, 2, 3 ],
          disabled: true
        },
        IPAddress: {
          title: 'IP Address',
          type: 'Text',
          disabled: true
        },
        ACL: {
          title: 'ACL',
          type: 'Text',
          options: [],
          disabled: true
        },
        dynamicPort: {
          title: 'Dynamic Port',
          type: 'Checkbox'
        },
        nonHTTPTrafficBypass: {
          title: 'Non-HTTP Traffic Bypass',
          type: 'Checkbox',
          conditional: {
            listen: 'dynamicPort',
            operator: 'falsey'
          }
        },
        bypassServiceGroup: {
          title: 'Bypass Service Group',
          type: 'Select',
          conditional: {
            listen: 'nonHTTPTrafficBypass',
            operator: 'truthy'
          },
          options: [],
          disabled: true
        },
        portList: {
          type: 'Mixed',
          keyType: 'Text',
          title: 'Port List',
          labelKey: 'answer',
          canAdd: true,
          canDelete: true,
          canReorder: true,
          canEdit: true,
          inline: false,
          addButton: {
            label: 'Add Port',
            className: 'btn btn-default btn-add'
          },
          itemTemplate: PortItem,
          contentTemplate: PortItem,
          valueType: {
            type: 'Object',
            subSchema: {
              port: {
                title: 'Port',
                type: 'Text'
              },
              protocol: {
                title: 'Protocol',
                type: 'Select',
                options: [
                  'udp',
                  'http'
                ]
              },
              serviceGroup: {
                title: 'Service Group',
                type: 'Text'
              },
              templates: {
                title: 'Templates',
                type: 'Text'
              },
              actions: {
                title: 'Actions',
                type: 'Text'
              }
            }
          }
        }
      },
      fieldsets: [
         { legend: 'Name', fields: [ 'type', 'Service Type', 'Name', 'IPAddress', 'ACL', 'dynamicPort', 'nonHTTPTrafficBypass', 'bypassServiceGroup' ] },
         { legend: '2', fields: [ 'questionare', 'portList' ] }
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

export default EditSsliPage;
