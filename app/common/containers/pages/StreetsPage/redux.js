import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromStreets from 'redux/streets';
// import { fetchDistrictByID } from 'redux/districts';

export const getStreets = createAction('streetsPage/GET_SETTLEMENTS');
// export const getRegionDistricts = createAction('streetsPage/GET_REGION_DISTRICTS');
export const pagingStreets = createAction('streetsPage/ADD_PAGING');

export const fetchStreets = options => dispatch =>
  Object.keys(options).length &&
  dispatch(fromStreets.fetchStreets({ ...options, limit: 20 }))
    .then((action) => {
      if (action.error) throw action;
      return [
        dispatch(getStreets(action.payload.result)),
        dispatch(pagingStreets(action.meta)),
      ];
    });

// export const fetchDistrictByRegion = id => dispatch =>
//   dispatch(fetchDistrictByID(id, { limit: 100 })).then((action) => {
//     if (action.error) throw action;
//     return dispatch(getRegionDistricts(action.payload.result));
//   });

const streets = handleAction(getStreets, (state, action) => action.payload, []);
// const regionDistricts = handleAction(getRegionDistricts, (state, action) => action.payload, []);
const paging = handleAction(pagingStreets, (state, action) => action.payload, {});

export default combineReducers({
  streets,
  // regionDistricts,
  paging,
});