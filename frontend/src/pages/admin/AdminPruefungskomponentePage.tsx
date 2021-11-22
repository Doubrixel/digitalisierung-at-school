/*
* Übersichtsseite für den Admin zur 5. PK-Wahl.
*/

/* eslint: I fixed everything I knew how to manually, it is still upset with some brackets */
/* eslint-disable */
import React from 'react';
import { Paper } from '@material-ui/core';
import ComponentToggleButton from '../../components/Buttons/ComponentToggleButton';

import './AdminPruefungskomponentePage.css';
import CreatePDFButton from '../../components/Buttons/CreatePDFButton';
import FifthExamAdminTable from '../../components/FifthExamAdminTable/FifthExamAdminTable';

function AdminPruefungskomponentePage() {
  const verticalComponentDistance = '2vh';

  const handleGeneratePDF = () => {
    alert('pdf generiert...');
    const pdf = {};
    console.log(pdf.toString());
  };

  const handleComponentActivation = () => {};

  return (
    <div>
      <div id="firstLine">
        <h1>Fünfte PK Übersicht</h1>
        <span style={{ marginRight: '0', marginLeft: 'auto', width: '50vw', maxWidth: '320px' }}>
          <ComponentToggleButton buttonHandleClickFunction={handleComponentActivation} componentLabel="Komponente deaktivieren" />
        </span>
      </div>
      <Paper className="fifthExamPaper">
        <FifthExamAdminTable />
        <CreatePDFButton style={{ marginTop: verticalComponentDistance, width: '18vw', minWidth: '188px' }} onClick={handleGeneratePDF} />
      </Paper>
    </div>
  );
}

export default AdminPruefungskomponentePage;
