import React from 'react';
import './ModulCollection.css';

import { connect } from 'react-redux';
import SelectionComponent from '../ModulSelectionComponent/SelectionComponent';
import LogoutAnsicht from '../Hompage/LogoutAnsicht';

import Facharbeit_Image from '../../images/Facharbeit.png';
import PK_Image from '../../images/PK.png';
import {
  FA_ADMIN_ROLE, FIFTH_PK_ADMIN_ROLE, STUDENT_ROLE, SUPER_ADMIN_ROLE,
} from '../../reducer/authReducer';

function ModulCollection(props) {
  const { role, classNumber, isLoggedIn } = props;
  let approprateRolePath = '';
  if (role === STUDENT_ROLE) {
    approprateRolePath = 'student';
  } else if (role === SUPER_ADMIN_ROLE || FA_ADMIN_ROLE || FIFTH_PK_ADMIN_ROLE) {
    approprateRolePath = 'admin';
  }

  return (
    <div>
      {isLoggedIn ? (
        <div className="flexboxModul">
          {/* eslint-disable-next-line max-len */}
          {(role === STUDENT_ROLE && classNumber === 9) || role === SUPER_ADMIN_ROLE || role === FA_ADMIN_ROLE
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
          {/* eslint-disable-next-line max-len */}
          {(role === STUDENT_ROLE && (classNumber === 11 || classNumber === 12)) || role === SUPER_ADMIN_ROLE || role === FIFTH_PK_ADMIN_ROLE
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
      ) : (
        <div className="flexModulItem">
          <LogoutAnsicht />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    role: state.authReducer.role,
    isLoggedIn: state.authReducer.isLoggedIn,
    classNumber: state.authReducer.classNumber,
  };
}

export default connect(mapStateToProps, null)(ModulCollection);
