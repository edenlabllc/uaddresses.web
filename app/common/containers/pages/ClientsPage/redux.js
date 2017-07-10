import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromClients from 'redux/clients';

export const getClients = createAction('clientsPage/GET_CLIENTS');
export const pagingClients = createAction('clientsPage/ADD_PAGING');

export const fetchClients = options => dispatch =>
  dispatch(fromClients.fetchClients(options))
  .then((action) => {
    if (action.error) throw action;
    return [
      dispatch(getClients(action.payload.result)),
      dispatch(pagingClients(action.meta)),
    ];
  });

const clients = handleAction(getClients, (state, action) => action.payload, []);
const paging = handleAction(pagingClients, (state, action) => action.payload, {});

export default combineReducers({
  clients,
  paging,
});
