/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { sortData } from 'helpers/sortData';
import { street_types } from 'helpers/dictionaries';
import { getFormInitialValues } from 'helpers/getFormInitialValues';
import { handleSearchFormSubmit } from 'helpers/handleSearchFormSubmit';
import { reset } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';

import { fetchRegions } from 'redux/regions';

import StreetsSearchForm from 'containers/forms/StreetsSearchForm';
import Pagination from 'components/Pagination';

import {
  getAllRegions,
  getDistricts,
  getSettlements,
  getStreets,
  getRegion,
  getDistrict,
  getSettlement,
} from 'reducers';

import {
  fetchStreets,
  fetchSettlements,
  fetchDistrictByRegion,
  fetchSettlementsSearch,
  clearDistricts,
  clearSettlements,
  clearStreets,
} from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({
    dispatch,
    location: { query: { region_id, district_id, settlement_id, name, type, page } },
  }) =>
    Promise.all([
      dispatch(fetchRegions()),
      region_id
        ? dispatch(fetchDistrictByRegion(region_id))
        : dispatch(clearDistricts())
    ])
      .then(() =>
        (region_id || settlement_id)
          ? dispatch(fetchSettlementsSearch({ settlement_id, district_id, region_id }))
          : dispatch(clearSettlements())
      )
      .then(() =>
        settlement_id
          ? dispatch(fetchStreets({ settlement_id, name, type, page }))
          : dispatch(clearStreets())
      )
      .catch(() => {})
})
@connect(
  (state, { location: { query: { settlement_id, region_id, district_id } } }) => ({
    ...state.pages.StreetsPage,
    streets: getStreets(state, state.pages.StreetsPage.streets),
    regions: getAllRegions(state),
    districts: getDistricts(state, state.pages.StreetsPage.districts),
    settlements: getSettlements(state, state.pages.StreetsPage.settlements),
    selectedRegion: region_id && getRegion(state, region_id),
    selectedDistrict: district_id && getDistrict(state, district_id),
    selectedSettlement: settlement_id && getSettlement(state, settlement_id),
  }),
  { reset }
)
export default class StreetsPage extends React.Component {
  render() {
    const {
      regions = [],
      districts = [],
      settlements = [],
      streets = [],
      location,
      paging,
      t,
      selectedRegion = '',
      selectedDistrict = '',
      selectedSettlement = '',
    } = this.props;

    const initialValues = getFormInitialValues({
      selectedRegion,
      selectedDistrict,
      selectedSettlement,
      location,
    });
    const steetType = location.query.type || '';

    return (
      <div id="streets-page">
        <Helmet title={t('Streets')} />
        <H1>{t('Streets')}</H1>
        <StreetsSearchForm
          form="streets-filter-form"
          regions={sortData(regions)}
          districts={sortData(districts, 'district')}
          settlements={sortData(settlements)}
          onSubmit={(data) => handleSearchFormSubmit(data, this.props)}
          location={location}
          initialValues={{
            ...initialValues,
            type: steetType && {
              name: steetType,
              title: street_types[steetType],
            }
          }}
        />
        <div>
          <div id="streets-table" className={styles.table}>
            <Table
              columns={[
                { key: 'name', title: t('street name') },
                { key: 'type', title: t('type') },
                { key: 'edit', title: t('Action') },
              ]}
              data={(streets || [])
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item => ({
                  name: (<div className={styles.name}>
                    <Button
                      id={`edit-street-button-${item.name}`}
                      theme="link"
                      color="red"
                      to={`/streets/${item.id}`}
                    >
                      {item.name}
                    </Button>
                  </div>),
                  type: <div className={styles.name}>
                    {street_types[item.type]}
                  </div>,
                  edit: (<Button
                    id={`edit-street-button-${item.id}`}
                    theme="link"
                    to={`/streets/${item.id}`}
                  >
                    { t('Edit') }
                  </Button>),
                }))
              }
            />
          </div>
          {
            false && (
              <div className={styles.block}>
                <Button to="/streets/create">{t('Create new street')}</Button>
              </div>
            )
          }
          <Pagination
            currentPage={paging.page_number}
            totalPages={paging.total_pages}
            location={location}
          />
        </div>
      </div>
    );
  }
}
