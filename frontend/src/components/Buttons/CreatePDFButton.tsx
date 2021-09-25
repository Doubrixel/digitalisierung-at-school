import React from 'react';
import { Button } from '@material-ui/core';

function CreatePDFButton(
  {
    onClick, style,
  }: { onClick: any, style: object },
) {
  return (
    <Button style={style} variant="contained" color="primary" onClick={onClick}>
      PDF erstellen
    </Button>
  );
}

export default CreatePDFButton;
