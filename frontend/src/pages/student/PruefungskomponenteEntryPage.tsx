/**
 * Übersichtsseite für die Wahl der 5. Prüfungkomponente.
 */

import React from 'react';
import FifthExamFormComponent from '../../components/FifthExamComponent/FifthExamFormComponent';

function PruefungskomponenteEntryPage(props) {
  const { isGettingEditedByAdmin } = props;
  return (
    <div style={{ width: '100%' }}>
      <FifthExamFormComponent
        // @ts-ignore
        isGettingEditedByAdmin={isGettingEditedByAdmin}
        preFilledDataIn5PKFormEditedByAdmin={{}}
      />
    </div>
  );
}

export default PruefungskomponenteEntryPage;
