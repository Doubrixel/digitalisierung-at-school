import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import fithExamAdminReducer, { FifthExamState } from './5PKAdminReducer';

const rootReducer = combineReducers({
  authReducer,
  fithExamAdminReducer,
});
export interface RootState {
  authReducer: AuthState,
  fithExamAdminReducer: FifthExamState,
}

export default rootReducer;
