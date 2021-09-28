import React from 'react';
import './ForminputElementSubmitButton.css';
import PropTypes from 'prop-types';

function ForminputElementSubmitButton({ onClickMethod }: { onClickMethod:()=>void }) {
  return (
    <input type="submit" value="Speichern" onClick={onClickMethod} className="submitButton" />
  );
}

ForminputElementSubmitButton.propTypes = {
  onClickMethod: PropTypes.func.isRequired,
};

export default ForminputElementSubmitButton;
