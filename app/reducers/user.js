import { createAction, createReducer } from 'redux-act';

export const requestSignIn = createAction('Send Sign In request to API');
export const signInSuccess = createAction('Successfully Signed In to API');
export const signInFailure = createAction('Failed to Signing In to API');

const initialUserState = {
  completed: true,
  record: {},
  error: null,
};
const user = createReducer({
  [requestSignIn]: state => ({ ...state, completed: false }),
  [signInSuccess]: (state, record) => ({ ...state, record, completed: true }),
  [signInFailure]: (state, error) => ({ ...state, error, completed: true }),
}, initialUserState);

export default user;
