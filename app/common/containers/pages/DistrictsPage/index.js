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
// import Pagination from 'components/CursorPagination';

import { getAllDistricts } from 'reducers';
import { fetchDistrictsList } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchDistrictsList(query)),
})
@connect(state => ({
  ...state.pages.DistrictsPage,
  districts: getAllDistricts(state, state.pages.DistrictsPage.districts),
}))
export default class DistrictsPage extends React.Component {
  render() {
    const { districts = [], t, location } = this.props;

    return (
      <div id="districts-page">
        <Helmet title={t('Districts')} />
        <H1>{ t('Regions') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="region"
              form="districts_region_form"
              initialValues={location.query}
              submitBtn
              onSubmit={region => filterParams(region, this.props)}
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="district"
              form="districts_district_form"
              initialValues={location.query}
              submitBtn
              onSubmit={district => filterParams(district, this.props)}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="region_id"
              form="districts_region_id_form"
              initialValues={location.query}
              submitBtn
              onSubmit={region_id => filterParams(region_id, this.props)}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        <div id="district-table" className={styles.table}>
          <Table
            columns={[
              { key: 'region', title: t('region') },
              { key: 'district', title: t('district') },
              { key: 'region_id', title: t('region_id') },
              { key: 'edit', title: t('Action') },
            ]}
            data={districts.map(item => ({
              region: <div className={styles.name}>
                {item.region}
              </div>,
              district: <div className={styles.name}>
                {item.district}
              </div>,
              region_id: <div className={styles.name}>
                {item.region_id}
              </div>,
              edit: (<Button
                id={`edit-district-button-${item.id}`}
                theme="link"
                to={`/district/${item.district}`}
              >
                { t('Show district detail') }
              </Button>),
            }))}
          />
        </div>
        {/* <div className={styles.block}>
            <Button to="/regions/create">{t('Create new region')}</Button>
          </div>*/
        }

        {/* <div className={styles.pagination}>
          <Pagination
            location={location}
            more={paging.has_more}
            after={paging.cursors.starting_after}
            before={paging.cursors.ending_before}
          />
        </div> */}
      </div>
    );
  }
}
