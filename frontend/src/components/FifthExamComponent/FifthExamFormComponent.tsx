/* eslint-disable */
import React, { useState } from 'react';
import './FifthExamFormComponent.css';
import {
  Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, FormLabel, RadioGroup,
  FormControlLabel, Radio,
} from '@material-ui/core';
import CreatePDFButton from '../Buttons/CreatePDFButton';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../reducer';


function FifthExamFormComponent() {
  const verticalComponentDistance = '2vh';
  const aDate = new Date();
  const dueDate = `${aDate.getDate()}.${aDate.getMonth() + 1}.${aDate.getFullYear()}`;

  const formState = useSelector((state: RootState) => state.studentDataReducer.fifthPkFormData); // in formState ist das Objekt gespeichert 
  const dispatch = useDispatch();

  const handleExamTypeInputChange = (event) => {
    dispatch({type:"CHANGE_EXAMTYPE", payload: event.target.value})
  };
  const handleStudentNameInputChange = (event) => {
    dispatch({type:"CHANGE_STUDENTNAME", payload: event.target.value})
  };
  const handleStudentPartnerInputChange = (event) => {
    dispatch({type:"CHANGE_STUDENTPARTNER", payload: event.target.value})
  };
  const handleChosenTopicAreaInputChange = (event) => {
    dispatch({type:"CHANGE_TOPIC", payload: event.target.value})
  };
  const handleReferenzfachInputChange = (event) => {
    dispatch({type:"CHANGE_REFERENZFACH", payload: event.target.value})
  };
  const handleExaminerInputChange = (event) => {
    dispatch({type:"CHANGE_EXAMINER", payload: event.target.value})
  };
  const handleBezugsfachInputChange = (event) => {
    dispatch({type:"CHANGE_BEZUGSFACH", payload: event.target.value})
  };

  const handleGeneratePDF = () => {
    alert('pdf generiert...');
    const pdf = {
      ...formState
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
            defaultValue={formState.examType}
          >
            <FormControlLabel
              value="Praesentation"
              control={<Radio />}
              label="Präsentationsprüfung"
              onChange={handleExamTypeInputChange}
            />
            <FormControlLabel
              value="BLL"
              control={<Radio />}
              label="Besondere Lernleistung"
              onChange={handleExamTypeInputChange}
            />
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
          onChange={handleReferenzfachInputChange}
          value={formState.referenzfach} />

        <TextField 
          label="Prüfer:in" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleExaminerInputChange}
          value={formState.responsibleTeacher} />

        <TextField 
          label="Bezugsfach" 
          variant="outlined" 
          style={{ marginTop: verticalComponentDistance }} 
          onChange={handleBezugsfachInputChange}
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
