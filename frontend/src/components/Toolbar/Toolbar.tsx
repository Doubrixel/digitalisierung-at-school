/**
 * Komponente für die Toolbar.
 * @author jhuebner
 * @date 06.09.2021
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Logo from '../../images/kant.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Toolbar.css';

const links = [
  {
    id: 1,
    name: 'AG-Buchung',
    path: '/ag',
  },
  {
    id: 2,
    name: 'Facharbeit',
    path: '/facharbeit',
  },
  {
    id: 3,
    name: 'Wahlpflicht',
    path: '/wahlpflicht',
  },
  {
    id: 4,
    name: 'Prüfungkomponente',
    path: '/pruefungskomponente',
  },
];

function Toolbar() {
  const windowDimensions = useWindowDimensions();

  const [isToggleActivated, setIsToggleActicated] = useState(false);

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
            {
              links.map((link) => (
                <div key={link.id} className="nav-link">
                  <Link to={link.path} style={{ textDecoration: 'none' }}>
                    <h4>{link.name}</h4>
                  </Link>
                </div>
              ))
            }
          </div>
        ) : (
          undefined
        )
      }
    </div>
  );
}

export default Toolbar;
