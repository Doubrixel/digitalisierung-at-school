export const login = () => ({ type: 'LOGIN' });
export const logout = () => ({ type: 'LOGOUT' });
export function setUserData(userName, roles, groups) {
  return {
    type: 'SET_USER_DATA',
    userName,
    roles,
    groups,
  };
}
