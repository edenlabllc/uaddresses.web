import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';
import { token } from 'schemas';

import { invoke } from './api';

export const fetchTokens = ({ limit = 10, ...options }) => invoke({
  endpoint: createUrl(`${API_URL}/admin/tokens`, { ...options, limit }),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['tokens/FETCH_TOKENS_REQUEST', {
    type: 'tokens/FETCH_TOKENS_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [token])
    ),
    meta: (action, state, res) =>
      res.clone().json().then(json => json.paging),
  }, 'tokens/FETCH_TOKENS_FAILURE'],
});

export const fetchTokenByID = id => invoke({
  endpoint: `${API_URL}/admin/tokens/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['tokens/FETCH_TOKEN_BY_ID_REQUEST', {
    type: 'tokens/FETCH_TOKEN_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, token)
    ),
  }, 'tokens/FETCH_TOKEN_BY_ID_FAILURE'],
});

export const createToken = body => invoke({
  endpoint: `${API_URL}/admin/tokens`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['tokens/CREATE_TOKEN_REQUEST', {
    type: 'tokens/CREATE_TOKEN_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, token)
    ),
  }, 'tokens/CREATE_TOKEN_FAILURE'],
  body: {
    token: {
      ...body,
    },
  },
});

export const deleteToken = id => invoke({
  endpoint: `${API_URL}/admin/tokens/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['tokens/DELETE_TOKEN_REQUEST',
    'tokens/DELETE_TOKEN_SUCCESS',
    'tokens/DELETE_TOKEN_FAILURE'],
});

export default handleAction(
  combineActions(
    'tokens/FETCH_TOKENS_SUCCESS',
    'tokens/FETCH_TOKEN_BY_ID_SUCCESS',
    'tokens/CREATE_TOKEN_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.tokens,
  }),
  {}
);
