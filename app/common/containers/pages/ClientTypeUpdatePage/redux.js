import { push } from 'react-router-redux';
import * as fromClientTypes from 'redux/client-types';

export const deleteClientType = id => dispatch =>
  dispatch(fromClientTypes.deleteClientType(id))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/client_types'));
      return action;
    });
