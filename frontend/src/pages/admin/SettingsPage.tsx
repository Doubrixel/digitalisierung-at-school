/**
 * Übersichtsseite für die Einstellungen.
 */

import React from 'react';
import SettingsModuleComponent from '../../components/SettingsModuleComponent/SettingsModuleComponent';
import AGImage from '../../images/AG.png';
import FacharbeitImage from '../../images/Facharbeit.png';
import WahlpflichtImage from '../../images/Wahlpflicht.png';
import PruefungskompoenenteImage from '../../images/PK.png';

const modules = [
  {
    title: 'AG-Buchung',
    image: AGImage,
    path: '/admin/ag',
  },
  {
    title: 'Facharbeit',
    image: FacharbeitImage,
    path: '/admin/facharbeit',
  },
  {
    title: 'Wahlpflicht',
    image: WahlpflichtImage,
    path: '/admin/wahlpflicht',
  },
  {
    title: '5. Prüfungskomponente',
    image: PruefungskompoenenteImage,
    path: '/admin/wahlpflicht',
  },
];

function SettingsPage() {
  return (
    <div>
      <div className="flexboxStart">
        <h1 id="HeadlineStart">Einstellungen</h1>
      </div>
      <div className="flexboxModul">
        {
        modules.map((module) => (
          <div className="flexModulItem">
            <SettingsModuleComponent
              path={module.path}
              title={module.title}
              image={module.image}
            />
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default SettingsPage;
