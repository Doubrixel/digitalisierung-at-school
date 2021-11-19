const initialState = {
  isLoggedIn: false,
  authToken: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, authToken: 'authTokenMock' };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, authToken: null };
    default:
      return state;
  }
};

export default authReducer;
