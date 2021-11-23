import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';

const rootReducer = combineReducers({
  authReducer,
});
export interface RootState {
  authReducer: AuthState,
}

export default rootReducer;
