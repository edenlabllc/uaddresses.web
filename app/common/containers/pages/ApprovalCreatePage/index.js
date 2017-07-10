import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ApprovalForm from 'containers/forms/ApprovalForm';

import { getAllUsers, getAllClients } from 'reducers';
import { onCreateApproval } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  users: getAllUsers(state),
  clients: getAllClients(state),
}), ({ onCreateApproval }))
export default class ApprovalCreatePage extends React.Component {
  render() {
    const { onCreateApproval, users, clients, t } = this.props;

    return (
      <FormPageWrapper id="create-approvals-page" title={t('Create approval')} back="/approvals">
        <Helmet title={t('Create approval')} />
        <ApprovalForm
          onSubmit={onCreateApproval}
          data={{ users, clients }}
          create
        />
      </FormPageWrapper>
    );
  }
}
