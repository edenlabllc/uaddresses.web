import { push } from 'react-router-redux';
import * as fromUsers from 'redux/users';

export const onCreateUser = body => dispatch =>
  dispatch(fromUsers.createUser(body))
    .then((action) => {
      if (action.error) throw new Error();
      dispatch(push(`/users/${action.payload.result}`));
      return action;
    });
