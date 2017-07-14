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

import { getDistricts, getAllRegions } from 'reducers';
import { fetchDistricts } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchDistricts(query)),
})
@connect(state => ({
  ...state.pages.DistrictsPage,
  districts: getDistricts(state, state.pages.DistrictsPage.districts),
  regions: getAllRegions(state),
}))
export default class DistrictsPage extends React.Component {
  render() {
    const { districts = [], regions = [], t, location, paging } = this.props;

    return (
      <div id="districts-page">
        <Helmet title={t('Districts')} />
        <H1>{t(`Область ${location.query.region ? location.query.region : ''}`)}</H1>
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
        <div id="district-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('id') },
              { key: 'district', title: t('district') },
              { key: 'koatuu', title: t('koatuu') },
              { key: 'region', title: t('region') },
              { key: 'edit', title: t('Action') },
            ]}
            data={districts.map(item => ({
              id: <div className={styles.name}>
                {item.id}
              </div>,
              district: (<div className={styles.name}>
                <Button
                  id={`edit-district-button-${item.id}`}
                  theme="link"
                  color="red"
                  to={`/settlements?region=${item.region}&district=${item.district}`}
                >
                  {item.district}
                </Button>
              </div>),
              koatuu: <div className={styles.name}>
                {item.koatuu}
              </div>,
              region: <div className={styles.name}>
                {item.region}
              </div>,
              edit: (<Button
                id={`edit-district-button-${item.id}`}
                theme="link"
                to={`/districts/${item.region}/${item.district}`}
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
