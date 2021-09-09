import React from 'react';
import './forminputElementText.css';
import PropTypes from 'prop-types';

function TextFormInputFifthExamComponent(
  {
    labelText, name, maxLabelWidth, minLabelWidth,
  }:
  { labelText:string, name:string, maxLabelWidth:string, minLabelWidth:string },
) {
  return (
    <div className="textInputFormElement">
      <label htmlFor="theInput">
        <div className="labelTextDiv" style={{ maxWidth: maxLabelWidth, minWidth: minLabelWidth }}>{labelText}</div>
        <div className="inputDivTextElement"><input type="text" name={name} className="textInput" id="theInput" /></div>
      </label>
    </div>
  );
}

TextFormInputFifthExamComponent.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxLabelWidth: PropTypes.string,
  minLabelWidth: PropTypes.string,
};

TextFormInputFifthExamComponent.defaultProps = {
  maxLabelWidth: '500px',
  minLabelWidth: '200px',
};

export default TextFormInputFifthExamComponent;
