import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import RegionForm from 'containers/forms/RegionForm';

import { onCreateRole } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(null, ({ onCreateRole }))
export default class RoleCreatePage extends React.Component {
  render() {
    const { onCreateRole, t } = this.props;

    return (
      <FormPageWrapper id="create-roles-page" title={t('Create role')} back="/roles">
        <Helmet title={t('Create role')} />
        <RegionForm onSubmit={onCreateRole} />
      </FormPageWrapper>
    );
  }
}
