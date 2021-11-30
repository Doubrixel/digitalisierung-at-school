import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function StatusButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ marginTop: '2vh', width: '12vw', minWidth: '188px' }}>
        Freigabe bearbeiten
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: '35px' }}>Freigabe bearbeiten</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Schritt 0: Komponente sperren.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_0"
            label=""
            type="date"
            fullWidth
            variant="outlined"
            style={{ marginBottom: '50px' }}
          />
          <DialogContentText>
            Schritt 1: Schüler können das Formular ausfüllen.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_1"
            label=""
            type="date"
            fullWidth
            variant="outlined"
            style={{ marginBottom: '50px' }}
          />
          <DialogContentText>
            Schritt 2: Schüler können Checkboxen, Problemfrage und Präsentationsform eintragen.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_2"
            label=""
            type="date"
            fullWidth
            variant="outlined"
            style={{ marginBottom: '50px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Schließen</Button>
          <Button onClick={handleClose}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StatusButton;
