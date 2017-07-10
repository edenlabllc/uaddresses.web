import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ClientTypesForm from 'containers/forms/ClientTypesForm';

import { onCreateClientType } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(null, ({ onCreateClientType }))
export default class ClientTypeCreatePage extends React.Component {
  render() {
    const { onCreateClientType, t } = this.props;

    return (
      <FormPageWrapper id="create-roles-page" title={t('Create client type')} back="/client_types">
        <Helmet title={t('Create client type')} />
        <ClientTypesForm onSubmit={onCreateClientType} />
      </FormPageWrapper>
    );
  }
}
