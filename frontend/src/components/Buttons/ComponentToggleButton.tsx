import React, { useState } from 'react';
import '../FormInput/forminputElementText.css';
import '../FormInput/forminputElementSubmitButton.css';
import PropTypes from 'prop-types';
/* eslint-disable */

function ComponentToggleButton(
  {
    componentLabel, buttonHandleClickFunction,
  }:{ componentLabel:string, buttonHandleClickFunction: any }
) {
  const [buttonIsOn, setButtonIsOn] = useState(false);
  const handleButtonClick = () => {
    setButtonIsOn(!buttonIsOn);
    buttonHandleClickFunction();
  };
  return (
      <div style={{ display: 'flex', alignItems: 'center', height: 'max-content' }} className='labelTextDiv'>
        <div style={{display: 'flex', alignItems: 'center' }} >
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
