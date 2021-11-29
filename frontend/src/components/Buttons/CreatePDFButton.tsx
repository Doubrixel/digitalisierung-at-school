import React from 'react';
import { Button } from '@material-ui/core';

interface CreatePDFButtonInterface {
  onClick: any;
  style: object;
  // Default props sind gesetzt? kein Plan warum eslint trotzdem meckert...
  // eslint-disable-next-line react/require-default-props
  label?: string;
}

function CreatePDFButton({ onClick, style, label = 'PDF erstellen' } : CreatePDFButtonInterface) {
  return (
    <Button style={style} variant="contained" color="primary" onClick={onClick}>
      {label}
    </Button>
  );
}

export default CreatePDFButton;
