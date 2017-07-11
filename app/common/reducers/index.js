import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';

import regions from 'redux/regions';
import session from 'redux/session';

import Aside from 'containers/blocks/Aside/redux';

import RegionsPage from 'containers/pages/RegionsPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  RegionsPage,
});

const data = combineReducers({
  regions,
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
