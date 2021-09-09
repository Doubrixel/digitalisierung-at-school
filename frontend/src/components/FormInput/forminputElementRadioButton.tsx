import React from 'react';
import './forminputElementRadioButton.css';

export function RadioButtonFormInputFifthExamComponent() {
  return (
    <div className="radioButtonInputFormElement">
      <label htmlFor="theInput">
        <div className="labelTextDiv">Präsentationsprüfung:</div>
        <div className="inputDivRadioElement"><input type="radio" id="theInput" className="radioButtonInput" /></div>
      </label>
    </div>
  );
}
export default RadioButtonFormInputFifthExamComponent;
