import React from 'react';
import './AGComponente.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AGComponente = (
  {
    image, buttontext, path,
  }: { image: any, buttontext: any, path: any },
) => (
  <div className="AGModul">
    <img className="AGImage" src={image} alt="Beispielbild" />
    <Link to={path}><button type="button" className="AGButton">{buttontext}</button></Link>
  </div>
);

AGComponente.propTypes = {
  image: PropTypes.string,
  buttontext: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

AGComponente.defaultProps = {
  image: '',
};

export default AGComponente;
