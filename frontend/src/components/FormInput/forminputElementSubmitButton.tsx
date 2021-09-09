import React from 'react';
import './forminputElementSubmitButton.css';
import PropTypes from 'prop-types';

function SubmitButtonFormInputFifthExamComponent({ onClickMethod }: { onClickMethod:()=>void }) {
  return (
    <input type="submit" value="Speichern" onClick={onClickMethod} className="submitButton" />
  );
}

SubmitButtonFormInputFifthExamComponent.propTypes = {
  onClickMethod: PropTypes.func.isRequired,
};

export default SubmitButtonFormInputFifthExamComponent;
