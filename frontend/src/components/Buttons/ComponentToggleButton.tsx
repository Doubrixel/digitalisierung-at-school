import React, { useState } from 'react';
import '../FormInput/ForminputElementText.css';
import '../FormInput/ForminputElementSubmitButton.css';
import './ComponentToggleButton.css';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

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
      <Button
        type="button"
        onClick={() => handleButtonClick()}
        className={buttonIsOn ? 'componentToggleButtonStyle buttonActivated' : 'componentToggleButtonStyle buttonDeactivated'}
      >
        {buttonIsOn ? 'On' : 'Off'}
      </Button>
    </div>
  );
}

ComponentToggleButton.propTypes = {
  componentLabel: PropTypes.string.isRequired,
  buttonHandleClickFunction: PropTypes.func.isRequired,
};

export default ComponentToggleButton;
