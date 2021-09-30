import React, { useState } from 'react';
import './SettingsModuleComponent.css';
import { Button, ButtonGroup, Tooltip } from '@material-ui/core';
import { Edit, Clear, Check } from '@mui/icons-material';

function SettingsModuleComponent({ title, image }:{ title:string, image:string }) {
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
          <Tooltip title="Funktion noch nicht verfügbar">
            <Button color="primary" startIcon={<Edit />}>bearbeiten</Button>
          </Tooltip>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default SettingsModuleComponent;
