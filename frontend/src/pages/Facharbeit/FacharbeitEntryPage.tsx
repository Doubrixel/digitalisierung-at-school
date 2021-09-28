/**
 * Übersichtsseite für die Facharbeit.
 */

import React, { useState } from 'react';
import FacharbeitApplicationForm from './FacharbeitApplicationForm';
import FacharbeitStudentListPage from './FacharbeitStudentListPage';

function FacharbeitEntryPage() {
  const [role] = useState('student');
  return (
    <div>
      {role === 'student' ? <FacharbeitApplicationForm /> : <FacharbeitStudentListPage /> }
    </div>
  );
}

export default FacharbeitEntryPage;
