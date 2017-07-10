import { push } from 'react-router-redux';
import * as fromUserRoles from 'redux/user-roles';

export const onCreateUserRole = (id, body) => dispatch =>
  dispatch(fromUserRoles.createUserRole(id, body))
    .then((action) => {
      if (action.error) throw new Error();
      dispatch(push(`/users/${id}`));
      return action;
    });
