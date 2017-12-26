import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import { reset } from 'redux-form';
import Helmet from 'react-helmet';
import { filterParams } from 'helpers/url';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { FormRow, FormColumn } from '@components/Form';

import QueryFieldFilterForm from 'containers/forms/QueryFieldFilterForm';
import Pagination from 'components/Pagination';
import YesNo from 'components/YesNo';
import { settlement_type } from 'helpers/dictionaries';

import { getSettlements, getAllRegions, getDistricts, getRegion, getDistrict } from 'reducers';
import { fetchSettlements, fetchDistrictByRegion } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({
    dispatch,
    getState,
    location: { query: { region_id, district_id, page } },
  }) =>
    (region_id ? dispatch(fetchDistrictByRegion(region_id)) : Promise.resolve())
    .then(() => {
      // TODO: replace when API will receive
      // district_id and region_id as query  params instead of names
      const state = getState();
      const district = district_id && getDistrict(state, district_id);
      const region = region_id && getRegion(state, region_id);
      return dispatch(fetchSettlements({
        district: district && district.district,
        region: region && region.name,
        page,
      }));
    }).catch(() => {}),
})
@connect(
  (state, { location: { query: { region_id, district_id } } }) => ({
    ...state.pages.SettlementsPage,
    settlements: getSettlements(state, state.pages.SettlementsPage.settlements),
    regions: getAllRegions(state),
    districts: getDistricts(state, state.pages.SettlementsPage.districts),
    selectedRegion: region_id && getRegion(state, region_id),
    selectedDistrict: district_id && getDistrict(state, district_id),
  }),
  { reset }
)
export default class SettlementsPage extends React.Component {
  render() {
    const {
      settlements = [],
      regions = [],
      districts = [],
      location,
      reset,
      paging,
      t,
      selectedRegion,
      selectedDistrict,
    } = this.props;

    return (
      <div id="settlements-page">
        <Helmet title={t('Settlements')} />
        <H1>{t('Settlements')}</H1>
        <FormRow>
          <FormColumn>
            <QueryFieldFilterForm
              name="region"
              form="region-filter-form"
              placeholder={t('Enter region')}
              initialValues={{
                region: selectedRegion && {
                  name: selectedRegion.id,
                  title: selectedRegion.name,
                },
              }}
              onChange={({ region }) => {
                setTimeout(() => {
                  filterParams({ region_id: region.name, district_id: '' }, this.props, true);
                  reset('district-filter-form');
                });
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
                setTimeout(() => {
                  filterParams({ district_id: district.name }, this.props);
                });
              }}
              initialValues={{
                district: selectedDistrict && {
                  name: selectedDistrict.id,
                  title: selectedDistrict.district,
                },
              }}
              data={districts.map(i => ({
                id: i.id,
                name: i.district,
              }))}
            />
          </FormColumn>
        </FormRow>
        {
          <div>
            <div id="settlements-table" className={styles.table}>
              <Table
                columns={[
                  { key: 'settlements', title: t('settlements name') },
                  { key: 'koatuu', title: t('koatuu') },
                  { key: 'type', title: t('type') },
                  { key: 'mountain_group', title: t('mountain group') },
                  { key: 'edit', title: t('Action') },
                ]}
                data={(settlements || [])
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(item => ({
                    settlements: (<div className={styles.name}>
                      <Button
                        id={`edit-settlements-button-${item.name}`}
                        theme="link"
                        color="red"
                        to={`/settlements/${item.id}`}
                      >
                        {item.name}
                      </Button>
                    </div>),
                    koatuu: <div className={styles.name}>
                      {item.koatuu}
                    </div>,
                    type: <div className={styles.name}>
                      {settlement_type[item.type]}
                    </div>,
                    mountain_group: <div className={styles.name}>
                      <YesNo bool={item.mountain_group} />
                    </div>,
                    edit: (<Button
                      id={`edit-settlements-button-${item.id}`}
                      theme="link"
                      to={`/settlements/${item.id}`}
                    >
                      { t('Edit') }
                    </Button>),
                  })
                )}
              />
            </div>
            {
              false && <div className={styles.block}>
                <Button to="/regions/create">{t('Create new settlements')}</Button>
              </div>
            }
            <Pagination
              currentPage={paging.page_number}
              totalPages={paging.total_pages}
              location={location}
            />
          </div>
        }
      </div>
    );
  }
}
