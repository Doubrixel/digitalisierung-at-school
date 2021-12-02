/*
* Übersichtsseite für den Admin zur 5. PK-Wahl.
*/

/* eslint: I fixed everything I knew how to manually, it is still upset with some brackets */
import React from 'react';
import { Paper } from '@material-ui/core';
import StatusButton from '../../components/Buttons/StatusButton';

import './AdminPruefungskomponentePage.css';
import CreateCSVButton from '../../components/Buttons/CreateCSVButton';
import FifthExamAdminTable from '../../components/FifthExamAdminTable/FifthExamAdminTable';

function AdminPruefungskomponentePage() {
  const verticalComponentDistance = '2vh';

  const handleGenerateCSV = () => {
    alert('csv generiert...');
    const csv = {};
    console.log(csv.toString());
  };

  return (
    <div>
      <div id="firstLine">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <h1>Fünfte PK Übersicht</h1>
          <StatusButton />
        </div>
      </div>
      <Paper className="fifthExamPaper">
        <FifthExamAdminTable />
        <CreateCSVButton style={{ marginTop: verticalComponentDistance, width: '18vw', minWidth: '188px' }} onClick={handleGenerateCSV} />
      </Paper>
    </div>
  );
}

export default AdminPruefungskomponentePage;
