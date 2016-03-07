import React, { Component, PropTypes } from 'react';
import { Form, ValueManager as valueManager, loader } from 'subschema/dist/subschema-server';
import SwitchButton from 'widgets/SwitchButton';
import FSTemplate from 'templates/FSTemplate';
import FmSTemplate from 'templates/FmTemplate';
import { RaisedButton } from 'material-ui/lib';

import { Radios, AxText, AxTable, FieldGroup, EditableSelect } from 'widgets';

import MyEditorTemplate from 'templates/MyEditorTemplate';
import AxModalTemplate from 'templates/AxModalTemplate';
loader.addTemplate('EditorTemplate', MyEditorTemplate);
loader.addTemplate('FieldSetTemplate', FSTemplate);
loader.addTemplate('FormTemplate', FmSTemplate);
loader.addTemplate('AxModalTemplate', AxModalTemplate);

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};

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
        name:  { type: 'Text', placeholder:'try to input zli' },
        name2:  { type: 'AxText', placeholder:'demo for material ui', validators: [ 'required' ] },
        email: { validators: [ 'required', 'email' ] },
        birthday: 'Date',
        radios: 'Radios',
        fieldGroup: {
            type: 'FieldGroup', 
            fieldAttrs: {title: 'Field Group'},
            fields: "street, city, state, zip",
            subSchema: {
                street: {type: 'Text', validators: ['required'], title:''},
                zip: {type: 'Text', validators: ['required']},
                city: {type: 'Text', validators: ['required']},     
            }            
        },
        make: {
          'title': 'Make',
          'type': 'Select',
          'btnAdd': 'template/add',
          'placeholder': 'Select a make',
          'help': 'try to select this item, see if model will be connected'
        },
        model: {
          'title': 'Model',
          'type': 'Select',
          'placeholder': 'Select a make first',
          'conditional': {
            'listen': 'make',
            'operator': 'falsey'
          }
        },
        password: {type: 'Password', validators: [ 'required' ]},
        areYouSure: {
          type: 'SwitchButton',
          onText: 'On',
          offText: 'Off',
          title: 'Are you sure?'
        },
        content: {
          type: 'Content',
          title: 'Content Type',
          className: 'col-sm-offset-2',
          content: '{title} {..name} is {birthday}'
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
        editableSelect: {
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
        "virtualServerTemplate": {
            type: "Object",
            title: false,
            conditional: {
                listen: "editableSelect",
                operator: '/model_show/',
                template: 'AxModalTemplate',
                dismiss: 'editableSelect',
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
        notes: { type: 'List', itemType: 'Text' },
        table: { type: 'AxTable', title:''}
      },


      fieldsets: [
          {  size:6, fieldsets:
            [
              {fields: [ 'title', 'email', 'name', 'birthday', 'make', 'model' ],  legend: '' },
              {fields: [ 'password', 'areYouSure', 'content', 'fieldGroup', 'editableSelect', 'virtualServerTemplate' ],  legend: 'Advance' ,
                conditional:{
                  path:'name',
                  value:'zli',
                  operator:'!=='
                }
              },
              {
                fields: [ 'address.street', 'address.city', 'address.zip' ],  legend: 'Address'
              }
            ]
          },
          { legend: 'Material UI',  size:6, fields: [ 'table', 'name2', 'radios' ] }
      ]

    };

    /**
     * Borrowed from react-native docs.
     */
    var CAR_MAKES_AND_MODELS = {
        amc: {
            name: 'AMC',
            models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer']
        },
        alfa: {
            name: 'Alfa-Romeo',
            models: ['159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider']
        },
        aston: {
            name: 'Aston Martin',
            models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage']
        },
        audi: {
            name: 'Audi',
            models: ['90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7']
        },
        austin: {
            name: 'Austin',
            models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess']
        },
        borgward: {
            name: 'Borgward',
            models: ['Hansa', 'Isabella', 'P100']
        },
        buick: {
            name: 'Buick',
            models: ['Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
                'Roadmaster', 'Skylark']
        },
        cadillac: {
            name: 'Cadillac',
            models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville']
        },
        chevrolet: {
            name: 'Chevrolet',
            models: ['Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
                'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt']
        }
    };

    var fields = schema.fieldsets[0].fieldsets[0].fields;
    /**
     * Create the schema programatically.
     */
    schema.schema.make.options = Object.keys(CAR_MAKES_AND_MODELS).map(function (key) {
        fields.push(key);
        var {name, models} = CAR_MAKES_AND_MODELS[key];
        //setup the key values of them all.
        schema.schema[key] = {
            title: 'Model',
            conditional: {
                //This is the value to listen to trigger the conditional
                listen: 'make',
                //This is the value to compare the make's value to
                value: key,
                //Strict equals operator
                operator: '===',
                //We want the conditional to update the 'model' path.  This is a bit
                // experimental at the time, but may be the future of how to handle these
                // situations.
                path: 'model'
            },
            type: 'Select',
            placeholder:'Select a model of '+name,
            options: models
        }
        /**
         * Return the makes
         */
        return {
            label: name,
            val: key
        }
    });

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

export default SubschemaPage;
