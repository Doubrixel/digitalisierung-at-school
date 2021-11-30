/**
 * Übersichtsseite für die Facharbeit.
 */
/* eslint-disable */
import React, { useState } from 'react';
import {
  Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField,
} from '@material-ui/core';
import CreatePDFButton from '../../../components/Buttons/CreatePDFButton';
import UploadedFileInformationPanel from '../../../components/FileInformationPanel/UploadedFileInformationPanel';



function FacharbeitApplicationForm(props) {
  const { isGettingEditedByAdmin, preFilledDataIn5PKFormEditedByAdmin } = props;
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [choosenSubject, setChoosenSubject] = useState();
  const [betreuendeLehrkraft, setBetreuendeLehrkraft] = useState();
  const [unterrichtendeLehrkraft, setUnterrichtendeLehrkraft] = useState();
  const [topicTextArea, setTopicTextArea] = useState('');
  const [formStatus, setFormStatus] = useState(0);

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
  const handleSubmitAdminFacharbeit = (event) => {

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
        {formStatus === 3 ? <h1>Facharbeit Übersicht</h1>
          :
        <h1>Facharbeit beantragen</h1>
        }
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
            <TextField label="Fach" variant="outlined" style={{ width: '100%', minWidth: '65px' }} onChange={handleSubjectInputChange} />
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '3vh' }} variant="outlined">
            <TextField label="Betreuende Lehrkraft" variant="outlined" style={{ width: '100%', minWidth: '65px' }} onChange={handleBetreuendeLehrkraftInputChange} />
          </FormControl>
          <FormControl style={{ width: '100%', marginTop: '3vh' }} variant="outlined">
            <TextField label="Unterrichtende Lehrkraft" variant="outlined" style={{ width: '100%', minWidth: '65px' }} onChange={handleUnterrichtendeLehrkraftInputChange} />
          </FormControl>
          {formStatus === 3 ? 
            <Button style={{ marginTop: '3vh' }} variant="contained" color="primary" onClick={handleSubmitAdminFacharbeit}>
              Facharbeit ändern
            </Button>
          :
            <Button style={{ marginTop: '3vh' }} variant="contained" color="primary" onClick={handleSubmitFacharbeit}>
              Facharbeit einreichen / ändern
            </Button>
          }
          <CreatePDFButton style={{ marginTop: '3vh' }} onClick={handleGeneratePDF} />
        </div>
      </Paper>
      <UploadedFileInformationPanel />
    </div>
  );
}

export default FacharbeitApplicationForm;
