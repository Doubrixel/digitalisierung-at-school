import React from 'react';
import './AGCollection.css';

import AGComponent from '../AGComponente/AGComponent';

import AGlist from '../AGComponente/AGlist';

function AGCollection() {
  return (
    <div className="AG-flexboxCollection">
      {
        AGlist.map(({
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
