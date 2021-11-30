import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import FifthExamReducer from './FifthExamReducer';

const rootReducer = combineReducers({
  authReducer,
  FifthExamReducer,
});
export interface RootState {
  authReducer: AuthState,
}

export default rootReducer;
