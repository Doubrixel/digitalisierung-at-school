import React, { useState } from 'react';

import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';

import './ForminputElementDropDown.css';
import PropTypes from 'prop-types';

function ForminputElementDropDown({ valueArray, labelText, name }:
{ valueArray:string[], labelText:string, name:string }) {
  // value stores the selected item, will be used when sent to backend in the future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="DropDown">
      <FormControl fullWidth>
        <InputLabel className="labelTextDiv">{labelText}</InputLabel>
        <Select
          name={name}
          onChange={handleChange}
          className="inputDivRadioElement"
        >
          {valueArray.map((i) => (
            <MenuItem value={i}>{i}</MenuItem>))}
        </Select>
      </FormControl>
    </div>
  );
}

ForminputElementDropDown.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ForminputElementDropDown;
