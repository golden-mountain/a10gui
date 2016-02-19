import React, { Component, PropTypes } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import FormComponent from './FormComponent';

const style = {
  width: 400
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  static propTypes = {
    components: PropTypes.array,
    moveComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    addComponent: PropTypes.func.isRequired,
    addedComponent: PropTypes.func.isRequired
  }

  render() {
    const {
      components,
      componentCandidates,
      addComponent,
      addedComponent,
      cancelAddComponent,
      moveComponent,
      removeComponent
    } = this.props;

    return (
      <div style={ { display: 'flex' } }>
        <div style={ { width: '40%' } }>
          <div style= { style }>
            <h3>Insert Component</h3>
            {
              componentCandidates.map((componentCandidate, i) => {
                return (
                  <FormComponent
                    key={ componentCandidate.id }
                    index={ i }
                    isNew={ true }
                    id={ componentCandidate.id }
                    schema={ componentCandidate.schema }
                    cancelAddComponent={ cancelAddComponent }
                    addedComponent= { addedComponent } />
                );
              })
            }
          </div>
        </div>
        <div style={ {width: '60%'} }>
          <div style={ style }>
            <h3>Edit form here</h3>
            {
              components.map((component, i) => {
                return (
                  <FormComponent
                    key={ component.id }
                    index={ i }
                    isNew={ false }
                    isAdding={ component.isAdding }
                    id={ component.id }
                    schema={ component.schema }
                    addComponent={ addComponent}
                    moveComponent={ moveComponent }
                    removeComponent={ removeComponent } />
                );
              })
            }
          </div>
        </div>
      </div>





    );
  }
}
