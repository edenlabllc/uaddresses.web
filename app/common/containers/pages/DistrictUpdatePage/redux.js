import { handleAction, createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import * as fromDistricts from 'redux/districts';
import * as fromSettlements from 'redux/settlements';

export const setDistrict = createAction('districtUpdate/SET_DISTRICT');
export const getSettlements = createAction('districtUpdate/GET_SETTLEMENTS');

export const fetchDistricts = options => dispatch =>
  dispatch(fromDistricts.fetchDistricts(options))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(setDistrict(action.payload.result));
    });

export const fetchSettlements = options => dispatch =>
  dispatch(fromSettlements.fetchSettlements({ ...options, limit: 10 }))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(getSettlements(action.payload.result));
    });

const district = handleAction(setDistrict, (state, action) => action.payload, []);
const settlements = handleAction(getSettlements, (state, action) => action.payload, []);

export default combineReducers({
  district,
  settlements,
});
