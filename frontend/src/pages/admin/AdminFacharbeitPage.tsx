/**
 * Übersichtsseite für den Admin zur Facharbeit.
 */

import React from 'react';
import './AdminFacharbeitPage.css';
import ComponentToggleButton from '../../components/Buttons/ComponentToggleButton';
import TableUebersichtFA from '../../components/ReusableComponents/TableUebersichtFA';
import CreatePDFButton from '../../components/Buttons/CreatePDFButton';

function AdminFacharbeitPage() {
  const handleGeneratePDF = () => {

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
        <CreatePDFButton style={{ marginTop: '4vh' }} onClick={handleGeneratePDF} />
      </div>
    </div>
  );
}

export default AdminFacharbeitPage;
