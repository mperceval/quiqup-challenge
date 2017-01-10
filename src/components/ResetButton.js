import React, { PropTypes } from 'react';

const ResetButton = ({ onClick }) => {

  return (
    <button
      className="btn btn-primary btn-lg center-block"
      onClick={onClick}>
      Restart Game
    </button>
  );
};

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ResetButton;
