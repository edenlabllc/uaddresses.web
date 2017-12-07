import { handleAction, createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import * as fromSettlements from 'redux/settlements';

export const setSettlements = createAction('districtUpdate/GET_SETTLEMENTS');

export const fetchSettlements = options => dispatch =>
  dispatch(fromSettlements.fetchSettlements({ ...options, page_size: 10 }))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(setSettlements(action.payload.result));
    });

const settlements = handleAction(setSettlements, (state, action) => action.payload, []);

export default combineReducers({
  settlements,
});
