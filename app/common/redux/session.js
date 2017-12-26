import { createAction, handleActions } from 'redux-actions';

import { AUTH_COOKIE_NAME, PUBLIC_INDEX_ROUTE } from 'config';
import { getUserIdFromCookies, removeUserIdFromCookies } from './user';

export const getToken = () => (dispatch, getState, { cookies }) => cookies.get(AUTH_COOKIE_NAME, { path: '/' });

export const isLoginned = () => dispatch =>
  dispatch(getUserIdFromCookies()).then(resp => !!resp);

export const logoutAction = createAction('session/LOGOUT');
export const setData = createAction('session/SET_DATA');

export const logout = () => dispatch =>
  dispatch(removeUserIdFromCookies()).then(() => dispatch(logoutAction()));

export const logoutAndRedirect = (redirectTo = PUBLIC_INDEX_ROUTE) => dispatch =>
  dispatch(logout()).then(() => {
    window.location.pathname = redirectTo;
  });

export default handleActions(
  {
    [setData]: (state, action) => action.payload,
    [logoutAction]: () => ({}),
  },
  {}
);
