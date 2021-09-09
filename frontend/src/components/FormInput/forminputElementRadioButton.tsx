import React from 'react';
import './forminputElementRadioButton.css';
import PropTypes from 'prop-types';

function RadioButtonFormInputFifthExamComponent(
  {
    labelText, name, maxLabelWidth, minLabelWidth,
  }:
  { labelText:string, name:string, maxLabelWidth:string, minLabelWidth:string },
) {
  return (
    <div className="radioButtonInputFormElement">
      <label htmlFor="theInput">
        <div className="labelTextDiv" style={{ maxWidth: maxLabelWidth, minWidth: minLabelWidth }}>{labelText}</div>
        <div className="inputDivRadioElement"><input type="radio" name={name} className="radioButtonInput" id="theInput" /></div>
      </label>
    </div>
  );
}

RadioButtonFormInputFifthExamComponent.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxLabelWidth: PropTypes.string,
  minLabelWidth: PropTypes.string,
};

RadioButtonFormInputFifthExamComponent.defaultProps = {
  maxLabelWidth: '500px',
  minLabelWidth: '200px',
};

export default RadioButtonFormInputFifthExamComponent;
