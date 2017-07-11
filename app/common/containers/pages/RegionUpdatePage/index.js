import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import RegionForm from 'containers/forms/RegionForm';

import { getRole } from 'reducers';
import { fetchRoleByID, updateRole } from 'redux/regions';
import { deleteRole } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchRoleByID(id)),
})
@connect((state, { params: { id } }) => ({
  role: getRole(state, id),
}), { updateRole, deleteRole })
@withStyles(styles)
@translate()
export default class RoleUpdatePage extends React.Component {
  render() {
    const { t, role, updateRole, deleteRole } = this.props;

    return (
      <FormPageWrapper id="update-regions-page" title={t('Edit role: {{name}}', { name: role.name })} back="/regions">
        <Helmet title={t('Edit role: {{name}}', { name: role.name })} />
        <div className={styles.block}>
          <RegionForm
            initialValues={role}
            onSubmit={values => updateRole(role.id, values)}
            onDelete={deleteRole}
            edit
          />
        </div>
      </FormPageWrapper>
    );
  }
}
