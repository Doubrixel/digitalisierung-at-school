import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import fifthExamReducer, { FifthExamState } from './fifthExamReducer';

const rootReducer = combineReducers({
  authReducer,
  fifthExamReducer,
});
export interface RootState {
  authReducer: AuthState,
  fifthExamReducer: FifthExamState,
}

export default rootReducer;
