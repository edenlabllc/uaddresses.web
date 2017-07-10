import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import TokenForm from 'containers/forms/TokenForm';

import { fetchTokenByID } from 'redux/tokens';
import { getToken } from 'reducers';
import { onDeleteToken } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchTokenByID(id)),
})
@connect((state, { params: { id } }) => ({
  token: getToken(state, id),
}), ({ onDeleteToken }))
export default class TokenDetailsPage extends React.Component {
  render() {
    const { onDeleteToken, token, t } = this.props;

    return (
      <FormPageWrapper id="token-details-page" title={t('Token details')} back="/tokens">
        <Helmet title={t('Token details')} />
        <TokenForm
          initialValues={token}
          onDelete={onDeleteToken}
          disabled
        />
      </FormPageWrapper>
    );
  }
}
