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

  state = {
    selected: this.props.location.query.region ? this.props.location.query.region : '',
  };

  render() {
    const { districts = [], regions = [], t, location, paging } = this.props;

    return (
      <div id="districts-page">
        <Helmet title={t('Districts')} />
        <H1>{t(`Область ${this.state.selected ? this.state.selected : ''}`)}</H1>
        <FormRow>
          <FormColumn>
            <QueryFieldFilterForm
              name="region"
              form="region-filter-form"
              initialValues={location.query}
              onChange={(region) => {
                this.setState({
                  selected: region.region.title,
                });
                return filterParams({ region: region.region.title }, this.props);
              }}
              data={regions}
            />
          </FormColumn>
          <FormColumn />
        </FormRow>
        {
          <div>
            <div id="district-table" className={styles.table}>
              <Table
                columns={[
                  { key: 'district', title: t('district') },
                  { key: 'koatuu', title: t('koatuu') },
                  { key: 'region', title: t('region') },
                  { key: 'edit', title: t('Action') },
                ]}
                data={(districts || [])
                  .sort((a, b) => a.district.localeCompare(b.district))
                  .map(item => ({
                    district: (<div className={styles.name}>
                      <Button
                        id={`view-settlements-button-${item.district}`}
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
                      id={`edit-district-button-${item.district}`}
                      theme="link"
                      to={`/districts/${item.region}/${item.district}`}
                    >
                      { t('Edit') }
                    </Button>),
                  }))
                }
              />
            </div>
            <div className={styles.block}>
              <Button to="/regions/create">{t('Create new region')}</Button>
            </div>
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

        }
      </div>
    );
  }
}
