import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
          <Link to="/auth/logout">
            <Button variant="contained" color="secondary" size="large" onClick={onClickLogout}><div id="authBtnText">Logout</div></Button>
          </Link>
        ) : (
          <Link to="/auth/login">
            <Button variant="contained" color="primary" size="large" onClick={onClickLogin}><div id="authBtnText">Login</div></Button>
          </Link>
        )
      }
    </div>
  );
};

export default LoginLogoutButton;
