import React from 'react';
import { Button } from '@material-ui/core';
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
