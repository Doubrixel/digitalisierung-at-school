import React, { useState } from 'react';
import './ComponentToggleButton.css';
import '../FormInput/forminputElementText.css';
import '../FormInput/forminputElementSubmitButton.css';

// eslint-disable-next-line react/prop-types
function ComponentToggleButton({ componentLabel }) {
  const [buttonIsOn, setButtonIsOn] = useState(false);
  const handleButtonClick = () => {
    setButtonIsOn(!buttonIsOn);
  };
  return (
    <div id="componentToggleButtonContainer" style={{ display: 'flex' }}>
      <div className="textInputFormElement" style={{ display: 'flex' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="labelTextDiv">
          { componentLabel }
        </div>
        <button
          type="button"
          onClick={() => handleButtonClick()}
          className="submitButton"
          style={{ backgroundColor: buttonIsOn ? 'green' : 'red', borderStyle: 'hidden' }}
        >
          {buttonIsOn ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
}
export default ComponentToggleButton;
