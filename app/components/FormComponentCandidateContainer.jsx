import React, { Component, PropTypes } from 'react';

import FormComponent from './FormComponent';

const style = {
  width: 400
};

export default class FormComponentCandidateContainer extends Component {
  static propTypes = {
    componentCandidates: PropTypes.array.isRequired,
    addedComponent: PropTypes.func.isRequired,
    cancelAddComponent: PropTypes.func.isRequired
  }

  render() {
    const {
      componentCandidates,
      addedComponent,
      cancelAddComponent
    } = this.props;

    return (
      <div style= { style }>
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
    );
  }
}
