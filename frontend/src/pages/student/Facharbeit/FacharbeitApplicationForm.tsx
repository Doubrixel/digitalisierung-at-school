/**
 * Übersichtsseite für die Facharbeit.
 */

import React, { useState } from 'react';
import {
  Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField,
} from '@material-ui/core';
import CreatePDFButton from '../../../components/Buttons/CreatePDFButton';
import UploadedFileInformationPanel from '../../../components/FileInformationPanel/UploadedFileInformationPanel';

const lehrkraefteMock = [{ id: 1, name: 'Miss X' }, { id: 2, name: 'Mister A' }, { id: 3, name: 'Lady Y' }];
const subjectMock = [{ id: 1, name: 'Mathe' }, { id: 2, name: 'Deutsch' }, { id: 3, name: 'English' }];

function FacharbeitApplicationForm() {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [choosenSubject, setChoosenSubject] = useState();
  const [betreuendeLehrkraft, setBetreuendeLehrkraft] = useState();
  const [unterrichtendeLehrkraft, setUnterrichtendeLehrkraft] = useState();
  const [topicTextArea, setTopicTextArea] = useState('');

  const betreuendeLehrkraefteList = lehrkraefteMock;
  const unterrichtendeLehrkraftList = lehrkraefteMock;
  const subjectList = subjectMock;

  const handleStudentNameInputChange = (event) => {
    setStudentName(event.target.value);
  };
  const handleStudentClassInputChange = (event) => {
    setStudentClass(event.target.value);
  };
  const handleSubjectInputChange = (event) => {
    setChoosenSubject(event.target.value);
  };
  const handleBetreuendeLehrkraftInputChange = (event) => {
    setBetreuendeLehrkraft(event.target.value);
  };
  const handleUnterrichtendeLehrkraftInputChange = (event) => {
    setUnterrichtendeLehrkraft(event.target.value);
  };
  const handleTopicInputChange = (event) => {
    setTopicTextArea(event.target.value);
  };
  const handleSubmitFacharbeit = () => {
    const requestBody = JSON.stringify({
      studentId: 0,
      topic: topicTextArea,
      subjectId: choosenSubject,
      responsibleTeacher: betreuendeLehrkraft,
      teachingTeacher: unterrichtendeLehrkraft,
    });
    fetch('placeholder/api/facharbeit/chooseTopic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });
  };

  const handleGeneratePDF = () => {
    alert('pdf generiert...');
    const pdf = {
      studentName,
      studentClass,

    };
    console.log(pdf.toString());
  };
  return (
    <div>
      <div>
        <h1>Facharbeit beantragen</h1>
      </div>
      <Paper className="facharbeitRootPaper">
        <div
          id="studentAndTopicInputs"
          style={{
            display: 'flex', flexDirection: 'column', width: '60%', marginRight: '3vw',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <h2>Schüler:in</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <TextField label="Name" variant="outlined" style={{ width: '50%', minWidth: '65px' }} onChange={handleStudentNameInputChange} />
              <TextField label="Klasse" variant="outlined" style={{ width: '30%', minWidth: '65px' }} onChange={handleStudentClassInputChange} />
            </div>
          </div>
          <TextField
            label="Thema"
            variant="outlined"
            style={{ width: '100%', marginTop: '3vh' }}
            multiline
            rows={10}
            onChange={handleTopicInputChange}
          />
        </div>
        <div id="teacherInputsAndButtons" style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
          <h2> </h2>
          <FormControl style={{ width: '100%', marginTop: '32px' }} variant="outlined">
            <InputLabel>Fach</InputLabel>
            <Select
              label="Fach"
              onChange={handleSubjectInputChange}
            >
              {subjectList.map((subject) => (
                <MenuItem value={subject.id}>{subject.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '3vh' }} variant="outlined">
            <InputLabel>Betreuende Lehrkraft</InputLabel>
            <Select
              label="Betreuende Lehrkraft"
              onChange={handleBetreuendeLehrkraftInputChange}
            >
              {betreuendeLehrkraefteList.map((lehrkraft) => (
                <MenuItem value={lehrkraft.id}>{lehrkraft.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '3vh' }} variant="outlined">
            <InputLabel>Unterrichtende Lehrkraft</InputLabel>
            <Select
              label="Unterrichtende Lehrkraft"
              onChange={handleUnterrichtendeLehrkraftInputChange}
            >
              {unterrichtendeLehrkraftList.map((lehrkraft) => (
                <MenuItem value={lehrkraft.id}>{lehrkraft.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button style={{ marginTop: '3vh' }} variant="contained" color="primary" onClick={handleSubmitFacharbeit}>
            Facharbeit einreichen / ändern
          </Button>
          <CreatePDFButton style={{ marginTop: '3vh' }} onClick={handleGeneratePDF} />
        </div>
      </Paper>
      <UploadedFileInformationPanel />
    </div>
  );
}

export default FacharbeitApplicationForm;
