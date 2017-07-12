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

import { getDistricts } from 'reducers';
import { fetchDistricts } from './redux';

import styles from './styles.scss';

const regions = [
  { name: 'ЗАПОРІЗЬКА', koatuu: '2300000000', id: '00eb9de4-508d-4219-bfc8-496238570dfd' },
  { name: 'АВТОНОМНА РЕСПУБЛІКА КРИМ', koatuu: '0100000000', id: 'b392aad2-988b-4452-851c-766d48fc94c6' },
  { name: 'ВІННИЦЬКА', koatuu: '0500000000', id: 'c4c0f907-8b60-483e-bbf6-dfb34ab91574' },
  { name: 'ДНІПРОПЕТРОВСЬКА', koatuu: '1200000000', id: '45311788-3735-4ccf-884c-409c089f3a45' },
  { name: 'ДОНЕЦЬКА', koatuu: '1400000000', id: '27b0197d-f470-4b2c-af27-4d82e953db9d' },
  { name: 'ЖИТОМИРСЬКА', koatuu: '1800000000', id: '0cbaccf9-77e2-48a4-94d3-ad3737140476' },
  { name: 'ЗАКАРПАТСЬКА', koatuu: '2100000000', id: '9ff97849-ea3b-449a-9a2d-f7de4c3e9559' },
  { name: 'ІВАНО-ФРАНКІВСЬКА', koatuu: '2600000000', id: '4fc7d2f2-c61a-4533-a1a9-62480c80e263' },
  { name: 'КИЇВСЬКА', koatuu: '3200000000', id: 'c0607c50-2dde-4c79-8ec9-696836a99a18' },
  { name: 'КІРОВОГРАДСЬКА', koatuu: '3500000000', id: 'bfc84d7a-6487-4ae4-93b6-026182ff1238' },
  { name: 'ЛУГАНСЬКА', koatuu: '4400000000', id: '616f1acc-7a4e-4d03-9a03-5ab3e372578f' },
  { name: 'ЛЬВІВСЬКА', koatuu: '4600000000', id: '1718a2a9-46cb-4f53-a3eb-2b341f7bb034' },
  { name: 'МИКОЛАЇВСЬКА', koatuu: '4800000000', id: '3f766fcd-8f57-49b1-8c63-0ecf6a1c73d7' },
  { name: 'ОДЕСЬКА', koatuu: '5100000000', id: 'b11b31ba-38d9-4a2c-818d-6a1a980998cf' },
  { name: 'ПОЛТАВСЬКА', koatuu: '5300000000', id: 'e73779f5-5336-4f14-8351-0938bb412571' },
  { name: 'РІВНЕНСЬКА', koatuu: '5600000000', id: '23a4fa72-d570-4f19-b8f3-89ac42341a47' },
  { name: 'СУМСЬКА', koatuu: '5900000000', id: '23b8090d-9efa-4431-b63a-3f45559eee2c' },
  { name: 'ТЕРНОПІЛЬСЬКА', koatuu: '6100000000', id: 'd19e3326-407e-4323-a5a3-e43f574d63cc' },
  { name: 'ХАРКІВСЬКА', koatuu: '6300000000', id: 'cfb02075-fab4-4fb1-9a1d-2de9bd3c698a' },
  { name: 'ХЕРСОНСЬКА', koatuu: '6500000000', id: '6f985e33-182f-4aa2-acfc-8bf34702bb85' },
  { name: 'ХМЕЛЬНИЦЬКА', koatuu: '6800000000', id: '39654298-c513-406c-ab27-4adde3921bb1' },
  { name: 'ЧЕРКАСЬКА', koatuu: '7100000000', id: 'c55239e7-8c73-425b-a0ef-70466a250581' },
  { name: 'ЧЕРНІВЕЦЬКА', koatuu: '7300000000', id: '785cb11c-7efb-4599-b613-e19c4c91b289' },
  { name: 'ЧЕРНІГІВСЬКА', koatuu: '7400000000', id: 'd5c669ff-0af8-4dd3-b683-b7d405b071b2' },
  { name: 'М.КИЇВ', koatuu: '8000000000', id: '1a0a5d1f-06fb-4c93-b9a5-e9eaadea664e' },
  { name: 'М.СЕВАСТОПОЛЬ', koatuu: '8500000000', id: '99310bc4-ac7c-4f1f-bc29-b3ae25bd96bc' },
];

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
  // regions: getRegions(state, state.pages.RegionsPage.regions),
}))
export default class DistrictsPage extends React.Component {
  render() {
    const { districts = [], t, location, paging } = this.props;

    return (
      <div id="districts-page">
        <Helmet title={t('Districts')} />
        <H1>{t(`Область ${location.query && location.query.region}`)}</H1>
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
              { key: 'district', title: t('district') },
              { key: 'koatuu', title: t('koatuu') },
              { key: 'region', title: t('region') },
              { key: 'edit', title: t('Action') },
            ]}
            data={districts.map(item => ({
              district: <div className={styles.name}>
                {item.district}
              </div>,
              koatuu: <div className={styles.name}>
                {item.koatuu}
              </div>,
              region: <div className={styles.name}>
                {item.region}
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
