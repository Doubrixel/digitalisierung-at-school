/**
 * Übersichtsseite für die AG-Buchung.
 */

import React from 'react';
import './AGEntryPage.css';
import Ballbild from '../images/Wahlpflicht.png';

function AGEntryPage() {
  return (
    <div className="GridLayoutAG">
      <h1 id="HeadlineAG">AG-Buchung</h1>
      <input
        type="text"
        id="HeadlineAGBuchung"
        placeholder="Basketball"
      />
      <p id="HeadlineWhenAG">Wann?</p>
      <p id="TextWhenAG">Freitag, 4.Block</p>
      <p id="HeadlineWhoAG">Wer?</p>
      <p id="TextWhoAG">alle Schüler*innen aller Klassenstufen</p>
      <p id="HeadlineWhereAG">Wo?</p>
      <p id="TextWhereAG">Turnhalle Lückstraße (Gebäude A)</p>
      <p id="HeadlineAGManagement">AG-Leitung?</p>
      <p id="TextAGManagement">Herr Meier, Herr Leonardo</p>
      <img id="ImageAGBuchung" src={Ballbild} alt="Ballbild" />
      <input
        type="submit"
        id="SubmitButtonAG"
        value="AG buchen"
      />
      <input
        type="text"
        id="TextVerfügbarAG"
        value="Verfügbar: 12/30 Personen"
      />
    </div>
  );
}

export default AGEntryPage;
