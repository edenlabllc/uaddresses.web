import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromDistricts from 'redux/districts';

export const getDistricts = createAction('regionsUpdatePage/GET_REGIONS');

export const fetchDistricts = options => dispatch =>
  dispatch(fromDistricts.fetchDistricts({ ...options, page_size: 10 }))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(getDistricts(action.payload.result));
    });

const districts = handleAction(getDistricts, (state, action) => action.payload, []);

export default combineReducers({
  districts,
});
