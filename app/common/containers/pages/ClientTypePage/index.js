import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { filterParams } from 'helpers/url';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { FormRow, FormColumn } from '@components/Form';
import Pagination from 'components/CursorPagination';

import FieldFilterForm from 'containers/forms/FieldFilterForm';
import { getClientTypes } from 'reducers';
import { fetchClientsTypes } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchClientsTypes(query)),
})
@connect(state => ({
  ...state.pages.ClientTypePage,
  clientTypes: getClientTypes(state, state.pages.ClientTypePage.clientTypes),
}))
export default class ClientTypePage extends React.Component {
  render() {
    const { clientTypes = [], t, location, paging } = this.props;

    return (
      <div id="client-types-page">
        <Helmet title={t('Client Types')} />
        <H1>{ t('Client Types') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="name"
              form="client-types_name_form"
              initialValues={location.query}
              submitBtn
              onSubmit={name => filterParams(name, this.props)}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <div id="client-types-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'scope', title: t('Scope') },
              { key: 'edit', title: t('Action') },
            ]}
            data={clientTypes.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              scope: item.scope,
              edit: (<Button
                id={`edit-client-type-button-${item.id}`}
                theme="link"
                to={`/client_types/${item.id}`}
              >
                { t('Edit client type') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/client_types/create">{t('Create new client type')}</Button>
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
