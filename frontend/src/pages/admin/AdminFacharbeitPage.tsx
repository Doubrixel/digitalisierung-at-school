/**
 * Übersichtsseite für den Admin zur Facharbeit.
 */

import React from 'react';
import './AdminFacharbeitPage.css';
import ComponentToggleButton from '../../components/Buttons/ComponentToggleButton';
import TableUebersichtFA from '../../components/ReusableComponents/TableUebersichtFA';
import CreateCSVButton from '../../components/Buttons/CreateCSVButton';

function AdminFacharbeitPage() {
  const verticalComponentDistance = '1vh';

  const handleGenerateCSV = () => {
    alert('csv generiert...');
    const csv = {};
    console.log(csv.toString());
  };
  const handleComponentActivation = () => {

  };
  return (
    <div className="GridAdminUebersichtFA">
      <p id="HeadlineFA">Facharbeit Übersicht</p>
      <span
        id="ToogleButtonFA"
        style={{
          marginRight: '0', marginLeft: 'auto', width: '50vw', maxWidth: '320px',
        }}
      >
        <ComponentToggleButton componentLabel="Komponente deaktivieren" buttonHandleClickFunction={handleComponentActivation} />
      </span>
      <div id="TableUebersichtFA">
        <TableUebersichtFA />
      </div>
      <div id="ButtonUebersichtFA">
        <CreateCSVButton style={{ marginTop: verticalComponentDistance, width: '18vw', minWidth: '188px' }} onClick={handleGenerateCSV} />
      </div>
    </div>
  );
}

export default AdminFacharbeitPage;
