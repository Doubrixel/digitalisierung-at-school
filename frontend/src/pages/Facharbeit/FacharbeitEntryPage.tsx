/**
 * Übersichtsseite für die Facharbeit.
 */

import React, { useState } from 'react';
import FacharbeitApplicationForm from './FacharbeitApplicationForm';
import FacharbeitStudentListPage from './FacharbeitStudentListPage';

function Facharbeit() {
  const [role] = useState('student');
  return (
    <div>
      {role === 'student' ? <FacharbeitApplicationForm /> : <FacharbeitStudentListPage /> }
    </div>
  );
}

export default Facharbeit;
