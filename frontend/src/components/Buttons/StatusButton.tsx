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
  const [firstDateFieldError, setFirstDateFieldError] = useState(false);
  const [secondDateFieldError, setSecondDateFieldError] = useState(false);
  const [thirdDateFieldError, setThirdDateFieldError] = useState(false);

  function validateDateFields(date1, date2, date3) {
    setFirstDateFieldError(false);
    setSecondDateFieldError(false);
    setThirdDateFieldError(false);

    if (date1 >= date2) {
      setFirstDateFieldError(true);
      setSecondDateFieldError(true);
    }
    if (date1 >= date3) {
      setFirstDateFieldError(true);
      setThirdDateFieldError(true);
    }
    if (date2 >= date3) {
      setSecondDateFieldError(true);
      setThirdDateFieldError(true);
    }
  }

  function handleSetTransitionDate1(event) {
    setTransitionDate1(event.target.value);
    validateDateFields(event.target.value, transitionDate2, transitionDate3);
  }
  function handleSetTransitionDate2(event) {
    setTransitionDate2(event.target.value);
    validateDateFields(transitionDate1, event.target.value, transitionDate3);
  }
  function handleSetTransitionDate3(event) {
    setTransitionDate3(event.target.value);
    validateDateFields(transitionDate1, transitionDate2, event.target.value);
  }

  function getAndSetCurrentTransitionDates() {
    sendAPIRequest('/api/components/getTransitionDatesOfAll', 'GET')
      .then((response) => response.json())
      .then((json) => {
        // @ts-ignore
        let fifthExamDates;
        // eslint-disable-next-line
        for (let i = 0; i < json.length; i++) {
          if (json[i].name === 'fifthExam') {
            fifthExamDates = json[i];
          }
        }
        try {
          setTransitionDate1(fifthExamDates.transitionDate1);
          setTransitionDate2(fifthExamDates.transitionDate2);
          setTransitionDate3(fifthExamDates.transitionDate3);
          // eslint-disable-next-line max-len
          validateDateFields(fifthExamDates.transitionDate1, fifthExamDates.transitionDate2, fifthExamDates.transitionDate3);
        } catch (e) {
          // @ts-ignore
          console.log(`Übergangszeitpunkte konnten nicht geladen werden. Fehler: ${e.message}`);
        }
      });
  }
  const handleClickOpen = () => {
    getAndSetCurrentTransitionDates();
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const save = () => {
    const body = {
      transitionDate1,
      transitionDate2,
      transitionDate3,
    };
    sendAPIRequest('/api/components/fifthExam/setTransitionDates', 'POST', body);

    close();
  };

  const reset = () => {
    // zurücksetzen für neues Schuljahr
  };

  useEffect(() => {
    getAndSetCurrentTransitionDates();
    return () => {

    };
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ marginTop: '2vh', width: '20vw', minWidth: '188px' }}>
        Datum zur Steuerung des Komponentenstatus bearbeiten
      </Button>
      <Dialog open={open} onClose={close}>
        <DialogTitle style={{ fontSize: '35px' }}>Freigabe bearbeiten</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Schritt 0: Komponente für Schüler freigeben.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_0"
            type="date"
            fullWidth
            variant="outlined"
            value={transitionDate1}
            onChange={(event) => handleSetTransitionDate1(event)}
            style={{ marginBottom: '50px' }}
            error={firstDateFieldError}
            helperText={firstDateFieldError ? 'Das Datum für Schritt 0 muss vor Schritt 1 und 2 liegen.' : null}
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
            onChange={(event) => handleSetTransitionDate2(event)}
            style={{ marginBottom: '50px' }}
            error={secondDateFieldError}
            helperText={secondDateFieldError ? 'Das Datum für Schritt 1 muss nach Schritt 0 und vor Schritt 2 liegen.' : null}
          />
          <DialogContentText>
            Schritt 2: Komponente sperren
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="step_2"
            type="date"
            fullWidth
            variant="outlined"
            value={transitionDate3}
            onChange={(event) => handleSetTransitionDate3(event)}
            style={{ marginBottom: '50px' }}
            error={thirdDateFieldError}
            helperText={thirdDateFieldError ? 'Das Datum für Schritt 3 muss nach Schritt 0 und 1 liegen.' : null}
          />
          <Button variant="contained" onClick={reset} color="secondary">Zurücksetzen</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Schließen</Button>
          <Button
            onClick={save}
            disabled={firstDateFieldError || secondDateFieldError || thirdDateFieldError}
          >
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StatusButton;
