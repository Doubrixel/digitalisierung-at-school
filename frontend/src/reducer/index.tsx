import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
// eslint-disable-next-line import/no-cycle
// import store from '../store';

const rootReducer = combineReducers({
  authReducer,
});
export interface RootState {
  authReducer: AuthState,
}

export default rootReducer;
