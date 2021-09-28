/**
 * Startseite.
 */

import React from 'react';
import ModulCollection from '../components/HomeSelcetion/ModulCollection';
import './HomePage.css';

function HomePage() {
  return (
    <div>
      <div className="flexboxStart">
        <h1 id="HeadlineStart">Start</h1>
      </div>
      <div className="flexboxHomePage">
        <h2 id="HeadlineHomePage">Herzlich Willkommen am Immanuel-Kant-Gymnasium Berlin-Lichtenberg</h2>
      </div>
      <ModulCollection />
    </div>
  );
}

export default HomePage;
