/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import sendAPIRequest from '../../APIRequestFunction';

function StatusButton() {
  const [open, setOpen] = useState(false);

  const [transitionDate1, setTransitionDate1] = useState('');
  const [transitionDate2, setTransitionDate2] = useState('');
  const [transitionDate3, setTransitionDate3] = useState('');

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

  useEffect(() => {
    sendAPIRequest("/api/components/getTransitionDatesOfAll", 'GET')
    .then((response) => response.json())
    .then((json) => {
        // @ts-ignore
        let fifthExamDates
        for(let i = 0; i < json.length; i++) {
          if(json[i].name == "fifthExam") {
            fifthExamDates = json[i];
          }
        }      

        setTransitionDate1(fifthExamDates.transitionDate1); 
        setTransitionDate2(fifthExamDates.transitionDate2);
        setTransitionDate3(fifthExamDates.transitionDate3);
      });

    return () => {

    };
  }, []);

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
            value={transitionDate1}
            onChange={(event) => setTransitionDate1(event.target.value)}
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
            value={transitionDate2}
            onChange={(event) => setTransitionDate1(event.target.value)}
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
            value={transitionDate3}
            onChange={(event) => setTransitionDate2(event.target.value)}
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
