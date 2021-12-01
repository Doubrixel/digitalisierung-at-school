import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function StatusButton() {
  const [open, setOpen] = useState(false);
  /*
  const [transitionDate1, transitionDate1] = useState('');
  const [transitionDate2, transitionDate2] = useState('');
  const [transitionDate3, transitionDate3] = useState('');
  */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const save = () => {
    close();
  };

  const reset = () => {
    // zurücksetzen für neues Schuljahr
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ marginTop: '2vh', width: '12vw', minWidth: '188px' }}>
        Freigabe bearbeiten
      </Button>
      <Dialog open={open} onClose={close}>
        <DialogTitle style={{ fontSize: '35px' }}>Freigabe bearbeiten</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Schritt 0: Komponente zur Eingabe für Schüler freigeben.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_0"
            type="date"
            fullWidth
            variant="outlined"
            style={{ marginBottom: '50px' }}
          />
          <DialogContentText>
            Schritt 1: Schüler können Checkboxen, Problemfrage und Präsentationsform eintragen.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_1"
            type="date"
            fullWidth
            variant="outlined"
            style={{ marginBottom: '50px' }}
          />
          <DialogContentText>
            Schritt 2: Komponente zur Themen Abgabe sperren
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_2"
            type="date"
            fullWidth
            variant="outlined"
            style={{ marginBottom: '50px' }}
          />
          <Button variant="contained" onClick={reset} color="secondary">Zurücksetzen</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Schließen</Button>
          <Button onClick={save}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StatusButton;
