/**
 * Übersichtsseite für die AG-Buchung.
 */
import React from 'react';
import AGCollection from '../components/AGCollection/AGCollection';
import './Headline.css';

function AGEntryPage() {
  return (
    <div>
      <h1 className="Headline">AG-Buchung</h1>
      <AGCollection />
    </div>
  );
}

export default AGEntryPage;
