import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import studentDataReducer, { StudenDataState } from './studentDataReducer';

const rootReducer = combineReducers({
  authReducer,
  studentDataReducer,
});
export interface RootState {
  authReducer: AuthState,
  studentDataReducer: StudenDataState,
}

export default rootReducer;
