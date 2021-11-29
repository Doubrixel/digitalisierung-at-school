import React from 'react';

function NoAccessPage() {
  return (
    <div style={{
      display: 'flex',
      height: '30vh',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'xx-large',
      fontWeight: 'bold',
    }}
    >
      Als Schüler haben Sie keinen Zugriff auf Seiten der Administration.
    </div>
  );
}

export default NoAccessPage;
