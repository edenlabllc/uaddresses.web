import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromSettlements from 'redux/settlements';
import { fetchDistrictByID } from 'redux/districts';

export const getSettlements = createAction('settlementsPage/GET_SETTLEMENTS');
export const getRegionDistricts = createAction('settlementsPage/GET_REGION_DISTRICTS');
export const pagingSettlements = createAction('settlementsPage/ADD_PAGING');

export const fetchSettlements = options => dispatch =>
  Object.keys(options).length &&
  dispatch(fromSettlements.fetchSettlements({ ...options, limit: 100 }))
    .then((action) => {
      if (action.error) throw action;
      return [
        dispatch(getSettlements(action.payload.result)),
        dispatch(pagingSettlements(action.meta)),
      ];
    });

export const fetchDistrictByRegion = id => dispatch =>
  dispatch(fetchDistrictByID(id, { limit: 100 })).then((action) => {
    if (action.error) throw action;
    return dispatch(getRegionDistricts(action.payload.result));
  });

const settlements = handleAction(getSettlements, (state, action) => action.payload, []);
const regionDistricts = handleAction(getRegionDistricts, (state, action) => action.payload, []);
const paging = handleAction(pagingSettlements, (state, action) => action.payload, {});

export default combineReducers({
  settlements,
  regionDistricts,
  paging,
});
