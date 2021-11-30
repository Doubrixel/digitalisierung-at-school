export const login = () => ({ type: 'LOGIN' });
export const logout = () => ({ type: 'LOGOUT' });
export const setUserData = (userName, roles) => ({
  type: 'SET_USER_DATA',
  userName,
  roles,
});
