import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';
import session from 'redux/session';

import regions from 'redux/regions';
import districts from 'redux/districts';

import settlements from 'redux/settlements';
import streets from 'redux/streets';

import Aside from 'containers/blocks/Aside/redux';
import RegionsPage from 'containers/pages/RegionsPage/redux';
import RegionUpdatePage from 'containers/pages/RegionUpdatePage/redux';

import DistrictsPage from 'containers/pages/DistrictsPage/redux';
import DistrictUpdatePage from 'containers/pages/DistrictUpdatePage/redux';

import SettlementsPage from 'containers/pages/SettlementsPage/redux';
import SettlementUpdatePage from 'containers/pages/SettlementUpdatePage/redux';

import StreetsPage from 'containers/pages/StreetsPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  RegionsPage,
  RegionUpdatePage,

  DistrictsPage,
  DistrictUpdatePage,

  SettlementsPage,
  SettlementUpdatePage,

  StreetsPage,
});

const data = combineReducers({
  regions,
  districts,
  settlements,
  streets,
});

export default combineReducers({
  blocks,
  pages,
  data,
  session,
  // external libraries
  form,
  routing,
  loading,
});

export const getOAuthToken = state => state.session.token;
export const getOAuthUser = state => state.data.user;

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getRegions = (state, ids) => denormalize(ids, [schemas.region], state.data);
export const getAllRegions = state => getRegions(state, Object.keys(state.data.regions));
export const getRegion = (state, id) => denormalize(id, schemas.region, state.data);

export const getDistricts = (state, ids) => denormalize(ids, [schemas.district], state.data);
export const getAllDistricts = state => getDistricts(state, Object.keys(state.data.districts));
export const getDistrict = (state, id) => denormalize(id, schemas.district, state.data);

export const getSettlements = (state, ids) => denormalize(ids, [schemas.settlement], state.data);
export const getAllSettlements = state =>
  getSettlements(state, Object.keys(state.data.settlements));
export const getSettlement = (state, id) => denormalize(id, schemas.settlement, state.data);

export const getStreets = (state, ids) => denormalize(ids, [schemas.street], state.data);
export const getAllStreets = state => getStreets(state, Object.keys(state.data.streets));
export const getStreet = (state, id) => denormalize(id, schemas.street, state.data);
