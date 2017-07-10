import { push } from 'react-router-redux';
import * as fromApprovals from 'redux/approvals';

export const deleteApproval = id => dispatch =>
  dispatch(fromApprovals.deleteApproval(id))
    .then((action) => {
      if (action.error) throw action;
      return dispatch(push('/approvals'));
    });
