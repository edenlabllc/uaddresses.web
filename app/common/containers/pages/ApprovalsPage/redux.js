import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromApprovals from 'redux/approvals';

export const getApprovals = createAction('approvalsPage/GET_APPROVALS');
export const pagingApprovals = createAction('approvalsPage/ADD_PAGING');

export const fetchApprovals = options => dispatch =>
  dispatch(fromApprovals.fetchApprovals(options))
  .then((action) => {
    if (action.error) throw action;
    return [
      dispatch(getApprovals(action.payload.result)),
      dispatch(pagingApprovals(action.meta)),
    ];
  });

const approvals = handleAction(getApprovals, (state, action) => action.payload, []);
const paging = handleAction(pagingApprovals, (state, action) => action.payload, {});

export default combineReducers({
  approvals,
  paging,
});
