import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FifthExamFormComponent.css';
import {
  Paper, FormControl, Button, FormLabel, RadioGroup,
  FormControlLabel, Radio, Checkbox, FormGroup, Tooltip, Typography,
} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import CreatePDFButton from '../Buttons/CreatePDFButton';
import sendAPIRequest from '../../APIRequestFunction';
import { getComponentStatusId, getTransitionDisplayString } from '../ReusableComponentsAndFunctions/processComponentStatusFunctions';

function FifthExamFormComponent(props) {
  const { isGettingEditedByAdmin, preFilledDataIn5PKFormEditedByAdmin, userName } = props;
  const verticalComponentDistance = '2vh';
  /*
  possible formStatus:
  0 - form is locked because component is locked or student already submitted the form
  1 - first Status in which the student can Enter the essential Details and generate the first PDF
  2 - status when the original inputs are locked and the student can enter
      some additional information or
      apply in the updateInputs for a change of his data and he can click the checkboxes
  3 - the application got denied by an admin and now it needs new inputs
  4 - the application got approved
  5 - the form is getting edited by an admin
  6 - the component is locked but a student forgot to submit his form so he can submit it now
   */
  const [formStatus, setFormStatus] = useState(0);
  const [componentStatusId, setComponentStatusId] = useState(0);

  // originalFieldHooks
  const [examType, setExamType] = useState('');
  const [studentPartner, setStudentPartner] = useState('');
  const [referenzfach, setReferenzfach] = useState('');
  const [bezugsfach, setBezugsfach] = useState('');
  const [examiner, setExaminer] = useState('');
  const [topicArea, setTopicArea] = useState('');
  const [tutor, setTutor] = useState('');
  const [problemQuestion, setProblemQuestion] = useState('');
  const [presentationForm, setPresentationForm] = useState('');

  // updateDataFieldHooks
  const [updatedExamType, setUpdatedExamType] = useState('');
  const [updatedStudentPartner, setUpdatedStudentPartner] = useState('');
  const [updatedReferenzfach, setUpdatedReferenzfach] = useState('');
  const [updatedBezugsfach, setUpdatedBezugsfach] = useState('');
  const [updatedExaminer, setUpdatedExaminer] = useState('');
  const [updatedTopicArea, setUpdatedTopicArea] = useState('');
  const [updatedTutor, setUpdatedTutor] = useState('');
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

  const [rejectionReason, setRejectionReason] = useState('');
  const [applicationDeadlineString, setApplicationDeadlineString] = useState('Keine Deadline vorhanden');

  // originalDataField Handler
  const handleExamTypeInputChange = (event) => {
    setExamType(event.target.value);
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
  const handleTutorInputChange = (event) => {
    setTutor(event.target.value);
  };
  const handleProblemQuestionInputChange = (event) => {
    setProblemQuestion(event.target.value);
  };
  const handlePresentationFormInputChange = (event) => {
    setPresentationForm(event.target.value);
  };

  // updateField Handler
  const handleUpdatedExamTypeInputChange = (event) => {
    setUpdatedExamType(event.target.value);
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
  const handleUpdateFieldTutorInputChange = (event) => {
    setUpdatedTutor(event.target.value);
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
            || formStatus === 6
    // eslint-disable-next-line max-len
            || (formStatus === 1 && (!examType || !referenzfach || !bezugsfach || !tutor || !examiner || !topicArea))
            || ((formStatus === 2 || formStatus === 3) && (
              (examType === 'PP' && (!problemQuestion || !presentationForm || !PPCheckBox1 || !PPCheckBox2 || !PPCheckBox3 || !PPCheckBox4))
                || (examType === 'BLL' && (!problemQuestion || !BLLCheckBox1 || !BLLCheckBox2 || !BLLCheckBox3 || !BLLCheckBox4)))
            );
  }

  const history = useHistory();

  function setAppropriateFormStatus(componentStatusId_, approved, examType_, problemQuestion_) {
    if (isGettingEditedByAdmin === true) {
      setFormStatus(5);
      return;
    }
    if (componentStatusId_ === 3 && examType_ === null) {
      setFormStatus(6);
      return;
    }
    // @ts-ignore
    if (componentStatusId_ === 0 || componentStatusId_ === 1 || componentStatusId_ === 2) {
      setFormStatus(componentStatusId_);
    }
    if (approved === false || approved === 0) {
      setFormStatus(3);
      return;
    }
    if (approved === true || approved === 1) {
      setFormStatus(4);
      return;
    }
    // That if-clause checks, if a student already submitted the
    // form in a specific formStatus, which means he can't submit it again
    // @ts-ignore
    if ((examType_ && componentStatusId_ === 1)
      // @ts-ignore
      || (problemQuestion_ && componentStatusId_ === 2)) {
      setFormStatus(0);
      alert('Das Formular wurde bereits abgesendet und kann erst zu einem späteren Zeitpunkt nochmals bearbeitet werden, z.B. wenn der Antrag abgelehnt wurde.');
    }
  }

  function processExamData(prefillDataObject) {
    setExamType(prefillDataObject.examType);
    setStudentPartner(prefillDataObject.partnerStudentName);
    setReferenzfach(prefillDataObject.referenzfach);
    setBezugsfach(prefillDataObject.bezugsfach);
    setExaminer(prefillDataObject.examiner);
    setTopicArea(prefillDataObject.topicArea);
    setTutor((prefillDataObject.tutor));
    setProblemQuestion(prefillDataObject.problemQuestion);
    setPresentationForm(prefillDataObject.presentationForm);
    setUpdatedStudentPartner(prefillDataObject.updatedPartnerStudentName);
    setUpdatedReferenzfach(prefillDataObject.updatedReferenzfach);
    setUpdatedBezugsfach(prefillDataObject.updatedBezugsfach);
    setUpdatedExaminer(prefillDataObject.updatedExaminer);
    setUpdatedTopicArea(prefillDataObject.updatedTopicArea);
    setUpdatedTutor((prefillDataObject.updatedTutor));
    setUpdatedProblemQuestion(prefillDataObject.updatedProblemQuestion);
    setUpdatedPresentationForm(prefillDataObject.updatedPresentationForm);
    setRejectionReason(prefillDataObject.rejectionReason);
  }

  useEffect(() => {
    let localComponentStatusId = 0;

    if (isGettingEditedByAdmin === true) {
      processExamData(preFilledDataIn5PKFormEditedByAdmin);
      setAppropriateFormStatus(null, null, null, null);
    } else {
      sendAPIRequest('api/components/getTransitionDatesOfAll', 'GET')
        .then((response) => response.json())
        .then((data) => {
          localComponentStatusId = getComponentStatusId(data, 'fifthExam');
          setAppropriateFormStatus(localComponentStatusId, null, null, null);
          setComponentStatusId(localComponentStatusId);
          setApplicationDeadlineString(getTransitionDisplayString(data, 'fifthExam'));
        })
        .then(() => {
          sendAPIRequest('api/abitur/getExamData', 'GET')
            .then((response) => response.json())
            .then((data) => {
              processExamData(data);
              // eslint-disable-next-line max-len
              setAppropriateFormStatus(localComponentStatusId, data.approved, data.examType, data.problemQuestion);
            });
        })
        .catch((err) => {
          console.log(err.message);
          setAppropriateFormStatus(0, null, null, null);
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
      userName,
      studentPartner,
      chosenTopicArea: topicArea,
      referenzfach,
      examiner,
      bezugsfach,
      tutor,
    };
    console.log(pdf.toString());
  };

  const handleSubmitFifthExamForm = () => {
    const submitDate = new Date();
    const submitNumber = componentStatusId === 1 ? 1 : 2;
    let requestBodyParams: {};
    if (formStatus === 1) {
      requestBodyParams = {
        examType,
        studentPartner,
        referenzfach,
        bezugsfach,
        tutor,
        examiner,
        topicArea,
      };
    } else if (formStatus === 2) {
      requestBodyParams = {
        updatedStudentPartner,
        updatedReferenzfach,
        updatedBezugsfach,
        updatedExaminer,
        updatedTutor,
        updatedTopicArea,
        problemQuestion,
        presentationForm,
      };
    } else {
      requestBodyParams = {
        examType: updatedExamType !== '' ? updatedExamType : examType,
        updatedStudentPartner,
        updatedReferenzfach,
        updatedBezugsfach,
        updatedExaminer,
        updatedTutor,
        updatedTopicArea,
        updatedProblemQuestion,
        updatedPresentationForm,
      };
    }
    if (formStatus !== 5) {
      Object.assign(requestBodyParams, {
        submitNumber,
        submitDate,
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const key in requestBodyParams) {
      if (!requestBodyParams[key]) {
        delete requestBodyParams[key];
      }
    }

    function checkIfDataHasBeenSaved(response) {
      if (response.ok) {
        alert('Daten wurden erfolgreich gespeichert.');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isGettingEditedByAdmin === true ? history.push('/admin/pruefungskomponente') : setFormStatus(0);
      } else {
        alert('Daten konnten nicht gespeichert werden. Bitte kontaktieren Sie einen Administrator.');
      }
    }
    sendAPIRequest('api/abitur/applyForTopic', 'POST', requestBodyParams)
      .then((response) => (checkIfDataHasBeenSaved(response)));

    handleGeneratePDF(componentStatusId);
  };

  function getStepOneInputFields(areInputFieldsOriginalDataFields) {
    let inputFieldsAreDisabled = true;
    if (formStatus === 1 && areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 2 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 3 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 5 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 6 && !areInputFieldsOriginalDataFields) {
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
              <br />
            </text>
          )
          : (
            <text>
              <br />
              <br />
              <br />
            </text>
          )}
        <div style={{ height: '50px' }}>
          {areInputFieldsOriginalDataFields
          || formStatus === 5
          || formStatus === 6
          || (formStatus === 2 && !examType)
            ? (
              <FormControl component="fieldset">
                <FormLabel component="legend">Prüfungsart</FormLabel>
                <RadioGroup
                  aria-label="Prüfungsart"
                  name="radio-buttons-group"
                  value={areInputFieldsOriginalDataFields ? examType : updatedExamType}
                  row
                >
                  <FormControlLabel
                    value="PP"
                    control={<Radio />}
                    label="Präsentationsprüfung"
                    onChange={areInputFieldsOriginalDataFields
                      ? handleExamTypeInputChange : handleUpdatedExamTypeInputChange}
                    disabled={inputFieldsAreDisabled || allFieldsAreDisabled}
                  />
                  <FormControlLabel
                    value="BLL"
                    control={<Radio />}
                    label="Besondere Lernleistung"
                    onChange={areInputFieldsOriginalDataFields
                      ? handleExamTypeInputChange : handleUpdatedExamTypeInputChange}
                    disabled={inputFieldsAreDisabled || allFieldsAreDisabled}
                  />
                </RadioGroup>
              </FormControl>
            )
            : null}
        </div>
        <TextField
          label="Prüfling"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          value={userName}
          disabled
        />
        <TextField
          label="ggf. Partner:in"
          helperText="Wenn mehr als ein Partner vorhanden, dann die Namen per Komma getrennt eintragen."
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
          label="Tutor"
          variant="outlined"
          style={{ marginTop: verticalComponentDistance }}
          onChange={areInputFieldsOriginalDataFields
            ? handleTutorInputChange : handleUpdateFieldTutorInputChange}
          value={areInputFieldsOriginalDataFields ? tutor : updatedTutor}
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
    } else if (formStatus === 3 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 5 && !areInputFieldsOriginalDataFields) {
      inputFieldsAreDisabled = false;
    } else if (formStatus === 6 && !areInputFieldsOriginalDataFields) {
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
        {examType === 'PP' || updatedExamType === 'PP'
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

  function displayAppropriateApplicationStatus() {
    let textColor;
    switch (formStatus) {
      case 3: textColor = 'red'; break;
      case 4: textColor = 'green'; break;
      default: textColor = 'black';
    }
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2vh',
      }}
      >
        <Typography style={{ fontSize: 'x-large', color: textColor, fontWeight: 'bold' }}>
          {formStatus === 0 ? 'Das Formular ist gesperrt.' : null}
          {formStatus === 3 ? 'Ihr Antrag für die 5. PK wurde abgelehnt. Der Ablehnungsgrund lautet:' : null}
          {formStatus === 4 ? 'Ihr Antrag für die 5. PK wurde genehmigt.' : null}
          <br />
        </Typography>
        <Typography style={{ fontSize: 'large' }}>
          {formStatus === 3 ? rejectionReason : null}
          {formStatus === 4 ? 'Weitere Änderungen sind nur noch durch einen Administrator möglich.' : null}
        </Typography>
      </div>
    );
  }

  function getAppropriateTooltip() {
    let tooltipText;
    if (formStatus === 6) {
      tooltipText = 'Der Button wurde aufgrund der Fristüberschreitung deaktiviert. Bitte reichen sie ihren Antrag über den Button "Antrag nachträglich einreichen" ein';
    } else if (formStatus === 1) {
      tooltipText = 'Es müssen die Prüfungsart, Prüflingsname, Referenzfach, Bezugsfach, Tutor, Prüfer:in und Themenbereich  eingetragen werden.';
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
    const buttonArray: JSX.Element[] = [
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
          style={{
            marginTop: verticalComponentDistance, marginRight: distanceBetweenButtons, width: '18vw', minWidth: '188px',
          }}
          onClick={() => handleGeneratePDF(2)}
          label="Finale Rückmeldung als PDF generieren"
        />,
      );
    }
    if (formStatus === 6) {
      buttonArray.push(
        <Tooltip
          style={{ fontSize: 'medium' }}
          title={(
            <Typography style={{ fontSize: 'medium' }}>
              Alle bearbeitbaren
              Felder (außer das Partnerfeld) müssen ausgefüllt werden.
            </Typography>
          )}
        >
          <span>
            <Button
              id="lateSubmitButtonFifthExam"
              style={{
                marginTop: verticalComponentDistance, marginRight: distanceBetweenButtons, width: '18vw', minWidth: '188px',
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmitFifthExamForm}
              disabled={
                !updatedExamType || !updatedReferenzfach || !updatedBezugsfach
                || !updatedExaminer || !updatedTutor || !updatedTopicArea || !updatedProblemQuestion || (updatedExamType === 'PP' && !updatedPresentationForm)
              }
            >
              Antrag nachträglich einreichen
            </Button>
          </span>
        </Tooltip>,
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
        { displayAppropriateApplicationStatus() }
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {getStepOneInputFields(true)}
          {formStatus === 2 || formStatus === 3 || formStatus === 5 || formStatus === 6
            ? getStepOneInputFields(false) : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {formStatus === 2 || formStatus === 3 || formStatus === 5
            ? getStepTwoInputFields(true) : null}
          {/* eslint-disable-next-line max-len */}
          {formStatus === 3 || formStatus === 5 || formStatus === 6 ? getStepTwoInputFields(false) : null}
        </div>
        {formStatus === 2 || formStatus === 3 ? getAppropriateCheckboxes() : null}
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: verticalComponentDistance }}>
          { applicationDeadlineString }
          <br />
          <br />
          { formStatus === 6
            ? 'Die Abgabefrist ist abgelaufen. Bitte reichen sie das Formular über den Button "Antrag nachträglich einreichen" ein. Das verspätete Abgabedatum wird registriert.'
            : null}
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
    preFilledDataIn5PKFormEditedByAdmin: state.fifthExamReducer.preFilledDataIn5PKFormEditedByAdmin,
    userName: state.authReducer.userName,
  };
}

export default connect(mapStateToProps, null)(FifthExamFormComponent);
