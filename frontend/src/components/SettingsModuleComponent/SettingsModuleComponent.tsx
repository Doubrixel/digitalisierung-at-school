import React, { useState } from 'react';
import './SettingsModuleComponent.css';
import { Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Edit, Clear, Check } from '@mui/icons-material';

// eslint-disable-next-line max-len
function SettingsModuleComponent({ title, image, path }:{ title:string, image:string, path:string }) {
  const history = useHistory();

  const [isActivated, setIsActivated] = useState(false);

  const onActivationClick = () => {
    setIsActivated(!isActivated);
  };

  return (
    <div className="moduleContainer">
      <div className="settingsModuleHeader">
        <h2>{title}</h2>
      </div>
      <div className="settingsImageContainer">
        <img className="settingsModuleImage" src={image} alt="Beispielbild" />
      </div>
      <div className="settingsButtonContainer">
        <ButtonGroup fullWidth variant="contained">
          <Button
            color={isActivated ? 'secondary' : 'primary'}
            onClick={onActivationClick}
            startIcon={isActivated ? <Clear /> : <Check />}
          >
            {isActivated ? 'deaktivieren' : 'aktivieren'}
          </Button>
          <Button color="primary" startIcon={<Edit />} onClick={() => history.push(path)}>
            bearbeiten
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default SettingsModuleComponent;
