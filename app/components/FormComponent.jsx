import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const formComponetSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const formComponentTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveComponent(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.FORMCOMPONENT, formComponentTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.FORMCOMPONENT, formComponetSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class FormComponent extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    schema: PropTypes.any,
    moveComponent: PropTypes.func.isRequired,
    removeComponent: PropTypes.func.isRequired
  }

  renderSelect(options) {
    return (
      <select>
        {
          options.map((item, index) => {
            return (<option key={ index } value={ item }>{ item }</option>);
          })
        }
      </select>
    );
  }

  renderInput(type, options) {
    switch (type.toLowerCase()) {
    case 'select':
      return this.renderSelect(options);
    default:
      return (
        <input type={ type.toLowerCase() } />
      );
    }
  }

  onClick() {
    const { id, index, removeComponent } = this.props;
    removeComponent(id, index);
  }

  render() {
    const { schema, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    const title = Object.keys(schema)[0];
    const { type, options } = schema[title];
    return connectDragSource(connectDropTarget(
      <div style={ { ...style, opacity } }>
        <label>{ title }</label>&nbsp;
        { this.renderInput(type, options) }
        <button
          style={ { float: 'right' } }
          onClick={ ::this.onClick }>x</button>
      </div>
    ));
  }
}
