/**
 * Übersichtsseite für die Facharbeit.
 */

import React, { useState } from 'react';
import AdminFacharbeitApplicationForm from './AdminFacharbeitApplicationForm';
import AdminFacharbeitStudentListPage from './AdminFacharbeitStudentListPage';

function AdminFacharbeitEntryPage() {
  const [role] = useState('student');
  return (
    <div style={{ width: '100%' }}>
      {role === 'student' ? <AdminFacharbeitApplicationForm /> : <AdminFacharbeitStudentListPage /> }
    </div>
  );
}

export default AdminFacharbeitEntryPage;
