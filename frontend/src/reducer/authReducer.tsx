export const FA_ADMIN_ROLE = 'FA_ADMIN_ROLE';
export const FIFTH_PK_ADMIN_ROLE = 'FIFTH_PK_ADMIN_ROLE';
export const SUPER_ADMIN_ROLE = 'SUPER_ADMIN_ROLE';
export const STUDENT_ROLE = 'STUDENT_ROLE';

export interface AuthState {
  isLoggedIn: boolean,
  userName: string,
  role: string,
  classNumber: number,
}

const initialState: AuthState = {
  isLoggedIn: window.location.origin === 'http://localhost:3000',
  userName: '',
  role: '',
  classNumber: 0,
};

function getUserRole(roles, groups) {
  if (window.location.origin === 'http://localhost:3000') {
    /// return STUDENT_ROLE;
    return SUPER_ADMIN_ROLE;
  }
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

function getUserClass(groups) {
  let extractedClassNumber = 0;
  const groupValueArray = Object.values(groups);
  groupValueArray.forEach((group) => {
    // @ts-ignore
    const groupName = group.name;
    if (groupName.includes('klasse') || groupName.includes('Klasse')) {
      const firstIndexOfClassNumber = groupName.indexOf('-') + 1;
      let lastIndexOfClassNumber = groupName.indexOf('.');
      if (lastIndexOfClassNumber === -1) {
        lastIndexOfClassNumber = groupName.length;
      }
      // eslint-disable-next-line max-len
      extractedClassNumber = parseInt(groupName.substring(firstIndexOfClassNumber, lastIndexOfClassNumber), 10);
    }
  });
  return extractedClassNumber;
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
        // eslint-disable-next-line max-len
        ...state, userName: action.userName, role: getUserRole(action.roles, action.groups), classNumber: getUserClass(action.groups),
      };
    default:
      return state;
  }
};

export default authReducer;
