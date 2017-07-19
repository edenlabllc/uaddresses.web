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
              form="district-filter-form"
              initialValues={location.query.region && ({
                region: {
                  name: regions.filter(i => i.name === location.query.region)[0].id,
                  title: location.query.region,
                },
              })}
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
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="name"
              form="districts_name_form"
              initialValues={location.query}
              onSubmit={({ name }) => filterParams({ name }, this.props)}
              submitBtn
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="koatuu"
              form="districts_koatuu_form"
              initialValues={location.query}
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
                        id={`view-settlements-button-${item.name}`}
                        theme="link"
                        color="red"
                        to={`/settlements?region=${item.region}&district=${item.name}`}
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
                      to={`/districts/${item.region}/${item.name}`}
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
