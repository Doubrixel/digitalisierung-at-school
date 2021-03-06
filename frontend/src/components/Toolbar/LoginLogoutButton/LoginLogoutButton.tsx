import React from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../actions/authActions';
import { RootState } from '../../../reducer';
import './LoginLogoutButton.css';

export const LoginLogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);

  const onClickLogin = () => {
    history.push('/auth/login');
    window.location.reload();
  };

  const onClickLogout = () => {
    alert('Bitte melden Sie sich auch bei iServ ab.');
    window.open('https://kant-gymnasium.de/iserv/');
    dispatch(logout());
    history.push('/auth/logout');
    window.location.reload();
  };

  return (
    <div id="loginButtonContainer">
      {
        isLoggedIn ? (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onClickLogout}
          >
            <div id="authBtnText">Logout</div>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onClickLogin}
          >
            <div id="authBtnText">Login</div>
          </Button>
        )
      }
    </div>
  );
};

export default LoginLogoutButton;
