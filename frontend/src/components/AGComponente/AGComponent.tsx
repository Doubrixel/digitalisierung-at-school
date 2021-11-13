import React from 'react';
import './AGComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AGComponent = (
  {
    image, buttontext, path,
  }: { image: any, buttontext: string, path: string },
) => (
  <div className="AGModul">
    <img className="AGImage" src={image} alt="Beispielbild" />
    <Link to={path}><button type="button" className="AGButton">{buttontext}</button></Link>
  </div>
);

AGComponent.propTypes = {
  image: PropTypes.string,
  buttontext: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

AGComponent.defaultProps = {
  image: '',
};

export default AGComponent;
