import React, { Component, PropTypes } from 'react';
import FormComponent from './FormComponent';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


const style = {
  width: 400
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  static propTypes = {
    components: PropTypes.array,
    moveComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired
  }

  render() {
    const {
      components,
      moveComponent,
      removeComponent
    } = this.props;

    return (
      <div style={ style }>
        { components.map((component, i) => {
          return (
            <FormComponent
              key={ component.id }
              index={ i }
              id={ component.id }
              schema={ component.schema }
              moveComponent={ moveComponent }
              removeComponent={ removeComponent } />
          );
        }) }
      </div>
    );
  }
}
