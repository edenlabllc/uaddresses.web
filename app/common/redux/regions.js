import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { createUrl } from 'helpers/url';
import { normalize } from 'normalizr';
import { region } from 'schemas';

import { invoke } from './api';

export const fetchRegions = (options, { useCache = false } = {}) => invoke({
  endpoint: createUrl(`${API_URL}/regions`, { page_size: 99, ...options }),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  bailout: state =>
    useCache && state.data.regions && Object.keys(state.data.regions).length,
  types: ['regions/FETCH_REGIONS_REQUEST', {
    type: 'regions/FETCH_REGIONS_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [region])
    ),
    meta: (action, state, res) =>
      res.clone().json().then(json => json.paging),
  }, 'regions/FETCH_REGIONS_FAILURE'],
});

export const fetchRegionByID = id => invoke({
  endpoint: `${API_URL}/regions/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['regions/FETCH_REGION_BY_ID_REQUEST', {
    type: 'regions/FETCH_REGION_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, region)
    ),
  }, 'regions/FETCH_REGION_BY_ID_FAILURE'],
});

export const createRegion = body => invoke({
  endpoint: `${API_URL}/regions`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['regions/CREATE_REGION_REQUEST', {
    type: 'regions/CREATE_REGION_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, region)
    ),
  }, 'regions/CREATE_REGION_FAILURE'],
  body: {
    region: {
      ...body,
    },
  },
});

export const updateRegion = (id, body) => invoke({
  endpoint: `${API_URL}/regions/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['regions/UPDATE_REGION_REQUEST', {
    type: 'regions/UPDATE_REGION_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, region)
    ),
  }, 'regions/UPDATE_REGION_FAILURE'],
  body: {
    region: {
      ...body,
    },
  },
});

export const deleteRegion = id => invoke({
  endpoint: `${API_URL}/regions/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['regions/DELETE_REGION_REQUEST',
    'regions/DELETE_REGION_SUCCESS',
    'regions/DELETE_REGION_FAILURE'],
});

export default handleAction(
  combineActions(
    'regions/FETCH_REGIONS_SUCCESS',
    'regions/FETCH_REGION_BY_ID_SUCCESS',
    'regions/CREATE_REGION_SUCCESS',
    'regions/UPDATE_REGION_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.regions,
  }),
  {}
);
