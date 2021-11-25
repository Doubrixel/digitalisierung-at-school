import React from 'react';
import { Button } from '@material-ui/core';

function CreateCSVButton(
  {
    onClick, style,
  }: { onClick: any, style: object },
) {
  return (
    <Button style={style} variant="contained" color="primary" onClick={onClick}>
      CSV exportieren
    </Button>
  );
}
export default CreateCSVButton;
