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
import QueryFieldFilterForm from 'containers/forms/QueryFieldFilterForm';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import Pagination from 'components/Pagination';

import { getDistricts, getAllRegions, getRegion } from 'reducers';
import { fetchDistricts } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query: { name, koatuu, region_id, page } } }) =>
    dispatch(fetchDistricts({ name, koatuu, region_id, page })),
})
@connect((state, { location: { query: { region_id } } }) => ({
  ...state.pages.DistrictsPage,
  districts: getDistricts(state, state.pages.DistrictsPage.districts),
  regions: getAllRegions(state),
  selectedRegion: region_id && getRegion(state, region_id),
}))
export default class DistrictsPage extends React.Component {

  render() {
    const {
      districts = [],
      regions = [],
      selectedRegion,
      location: { query },
      t,
      paging,
    } = this.props;

    return (
      <div id="districts-page">
        <Helmet title={t('Districts')} />
        <H1>{t('Districts')}</H1>
        <FormRow>
          <FormColumn>
            <QueryFieldFilterForm
              name="region"
              placeholder={t('Enter region')}
              form="district-filter-form"
              initialValues={{
                region: selectedRegion && {
                  name: selectedRegion.id,
                  title: selectedRegion.name,
                },
              }}
              onChange={({ region }) => setTimeout(() => {
                filterParams({ region_id: region.name }, this.props);
              })}
              data={regions}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="name"
              form="districts_name_form"
              placeholder={t('Enter district name')}
              initialValues={{ name: query.name }}
              onSubmit={({ name }) => filterParams({ name }, this.props)}
              submitBtn
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="koatuu"
              form="districts_koatuu_form"
              placeholder={t('Enter koatuu')}
              initialValues={{ koatuu: query.koatuu }}
              onSubmit={({ koatuu }) => filterParams({ koatuu }, this.props)}
              submitBtn
            />
          </FormColumn>
        </FormRow>
        {
          <div>
            <div id="district-table" className={styles.table}>
              <Table
                columns={[
                  { key: 'districts', title: t('districts name') },
                  { key: 'koatuu', title: t('koatuu') },
                  { key: 'region', title: t('region') },
                  { key: 'edit', title: t('Action') },
                ]}
                data={(districts || [])
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(item => ({
                    districts: (<div className={styles.name}>
                      <Button
                        id={`view-district-button-${item.name}`}
                        theme="link"
                        color="red"
                        to={`/districts/${item.id}`}
                      >
                        {item.name}
                      </Button>
                    </div>),
                    koatuu: <div className={styles.name}>
                      {item.koatuu}
                    </div>,
                    region: <div className={styles.name}>
                      {item.region}
                    </div>,
                    edit: (<Button
                      id={`edit-district-button-${item.name}`}
                      theme="link"
                      to={`/districts/${item.id}`}
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
                  <Button to="/regions/create">{t('Create new disrict')}</Button>
                </div>
              )
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
