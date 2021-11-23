import React from 'react';
import './ModulCollection.css';

import { connect } from 'react-redux';
import SelectionComponent from '../ModulSelectionComponent/SelectionComponent';

import AG_Image from '../../images/AG.png';
import Facharbeit_Image from '../../images/Facharbeit.png';
import PK_Image from '../../images/PK.png';
import Wahlpflicht_Image from '../../images/Wahlpflicht.png';

function ModulCollection(props) {
  const { role, accessibleComponents } = props;
  let approprateRolePath = '';
  if (role === 'student') {
    approprateRolePath = 'student';
  } else if (role === 'admin') {
    approprateRolePath = 'admin';
  }
  return (
    <div className="flexboxModul">
      {accessibleComponents.includes('ag')
        ? (
          <div className="flexModulItem">
            <SelectionComponent
              image={AG_Image}
              title="Hier die passende AG auswählen und buchen"
              buttontext="AG buchen"
              path={`/${approprateRolePath}/ag`}
            />
          </div>
        ) : null}
      {accessibleComponents.includes('fa')
        ? (
          <div className="flexModulItem">
            <SelectionComponent
              image={Facharbeit_Image}
              title="Facharbeit für die SuS der Klasse 9 einreichen"
              buttontext="Facharbeit"
              path={`/${approprateRolePath}/facharbeit`}
            />
          </div>
        ) : null}
      {accessibleComponents.includes('wpf')
        ? (
          <div className="flexModulItem">
            <SelectionComponent
              image={Wahlpflicht_Image}
              title="Wahlpflichtfächer bestimmen"
              buttontext="Wählfächer"
              path={`/${approprateRolePath}/wahlpflicht`}
            />
          </div>
        ) : null}
      {accessibleComponents.includes('5pk')
        ? (
          <div className="flexModulItem">
            <SelectionComponent
              image={PK_Image}
              title="Abitur-Prüfungsabgabe für die Klasse 11 bzw. 12"
              buttontext="5. PK"
              path={`/${approprateRolePath}/pruefungskomponente`}
            />
          </div>
        ) : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    role: state.authReducer.role,
    accessibleComponents: state.authReducer.accessibleComponents,
  };
}

export default connect(mapStateToProps, null)(ModulCollection);
