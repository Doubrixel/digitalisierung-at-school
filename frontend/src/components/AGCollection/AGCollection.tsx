import React from 'react';
import './AGCollection.css';

import AGComponente from '../AGComponente/AGComponente';

import Handball_Image from '../../images/Handball.png';
import Basketball_Image from '../../images/Basketball.png';
import Tischtennis_Image from '../../images/Tischtennis.png';
import Schach_Image from '../../images/Schach.png';
import Theater_Image from '../../images/Theater.png';
import Chor_Image from '../../images/Chor.png';

function AGCollection() {
  return (
    <div className="flexboxAG">
      <div className="flexAGItem">
        <AGComponente
          image={Handball_Image}
          buttontext="Handball"
          path="/ag"
        />
      </div>
      <div className="flexAGItem">
        <AGComponente
          image={Basketball_Image}
          buttontext="Basketball"
          path="/ag"
        />
      </div>
      <div className="flexAGItem">
        <AGComponente
          image={Tischtennis_Image}
          buttontext="Tischtennis"
          path="/ag"
        />
      </div>
      <div className="flexAGItem">
        <AGComponente
          image={Schach_Image}
          buttontext="Schach"
          path="/ag"
        />
      </div>
      <div className="flexAGItem">
        <AGComponente
          image={Theater_Image}
          buttontext="Theater"
          path="/ag"
        />
      </div>
      <div className="flexAGItem">
        <AGComponente
          image={Chor_Image}
          buttontext="Chor"
          path="/ag"
        />
      </div>
    </div>
  );
}

export default AGCollection;
