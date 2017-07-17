import { handleAction, createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import * as fromDistricts from 'redux/districts';

export const setDistrict = createAction('districtUpdate/SET_DISTRICT');

export const fetchDistricts = options => dispatch =>
  dispatch(fromDistricts.fetchDistricts(options))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(setDistrict(action.payload.result));
    });

const district = handleAction(setDistrict, (state, action) => action.payload, []);

export default combineReducers({
  district,
});
