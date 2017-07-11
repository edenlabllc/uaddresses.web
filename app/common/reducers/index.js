import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';
import session from 'redux/session';

import regions from 'redux/regions';
import districts from 'redux/districts';


import Aside from 'containers/blocks/Aside/redux';

import RegionsPage from 'containers/pages/RegionsPage/redux';
import RegionUpdatePage from 'containers/pages/RegionUpdatePage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  RegionsPage,
  RegionUpdatePage,
});

const data = combineReducers({
  regions,
  districts,
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
