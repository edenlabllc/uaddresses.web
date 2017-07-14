import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { createUrl } from 'helpers/url';
import { normalize } from 'normalizr';
import { district } from 'schemas';

import { invoke } from './api';

export const fetchDistricts = ({ ...options, limit = 10 } = {}, { useCache = false } = {}) =>
  invoke({
    endpoint: createUrl(`${API_URL}/search/districts`, { ...options, limit }),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    bailout: state => useCache && state.data.districts,
    types: ['districts/FETCH_DISTRICTS_REQUEST', {
      type: 'districts/FETCH_DISTRICTS_SUCCESS',
      payload: (action, state, res) => res.clone().json().then(
        json => normalize(json.data, [district])
      ),
      meta: (action, state, res) =>
        res.clone().json().then(json => json.paging),
    }, 'districts/FETCH_DISTRICTS_FAILURE'],
  });


export const fetchDistrictByID = (id, options) => invoke({
  endpoint: createUrl(`${API_URL}/details/region/${id}/districts`, options),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['districts/FETCH_DISTRICT_BY_REGION_ID_REQUEST', {
    type: 'districts/FETCH_DISTRICT_BY_REGION_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, district)
    ),
  }, 'districts/FETCH_DISTRICT_BY_REGION_ID_FAILURE'],
});

// export const createDistrict = body => invoke({
//   endpoint: `${API_URL}/districts`,
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//   },
//   types: ['districts/CREATE_DISTRICT_REQUEST', {
//     type: 'districts/CREATE_DISTRICT_SUCCESS',
//     payload: (action, state, res) => res.json().then(
//       json => normalize(json.data, district)
//     ),
//   }, 'districts/CREATE_DISTRICT_FAILURE'],
//   body: {
//     district: {
//       ...body,
//     },
//   },
// });

export const updateDistrict = (id, body) => invoke({
  endpoint: `${API_URL}/districts/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['districts/UPDATE_DISTRICT_REQUEST', {
    type: 'districts/UPDATE_DISTRICT_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, district)
    ),
  }, 'districts/UPDATE_DISTRICT_FAILURE'],
  body: {
    district: {
      ...body,
    },
  },
});

export const deleteDistrict = id => invoke({
  endpoint: `${API_URL}/districts/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['districts/DELETE_DISTRICT_REQUEST',
    'districts/DELETE_DISTRICT_SUCCESS',
    'districts/DELETE_DISTRICT_FAILURE'],
});

export default handleAction(
  combineActions(
    'districts/FETCH_DISTRICTS_SUCCESS',
    'districts/FETCH_DISTRICT_BY_REGION_ID_SUCCESS',
    // 'districts/CREATE_DISTRICT_SUCCESS',
    'districts/UPDATE_DISTRICT_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.districts,
  }),
  null
);
