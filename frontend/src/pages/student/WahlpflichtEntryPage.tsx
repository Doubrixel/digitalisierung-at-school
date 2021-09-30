/**
 * Übersichtsseite für die Wahlpflichtfaecher-Wahl.
 */

import React from 'react';
import './WahlpflichtEntryPage.css';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Paper, Typography } from '@material-ui/core';
import CreatePDFButton from '../../components/Buttons/CreatePDFButton';
import ComponentToggleButton from '../../components/Buttons/ComponentToggleButton';

function WahlpflichtEntryPage() {
  const [wahlpflichtfach1, setWahlpflichtfach1] = React.useState('');
  const [wahlpflichtfach2, setWahlpflichtfach2] = React.useState('');

  const subjectList = [
    { id: '1', label: 'Deutsch' },
    { id: '2', label: 'Englisch' },
    { id: '3', label: 'Französisch' },
    { id: '4', label: 'Latein' },
    { id: '5', label: 'Mathematik' },
  ];

  const handleSubmitWahlpflichtWahl = () => {
    console.log(wahlpflichtfach1);
    console.log(wahlpflichtfach2);
    if (wahlpflichtfach1 === '') {
      console.log('Fehler, nichts ausgewählt für Wahlpflichtfach1! Toastanzeige?');
    }
    if (wahlpflichtfach1 === wahlpflichtfach2) {
      console.log('Fehler, zweimal dasselbe Fach ausgewählt! Toastanzeige?');
    }
  };

  const handleWahlpflichtfach1Change = (event) => {
    console.log('Wahlpflichtfach 1 changed!');
    setWahlpflichtfach1(event.target.value);
  };

  const handleWahlpflichtfach2Change = (event) => {
    console.log('Wahlpflichtfach 2 changed!');
    setWahlpflichtfach2(event.target.value);
  };

  const handleGeneratePDF = () => {

  };

  const handleComponentActivation = () => {

  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <div id="firstRow">
          <div id="title">
            <h1>Wahlpflichtfächer</h1>
          </div>
          <span style={{
            marginRight: '0', marginLeft: 'auto', width: '50vw', maxWidth: '320px',
          }}
          >
            <ComponentToggleButton componentLabel="Komponente deaktivieren" buttonHandleClickFunction={handleComponentActivation} />
          </span>
        </div>

        <Paper id="wahlpflichtRootPaper">
          <div id="hinweis">
            Es müssen&nbsp;
            <span id="underline">zwei</span>
                    &nbsp;Fächer ausgewählt werden!
          </div>

          <div id="Wahlpflichtfachauswahlreihe">
            <FormControl id="Wahlpflichtfach1" component="fieldset">
              <FormLabel id="subtitle-size" component="legend">Wahlpflichtfach 1</FormLabel>
              <RadioGroup
                aria-label="Wahlpflichtfach 1"
                name="radio-buttons-group"
                onChange={handleWahlpflichtfach1Change}
              >
                {subjectList.map((subject) => (
                  <FormControlLabel
                    value={subject.id}
                    control={<Radio />}
                    label={<Typography id="label-size" variant="body1" color="textPrimary">{subject.label}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel id="subtitle-size" component="legend">Wahlpflichtfach 2</FormLabel>
              <RadioGroup
                aria-label="Wahlpflichtfach 2"
                name="radio-buttons-group"
                onChange={handleWahlpflichtfach2Change}
              >
                {subjectList.map((subject) => (
                  <FormControlLabel
                    value={subject.id}
                    control={<Radio />}
                    label={<Typography id="label-size" variant="body1" color="textPrimary">{subject.label}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <div id="button-row">
            <Button style={{ marginTop: '3vh' }} variant="contained" color="primary" onClick={handleSubmitWahlpflichtWahl}>
              Endgültig Speichern
            </Button>
            <CreatePDFButton style={{ marginTop: '3vh' }} onClick={handleGeneratePDF} />
          </div>
        </Paper>
      </div>
    </>

  );
}

export default WahlpflichtEntryPage;
