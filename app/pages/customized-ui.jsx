import React from 'react';
import Container from '../components/Container';
// import Subschema,{Form} from 'Subschema';
import update from 'react/lib/update';

let idCount = 10;
function getNextIdCount() {
  return idCount++;
}

export default class CustomizedUI extends React.Component {
  static getProps() {
    return {};
  }

  constructor(props) {
    super(props);
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
      componentCandidates: [ {
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
          <div style={ { width: '80%' } }>
            <Container
              components={ components }
              componentCandidates= { componentCandidates }
              addComponent={ ::this.addComponent }
              addedComponent={ ::this.addedComponent }
              cancelAddComponent= { ::this.cancelAddComponent }
              moveComponent={ ::this.moveComponent }
              removeComponent={ ::this.removeComponent } />
          </div>
          <div style={ { width: '20%' } }>
            <h3>Schema</h3>
            <pre>{ JSON.stringify(schema, null, '  ') }</pre>
          </div>
        </div>
      </div>
    );
  }
}
