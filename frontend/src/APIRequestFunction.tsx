import store from './store';

export default function sendAPIRequest(reqPath: string, reqMethod: string, reqBody?: any) {
  const { authToken } = store.getState().authReducer;
  const reqHeaders = new Headers();
  reqHeaders.append('Content-Type', 'application/json');
  reqHeaders.append('Authorization', authToken);
  fetch((reqPath),
    {
      method: reqMethod,
      headers: reqHeaders,
      body: reqBody,
    })
    .then((response) => response.json())
    .then((data) => (data));
}
