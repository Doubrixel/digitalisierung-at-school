export interface AuthState {
  isLoggedIn: boolean,
  authToken: string,
  userName: string,
  roles: object[],
  role: string,
  accessibleComponents: string[],
}

const initialState: AuthState = {
  isLoggedIn: false,
  authToken: '',
  userName: '',
  roles: [],
  role: '',
  accessibleComponents: [],
};

// funktionen erstmal nur gemockt
function getAccessibleComponentsOfUser() {
  return ['ag', 'fa', 'wpf', '5pk'];
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, isLoggedIn: true, authToken: 'authTokenMock', role: 'student', accessibleComponents: getAccessibleComponentsOfUser(),
      };
    case 'LOGOUT':
      return {
        ...state, isLoggedIn: false, authToken: null, role: null, accessibleComponents: [],
      };
    case 'SET_USER_DATA':
      return {
        ...state, userName: action.userName, roles: action.roles,
      };
    default:
      return state;
  }
};

export default authReducer;
