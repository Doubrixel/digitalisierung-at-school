/*eslint-disable*/
export const FA_ADMIN_ROLE = 'FA_ADMIN_ROLE';
export const FIFTH_PK_ADMIN_ROLE = 'FIFTH_PK_ADMIN_ROLE';
export const SUPER_ADMIN_ROLE = 'SUPER_ADMIN_ROLE';
export const STUDENT_ROLE = 'STUDENT_ROLE';

export interface AuthState {
  isLoggedIn: any,
  userName: string,
  role: string,
}

const initialState: AuthState = {
  isLoggedIn: doesAuthCookieExists(),
  userName: '',
  role: '',
};

function doesAuthCookieExists() {
  const cookies = document.cookie.split(';')
  let authCookieExist = false;
  cookies.forEach((cookie) => {
    if(cookie.trim().substring(0,4) === 'AUTH') {
      authCookieExist = true;
    }
  })
  return authCookieExist;
}
function getUserRole(roles, groups) {
  const groupKeys = Object.values(groups);
  const isStudent = groupKeys.findIndex((group) => {
      // @ts-ignore
    return group.name === 'Schuelerschaft';
  })
  const isFaAdmin = roles.findIndex((role) => {
    return role.id === 'ROLE_PORTALFA';
  })
  const isFifthPKAdmin = roles.findIndex((role) => {
    return role.id === 'ROLE_PORTAL5PK';
  })
  if (isFaAdmin !== -1 && isFifthPKAdmin !== -1) {
    return SUPER_ADMIN_ROLE;
  }
  if(isFaAdmin !== -1){
    return FA_ADMIN_ROLE;
  }
  if(isFifthPKAdmin !== -1) {
    return FIFTH_PK_ADMIN_ROLE;
  }
  if(isStudent !== -1) {
    return STUDENT_ROLE;
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
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
