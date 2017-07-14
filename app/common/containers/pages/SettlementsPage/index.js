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

import DistrictFieldFilterForm from 'containers/forms/DistrictFieldFilterForm';

import Pagination from 'components/CursorPagination';

import { getSettlements, getAllRegions } from 'reducers';
import { fetchSettlements } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchSettlements(query)),
})
@connect(state => ({
  ...state.pages.SettlementsPage,
  settlements: getSettlements(state, state.pages.SettlementsPage.settlements),
  regions: getAllRegions(state),
}))
export default class SettlementsPage extends React.Component {
  render() {
    const { settlements = [], regions = [], t, location: { query }, paging } = this.props;
    const location = query.region && query.district;

    return (
      <div id="settlements-page">
        <Helmet title={t('Settlements')} />
        <H1>{t(`Settlements ${location ? (query.region, query.district) : ''}`)}</H1>
        <FormRow>
          <FormColumn>
            <DistrictFieldFilterForm
              initialValues={location.query}
              onChange={region => filterParams({ region: region.region.title }, this.props)}
              regions={regions}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <div id="settlements-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('id') },
              { key: 'settlement_name', title: t('settlement_name') },
              { key: 'mountain_group', title: t('mountain_group') },
              { key: 'type', title: t('type') },
              { key: 'koatuu', title: t('koatuu') },
              { key: 'edit', title: t('Action') },
            ]}
            data={settlements.map(item => ({
              id: <div className={styles.name}>
                {item.id}
              </div>,
              settlement_name: (<div className={styles.name}>
                <Button
                  id={`edit-settlements-button-${item.name}`}
                  theme="link"
                  color="red"
                  to={`/addresss?district=${item.name}`}
                >
                  {item.settlement_name}
                </Button>
              </div>),
              mountain_group: <div className={styles.name}>
                {item.mountain_group}
              </div>,
              type: <div className={styles.name}>
                {item.type}
              </div>,
              koatuu: <div className={styles.name}>
                {item.koatuu}
              </div>,
              edit: (<Button
                id={`edit-settlements-button-${item.id}`}
                theme="link"
                to={`/settlements/${item.region}/${item.district}`}
              >
                { t('Edit') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/regions/create">{t('Create new region')}</Button>
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
