/* eslint-disable */
import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromStreets from 'redux/streets';
import { fetchDistrictsByRegionId } from 'redux/districts';
import * as fromSettlements from 'redux/settlements';

import { getDistrict, getRegion, getSettlement } from 'reducers';

const DEFAULT_PAGINATION = { page_number: 1, page_size: 20, total_entries: 0, total_pages: 1 };

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

export const clearStreets = () => dispatch => [
  dispatch(setStreets([])),
  dispatch(pagingStreets(DEFAULT_PAGINATION))
];

export const fetchDistrictByRegion = id => dispatch =>
  dispatch(fetchDistrictsByRegionId(id, { page_size: 100 })).then((action) => {
    if (action.error) throw action;
    return dispatch(setRegionDistricts(action.payload.result));
  });

export const clearDistricts = () => dispatch => dispatch(setRegionDistricts([]));

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

export const fetchSettlementsSearch = ({
  name,
  settlement_id,
  region_id,
  district_id
}) => (dispatch, getState) => {
  const state = getState();
  const region = getRegion(state, region_id) || {};
  const district = getDistrict(state, district_id) || {};
  const settlement =
    (settlement_id && getSettlement(state, settlement_id)) || {};

  return dispatch(
    fromSettlements.fetchSettlements({
      name: name || settlement.name,
      region: region.name,
      district: district.district,
      page_size: 100
    })
  ).then(action => {
    if (action.error) return action;
    return dispatch(setSettlements(action.payload.result));
  });
};

export const clearSettlements = () => dispatch => dispatch(setSettlements([]));

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
