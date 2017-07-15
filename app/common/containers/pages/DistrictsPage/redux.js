import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromDistricts from 'redux/districts';

export const getDistricts = createAction('regionsPage/GET_REGIONS');
export const pagingDistricts = createAction('regionsPage/ADD_PAGING');

export const fetchDistricts = options => dispatch =>
  Object.keys(options).length && dispatch(fromDistricts.fetchDistricts(options))
    .then((action) => {
      if (action.error) throw action;
      return [
        dispatch(getDistricts(action.payload.result)),
        dispatch(pagingDistricts(action.meta)),
      ];
    });

const districts = handleAction(getDistricts, (state, action) => action.payload, []);
const paging = handleAction(pagingDistricts, (state, action) => action.payload, {});

export default combineReducers({
  districts,
  paging,
});
