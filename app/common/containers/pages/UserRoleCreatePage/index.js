import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import UserRoleCreateForm from 'containers/forms/UserRoleCreateForm';

import { getAllClients, getAllRoles } from 'reducers';

import { onCreateUserRole } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  clients: getAllClients(state),
  roles: getAllRoles(state),
}), ({ onCreateUserRole }))
export default class UserRoleCreatePage extends React.Component {
  render() {
    const { clients = [], roles = [], onCreateUserRole, t, params } = this.props;
    return (
      <FormPageWrapper id="create-user-role-page" title={t('Create user role')} back="/users">
        <Helmet title={t('Create user role')} />
        <UserRoleCreateForm
          onSubmit={onCreateUserRole}
          data={{ clients, roles }}
          id={params.id}
        />
      </FormPageWrapper>
    );
  }
}
