import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FifthExamFormComponent.css';
import {
  Paper, TextField, FormControl, Button, FormLabel, RadioGroup,
  FormControlLabel, Radio, Checkbox, FormGroup, Tooltip, Typography,
} from '@material-ui/core';
import CreatePDFButton from '../Buttons/CreatePDFButton';
import sendAPIRequest from '../../APIRequestFunction';
import { EINREICHFRIST_FUENFTE_PK } from '../../CONFIG';

function FifthExamFormComponent(props) {
  const { isGettingEditedByAdmin, preFilledDataIn5PKFormEditedByAdmin } = props;
  const verticalComponentDistance = '2vh';
  /*
  possible formStatus:
  0 - form is locked because component is locked or student already submitted the form
  1 - first Status in which the student can Enter the essential Details and generate the first PDF
  2 - status when the original inputs are locked and the student can enter
      some additional information or
      apply in the updateInputs for a change of his data and he can click the checkboxes
  3 - the application got denied by an admin and now it needs new inputs
  4 - the form is getting edited by an admin
   */
  const [formStatus, setFormStatus] = useState(0);

  // originalFieldHooks
  const [examType, setExamType] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPartner, setStudentPartner] = useState('');
  const [referenzfach, setReferenzfach] = useState('');
  const [bezugsfach, setBezugsfach] = useState('');
  const [examiner, setExaminer] = useState('');
  const [topicArea, setTopicArea] = useState('');
  const [problemQuestion, setProblemQuestion] = useState('');
  const [presentationForm, setPresentationForm] = useState('');

  // updateDataFieldHooks
  const [updatedStudentName, setUpdatedStudentName] = useState('');
  const [updatedStudentPartner, setUpdatedStudentPartner] = useState('');
  const [updatedReferenzfach, setUpdatedReferenzfach] = useState('');
  const [updatedBezugsfach, setUpdatedBezugsfach] = useState('');
  const [updatedExaminer, setUpdatedExaminer] = useState('');
  const [updatedTopicArea, setUpdatedTopicArea] = useState('');
  const [updatedProblemQuestion, setUpdatedProblemQuestion] = useState('');
  const [updatedPresentationForm, setUpdatedPresentationForm] = useState('');

  // Checkbox-Hooks
  const [PPCheckBox1, setPPCheckBox1] = useState(false);
  const [PPCheckBox2, setPPCheckBox2] = useState(false);
  const [PPCheckBox3, setPPCheckBox3] = useState(false);
  const [PPCheckBox4, setPPCheckBox4] = useState(false);
  const [BLLCheckBox1, setBLLCheckBox1] = useState(false);
  const [BLLCheckBox2, setBLLCheckBox2] = useState(false);
  const [BLLCheckBox3, setBLLCheckBox3] = useState(false);
  const [BLLCheckBox4, setBLLCheckBox4] = useState(false);

  const [rejectionReason, setRejectionReason] = useState('false');

  // originalDataField Handler
  const handleExamTypeInputChange = (event) => {
    setExamType(event.target.value);
  };
  const handleStudentNameInputChange = (event) => {
    setStudentName(event.target.value);
  };
  const handleStudentPartnerInputChange = (event) => {
    setStudentPartner(event.target.value);
  };
  const handleReferenzfachInputChange = (event) => {
    setReferenzfach(event.target.value);
  };
  const handleBezugsfachInputChange = (event) => {
    setBezugsfach(event.target.value);
  };
  const handleExaminerInputChange = (event) => {
    setExaminer(event.target.value);
  };
  const handleChosenTopicAreaInputChange = (event) => {
    setTopicArea(event.target.value);
  };
  const handleProblemQuestionInputChange = (event) => {
    setProblemQuestion(event.target.value);
  };
  const handlePresentationFormInputChange = (event) => {
    setPresentationForm(event.target.value);
  };

  // updateField Handler
  const handleUpdateFieldStudentNameInputChange = (event) => {
    setUpdatedStudentName(event.target.value);
  };
  const handleUpdateFieldStudentPartnerInputChange = (event) => {
    setUpdatedStudentPartner(event.target.value);
  };
  const handleUpdateFieldReferenzfachInputChange = (event) => {
    setUpdatedReferenzfach(event.target.value);
  };
  const handleUpdateFieldBezugsfachInputChange = (event) => {
    setUpdatedBezugsfach(event.target.value);
  };
  const handleUpdateFieldExaminerInputChange = (event) => {
    setUpdatedExaminer(event.target.value);
  };
  const handleUpdateFieldChosenTopicAreaInputChange = (event) => {
    setUpdatedTopicArea(event.target.value);
  };
  const handleUpdateFieldProblemQuestionInputChange = (event) => {
    setUpdatedProblemQuestion(event.target.value);
  };
  const handleUpdateFieldPresentationFormInputChange = (event) => {
    setUpdatedPresentationForm(event.target.value);
  };

  const allFieldsAreDisabled = formStatus === 0;
  function getIsSubmitFormButtonDisabled() {
    return formStatus === 0
    // eslint-disable-next-line max-len
            || (formStatus === 1 && (!examType || !studentName || !referenzfach || !bezugsfach || !examiner || !topicArea))
            || ((formStatus === 2 || formStatus === 3) && (
              (examType === 'PP' && (!problemQuestion || !presentationForm || !PPCheckBox1 || !PPCheckBox2 || !PPCheckBox3 || !PPCheckBox4))
                || (examType === 'BLL' && (!problemQuestion || !BLLCheckBox1 || !BLLCheckBox2 || !BLLCheckBox3 || !BLLCheckBox4)))
            );
  }

  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function processComponentStatus(response): number {
    let componentStatusId = 0;
    response.forEach((componentObject) => {
      if (componentObject.componentId === 2) {
        setFormStatus(componentObject.componentStatusId);
        componentStatusId = componentObject.componentStatusId;
      }
    });
    return componentStatusId;
  }
  const componentStatusId = 1;

  function processExamData(prefillDataObject) {
    setExamType(prefillDataObject.examType);
    setStudentName(prefillDataObject.studentName);
    setStudentPartner(prefillDataObject.partnerStudentName);
    setReferenzfach(prefillDataObject.referenzfach);
    setBezugsfach(prefillDataObject.bezugsfach);
    setExaminer(prefillDataObject.examiner);
    setTopicArea(prefillDataObject.topicArea);
    setProblemQuestion(prefillDataObject.problemQuestion);
    setPresentationForm(prefillDataObject.presentationForm);
    setRejectionReason(prefillDataObject.rejectionReason);

    if (isGettingEditedByAdmin === true) {
      setFormStatus(4);
      return;
    }
    // @ts-ignore
    if (componentStatusId === 0 || componentStatusId === 1 || componentStatusId === 2) {
      setFormStatus(componentStatusId);
    }
    if (prefillDataObject.approved === false || prefillDataObject.approved === 0) {
      setFormStatus(3);
      return;
    }
    // That if-clause checks, if a student already submitted the
    // form in a specific formStatus, which means he can't submit it again
    // @ts-ignore
    if ((prefillDataObject.examType && componentStatusId === 1)
      // @ts-ignore
      || (prefillDataObject.problemQuestion && componentStatusId === 2)) {
      // setFormStatus(0);
      alert('Das Formular wurde bereits abgesendet und kann erst zu einem späteren Zeitpunkt nochmals bearbeitet werden, z.B. wenn der Antrag abgelehnt wurde.');
    }
  }

  useEffect(() => {
    if (isGettingEditedByAdmin === true) {
      processExamData(preFilledDataIn5PKFormEditedByAdmin);
    } else {
      /* sendAPIRequest('api/components/getStatusOfAll', 'GET')
           .then((response) => response.json())
           .then(data => componentStatus = data)
           .then((data) => processComponentStatus(data))
           .then(sendAPIRequest('api/abitur/getExamData'...) */
      sendAPIRequest('api/abitur/getExamData', 'GET')
        .then((response) => response.json())
        .then((data) => {
          processExamData(data);
        });
    }
  }, []);

  const handleGeneratePDF = (pdfNr) => {
    if (pdfNr === 1) {
      // generiere erste PDF
    } else if (pdfNr === 2) {
      // generiere finale pdf
    }
    alert('pdf generiert...');
    const pdf = {
      examType,
      studentName,
      studentPartner,
      chosenTopicArea: topicArea,
      referenzfach,
      examiner,
      bezugsfach,
    };
    console.log(pdf.toString());
  };

  const handleSubmitFifthExamForm = () => {
    const requestBodyParams = {
      examType,
      studentName,
      studentPartner,
      referenzfach,
      bezugsfach,
      examiner,
      topicArea,
      problemQuestion,
      presentationForm,
      updatedStudentName,
      updatedStudentPartner,
      updatedReferenzfach,
      updatedBezugsfach,
      updatedExaminer,
      updatedTopicArea,
      updatedProblemQuestion,
      updatedPresentationForm,
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const key in requestBodyParams) {
      if (requestBodyParams[key] === '') {
        delete requestBodyParams[key];
      }
    }

    function checkIfDataHasBeenSaved(response) {
      if (response.ok) {
        alert('Daten wurden erfolgreich gespeichert.');
        history.push(isGettingEditedByAdmin ? '/admin/pruefungskomponente' : '/');
      } else {
        alert('Daten konnten nicht gespeichert werden. Bitte kontaktieren Sie einen Administrator.');
      }
    }
    sendAPIRequest('api/abitur/applyForTopic', 'POST', requestBodyParams)
      .then((response) => (checkIfDataHasBeenSaved(response)));
  };

  function getStepOneInputFields(areInputFieldsOriginalDataFields) {
    let inputFieldsAreDisabled = true;
    if (formStatus === 1 && areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 2 && areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = true;
    } else if (formStatus === 2 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 3 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 4 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
        {!areInputFieldsOriginalDataFields
          ? (
            <text>
              Wenn Daten geändert werden müssen, tragen Sie diese in die rechte Spalte ein.
              Wird ein Feld in der rechten Spalte nicht ausgefüllt, bleiben die bereits
              eingetragenen Daten aus der linken Spalte erhalten.
              <br />
            </text>
          )
          : (
            <text>
              <br />
              <br />
            </text>
          )}
        <TextField
          label="Prüfling"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleStudentNameInputChange : handleUpdateFieldStudentNameInputChange}
          value={areInputFieldsOriginalDataFields ? studentName : updatedStudentName}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
        />
        <TextField
          label="ggf. Partner:in"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleStudentPartnerInputChange : handleUpdateFieldStudentPartnerInputChange}
          value={areInputFieldsOriginalDataFields ? studentPartner : updatedStudentPartner}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
          color="primary"
        />
        <TextField
          label="Referenzfach"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleReferenzfachInputChange : handleUpdateFieldReferenzfachInputChange}
          value={areInputFieldsOriginalDataFields ? referenzfach : updatedReferenzfach}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
        />
        <TextField
          label="Bezugsfach"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleBezugsfachInputChange : handleUpdateFieldBezugsfachInputChange}
          value={areInputFieldsOriginalDataFields ? bezugsfach : updatedBezugsfach}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
        />
        <TextField
          label="Prüfer:in"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleExaminerInputChange : handleUpdateFieldExaminerInputChange}
          value={areInputFieldsOriginalDataFields ? examiner : updatedExaminer}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
        />
        <TextField
          label="Themenbereich"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleChosenTopicAreaInputChange : handleUpdateFieldChosenTopicAreaInputChange}
          value={areInputFieldsOriginalDataFields ? topicArea : updatedTopicArea}
          multiline
          rows={3}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
        />
      </div>
    );
  }

  function getStepTwoInputFields(areInputFieldsOriginalDataFields) {
    let inputFieldsAreDisabled = true;
    if (formStatus === 2 && areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 3 && areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = true;
    } else if (formStatus === 3 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 4 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
        <TextField
          label="Problemfrage"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleProblemQuestionInputChange : handleUpdateFieldProblemQuestionInputChange}
          value={areInputFieldsOriginalDataFields ? problemQuestion : updatedProblemQuestion}
          multiline
          rows={3}
          disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
        />
        {examType === 'PP'
          ? (
            <TextField
              label="Präsentationsform (Medien)"
              variant="outlined"
              style={{ marginTop: verticalComponentDistance }}
              onChange={areInputFieldsOriginalDataFields
                ? handlePresentationFormInputChange : handleUpdateFieldPresentationFormInputChange}
              value={areInputFieldsOriginalDataFields ? presentationForm : updatedPresentationForm}
              disabled={allFieldsAreDisabled || inputFieldsAreDisabled}
            />
          ) : null}
      </div>
    );
  }

  function getAppropriateCheckboxes() {
    const checkboxGroupStyle = { marginTop: '2vh' };
    if (examType === 'PP') {
      return (
        <FormGroup style={checkboxGroupStyle}>
          <FormControlLabel control={<Checkbox checked={PPCheckBox1} onChange={() => setPPCheckBox1(!PPCheckBox1)} />} label="Eine Gliederung und der Protokollbogen müssen dem Antrag beigelegt werden. (* Bei einer Gruppen- oder Partnerprüfung sind in der Gliederung die spezifischen Anteile der einzelnen Teilnehmer*innen auszuweisen)" />
          <FormControlLabel control={<Checkbox checked={PPCheckBox2} onChange={() => setPPCheckBox2(!PPCheckBox2)} />} label="Das Referenzfach habe ich 4 Semester belegt, das Bezugsfach mindestens 2 Semester." />
          <FormControlLabel control={<Checkbox checked={PPCheckBox3} onChange={() => setPPCheckBox3(!PPCheckBox3)} />} label="Das Hauptfach entspricht meiner Laufbahnplanung bzw. einer der Zeilen in der Tabelle der Wahlmöglichkeiten der Prüfungsfächer für das Abitur." />
          <FormControlLabel control={<Checkbox checked={PPCheckBox4} onChange={() => setPPCheckBox4(!PPCheckBox4)} />} label="Die schriftliche Ausarbeitung zu der Präsentation gebe ich nach Absprache bis zum 16.03.2022 bei meiner betreuenden Lehrkraft in zweifacher Ausfertigung ab." />
        </FormGroup>
      );
    }
    if (examType === 'BLL') {
      return (
        <FormGroup style={checkboxGroupStyle}>
          <FormControlLabel control={<Checkbox checked={BLLCheckBox1} onChange={() => setBLLCheckBox1(!BLLCheckBox1)} />} label="Eine Gliederung und der Protokollbogen müssen dem Antrag beigelegt werden." />
          <FormControlLabel control={<Checkbox checked={BLLCheckBox2} onChange={() => setBLLCheckBox2(!BLLCheckBox2)} />} label="Das Referenzfach habe ich 4 Semester belegt, das Bezugsfach mindestens 2 Semester." />
          <FormControlLabel control={<Checkbox checked={BLLCheckBox3} onChange={() => setBLLCheckBox3(!BLLCheckBox3)} />} label="Das Hauptfach entspricht meiner Laufbahnplanung bzw. einer der Zeilen in der Tabelle der Wahlmöglichkeiten der Prüfungsfächer für das Abitur." />
          <FormControlLabel control={<Checkbox checked={BLLCheckBox4} onChange={() => setBLLCheckBox4(!BLLCheckBox4)} />} label="Die BLL gebe ich spätestens am 20.12.2021 bei der Oberstufenkoordination in zweifacher schriftlicher Ausfertigung und einmal digital ab." />
        </FormGroup>
      );
    }
    return null;
  }

  function getDisplayRejectionReasonComponent() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2vh',
      }}
      >
        <Typography style={{ fontSize: 'x-large', color: 'red', fontWeight: 'bold' }}>
          Ihr Antrag für die 5. PK wurde abgelehnt. Der Ablehnungsgrund lautet:
          {' '}
          <br />
        </Typography>
        <Typography style={{ fontSize: 'large' }}>
          {rejectionReason}
        </Typography>
      </div>
    );
  }

  function getAppropriateTooltip() {
    let tooltipText;
    if (formStatus === 1) {
      tooltipText = 'Es müssen die Prüfungsart, Prüflingsname, Referenzfach, Bezugsfach, Prüfer:in und Themenbereich  eingetragen werden.';
    } else if (formStatus === 2 && examType === 'PP') {
      tooltipText = 'Es müssen sowohl die Felder Problemfrage und Präsentationsform als auch alle 4 Checkboxen angehakt sein, bevor Sie die Daten absenden können.';
    } else {
      tooltipText = 'Es müssen sowohl das Feld Problemfrage als auch alle 4 Checkboxen angehakt sein, bevor Sie die Daten absenden können.';
    }
    return (
      <Typography style={{ fontSize: 'medium' }}>{tooltipText}</Typography>
    );
  }

  function getSubmitAndGeneratePDFButtons() {
    const distanceBetweenButtons = '3vw';
    const buttonArray = [
      <Tooltip title={getIsSubmitFormButtonDisabled() ? getAppropriateTooltip() : ''}>
        <span>
          <Button
            id="submitButtonFifthExam"
            style={{
              marginTop: verticalComponentDistance, marginRight: distanceBetweenButtons, width: '18vw', minWidth: '188px',
            }}
            variant="contained"
            color="primary"
            onClick={handleSubmitFifthExamForm}
            disabled={allFieldsAreDisabled || getIsSubmitFormButtonDisabled()}
          >
            einreichen / ändern
          </Button>
        </span>
      </Tooltip>,
      <CreatePDFButton
        style={{
          marginTop: verticalComponentDistance, marginRight: distanceBetweenButtons, width: '18vw', minWidth: '188px',
        }}
        onClick={() => handleGeneratePDF(1)}
        label="Erste Rückmeldung als PDF generieren"
      />,
    ];
    if (formStatus !== 1) {
      buttonArray.push(
        <CreatePDFButton
          style={{ marginTop: verticalComponentDistance, width: '18vw', minWidth: '188px' }}
          onClick={() => handleGeneratePDF(2)}
          label="Finale Rückmeldung als PDF generieren"
        />,
      );
    }
    return buttonArray;
  }

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
        {formStatus === 3 ? getDisplayRejectionReasonComponent() : null}
        <FormControl component="fieldset">
          <FormLabel component="legend">Prüfungsart</FormLabel>
          <RadioGroup
            aria-label="Prüfungsart"
            name="radio-buttons-group"
            value={examType}
            row
          >
            <FormControlLabel
              value="PP"
              control={<Radio />}
              label="Präsentationsprüfung"
              onChange={handleExamTypeInputChange}
              disabled={formStatus !== 1 || allFieldsAreDisabled}
            />
            <FormControlLabel
              value="BLL"
              control={<Radio />}
              label="Besondere Lernleistung"
              onChange={handleExamTypeInputChange}
              disabled={formStatus !== 1 || allFieldsAreDisabled}
            />
          </RadioGroup>
        </FormControl>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {getStepOneInputFields(true)}
          {formStatus === 2 || formStatus === 3 || formStatus === 4
            ? getStepOneInputFields(false) : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {formStatus === 2 || formStatus === 3 || formStatus === 4
            ? getStepTwoInputFields(true) : null}
          {formStatus === 3 || formStatus === 4 ? getStepTwoInputFields(false) : null}
        </div>
        {formStatus === 2 || formStatus === 3 ? getAppropriateCheckboxes() : null}
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: verticalComponentDistance }}>
          Abgabetermin:
          {' '}
          {EINREICHFRIST_FUENFTE_PK}
        </p>
        <div id="buttonContainer5PK">
          {getSubmitAndGeneratePDFButtons()}
        </div>
      </Paper>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    preFilledDataIn5PKFormEditedByAdmin: state.FifthExamReducer.preFilledDataIn5PKFormEditedByAdmin,
  };
}

export default connect(mapStateToProps, null)(FifthExamFormComponent);
