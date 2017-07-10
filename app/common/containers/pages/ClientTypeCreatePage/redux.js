import { push } from 'react-router-redux';
import * as fromClientTypes from 'redux/client-types';

export const onCreateClientType = body => dispatch =>
  dispatch(fromClientTypes.createClientType(body))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push(`/client_types/${action.payload.result}`));
      return action;
    });

