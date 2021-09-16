/**
 * Übersichtsseite für die Wahlpflichtfaecher-Wahl.
 */

import React from 'react';
import ForminputElementRadioButton from '../components/FormInput/ForminputElementRadioButton';
import './WahlpflichtEntryPage.css';
import ForminputElementSubmitButton from '../components/FormInput/ForminputElementSubmitButton';

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

      <form action="WahlpflichtEntryPage.tsx" id="Wahlpflichtfach1">

        <div>
          <h3>1. Wahlpflichtfach</h3>
          <ForminputElementRadioButton labelText="Deutsch" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Englisch" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Französisch" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Latein" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Mathematik" name="Wahlpflichtfach1" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
        </div>

        <div>
          <h3>2. Wahlpflichtfach</h3>
          <ForminputElementRadioButton labelText="Deutsch" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Englisch" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Französisch" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Latein" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
          <ForminputElementRadioButton labelText="Mathematik" name="Wahlpflichtfach2" maxLabelWidth={maxLabelWidth} minLabelWidth={minLabelWidth} />
        </div>

        <div id="buttonRow">
          <span id="submitButton">
            <ForminputElementSubmitButton onClickMethod={submitWahlpflichtWahl} />
          </span>
          <button type="button" id="pdfButton">PDF erstellen </button>
        </div>
      </form>

    </>

  );
}

export default WahlpflichtEntryPage;
