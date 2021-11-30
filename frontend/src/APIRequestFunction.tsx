/*
To use the sendAPIRequest function, you need to pass the api-path,
requestMethod and requestBody (if the requestMethod isn't GET)

To extract the response and save it in a reactHook, use the following syntax:
sendAPIRequest('api/abitur/test', 'GET').then((response) => (setDataHook(reponse)));

Or extract the payload straight away. If its a json like that:
sendAPIRequest('api/abitur/test', 'GET')
  .then((response) => (response.json()))
  .then((data) => (setDataHook));

But note, that the sendAPIRequest-function returns a promise, which isn't immediately resolved
 */

import path from 'path';
import store from './store';

export const SERVER = window.location.origin === 'http://localhost:3000' ? '//localhost:5000' : '';
const protocoll = window.location.protocol;
export default function sendAPIRequest(reqPath: string, reqMethod: string, reqBody?: any) {
  const { authToken } = store.getState().authReducer;
  const reqHeaders = new Headers();
  reqHeaders.append('Content-Type', 'application/json');
  reqHeaders.append('Authorization', authToken);
  const finalreqpath = `${protocoll}//${path.join(SERVER, reqPath)}`;
  return fetch((finalreqpath),
    {
      method: reqMethod,
      headers: reqHeaders,
      body: JSON.stringify(reqBody),
    })
    .then((response) => response);
}
