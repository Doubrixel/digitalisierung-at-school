/**
 * Übersichtsseite für die Facharbeit.
 */
/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {
  Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField,
} from '@material-ui/core';
import CreatePDFButton from '../../../components/Buttons/CreatePDFButton';
import UploadedFileInformationPanel from '../../../components/FileInformationPanel/UploadedFileInformationPanel';
import sendAPIRequest from "../../../APIRequestFunction";



function FacharbeitApplicationForm(props) {
  const { isGettingEditedByAdmin, preFilledDataIn5PKFormEditedByAdmin } = props;
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [subject, setSubject] = useState();
  const [choosenTeacher, setChoosenTeacher] = useState();
  const [subjectTeacher, setSubjectTeacher] = useState();
  const [topic, setTopic] = useState('');
  const [formStatus, setFormStatus] = useState(0);

  const handleStudentNameInputChange = (event) => {
    setStudentName(event.target.value);
  };
  const handleStudentClassInputChange = (event) => {
    setStudentClass(event.target.value);
  };
  const handleSubjectInputChange = (event) => {
    setSubject(event.target.value);
  };
  const handleBetreuendeLehrkraftInputChange = (event) => {
    setChoosenTeacher(event.target.value);
  };
  const handleUnterrichtendeLehrkraftInputChange = (event) => {
    setSubjectTeacher(event.target.value);
  };
  const handleTopicInputChange = (event) => {
    setTopic(event.target.value);
  };

  useEffect(() => {
    if (isGettingEditedByAdmin === true) {
      setFormStatus(3);
    }
  }, []);

  const handleSubmitFacharbeit = () => {
    const requestBody = JSON.stringify({
      studentId: 0,
      topic: topic,
      subjectId: subject,
      responsibleTeacher: choosenTeacher,
      teachingTeacher:  subjectTeacher,
    });
    fetch('placeholder/api/facharbeit/chooseTopic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });
  };

  const handleSubmitAdminFacharbeit = () => {
    const requestBody = JSON.stringify({
      studentId: 0,
      topic: topic,
      subjectId: subject,
      responsibleTeacher: choosenTeacher,
      teachingTeacher:  subjectTeacher,
    });
    fetch('placeholder/api/facharbeit/chooseTopic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });
  }

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
