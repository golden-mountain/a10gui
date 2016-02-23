import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import { Form } from 'subschema/dist/subschema-server';

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
      index: props.index,
      isNew: props.isNew,
      schema: props.schema
    };
  },
  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if(props.isNew && (!dropResult || dropResult.isNew)) {
      props.cancelAddComponent()
    }
    if(props.addedComponent) {
      props.addedComponent(monitor.getItem().index);
    }
  }
};

const formComponentTarget = {
  drop(props, monitor, component) {
    return props;
  },

  hover(props, monitor, component) {
    const item = monitor.getItem();
    if(props.isNew) {
      //skip when hover target is new
      return;
    }
    if(!item.isNew) {
      const dragIndex = item.index;
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
    } else {
      const schema = item.schema;
      const hoverIndex = props.index;
      if(props.addComponent) {
        props.addComponent(hoverIndex, schema);
        monitor.getItem().index = hoverIndex;
        monitor.getItem().isNew = false;
      }
    }
  }
};

@DropTarget(ItemTypes.FORMCOMPONENT, formComponentTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.FORMCOMPONENT, formComponetSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
})

export default class FormComponent extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    isNew: PropTypes.bool.isRequired,
    schema: PropTypes.any,
    moveComponent: PropTypes.func,
    removeComponent: PropTypes.func,
    addComponent: PropTypes.func,
    addedComponent: PropTypes.func,
    cancelAddComponent: PropTypes.func
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
    const { index, removeComponent } = this.props;
    removeComponent(index);
  }

  render() {
    const {
      schema,
      isDragging,
      isAdding,
       connectDragSource,
       connectDropTarget
    } = this.props;
    const opacity = isDragging || isAdding ? 0 : 1;
    const position = 'relative';
    const title = Object.keys(schema)[0];
    const { type, options } = schema[title];

    return connectDragSource(connectDropTarget(
      <div style={ { ...style, opacity, position} }>
        <Form schema={schema} />
        <button
          style={ { position: 'absolute', right: 0, top: 0 } }
          onClick={ ::this.onClick }>x</button>
      </div>
    ));
  }
}
