import React from 'react';
import './SelectionComponent.css';
import PropTypes from 'prop-types';

const SelectionComponent = (
  { image, title, buttontext }:{ image:any, title:any, buttontext:any },
) => (
  <div className="SelectionModul">
    <p className="SelectionTop">.</p>
    <img className="SelectionPicture" src={image} alt="Beispielbild" />
    <p className="SelectionText">{title}</p>
    <button type="button" className="SelcetionButton">{buttontext}</button>
  </div>
);

SelectionComponent.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  buttontext: PropTypes.string.isRequired,
};

SelectionComponent.defaultProps = {
  image: '',
};

export default SelectionComponent;
