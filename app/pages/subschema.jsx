import React, { Component, PropTypes } from 'react';
import { Form, ValueManager as valueManager } from 'subschema/dist/subschema-server';
import SwitchButton from 'widgets/SwitchButton';
import FSTemplate from 'templates/FSTemplate';
import FmSTemplate from 'templates/FmTemplate';

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
        email: { validators: [ 'required', 'email' ] },
        birthday: 'Date',
        make: {
          "title": "Make",
          "type": "Select",
          "placeholder": "Select a make",
          "help": "try to select this item, see if model will be connected"
        },
        model: {
          "title": "Model",
          "type": "Select",
          "placeholder": "Select a make first",
          "conditional": {
            "listen": "make",
            "operator": "falsey"
          }
        },       
        password: 'Password',
        areYouSure: {
          type: 'SwitchButton',
          onText: 'On',
          offText: 'Off',
          title: 'Are you sure?'
        },
        content: {
          type: "Content",
          title: 'Content Type',
          className: "col-sm-offset-2",
          content: "{title} {..name} is {birthday}"
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
          { template: FSTemplate, size:6, fieldsets: 
            [
              {fields: [ 'title', 'email', 'name', 'birthday', 'make', 'model' ], template: FSTemplate, legend: '' }, 
              {fields: [ 'password', 'areYouSure', 'content' ], template: FSTemplate, legend: 'Advance' ,  
                conditional:{
                  path:'name',
                  value:'zli',
                  operator:'!=='
                }
              }
            ]
          },
          { legend: 'Address', template: FSTemplate, size:6, fields: [ 'address.street', 'address.city', 'address.zip' ] }
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
          template={ FmSTemplate }
          schema={ schema } >
          <div className='col col-md-12 '>
            <div className='pull-right btn-group'>
              <button type='submit' className='btn btn-success' >Create</button>
              <button type='button' className='btn btn-default' >Cancel</button>
            </div>
          </div>
        </Form>

    );
  }

}

export default SubschemaPage;
