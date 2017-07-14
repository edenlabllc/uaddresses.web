import { handleAction, createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import * as fromDistricts from 'redux/districts';

export const setDistricts = createAction('regionUpdate/SET_DISTRICTS');
export const setDistrictsPaging = createAction('regionUpdate/SET_DISTRICTS_PAGING');

export const fetchDistricts = options => (dispatch) => {
  console.log('option', options);
  return dispatch(fromDistricts.fetchDistricts(options)
    .then((action) => {
      console.log('action', action);
      if (action.error) throw action;
      dispatch([
        setDistricts(action.payload.result),
        setDistrictsPaging(action.meta),
      ]);
    }));
};

const districts = handleAction(setDistricts, action => action.payload, []);
const districtsPaging = handleAction(setDistrictsPaging, action => action.payload, []);

export default combineReducers({
  districts,
  districtsPaging,
});
