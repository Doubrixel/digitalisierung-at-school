/**
 * Übersichtsseite für die Facharbeit.
 */

import React from 'react';
import FacharbeitApplicationForm from '../student/Facharbeit/FacharbeitApplicationForm';

function AdminFacharbeitEntryPage(props) {
  const { isGettingEditedByAdmin } = props;
  return (
    <div style={{ width: '100%' }}>
      <FacharbeitApplicationForm
        // @ts-ignore
        isGettingEditedByAdmin={isGettingEditedByAdmin}
        preFilledDataIn5PKFormEditedByAdmin={{}}
      />
    </div>
  );
}

export default AdminFacharbeitEntryPage;
