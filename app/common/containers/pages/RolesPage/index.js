import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { filterParams } from 'helpers/url';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { FormRow, FormColumn } from '@components/Form';

import FieldFilterForm from 'containers/forms/FieldFilterForm';
import Pagination from 'components/CursorPagination';

import { getRoles } from 'reducers';
import { fetchRoles } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchRoles(query)),
})
@connect(state => ({
  ...state.pages.RolesPage,
  roles: getRoles(state, state.pages.RolesPage.roles),
}))
export default class RolesPage extends React.Component {
  render() {
    const { roles = [], t, location, paging } = this.props;

    return (
      <div id="roles-page">
        <Helmet title={t('Roles')} />
        <H1>{ t('Roles') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="name"
              form="roles_name_form"
              initialValues={location.query}
              submitBtn
              onSubmit={name => filterParams(name, this.props)}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <div id="roles-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'scope', title: t('Scope') },
              { key: 'edit', title: t('Action') },
            ]}
            data={roles.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              scope: item.scope,
              edit: (<Button
                id={`edit-template-button-${item.id}`}
                theme="link"
                to={`/roles/${item.id}`}
              >
                { t('Edit role') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/roles/create">{t('Create new')}</Button>
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
