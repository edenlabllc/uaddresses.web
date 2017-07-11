import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromRegions from 'redux/regions';

export const getRegions = createAction('regionsPage/GET_REGIONS');
export const pagingRegions = createAction('regionsPage/ADD_PAGING');

export const fetchRegions = options => dispatch =>
  dispatch(fromRegions.fetchRegions(options))
  .then((action) => {
    if (action.error) throw action;
    return [
      dispatch(getRegions(action.payload.result)),
      // dispatch(pagingRegions(action.meta)),
    ];
  });

const regions = handleAction(getRegions, (state, action) => action.payload, []);
const paging = handleAction(pagingRegions, (state, action) => action.payload, {});

export default combineReducers({
  regions,
  paging,
});
