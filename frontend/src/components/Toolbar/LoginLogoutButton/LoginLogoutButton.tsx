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
          <Button variant="contained" color="secondary" onClick={onClickLogout}>Logout</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={onClickLogin}>Login</Button>
        )
      }
    </div>
  );
};

export default LoginLogoutButton;