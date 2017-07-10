import { push } from 'react-router-redux';
import * as fromUsers from 'redux/users';

export const onDeleteUser = body => dispatch =>
  dispatch(fromUsers.deleteUser(body))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/users'));
      return action;
    });
