import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromDistricts from 'redux/districts';

export const getDistricts = createAction('regionsPage/GET_REGIONS');
export const pagingRegions = createAction('regionsPage/ADD_PAGING');

export const fetchDistrictsList = (id, options) => dispatch =>
  dispatch(fromDistricts.fetchDistrictsList(id, options))
  .then((action) => {
    if (action.error) throw action;
    return [
      dispatch(getDistricts(action.payload.result)),
      // dispatch(pagingRegions(action.meta)),
    ];
  });

const districts = handleAction(getDistricts, (state, action) => action.payload, []);
const paging = handleAction(pagingRegions, (state, action) => action.payload, {});

export default combineReducers({
  districts,
  paging,
});
