export const FA_ADMIN_ROLE = 'FA_ADMIN_ROLE';
export const FIFTH_PK_ADMIN_ROLE = 'FIFTH_PK_ADMIN_ROLE';
export const SUPER_ADMIN_ROLE = 'SUPER_ADMIN_ROLE';
export const STUDENT_ROLE = 'STUDENT_ROLE';

export interface AuthState {
  isLoggedIn: boolean,
  userName: string,
  role: string,
}

const initialState: AuthState = {
  isLoggedIn: false,
  userName: '',
  role: '',
};

function getUserRole(roles, groups) {
  const groupValueArray = Object.values(groups);
  // @ts-ignore
  const isStudent = groupValueArray.findIndex((group) => group.name === 'Schuelerschaft');
  const isFaAdmin = roles.findIndex((role) => role.id === 'ROLE_PORTALFA');
  const isFifthPKAdmin = roles.findIndex((role) => role.id === 'ROLE_PORTAL5PK');
  if (isFaAdmin !== -1 && isFifthPKAdmin !== -1) {
    return SUPER_ADMIN_ROLE;
  }
  if (isFaAdmin !== -1) {
    return FA_ADMIN_ROLE;
  }
  if (isFifthPKAdmin !== -1) {
    return FIFTH_PK_ADMIN_ROLE;
  }
  if (isStudent !== -1) {
    return STUDENT_ROLE;
  }
  return null;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state, isLoggedIn: false, role: null,
      };
    case 'SET_USER_DATA':
      return {
        ...state, userName: action.userName, role: getUserRole(action.roles, action.groups),
      };
    default:
      return state;
  }
};

export default authReducer;
