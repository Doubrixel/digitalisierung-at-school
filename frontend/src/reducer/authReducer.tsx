export interface AuthState {
  isLoggedIn: boolean,
  authToken: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  authToken: '',
  role: '',
  accessibleComponents: [],
};

// funktionen erstmal nur gemockt
function getRoleOfUser() {
  return 'admin';
}

// funktionen erstmal nur gemockt
function getAccessibleComponentsOfUser() {
  return ['ag', 'fa', 'wpf', '5pk'];
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, isLoggedIn: true, authToken: 'authTokenMock', role: getRoleOfUser(), accessibleComponents: getAccessibleComponentsOfUser(),
      };
    case 'LOGOUT':
      return {
        ...state, isLoggedIn: false, authToken: null, role: null, accessibleComponents: [],
      };
    default:
      return state;
  }
};

export default authReducer;
