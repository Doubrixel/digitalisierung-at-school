import React, { useState } from 'react';
import '../FormInput/ForminputElementText.css';
import '../FormInput/ForminputElementSubmitButton.css';
import './ComponentToggleButton.css';
import PropTypes from 'prop-types';

function ComponentToggleButton(
  {
    componentLabel, buttonHandleClickFunction,
  }:{ componentLabel:string, buttonHandleClickFunction: any },
) {
  const [buttonIsOn, setButtonIsOn] = useState(false);
  const handleButtonClick = () => {
    setButtonIsOn(!buttonIsOn);
    buttonHandleClickFunction();
  };
  return (
    <div className="componentToggleButtonWrapper labelTextDiv">
      <div className="componentToggleButtonLabel">
        { componentLabel }
      </div>
      <button
        type="button"
        onClick={() => handleButtonClick()}
        className="submitButton"
        style={{ backgroundColor: buttonIsOn ? 'green' : 'red', borderStyle: 'hidden', marginLeft: '1vw' }}
      >
        {buttonIsOn ? 'On' : 'Off'}
      </button>
    </div>
  );
}

ComponentToggleButton.propTypes = {
  componentLabel: PropTypes.string.isRequired,
  buttonHandleClickFunction: PropTypes.func.isRequired,
};

export default ComponentToggleButton;
