import React from 'react';
import './ForminputElementRadioButton.css';
import PropTypes from 'prop-types';

function ForminputElementRadioButton(
  {
    labelText, name, maxLabelWidth, minLabelWidth,
  }:
  { labelText:string, name:string, maxLabelWidth:string, minLabelWidth:string },
) {
  return (
    <div className="radioButtonInputFormElement">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <div className="labelTextDiv" style={{ maxWidth: maxLabelWidth, minWidth: minLabelWidth }}>{labelText}</div>
        <div className="inputDivRadioElement"><input type="radio" name={name} className="radioButtonInput" /></div>
      </label>
    </div>
  );
}

ForminputElementRadioButton.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxLabelWidth: PropTypes.string,
  minLabelWidth: PropTypes.string,
};

ForminputElementRadioButton.defaultProps = {
  maxLabelWidth: '500px',
  minLabelWidth: '200px',
};

export default ForminputElementRadioButton;
