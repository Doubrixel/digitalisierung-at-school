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

function Toolbar(props) {
  const { isLoggedIn, role, accessibleComponents } = props;
  let approprateRolePath = '';
  if (role === 'student') {
    approprateRolePath = 'student';
  } else if (role === 'admin') {
    approprateRolePath = 'admin';
  }
  const links = [
    {
      id: 1,
      name: 'AG-Buchung',
      path: `/${approprateRolePath}/ag`,
      disabled: (!(accessibleComponents.includes('ag')) && role === 'admin') || !isLoggedIn,
    },
    {
      id: 2,
      name: 'Facharbeit',
      path: `/${approprateRolePath}/facharbeit`,
      disabled: (!(accessibleComponents.includes('fa')) && role === 'admin') || !isLoggedIn,
    },
    {
      id: 3,
      name: 'Wahlpflicht',
      path: `/${approprateRolePath}/wahlpflicht`,
      disabled: (!(accessibleComponents.includes('wpf')) && role === 'admin') || !isLoggedIn,
    },
    {
      id: 4,
      name: '5. PK',
      path: `/${approprateRolePath}/pruefungskomponente`,
      disabled: (!(accessibleComponents.includes('5pk')) && role === 'admin') || !isLoggedIn,
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
            <LoginLogoutButton />
          </div>
        ) : undefined
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    role: state.authReducer.role,
    accessibleComponents: state.authReducer.accessibleComponents,
  };
}

export default connect(mapStateToProps, null)(Toolbar);
