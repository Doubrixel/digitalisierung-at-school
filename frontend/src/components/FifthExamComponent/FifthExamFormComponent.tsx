/* eslint-disable */
import React, { useState } from 'react';
import './FifthExamFormComponent.css';
import {
  Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormLabel, RadioGroup,
  FormControlLabel, Radio,
} from '@material-ui/core';
import CreatePDFButton from '../Buttons/CreatePDFButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';

const referenzfachMock = [{ id: 1, name: 'Mathe' }, { id: 2, name: 'Deutsch' }, { id: 3, name: 'English' }];
const examinerMock = [{ id: 1, name: 'Mr. Jonson' }, { id: 2, name: 'Mrs. Heathrow' }, { id: 3, name: 'Miss Daisy' }];
const bezugsfachMock = [{ id: 1, name: 'Geschichte' }, { id: 2, name: 'Deutsch' }, { id: 3, name: 'Geografie' }];

function FifthExamFormComponent() {
  const verticalComponentDistance = '2vh';
  const aDate = new Date();
  const dueDate = `${aDate.getDate()}.${aDate.getMonth() + 1}.${aDate.getFullYear()}`;

  const formState = useSelector((state: RootState) => state.studentDataReducer.fifthPkFormData); // in formState ist das Objekt gespeichert 

  console.log(formState);
  /*
  const [examType, setExamType] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPartner, setStudentPartner] = useState('');
  const [chosenTopicArea, setChosenTopicArea] = useState('');
  const [referenzfach, setReferenzfach] = useState('');
  const [examiner, setExaminer] = useState('');
  const [bezugsfach, setBezugsfach] = useState('');
  */

  const referenzfachList = referenzfachMock;
  const examinerList = examinerMock;
  const bezugsfachList = bezugsfachMock;

  const handleExamTypeInputChange = (event) => {
    //setExamType(event.target.value);
  };
  const handleStudentNameInputChange = (event) => {
    //setStudentName(event.target.value);
  };
  const handleStudentPartnerInputChange = (event) => {
    //setStudentPartner(event.target.value);
  };
  const handleChosenTopicAreaInputChange = (event) => {
    //setChosenTopicArea(event.target.value);
  };
  const handleReferenzfachInputChange = (event) => {
    //setReferenzfach(event.target.value);
  };
  const handleExaminerInputChange = (event) => {
    //setExaminer(event.target.value);
  };
  const handleBezugsfachInputChange = (event) => {
    //setBezugsfach(event.target.value);
  };

  const handleGeneratePDF = () => {
    alert('pdf generiert...');
    const pdf = {
      /*
      examType,
      studentName,
      studentPartner,
      chosenTopicArea,
      referenzfach,
      examiner,
      bezugsfach,
      */
    };
    console.log(pdf.toString());
  };

  const handleSubmitFifthExamForm = () => {};

  return (
    <div>
      <div id="firstLine">
        <h1>Fünfte PK</h1>
        <span style={{
          marginRight: '0', marginLeft: 'auto', width: '50vw', maxWidth: '320px',
        }}
        />
      </div>
      <Paper className="fifthExamPaper">
        <FormControl component="fieldset">
          <FormLabel component="legend" />
          <RadioGroup
            aria-label="Präsentationsprüfung"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel
              value="Präsentationsprüfung"
              control={<Radio />}
              label="Präsentationsprüfung"
              onChange={handleExamTypeInputChange}
            />
            <FormControlLabel value="Besondere Lernleistung" control={<Radio />} label="Besondere Lernleistung" />
          </RadioGroup>
        </FormControl>

        <TextField 
          label="Prüfling" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleStudentNameInputChange} 
          value={formState.studentName}/>

        <TextField 
          label="ggf. Partner:in" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleStudentPartnerInputChange}
          value={formState.partnerStudentName}/>
        
        <TextField 
          label="Referenzfach" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleStudentPartnerInputChange}
          value={formState.referenzfach} />

        <TextField 
          label="Prüfer:in" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleStudentPartnerInputChange}
          value={formState.responsibleTeacher} />

        <TextField 
          label="Bezugsfach" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleStudentPartnerInputChange}
          value={formState.bezugsfach} />


        <TextField
          label="gewählter Themenbereich"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={handleChosenTopicAreaInputChange}
          multiline
          rows={3}
          value={formState.topic}
        />
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: verticalComponentDistance }}>
          Abgabe Termin:
          {' '}
          {dueDate}
        </p>
        <div id="buttonContainer5PK">
          <Button
            id="submitButtonFifthExam"
            style={{
              marginTop: verticalComponentDistance, marginRight: '3vw', width: '18vw', minWidth: '188px',
            }}
            variant="contained"
            color="primary"
            onClick={handleSubmitFifthExamForm}
          >
            einreichen / ändern
          </Button>
          <CreatePDFButton style={{ marginTop: verticalComponentDistance, width: '18vw', minWidth: '188px' }} onClick={handleGeneratePDF} />
        </div>
      </Paper>
    </div>
  );
}

export default FifthExamFormComponent;
