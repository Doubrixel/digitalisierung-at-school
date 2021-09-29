import React from 'react';
import './AGCollection.css';

import AGComponent from '../AGComponente/AGComponent';

import AGListMock from '../AGComponente/AGListMock';

function AGCollection() {
  return (
    <div className="AG-flexboxCollection">
      {
        AGListMock.map(({
          id, image, buttontext, path,
        }) => (
          <div key={id} className="AG-flexboxItem">
            <AGComponent
              image={image}
              buttontext={buttontext}
              path={path}
            />
          </div>
        ))
      }
    </div>
  );
}

export default AGCollection;
