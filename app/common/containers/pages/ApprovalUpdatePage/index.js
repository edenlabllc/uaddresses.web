import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ApprovalUpdateForm from 'containers/forms/ApprovalUpdateForm';

import { getApproval } from 'reducers';
import { fetchApprovalByID, updateApproval } from 'redux/approvals';
import { deleteApproval } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchApprovalByID(id)),
})
@connect((state, { params: { id } }) => ({
  approval: getApproval(state, id),
}), { updateApproval, deleteApproval })
@withStyles(styles)
@translate()
export default class ApprovalUpdatePage extends React.Component {
  render() {
    const { t, approval, updateApproval, deleteApproval } = this.props;
    return (
      <FormPageWrapper id="update-approval-page" title={t('Edit approval')} back="/approvals">
        <Helmet title={t('Edit approval')} />
        <div className={styles.block}>
          <ApprovalUpdateForm
            initialValues={approval}
            onSubmit={values => updateApproval(approval.id, values)}
            onDelete={deleteApproval}
          />
        </div>
      </FormPageWrapper>
    );
  }
}
