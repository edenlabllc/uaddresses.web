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

import { getClients } from 'reducers';
import { fetchClients } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchClients(query)),
})
@connect(state => ({
  ...state.pages.ClientsPage,
  clients: getClients(state, state.pages.ClientsPage.clients),
}))
export default class ClientsPage extends React.Component {
  render() {
    const { clients = [], t, location, paging } = this.props;

    return (
      <div id="clients-page">
        <Helmet title={t('Clients')} />
        <H1>{ t('Clients') }</H1>
        <div>
          <FieldFilterForm
            name="name"
            initialValues={{
              name: location.query.name,
            }}
            submitBtn
            onSubmit={name => filterParams(name, this.props)}
          />
        </div>
        <div id="client-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'redirect_uri', title: t('Redirect uri') },
              { key: 'actions', title: t('Details') },
            ]}
            data={clients.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              redirect_uri: (<Button
                id={`client-details-button-${item.id}`}
                theme="link"
                to={`https://${item.redirect_uri}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                { item.redirect_uri }
              </Button>),
              actions: (<Button
                id={`client-details-button-${item.id}`}
                theme="link"
                to={`/clients/${item.id}`}
              >
                { t('Show client details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/clients/create">{t('Create new client')}</Button>
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
