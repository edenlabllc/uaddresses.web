import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { createUrl } from 'helpers/url';
import { normalize } from 'normalizr';
import { settlement } from 'schemas';

import { invoke } from './api';

export const fetchSettlements = ({ ...options, limit = 10 } = {}, { useCache = false } = {}) =>
invoke({
  endpoint: createUrl(`${API_URL}/search/settlements`, { ...options }),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  bailout: state => useCache && state.data.settlements,
  types: ['settlements/FETCH_SETTLEMENTS_REQUEST', {
    type: 'settlements/FETCH_SETTLEMENTS_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [settlement])
    ),
    meta: (action, state, res) =>
      res.clone().json().then(json => json.paging),
  }, 'settlements/FETCH_SETTLEMENTS_FAILURE'],
});

export const fetchSettlementById = id => invoke({
  endpoint: `${API_URL}/settlements/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['settlements/FETCH_SETTLEMENT_BY_ID_REQUEST', {
    type: 'settlements/FETCH_SETTLEMENT_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, settlement)
    ),
  }, 'settlements/FETCH_SETTLEMENT_BY_ID_FAILURE'],
});

export const createSettlement = body => invoke({
  endpoint: `${API_URL}/settlements`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['settlements/CREATE_SETTLEMENT_REQUEST', {
    type: 'settlements/CREATE_SETTLEMENT_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, settlement)
    ),
  }, 'settlements/CREATE_SETTLEMENT_FAILURE'],
  body: {
    settlement: {
      ...body,
    },
  },
});

export const updateSettlement = (id, body) => invoke({
  endpoint: `${API_URL}/settlements/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['settlements/UPDATE_SETTLEMENT_REQUEST', {
    type: 'settlements/UPDATE_SETTLEMENT_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, settlement)
    ),
  }, 'settlements/UPDATE_SETTLEMENT_FAILURE'],
  body: {
    settlement: {
      ...body,
      type: body.type.name,
    },
  },
});

export const deleteSettlement = id => invoke({
  endpoint: `${API_URL}/settlements/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['settlements/DELETE_SETTLEMENT_REQUEST',
    'settlements/DELETE_SETTLEMENT_SUCCESS',
    'settlements/DELETE_SETTLEMENT_FAILURE'],
});

export default handleAction(
  combineActions(
    'settlements/FETCH_SETTLEMENTS_SUCCESS',
    'settlements/FETCH_SETTLEMENT_BY_ID_SUCCESS',
    'settlements/CREATE_SETTLEMENT_SUCCESS',
    'settlements/UPDATE_SETTLEMENT_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.settlements,
  }),
  null
);
