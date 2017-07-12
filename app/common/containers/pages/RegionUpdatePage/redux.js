import { handleAction, createAction } from 'redux-actions';
import { combineReducers } from 'redux';

import * as fromDistricts from 'redux/districts';

export const setDistricts = createAction('regionUpdate/SET_DISTRICTS');
export const setDistrictsPaging = createAction('regionUpdate/SET_DISTRICTS_PAGING');

export const fetchDistricts = (regionId, options) => dispatch =>
  dispatch(fromDistricts.fetchDistricts(regionId, {
    ...options,
    region: 'К',
    region_id: regionId,
  }))
    .then((action) => {
      if (action.error) throw action;
      dispatch([
        setDistricts(action.payload.result),
        setDistrictsPaging(action.meta),
      ]);
    });

const districts = handleAction(setDistricts, action => action.payload, []);
const districtsPaging = handleAction(setDistrictsPaging, action => action.payload, []);

export default combineReducers({
  districts,
  districtsPaging,
});
