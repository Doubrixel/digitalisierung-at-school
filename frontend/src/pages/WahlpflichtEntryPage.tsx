/**
 * Übersichtsseite für die Wahlpflichtfaecher-Wahl.
 */

import React from 'react';
import RadioButtonFormInputFifthExamComponent from '../components/FormInput/forminputElementRadioButton';
import './WahlpflichtEntryPage.css';
import SubmitButtonFormInputFifthExamComponent from '../components/FormInput/forminputElementSubmitButton';

const maxLabelWidth = '300px';
const minLabelWidth = '100px';

function submitWahlpflichtWahl() {

}

function WahlpflichtEntryPage() {
  return (
    <>
      <h1>Wahlpflichtfächer</h1>

      <div id="hinweis">
        Es müssen&nbsp;
        <span id="underline">zwei</span>
                &nbsp;Fächer ausgewählt werden!
      </div>

      <div id="flexContainer">
        <form action="WahlpflichtEntryPage.tsx" id="Wahlpflichtfach1">
          <h3>1. Wahlpflichtfach</h3>
          <RadioButtonFormInputFifthExamComponent labelText="Deutsch" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Englisch" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Französisch" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Latein" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Mathematik" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
        </form>

        <form action="WahlpflichtEntryPage.tsx" id="Wahlpflichtfach2">
          <h3>2. Wahlpflichtfach</h3>
          <RadioButtonFormInputFifthExamComponent labelText="Deutsch" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Englisch" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Französisch" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Latein" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <RadioButtonFormInputFifthExamComponent labelText="Mathematik" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
        </form>

        <div id="buttonRow">
          <span id="submitButton">
            <SubmitButtonFormInputFifthExamComponent onClickMethod={submitWahlpflichtWahl} />
          </span>
          <input type="submit" value="PDF erstellen" id="pdfButton" />
        </div>

      </div>
    </>

  );
}

export default WahlpflichtEntryPage;
