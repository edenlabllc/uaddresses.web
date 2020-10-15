import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromStreets from 'redux/streets';
import { fetchDistrictsByRegionId } from 'redux/districts';
import * as fromSettlements from 'redux/settlements';

import { getDistrict, getRegion, getSettlement } from 'reducers';

export const setRegionDistricts = createAction('streetsPage/SET_REGION_DISTRICTS');
export const setSettlements = createAction('streetsPage/SET_SETTLEMENTS');
export const setStreets = createAction('streetsPage/SET_STREETS');

export const pagingStreets = createAction('streetsPage/ADD_PAGING');

export const fetchStreets = ({ settlement_id, ...options }) =>
(dispatch, getState) => {
  const state = getState();
  const settlement = settlement_id && getSettlement(state, settlement_id);
  if (!settlement) return null;
  return dispatch(fromStreets.fetchStreets({ settlement_id, ...options }))
    .then((action) => {
      if (action.error) throw action;
      return [
        dispatch(setStreets(action.payload.result)),
        dispatch(pagingStreets(action.meta)),
      ];
    });
};

export const fetchDistrictByRegion = id => dispatch =>
  dispatch(fetchDistrictsByRegionId(id, { page_size: 100 })).then((action) => {
    if (action.error) throw action;
    return dispatch(setRegionDistricts(action.payload.result));
  });

export const fetchSettlements = ({ region_id, district_id }) => (dispatch, getState) => {
  const state = getState();
  const region = getRegion(state, region_id);
  const district = getDistrict(state, district_id);
  if (!district || !region) return null;

  return dispatch(fromSettlements.fetchSettlements({
    region: region.name,
    district: district.district,
    page_size: 100,
  })).then((action) => {
    if (action.error) return action;
    dispatch(setSettlements(action.payload.result));

    return action;
  });
};

const districts = handleAction(setRegionDistricts, (state, action) => action.payload, []);
const settlements = handleAction(setSettlements, (state, action) => action.payload, []);
const streets = handleAction(setStreets, (state, action) => action.payload, []);

const paging = handleAction(pagingStreets, (state, action) => action.payload, {});

export default combineReducers({
  districts,
  settlements,
  streets,
  paging,
});
