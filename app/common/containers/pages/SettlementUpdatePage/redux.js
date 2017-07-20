import { handleAction, createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import * as fromSettlements from 'redux/settlements';

export const setSettlemment = createAction('settlementUpdate/SET_SETTLEMENT');

export const fetchSettlement = options => dispatch =>
  dispatch(fromSettlements.fetchSettlements(options))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(setSettlemment(action.payload.result));
    });

const settlement = handleAction(setSettlemment, (state, action) => action.payload, []);

export default combineReducers({
  settlement,
});
