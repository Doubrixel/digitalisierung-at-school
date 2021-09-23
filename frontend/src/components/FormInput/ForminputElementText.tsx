import React from 'react';
import './ForminputElementText.css';
import PropTypes from 'prop-types';

function ForminputElementText(
  {
    labelText, name, maxLabelWidth, minLabelWidth,
  }:
  { labelText:string, name:string, maxLabelWidth:string, minLabelWidth:string },
) {
  return (
    <div className="textInputFormElement">
      {/* htmlFor in label with corresponding id on input creates problems when used multiple times,
      generating different ids that are never used elsewhere makes little sense */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <div className="labelTextDiv" style={{ maxWidth: maxLabelWidth, minWidth: minLabelWidth }}>{labelText}</div>
        <div className="inputDivTextElement"><input type="text" name={name} className="textInput" /></div>
      </label>
    </div>
  );
}

ForminputElementText.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxLabelWidth: PropTypes.string,
  minLabelWidth: PropTypes.string,
};

ForminputElementText.defaultProps = {
  maxLabelWidth: '500px',
  minLabelWidth: '200px',
};

export default ForminputElementText;
