export const getUserIdFromCookies = () => (dispatch, getState, { cookies }) =>
  cookies.get('userId', { path: '/' });
export const removeUserIdFromCookies = () => (
  dispatch,
  getState,
  { cookies }
) => cookies.remove('userId', { path: '/' });
