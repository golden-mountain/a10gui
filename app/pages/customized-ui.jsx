import React from 'react';
import Container from '../components/Container';
// import Subschema,{Form} from 'Subschema';
import update from 'react/lib/update';
import FormComponentCandidate from '../components/FormComponentCandidate';

export default class CustomizedUI extends React.Component {
  static getProps() {
    return {};
  }

  constructor(props) {
    super(props);
    this.moveComponent = this.moveComponent.bind(this);
    this.state = {
      components: [ {
        id: 1,
        schema: {
          title: {
            type: 'Select',
            options: [
              'Mr',
              'Mrs',
              'Ms'
            ]
          }
        }
      }, {
        id: 2,
        schema: {
          name: {
            type: 'Text',
            validators: [
              'required'
            ]
          }
        }
      }, {
        id: 3,
        schema: {
          age: {
            type: 'Number'
          }
        }
      } ]
    };
  }

  addComponent(name, type, options) {
    const newComponent = {
      id: this.state.components.length + 1,
      schema: {}
    };

    newComponent.schema[name] = options || {};
    newComponent.schema[name].type = type;
    this.setState(update(this.state, {
      components: {
        $push: [ newComponent ]
      }
    }));
  }

  moveComponent(dragIndex, hoverIndex) {
    const { components } = this.state;
    const dragCard = components[dragIndex];

    this.setState(update(this.state, {
      components: {
        $splice: [
          [ dragIndex, 1 ],
          [ hoverIndex, 0, dragCard ]
        ]
      }
    }));
  }

  removeComponent(id, index) {
    this.setState(update(this.state, {
      components: {
        $splice: [
          [ index, 1 ]
        ]
      }
    }));
  }

  getResultSchema() {
    const resultSchema = this.state.components.map((item) => {
      return item.schema;
    })
    .reduce((memo, item) => {
      const key = Object.keys(item)[0];
      memo[key] = item[key];
      return memo;
    }, {});
    return { schema: resultSchema };
  }

  onClick() {
    alert('test');
  }

  render() {
    const { components } = this.state;
    const schema = this.getResultSchema();

    return (
      <div>
        <h2>CustomizedUI</h2>
        <button onClick={ ::this.onClick }>test123</button>
        <div style={ { display: 'flex' } }>
          <div style={ { width: '30%' } }>
            <h3>Insert Component</h3>
            <FormComponentCandidate addComponent={ ::this.addComponent } />
          </div>
          <div style={ { width: '42%' } }>
            <h3>Edit form here</h3>
            <Container
              components={ components }
              moveComponent={ ::this.moveComponent }
              removeComponent={ ::this.removeComponent } />
          </div>
          <div style={ { width: '28%' } }>
            <h3>Schema</h3>
            <pre>{ JSON.stringify(schema, null, '  ') }</pre>
          </div>
        </div>
      </div>
    );
  }
}
