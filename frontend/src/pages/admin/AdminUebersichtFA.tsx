import './AdminUebersichtFA.css';
import React from 'react';
import ComponentToggleButton from '../../components/Buttons/ComponentToggleButton';
import TableListComponent from '../../components/ReusableComponents/TableListComponent';
import CreatePDFButton from '../../components/Buttons/CreatePDFButton';

function AdminUebersichtFA() {
  const handleComponentActivation = () => {

  };

  const handleGeneratePDF = () => {

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
        <ComponentToggleButton componentLabel="Facharbeit deaktivieren" buttonHandleClickFunction={handleComponentActivation} />
      </span>
      <span
        id="TableUebersichtFA"
      >
        <TableListComponent />
      </span>
      <div
        id="ButtonUebersichtFA"
      >
        <CreatePDFButton style={{ marginTop: '0vh', innerWidth: '200px' }} onClick={handleGeneratePDF} />
      </div>
    </div>
  );
}

export default AdminUebersichtFA;
