import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { FormRow, FormColumn } from '@components/Form';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import Pagination from 'components/CursorPagination';

import { filterParams } from 'helpers/url';

import { getUsers } from 'reducers';
import { fetchUsersList } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchUsersList(query)),
})
@connect(state => ({
  ...state.pages.UsersPage,
  users: getUsers(state, state.pages.UsersPage.users),
}))
export default class UsersPage extends React.Component {
  render() {
    const { users = [], t, router, location, paging } = this.props;

    return (
      <div id="users-page">
        <Helmet title={t('Users')} />
        <H1>{ t('Users') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="email"
              initialValues={location.query}
              form="user_email_form"
              submitBtn
              onSubmit={values => filterParams(values, { router, location })}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <div id="users-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'email', title: t('Email') },
              { key: 'actions', title: t('Details') },
            ]}
            data={users.map(item => ({
              id: item.id,
              email: <div className={styles.name}>
                {item.email}
              </div>,
              actions: (<Button
                id={`user-details-button-${item.id}`}
                theme="link"
                to={`/users/${item.id}`}
              >
                { t('Show user details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/users/create">{t('Create new user')}</Button>
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
