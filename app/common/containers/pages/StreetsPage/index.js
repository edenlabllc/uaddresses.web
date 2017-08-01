import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { filterParams } from 'helpers/url';
import { street_types } from 'helpers/dictionaries';
import { reset } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { FormRow, FormColumn } from '@components/Form';

import { fetchRegions } from 'redux/regions';

import QueryFieldFilterForm from 'containers/forms/QueryFieldFilterForm';
import Pagination from 'components/CursorPagination';

import {
  getAllRegions,
  getDistricts,
  getSettlements,
  getStreets,
  getRegion,
  getDistrict,
  getSettlement,
} from 'reducers';

import { fetchStreets, fetchSettlements, fetchDistrictByRegion } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query: {
    region_id,
    district_id,
    settlement_id,
    starting_after,
    ending_before,
  } } }) => Promise.all([
    dispatch(fetchRegions()),
    region_id && dispatch(fetchDistrictByRegion(region_id)),
  ]).then(() => district_id && dispatch(fetchSettlements({ district_id, region_id })))
  .then(() => settlement_id && dispatch(fetchStreets({
    region_id,
    district_id,
    settlement_id,
    starting_after,
    ending_before,
  }))).catch(() => {}),
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
      location = [],
      paging = [],
      t,
      reset,
      selectedRegion,
      selectedDistrict,
      selectedSettlement,
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
              placeholder={t('Enter region')}
              onChange={({ region = {} }) => {
                reset('district-filter-form');
                reset('settlement-filter-form');
                return filterParams({ region_id: region.name }, this.props, true);
              }}
              initialValues={{
                region: selectedRegion && ({
                  name: selectedRegion.id,
                  title: selectedRegion.name,
                }),
              }}
              data={regions}
            />
          </FormColumn>
          <FormColumn>
            <QueryFieldFilterForm
              name="district"
              placeholder={t('Enter district')}
              disabled={districts.length === 0}
              form="district-filter-form"
              onChange={({ district }) => {
                reset('settlement-filter-form');
                console.log('district', district);
                district && filterParams({ district_id: district.name }, this.props);
              }}
              initialValues={{
                district: selectedDistrict && ({
                  name: selectedDistrict.id,
                  title: selectedDistrict.district,
                }),
              }}
              data={districts.map(i => ({ id: i.id, name: i.district }))}
            />
          </FormColumn>
          <FormColumn>
            <QueryFieldFilterForm
              name="settlement"
              form="settlement-filter-form"
              placeholder={t('Enter settlement')}
              disabled={settlements.length === 0}
              onChange={({ settlement }) =>
                settlement && filterParams({ settlement_id: settlement.name }, this.props)
              }
              initialValues={{
                settlement: selectedSettlement && ({
                  name: selectedSettlement.id,
                  title: selectedSettlement.name,
                }),
              }}
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
