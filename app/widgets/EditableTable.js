"use strict";
import Subschema from 'subschema/dist/subschema-server';

const {decorators, PropTypes } = Subschema;
const {provide, listeners } = decorators;

import React from 'react';



const tableData = [
  {
    name: 'vs1',
    range: '100-200',
    protocol: 'TCP',
    actions: 'delete'
  },  
  {
    name: 'vs2',
    range: '200-300',
    protocol: 'TCP',
    actions: 'delete'
  },  
  {
    name: 'vs3',
    range: '400-600',
    protocol: 'TCP',
    actions: 'delete'
  },
];

@provide.type
export default class EditableTable extends React.Component {

  render() {
    let html = tableData.map((value) => {

      return <tr>
        <td>{value.name}</td>
        <td>{value.range}</td>
        <td>{value.protocol}</td>
        <td>{value.actions}</td>
      </tr>
    });

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Port Number</th>
              <th>Port Range</th>
              <th>Protocol</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {html}
          </tbody>
        </table>
      </div>
    );
  }
}