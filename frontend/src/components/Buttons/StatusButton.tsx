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
    let allFieldsOK = true;
    setFirstDateFieldError(false);
    setSecondDateFieldError(false);
    setThirdDateFieldError(false);
    const regex = /\d{4}-\d{2}-\d{2}/;

    if (!regex.test(date1)) {
      setFirstDateFieldError(true);
      allFieldsOK = false;
    }
    if (!regex.test(date2)) {
      setSecondDateFieldError(true);
      allFieldsOK = false;
    }
    if (!regex.test(date3)) {
      setThirdDateFieldError(true);
      allFieldsOK = false;
    }

    if (date1 >= date2) {
      setFirstDateFieldError(true);
      setSecondDateFieldError(true);
      allFieldsOK = false;
    }
    if (date1 >= date3) {
      setFirstDateFieldError(true);
      setThirdDateFieldError(true);
      allFieldsOK = false;
    }
    if (date2 >= date3) {
      setSecondDateFieldError(true);
      setThirdDateFieldError(true);
      allFieldsOK = false;
    }
    return allFieldsOK;
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
          console.log(`??bergangszeitpunkte konnten nicht geladen werden. Fehler: ${e.message}`);
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
    // eslint-disable-next-line max-len
    if (!validateDateFields(transitionDate1, transitionDate2, transitionDate3)) {
      return;
    }
    const body = {
      transitionDate1,
      transitionDate2,
      transitionDate3,
    };
    sendAPIRequest('/api/components/fifthExam/setTransitionDates', 'POST', body);

    close();
  };

  function checkIfDataHasBeenSaved(response) {
    if (response.ok) {
      alert('Daten wurden erfolgreich zur??ckgesetzt.');
      window.location.reload();
    }
    alert('Daten konnten nicht zur??ckgesetzt werden. Bitte kontaktieren Sie einen Administrator.');
  }

  const reset = () => {
    const confirmed1 = window.confirm('Wollen Sie die Abiturp??fungskomponente wirklich zur??cksetzen?');
    let confirmed2 = false;
    if (confirmed1) {
      confirmed2 = window.confirm('Wenn Sie die Komponente zur??cksetzen, dann gehen alle von den Sch??lern eingetragene Daten verloren. Dies sollte nur am Ende des Schuljahres passieren. \nWirklich zur??cksetzen?');
    }
    if (confirmed1 && confirmed2) {
      sendAPIRequest('/api/abitur/clearAllData', 'POST')
        .then((response) => checkIfDataHasBeenSaved(response));
    }
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
            Schritt 1: Komponente f??r Sch??ler freigeben.
            Das Datum ist der Tag, ab dem die Komponente genutzt werden kann.
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
            helperText={firstDateFieldError ? 'Das Datum f??r Schritt 1 muss vor Schritt 2 und 3 liegen.' : null}
          />
          <DialogContentText>
            Schritt 2: Sch??ler k??nnen Problemfrage und Pr??sentationsform eintragen
            und die Checkboxen best??tigen. Das Datum ist der letzte Tag an dem Sch??ler
            das Formular des 1. Schrittes nutzen k??nnen (letzter Abgabetag).
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
            helperText={secondDateFieldError ? 'Das Datum f??r Schritt 2 muss nach Schritt 1 und vor Schritt 3 liegen.' : null}
          />
          <DialogContentText>
            Schritt 3: Komponente sperren.  Das Datum ist der letzte Tag an dem Sch??ler das
            Formular des 2. Schrittes nutzen k??nnen (letzter Abgabetag).
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
            helperText={thirdDateFieldError ? 'Das Datum f??r Schritt 3 muss nach Schritt 1 und 2 liegen.' : null}
          />
          <Button variant="contained" onClick={reset} color="secondary">Gesamte Komponente Zur??cksetzen</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Schlie??en</Button>
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
