import { push } from 'react-router-redux';
import * as fromRoles from 'redux/regions';

export const deleteRole = id => dispatch =>
  dispatch(fromRoles.deleteRole(id))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/roles'));
      return action;
    });
