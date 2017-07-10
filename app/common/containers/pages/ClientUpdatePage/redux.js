import { push } from 'react-router-redux';
import * as fromClients from 'redux/clients';

export const onDeleteClient = id => dispatch =>
  dispatch(fromClients.deleteClient(id))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/clients'));
      return action;
    });
