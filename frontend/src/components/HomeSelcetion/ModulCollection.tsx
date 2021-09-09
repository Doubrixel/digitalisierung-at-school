import React from 'react';
import './ModulCollection.css';

import SelectionComponent from '../ModulSelectionComponent/SelectionComponent';

import AG_Image from '../../image/AG.png';
import Facharbeit_Image from '../../image/Facharbeit.png';
import PK_Image from '../../image/PK.png';
import Wahlpflicht_Image from '../../image/Wahlpflicht.png';

function ModulCollection() {
  return (
    <div className="flexboxModul">
      <div className="flexModulItem">
        <SelectionComponent
          image={AG_Image}
          title="Hier die passende AG auswählen und buchen"
          buttontext="AG buchen"
        />
      </div>
      <div className="flexModulItem">
        <SelectionComponent
          image={Facharbeit_Image}
          title="Facharbeit/Belegarbeit für SuS der Klasse 9 einreichen"
          buttontext="Facharbeit"
        />
      </div>
      <div className="flexModulItem">
        <SelectionComponent
          image={Wahlpflicht_Image}
          title="Wahlpflichtfächer für das kommende Jahr bestimmen"
          buttontext="Wählfächer"
        />
      </div>
      <div className="flexModulItem">
        <SelectionComponent
          image={PK_Image}
          title="Abitur-Prüfungsabgabe für die Klasse 11 bzw. 12"
          buttontext="5. PK"
        />
      </div>
    </div>
  );
}

export default ModulCollection;
