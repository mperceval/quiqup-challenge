import React, { PropTypes } from 'react';
import Cell from './Cell';

const Grid = ({ data, onButtonClick }) => {

  /*
   * Taken from http://www.frontcoded.com/splitting-javascript-array-into-chunks
   * Chunks array into a array of groups - return array.
   */
  const groupData = (data, chunkSize) => {
    // Convert immutable object data to mutable... - Don't love this!
    const mutableData = data.toJS();
    const groups = [];
    for (let i = 0; i < mutableData.length; i += chunkSize) {
      groups.push(mutableData.slice(i, i + chunkSize));
    }
    return groups;
  }

  /*
   * Creates a table row - returns td wrapped Cell.
   */
  const createRow = (rowData, rowNum) => {
    return rowData.map((item, idx) => {
      const val = item === 'E' ? '' : item;
      return <td key={idx + rowNum}><Cell idx={idx + rowNum} val={val} onClick={onButtonClick} /></td>;
    });
  };

  const tableData = groupData(data, 3).map((data, idx) => {
    // Wrap each row in a tr
    return <tr key={idx}>{createRow(data, idx * 3)}</tr>;
  });

  return (<table><tbody>{tableData}</tbody></table>);
};

export default Grid;
