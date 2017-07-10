import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import UserForm from 'containers/forms/UserForm';

import { onCreateUser } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(null, ({ onCreateUser }))
export default class UserCreatePage extends React.Component {
  render() {
    const { onCreateUser, t } = this.props;

    return (
      <FormPageWrapper id="create-token-page" title={t('Create user')} back="/users">
        <Helmet title={t('Create user')} />
        <UserForm onSubmit={onCreateUser} create />
      </FormPageWrapper>
    );
  }
}
