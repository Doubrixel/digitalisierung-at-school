import store from './store';

export const SERVER = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';

export function sendAPIRequest(path, requestMethod, requestBody) {
  const { authToken } = store.getState().authReducer;
  let returnJson;
  const requestHeaders = new Headers();
  requestHeaders.append('Content-Type', 'application/json');
  requestHeaders.append('Authorization', authToken);
  fetch(SERVER + path,
    {
      method: requestMethod,
      headers: requestHeaders,
      // @ts-ignore
      body: requestBody,
    })
    .then((response) => response.json())
    .then((data) => {
      returnJson = data;
    });
  return returnJson;
}
