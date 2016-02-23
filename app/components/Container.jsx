import React, { Component, PropTypes } from 'react';

import FormComponent from './FormComponent';

const style = {
  width: 400
};

export default class Container extends Component {
  static propTypes = {
    components: PropTypes.array,
    moveComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired,
    addComponent: PropTypes.func.isRequired,
  }

  render() {
    const {
      components,
      addComponent,
      moveComponent,
      removeComponent
    } = this.props;

    return (
      <div style= { style }>

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
    );
  }
}
