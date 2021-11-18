/* eslint-disable */

import { connect } from 'react-redux';

export const SERVER = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

export function sendAPIRequest(path, requestMethod, requestBody) {
  const authToken = { authToken: 'token123' };
  const requestBodyWithAuthToken = { requestBody, ...authToken };
  let returnJson;
  fetch(SERVER + path,
    {
      method: requestMethod,
      headers: { 'Content-Type': 'application/json' },
      // @ts-ignore
      body: requestBodyWithAuthToken,
    })
    .then((response) => response.json())
    .then((data) => {
      returnJson = data;
    });
  return returnJson;
}

// @ts-ignore
//export default connect((state) => ({ authToken: state.authReducer.authToken }))(sendAPIRequest);
