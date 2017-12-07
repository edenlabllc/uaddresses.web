import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromSettlements from 'redux/settlements';
import * as fromDistricts from 'redux/districts';

export const setSettlements = createAction('settlementsPage/SET_SETTLEMENTS');
export const setRegionDistricts = createAction('settlementsPage/SET_REGION_DISTRICTS');
export const pagingSettlements = createAction('settlementsPage/ADD_PAGING');

export const fetchSettlements = options => dispatch =>
  Object.keys(options).length &&
  dispatch(fromSettlements.fetchSettlements({ ...options, page_size: 10 }))
    .then((action) => {
      if (action.error) return action;
      return [
        dispatch(setSettlements(action.payload.result)),
        dispatch(pagingSettlements(action.meta)),
      ];
    });

export const fetchDistrictByRegion = id => dispatch =>
  dispatch(fromDistricts.fetchDistrictsByRegionId(id, { page_size: 100 })).then((action) => {
    if (action.error) return action;
    return dispatch(setRegionDistricts(action.payload.result));
  });

export const fetchDistricts = region => dispatch =>
  Object.keys(region).length &&
    dispatch(fromDistricts.fetchDistricts({ ...region, page_size: 100 })).then((action) => {
      if (action.error) return action;
      return dispatch(setRegionDistricts(action.payload.result));
    });

const settlements = handleAction(setSettlements, (state, action) => action.payload, []);
const districts = handleAction(setRegionDistricts, (state, action) => action.payload, []);
const paging = handleAction(pagingSettlements, (state, action) => action.payload, {});

export default combineReducers({
  settlements,
  districts,
  paging,
});
