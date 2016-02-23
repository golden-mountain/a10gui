import React from 'react';
import update from 'react/lib/update';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { Form } from 'subschema/dist/subschema-server';

import rawComponentCandidates from '../utils/componentCandidates';
import Container from '../components/Container';
import FormComponentCandidateContainer from '../components/FormComponentCandidateContainer';

let idCount = 10;
function getNextIdCount() {
  return idCount++;
}

@DragDropContext(HTML5Backend)
export default class CustomizedUI extends React.Component {
  static getProps() {
    return {};
  }

  constructor(props) {
    super(props);
    let idCount = 0;
    let componentCandidates = Object.keys(rawComponentCandidates).map((key) => {
      return {
        id: `new${idCount++}`,
        schema: {
          [key]: rawComponentCandidates[key]
        }
      };
    });
    componentCandidates = Object.values(componentCandidates)
    console.log(componentCandidates);
    this.state =  {
      components: [{
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
      }],
      componentCandidates
    }
  }

  addComponent(targetIndex, _schema) {
    const id = getNextIdCount();
    let schema = Object.assign({}, _schema);
    const name = Object.keys(schema)[0];
    schema[`${name}${id}`] = schema[`${name}`];
    delete schema[`${name}`];

    const newComponent = {
      id,
      schema,
      isAdding: true
    };

    this.setState(update(this.state, {
      components: {
        $splice: [
          [ targetIndex, 0, newComponent ]
        ]
      }
    }));
  }

  addedComponent(targetIndex) {
    this.setState(update(this.state, {
      components: {
        [targetIndex]: {
          isAdding: {
            $set: false
          }
        }
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

  cancelAddComponent() {
    const index = this.state.components.findIndex(function (item) {
      return item.isAdding
    });
    this.setState(update(this.state, {
      components: {
        $splice: [
          [ index, 1 ]
        ]
      }
    }));
  }

  removeComponent(index) {
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
      if(item){
        const key = Object.keys(item)[0];
        memo[key] = item[key];
      }
      return memo;
    }, {});
    return { schema: resultSchema };
  }

  render() {
    const { components, componentCandidates } = this.state;
    const schema = this.getResultSchema();

    return (
      <div style= { { padding: 10 } } >
        <h2>CustomizedUI</h2>
        <div style={ { display: 'flex' } }>
          <div style= {{ width: '30%'}}>
            <h3>Insert Component</h3>
            <FormComponentCandidateContainer
              componentCandidates= { componentCandidates }
              addedComponent={ ::this.addedComponent }
              cancelAddComponent= { ::this.cancelAddComponent }  />
          </div>
          <div style={ { width: '40%' } }>
            <h3>Edit Form</h3>
            <Container
              components={ components }
              addComponent={ ::this.addComponent }
              moveComponent= { ::this.moveComponent }
              removeComponent={ ::this.removeComponent } />
          </div>
          <div style={ { width: '30%' } }>
            <h3>Subschema Output</h3>
            <Form schema={schema} />
            <h3>Schema</h3>
            <pre>{ JSON.stringify(schema, null, '  ') }</pre>
          </div>
        </div>
      </div>
    );
  }
}
