import React from 'react';
import './AGCollection.css';

import AGComponent from '../AGComponente/AGComponent';

import AGListMock from '../AGComponente/AGListMock';
// path={path}
// id, image, buttontext, path,

function AGCollection() {
  return (
    <div className="AG-flexboxCollection">
      {
        AGListMock.map(({
          id, image, buttontext,
        }) => (
          <div key={id} className="AG-flexboxItem">
            <AGComponent
              image={image}
              buttontext={buttontext}
              path="/ag/agbuchung"
            />
          </div>
        ))
      }
    </div>
  );
}

export default AGCollection;
