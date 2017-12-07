import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { createUrl } from 'helpers/url';
import { normalize } from 'normalizr';
import { street } from 'schemas';

import { invoke } from './api';

export const fetchStreets = (options, { useCache = false } = {}) =>
invoke({
  endpoint: createUrl(`${API_URL}/streets`, { page_size: 20, ...options }),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  bailout: state => useCache && state.data.streets && Object.keys(state.data.streets).length,
  types: ['streets/FETCH_STREETS_REQUEST', {
    type: 'streets/FETCH_STREETS_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [street])
    ),
    meta: (action, state, res) =>
      res.clone().json().then(json => json.paging),
  }, 'streets/FETCH_STREETS_FAILURE'],
});

export const fetchStreetByID = id => invoke({
  endpoint: `${API_URL}/streets/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['streets/FETCH_STREET_BY_ID_REQUEST', {
    type: 'streets/FETCH_STREET_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, street)
    ),
  }, 'streets/FETCH_STREET_BY_ID_FAILURE'],
});

export const createStreet = body => invoke({
  endpoint: `${API_URL}/streets`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['streets/CREATE_STREET_REQUEST', {
    type: 'streets/CREATE_STREET_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, street)
    ),
  }, 'streets/CREATE_STREET_FAILURE'],
  body: {
    street: {
      ...body,
    },
  },
});

export const updateStreet = (id, body) => invoke({
  endpoint: `${API_URL}/streets/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['streets/UPDATE_STREET_REQUEST', {
    type: 'streets/UPDATE_STREET_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, street)
    ),
  }, 'streets/UPDATE_STREET_FAILURE'],
  body: {
    street: {
      ...body,
    },
  },
});

export const deleteStreet = id => invoke({
  endpoint: `${API_URL}/streets/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['streets/DELETE_STREET_REQUEST',
    'streets/DELETE_STREET_SUCCESS',
    'streets/DELETE_STREET_FAILURE'],
});

export default handleAction(
  combineActions(
    'streets/FETCH_STREETS_SUCCESS',
    'streets/FETCH_STREET_BY_ID_SUCCESS',
    'streets/CREATE_STREET_SUCCESS',
    'streets/UPDATE_STREET_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.streets,
  }),
  {}
);
