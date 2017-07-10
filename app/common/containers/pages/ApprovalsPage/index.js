import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { filterParams } from 'helpers/url';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import Pagination from 'components/CursorPagination';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import { FormRow, FormColumn } from '@components/Form';

import { getApprovals } from 'reducers';
import { fetchApprovals } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchApprovals(query)),
})
@connect(state => ({
  ...state.pages.ApprovalsPage,
  approvals: getApprovals(state, state.pages.ApprovalsPage.approvals),
}))
export default class ApprovalsPage extends React.Component {
  render() {
    const { approvals = [], t, location, paging } = this.props;

    return (
      <div id="approvals-page">
        <Helmet title={t('Approvals')} />
        <H1>{ t('Approvals') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              submitBtn
              form="app_client_id_form"
              name="client_id"
              initialValues={location.query}
              onSubmit={client_id => filterParams(client_id, this.props)}
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="user_id"
              form="app_user_id_form"
              submitBtn
              initialValues={location.query}
              onSubmit={user_id => filterParams(user_id, this.props)}
            />
          </FormColumn>
        </FormRow>
        <div id="roles-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'scope', title: t('Scope') },
              { key: 'action', title: t('Action') },
            ]}
            data={approvals.map(item => ({
              id: item.id,
              scope: item.scope,
              action: (<Button
                id={`edit-approval-button-${item.id}`}
                theme="link"
                to={`/approvals/${item.id}`}
              >
                { t('Edit approval') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/approvals/create">{t('Create new approval')}</Button>
        </div>

        <div className={styles.pagination}>
          <Pagination
            location={location}
            more={paging.has_more}
            after={paging.cursors.starting_after}
            before={paging.cursors.ending_before}
          />
        </div>
      </div>
    );
  }
}
