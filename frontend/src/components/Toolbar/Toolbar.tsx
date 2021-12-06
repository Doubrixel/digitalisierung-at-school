/**
 * Komponente für die Toolbar.
 * @author jhuebner
 * @date 06.09.2021
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Logo from '../../images/kant.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Toolbar.css';
import { LoginLogoutButton } from './LoginLogoutButton/LoginLogoutButton';
import {
  FA_ADMIN_ROLE, FIFTH_PK_ADMIN_ROLE, STUDENT_ROLE, SUPER_ADMIN_ROLE,
} from '../../reducer/authReducer';

function Toolbar(props) {
  const {
    isLoggedIn, userName, role, classNumber,
  } = props;
  let appropriateRolePath;
  if (role === STUDENT_ROLE) {
    appropriateRolePath = 'student';
  } else if (role === SUPER_ADMIN_ROLE || role === FA_ADMIN_ROLE || role === FIFTH_PK_ADMIN_ROLE) {
    appropriateRolePath = 'admin';
  }
  const links = [
    {
      id: 1,
      name: 'Facharbeit',
      path: `/${appropriateRolePath}/facharbeit`,
      disabled: (role === STUDENT_ROLE && classNumber !== 9)
                || role === FIFTH_PK_ADMIN_ROLE || !isLoggedIn || !appropriateRolePath,
    },
    {
      id: 2,
      name: '5. PK',
      path: `/${appropriateRolePath}/pruefungskomponente`,
      disabled: (role === STUDENT_ROLE && classNumber !== 11 && classNumber !== 12)
                || role === FA_ADMIN_ROLE || !isLoggedIn || !appropriateRolePath,
    },
  ];
  const windowDimensions = useWindowDimensions();

  const [isToggleActivated, setIsToggleActicated] = useState(false);

  const HomeLink = (
    <div key="0" className="nav-link">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h4>Home</h4>
      </Link>
    </div>
  );

  return (
    <div className="toolbar">
      <div className="nav-logo-container">
        {
        /* Wenn die Fensterbreite kleiner als 1000 Pixel ist,
          dann wird der Button zum ausklappen des Menues angezeigt */
        windowDimensions.width < 1000 ? (
          <button type="button" className="nav-toggle" onClick={() => setIsToggleActicated(!isToggleActivated)}>
            <FaBars />
          </button>
        ) : (
          <Link to="/">
            <img className="nav-logo" src={Logo} alt="Logo" />
          </Link>
        )
        }
      </div>
      {
        /*
          Wenn das Menü über den Toggle Button nicht ausklappt wird und
          die Fensterbreite unter 1000 Pixel ist, so wird das Menü nicht angezeigt
          */
        windowDimensions.width > 1000 || isToggleActivated ? (
          <div className="links-container">
            {windowDimensions.width < 1000 && HomeLink}
            {
              links.map((link) => {
                const pointerEvents = link.disabled ? 'none' : 'all';
                return (
                  <div key={link.id} className="nav-link">
                    <Link to={link.path} style={{ textDecoration: 'none', pointerEvents }}>
                      <h4 style={link.disabled ? { color: 'grey' } : {}}>{link.name}</h4>
                    </Link>
                  </div>
                );
              })
            }
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LoginLogoutButton />
              { isLoggedIn ? `Eingeloggt als:${userName}` : null }
            </div>
          </div>
        ) : undefined
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    userName: state.authReducer.userName,
    role: state.authReducer.role,
    classNumber: state.authReducer.classNumber,
  };
}

export default connect(mapStateToProps, null)(Toolbar);
