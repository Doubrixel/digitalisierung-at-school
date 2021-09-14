import React from 'react';
import './SelectionComponent.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SelectionComponent = (
  {
    image, title, buttontext, path,
  }:{ image:any, title:any, buttontext:any, path:any },
) => (
  <div className="SelectionModul">
    <p className="SelectionTop">.</p>
    <img className="SelectionPicture" src={image} alt="Beispielbild" />
    <p className="SelectionText">{title}</p>
    <Link to={path}><button type="button" className="SelcetionButton">{buttontext}</button></Link>
  </div>
);

SelectionComponent.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  buttontext: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

SelectionComponent.defaultProps = {
  image: '',
};

export default SelectionComponent;
