import React, { PropTypes } from 'react';

const Cell = ({ idx, val, onClick, disabled=false }) => {

  let classType = '';
  if (val !== '') {
    // TODO: Stuffing with leading character sucks a bit
    classType = val === 'X' ? ' ai' : ' player';
  }

  return (
    <button
      id={idx}
      className={`btn-cell${classType}`}
      disabled={val != '' || disabled}
      onClick={onClick}>
      {val}
    </button>
  );
};

Cell.propTypes = {
  idx: PropTypes.number.isRequired,
  val: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Cell;
