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
      Sie haben nicht die nötigen Berechtigungen um auf diese Seite zuzugreifen.
    </div>
  );
}

export default NoAccessPage;
