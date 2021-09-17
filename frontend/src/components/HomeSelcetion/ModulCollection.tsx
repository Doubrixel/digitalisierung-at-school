import React from 'react';
import './ModulCollection.css';

import SelectionComponent from '../ModulSelectionComponent/SelectionComponent';

import AG_Image from '../../images/AG.png';
import Facharbeit_Image from '../../images/Facharbeit.png';
import PK_Image from '../../images/PK.png';
import Wahlpflicht_Image from '../../images/Wahlpflicht.png';

function ModulCollection() {
  return (
    <div className="flexboxModul">
      <div className="flexModulItem">
        <SelectionComponent
          image={AG_Image}
          title="Hier die passende AG auswählen und buchen"
          buttontext="AG buchen"
          path="/ag"
        />
      </div>
      <div className="flexModulItem">
        <SelectionComponent
          image={Facharbeit_Image}
          title="Facharbeit für die SuS der Klasse 9 einreichen"
          buttontext="Facharbeit"
          path="/facharbeit"
        />
      </div>
      <div className="flexModulItem">
        <SelectionComponent
          image={Wahlpflicht_Image}
          title="Wahlpflichtfächer für das kommende Jahr bestimmen"
          buttontext="Wählfächer"
          path="/wahlpflicht"
        />
      </div>
      <div className="flexModulItem">
        <SelectionComponent
          image={PK_Image}
          title="Abitur-Prüfungsabgabe für die Klasse 11 bzw. 12"
          buttontext="5. PK"
          path="/pruefungskomponente"
        />
      </div>
    </div>
  );
}

export default ModulCollection;
