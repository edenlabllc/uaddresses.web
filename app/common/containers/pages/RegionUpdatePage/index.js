import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Table from '@components/Table';
import Button from '@components/Button';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import RegionForm from 'containers/forms/RegionForm';

import { fetchRegions, updateRegion } from 'redux/regions';
import { getRegion, getDistricts } from 'reducers';

import { fetchDistricts } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { region } }) => Promise.all([
    dispatch(fetchRegions({ name: region })),
    dispatch(fetchDistricts({ region })),
  ]),
})
@connect((state, { params: { id } }) => ({
  ...state.pages.RegionUpdatePage,
  region: getRegion(state, id),
  districts: getDistricts(state, state.pages.RegionUpdatePage.districts),
}), { updateRegion })
@withStyles(styles)
@translate()
export default class RegionUpdatePage extends React.Component {
  render() {
    const { t, region, districts = [], updateRegion } = this.props;
    console.log(region, districts);

    return (
      <FormPageWrapper id="update-region-page" title={t('Edit region: {{name}}', { name: region.name })} back="/regions">
        <Helmet title={t('Edit region: {{name}}', { name: region.name })} />
        <div className={styles.block}>
          <RegionForm
            initialValues={region}
            onSubmit={values => updateRegion(region.id, values)}
            edit
          />
        </div>
        <div>
          <div id="district-table" className={styles.table}>
            <Table
              columns={[
                { key: 'name', title: t('name') },
                { key: 'koatuu', title: t('koatuu') },
              ]}
              data={(districts || [])
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(item => ({
                  name: (<div className={styles.name}>
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
                }))
              }
            />
          </div>
          <div className={styles.block}>
            <Button to={`/districts?region=${districts[0].region}`}>{t('Show all districts')}</Button>
          </div>
        </div>
      </FormPageWrapper>
    );
  }
}
