import React from 'react';
import './forminputElementText.css';

function TextFormInputFifthExamComponent() {
  return (
    <div className="textInputFormElement">
      <label htmlFor="theInput">
        <div className="labelTextDiv">Prüfling:</div>
        <div className="inputDivTextElement"><input type="text" id="theInput" className="textInput" /></div>
      </label>
    </div>
  );
}

export default TextFormInputFifthExamComponent;
