import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../../actions/authActions';
import { RootState } from '../../../reducer';
import './LoginLogoutButton.css';

export const LoginLogoutButton = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);

  const onClickLogin = () => {
    dispatch(login());
  };

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="loginButtonContainer">
      {
        isLoggedIn ? (
          <Button variant="contained" color="secondary" size="large" onClick={onClickLogout}><div id="authBtnText">Logout</div></Button>
        ) : (
          <Button variant="contained" color="primary" size="large" onClick={onClickLogin}><div id="authBtnText">Login</div></Button>
        )
      }
    </div>
  );
};

export default LoginLogoutButton;
