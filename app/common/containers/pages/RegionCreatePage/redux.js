import { push } from 'react-router-redux';
import * as fromRoles from 'redux/regions';

export const onCreateRole = body => dispatch =>
  dispatch(fromRoles.createRole(body))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push(`/roles/${action.payload.result}`));
      return action;
    });
