/**
 * Übersichtsseite für die AG-Buchung.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './AGSinglePage.css';
import { Button } from '@material-ui/core';
import Ballbild from '../images/Basketball.png';

function AGEntryPage() {
  return (
    <div className="GridLayoutAG">
      <div id="ContainerSubmitAG">
        <Link to="/ag"><Button variant="contained" color="secondary" id="HeadlineAG">AG-Buchung</Button></Link>
      </div>
      <p id="HeadlineAGBuchung">Basketball</p>
      <p id="HeadlineWhenAG">Wann?</p>
      <p id="TextWhenAG">Freitag, 4.Block</p>
      <p id="HeadlineWhoAG">Wer?</p>
      <p id="TextWhoAG">alle Schüler*innen aller Klassenstufen</p>
      <p id="HeadlineWhereAG">Wo?</p>
      <p id="TextWhereAG">Turnhalle Lückstraße (Gebäude A)</p>
      <p id="HeadlineAGManagement">AG-Leitung?</p>
      <p id="TextAGManagement">Herr Meier, Herr Leonardo</p>
      <img id="ImageAGBuchung" src={Ballbild} alt="Ballbild" />
      <Button variant="contained" color="secondary" id="SubmitButtonAG">AG buchen</Button>
      <div id="ContainerVerfügbarAG">
        <p id="TextVerfügbarAG">Verfügbar: 12/30 Personen</p>
      </div>
    </div>
  );
}

export default AGEntryPage;
