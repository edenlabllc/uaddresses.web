import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromSettlements from 'redux/settlements';

export const getSettlements = createAction('settlementsPage/GET_SETTLEMENTS');
export const pagingSettlements = createAction('settlementsPage/ADD_PAGING');

export const fetchSettlements = options => dispatch =>
  dispatch(fromSettlements.fetchSettlements(options))
    .then((action) => {
      if (action.error) throw action;
      return [
        dispatch(getSettlements(action.payload.result)),
        dispatch(pagingSettlements(action.meta)),
      ];
    });

const settlements = handleAction(getSettlements, (state, action) => action.payload, []);
const paging = handleAction(pagingSettlements, (state, action) => action.payload, {});

export default combineReducers({
  settlements,
  paging,
});
