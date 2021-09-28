import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div id="footer">
      <div id="erreichbarkeit">
        <h4 id="header_erreichbarkeit">Erreichbarkeit</h4>
        <div className="kontakt-element">Tel:&nbsp; 030 - 513 97 48</div>
        <div className="kontakt-element">Fax: 030 - 510 98 927</div>
        <div className="kontakt-element">sekretariat@kant-gymnasium.de</div>
      </div>
      <div id="copyright">
        © 2021 Immanuel-Kant-Gymnasium Berlin Lichtenberg
      </div>
    </div>
  );
}
