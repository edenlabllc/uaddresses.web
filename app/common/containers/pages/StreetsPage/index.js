import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { filterParams } from 'helpers/url';
import { reset } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { FormRow, FormColumn } from '@components/Form';

import QueryFieldFilterForm from 'containers/forms/QueryFieldFilterForm';
import Pagination from 'components/CursorPagination';

import {
  getAllRegions,
  getDistricts,
  getSettlements,
  getStreets,
} from 'reducers';

import { fetchStreets, fetchDistrictByRegion, fetchSettlements } from './redux';

import styles from './styles.scss';

const street_types = {
  STREET: 'вулиця',
  SQUARE: 'площа',
  RIVER_SIDE: 'набережна',
  PASS: 'провулок',
  MICRODISTRICT: 'мікрорайон',
  MAIDAN: 'майдан',
  HIGHWAY: 'шосе',
  BOULEVARD: 'бульвар',
  BLIND_STREET: 'тупик',
  AVENUE: 'проспект',
  ASCENT: 'узвіз',
};

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchStreets(query)),
})
@connect(
  state => ({
    ...state.pages.StreetsPage,
    streets: getStreets(state, state.pages.StreetsPage.streets),
    regionsAll: getAllRegions(state),
    districtsFromRegion: getDistricts(state, state.pages.StreetsPage.regionDistricts),
    settlements: getSettlements(state, state.pages.StreetsPage.settlements),
  }),
  dispatch => ({
    onSelectRegion: id => Promise.all([
      dispatch(fetchDistrictByRegion(id)),
      dispatch(reset('district-filter-form')),
      dispatch(reset('settlement-filter-form')),
    ]),
    onSelectDistrict: id => Promise.all([
      dispatch(fetchSettlements(id)),
      dispatch(reset('settlement-filter-form')),
    ]),
  })
)
export default class StreetsPage extends React.Component {
  render() {
    const {
      regionsAll = [],
      districtsFromRegion = [],
      settlements = [],
      streets = [],
      onSelectRegion,
      onSelectDistrict,
      location = [],
      paging = [],
      t,
    } = this.props;

    return (
      <div id="streets-page">
        <Helmet title={t('Streets')} />
        <H1>{t('Streets')}</H1>
        <FormRow>
          <FormColumn>
            <QueryFieldFilterForm
              name="region"
              form="region-filter-form"
              placeholder={t('Choose region')}
              onChange={({ region }) => onSelectRegion(region.name)}
              data={regionsAll}
            />
          </FormColumn>
          <FormColumn>
            <QueryFieldFilterForm
              name="district"
              placeholder={t('Choose district')}
              disabled={districtsFromRegion.length === 0}
              form="district-filter-form"
              onChange={({ district }) => district && onSelectDistrict(district.title)}
              data={districtsFromRegion.map(i => ({ id: i.id, name: i.district }))}
            />
          </FormColumn>
          <FormColumn>
            <QueryFieldFilterForm
              name="settlement"
              form="settlement-filter-form"
              placeholder={t('Choose settlement')}
              disabled={settlements.length === 0}
              onChange={({ settlement }) =>
              settlement && filterParams({ settlement_id: settlement.name }, this.props, true)
              }
              data={settlements}
            />
          </FormColumn>
        </FormRow>
        <div>
          <div id="streets-table" className={styles.table}>
            <Table
              columns={[
                { key: 'name', title: t('street name') },
                { key: 'type', title: t('type') },
              ]}
              data={(streets || [])
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item => ({
                  name: (<div className={styles.name}>
                    {item.name}
                  </div>),
                  type: <div className={styles.name}>
                    {street_types[item.type]}
                  </div>,
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
          {
            false && <div className={styles.pagination}>
              <Pagination
                location={location}
                more={paging.has_more}
                after={paging.cursors.starting_after}
                before={paging.cursors.ending_before}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}
