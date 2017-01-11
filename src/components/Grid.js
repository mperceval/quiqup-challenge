import React, { PropTypes } from 'react';
import Cell from './Cell';

const Grid = ({ data, onGridCellClick, disableGrid }) => {

  /*
   * Chunks array into a array of groups - return array.
   */
  const groupData = (data) => {
    const [a, b, c, d, e, f, g, h, i] = data;

    return [
      [a, b, c],
      [d, e, f],
      [g, h, i]
    ];
  };

  /*
   * Creates a table row - returns td wrapped Cell.
   */
  const createRow = (rowData, rowNum) => {
    return rowData.map((item, idx) => {
      const val = item === 'E' ? '' : item;
      return (<td key={idx + rowNum}>
        <Cell
          idx={idx + rowNum}
          val={val}
          disabled={disableGrid}
          onClick={onGridCellClick} />
        </td>);
    });
  };

  const tableData = groupData(data).map((data, idx) => {
    // Wrap each row in a tr
    return <tr key={idx}>{createRow(data, idx * 3)}</tr>;
  });

  return (<table className="table-center"><tbody>{tableData}</tbody></table>);
};

Grid.propTypes = {
  data: PropTypes.object.isRequired,
  onGridCellClick: PropTypes.func.isRequired,
  disableGrid: PropTypes.bool.isRequired
};

export default Grid;
