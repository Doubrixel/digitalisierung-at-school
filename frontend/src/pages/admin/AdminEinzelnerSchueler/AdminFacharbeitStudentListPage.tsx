/**
 * Adminansicht mit Schülerliste für die Facharbeit.
 */

import React from 'react';
import TableListComponent from '../../../components/ReusableComponents/TableListComponent';
import ComponentToggleButton from '../../../components/Buttons/ComponentToggleButton';
import './AdminFacharbeitenPageStyle.css';
import CreatePDFButton from '../../../components/Buttons/CreatePDFButton';

function handleActivateComponentButton() {
  alert('komponente aktiviert');
}

const handleGeneratePDF = () => {
  alert('pdf soll jetzt generiert werden');
};

function AdminFacharbeitStudentListPage() {
  return (
    <div className="pageRoot">
      <div className="pageTitleAndComponentButton">
        <h1 id="HeadlineFAAdmin">Facharbeit anpassen</h1>
        <ComponentToggleButton componentLabel="Facharbeiten aktivieren" buttonHandleClickFunction={() => handleActivateComponentButton()} />
      </div>
      <TableListComponent columnHeaders={['Schüler:in', 'Thema', '1. Lehrkraft', '2. Lehrkraft']} tableStyleObject={{ width: '95vw' }} />
      <CreatePDFButton style={{ marginTop: '3vh' }} onClick={handleGeneratePDF} />
    </div>
  );
}

export default AdminFacharbeitStudentListPage;
