import { push } from 'react-router-redux';
import * as fromApprovals from 'redux/approvals';

export const onCreateApproval = body => dispatch =>
  dispatch(fromApprovals.createApproval(body))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/approvals'));
      return action;
    });
