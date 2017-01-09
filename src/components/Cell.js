import React from 'react';

const Cell = ({ idx, val, onClick }) => {

  return (
    <button
      id={idx}
      className='btn-cell'
      onClick={onClick}>
      {val}
    </button>
  );
};

export default Cell;
