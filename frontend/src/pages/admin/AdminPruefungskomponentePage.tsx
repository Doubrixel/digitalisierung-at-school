/*
* Übersichtsseite für den Admin zur 5. PK-Wahl.
*/

/* eslint: I fixed everything I knew how to manually, it is still upset with some brackets */
import React from 'react';
import { Paper } from '@material-ui/core';
import { ExportToCsv } from 'export-to-csv';
import StatusButton from '../../components/Buttons/StatusButton';

import './AdminPruefungskomponentePage.css';
import CreateCSVButton from '../../components/Buttons/CreateCSVButton';
import FifthExamAdminTable from '../../components/FifthExamAdminTable/FifthExamAdminTable';
import sendAPIRequest from '../../APIRequestFunction';

function AdminPruefungskomponentePage() {
  const verticalComponentDistance = '2vh';

  const handleGenerateCSV = () => {
    sendAPIRequest('/api/abitur/getAllExams', 'GET')
      .then((response) => response.json())
      .then((data) => {
        const title = `5pk_${new Date().toISOString().substr(0, 10)}`;
        if (data.length) {
          new ExportToCsv({ useKeysAsHeaders: true, filename: title }).generateCsv(data);
        } else {
          alert('Es wird kein Export generiert, weil keine Daten vorhanden sind.');
        }
      });
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
