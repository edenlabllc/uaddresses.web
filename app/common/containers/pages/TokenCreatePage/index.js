import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import Helmet from 'react-helmet';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import TokenForm from 'containers/forms/TokenForm';

import { onCreateToken } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(null, ({ onCreateToken }))
export default class TokenCreatePage extends React.Component {
  render() {
    const { onCreateToken, t } = this.props;

    return (
      <FormPageWrapper id="create-token-page" title={t('Create token')} back="/tokens">
        <Helmet title={t('Create token')} />
        <TokenForm onSubmit={onCreateToken} create />
      </FormPageWrapper>
    );
  }
}
