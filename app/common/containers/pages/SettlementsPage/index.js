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
import Pagination from 'components/CursorPagination';
import YesNo from 'components/YesNo';
import { settlement_type } from 'helpers/dictionaries';

import { getSettlements, getAllRegions, getDistricts } from 'reducers';
import { fetchSettlements, fetchDistricts } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => Promise.all([
    dispatch(fetchSettlements({ region: query.region, district: query.district })),
    dispatch(fetchDistricts({ region: query.region })),
  ]),
})
@connect(
  state => ({
    ...state.pages.SettlementsPage,
    settlements: getSettlements(state, state.pages.SettlementsPage.settlements),
    regionsAll: getAllRegions(state),
    districtsFromRegion: getDistricts(state, state.pages.SettlementsPage.regionDistricts),
  }),
  { reset }
)
export default class SettlementsPage extends React.Component {
  state = {
    reset: true,
  };
  render() {
    const {
      settlements = [],
      regionsAll = [],
      districtsFromRegion = [],
      location,
      reset,
      paging,
      t,
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
              initialValues={location.query.region && ({
                region: {
                  name: regionsAll.filter(i => i.name === location.query.region)[0].id,
                  title: location.query.region,
                },
              })}
              onChange={({ region }) => {
                this.setState({ reset: false }, () => {
                  reset('district-filter-form');
                  filterParams({ region: region.title }, this.props, true);
                });
              }}
              data={regionsAll}
            />
          </FormColumn>
          <FormColumn>
            <QueryFieldFilterForm
              enableReinitialize
              name="district"
              placeholder={t('Enter district')}
              disabled={districtsFromRegion.length === 0}
              form="district-filter-form"
              onChange={({ district }) => {
                district && this.setState({ reset: true }, () => {
                  filterParams({ district: district.title }, this.props);
                });
              }}
              initialValues={this.state.reset && location.query.district && ({
                district: {
                  name: (districtsFromRegion.filter(i => i.name === location.query.district)[0]).id,
                  title: location.query.district,
                },
              })}
              data={districtsFromRegion.map(i => ({ id: i.id, name: i.name }))}
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
                        to={`/streets?settlement_id=${item.id}`}
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
                      to={`/settlements/${item.name}`}
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
            {
              <div className={styles.pagination}>
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
