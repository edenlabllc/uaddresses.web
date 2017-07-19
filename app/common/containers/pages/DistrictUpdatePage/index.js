import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'withStyles';

import Table from '@components/Table';
import Button from '@components/Button';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import DistrictForm from 'containers/forms/DistrictForm';
import YesNo from 'components/YesNo';

import { getDistrict, getSettlements } from 'reducers';
import { updateDistrict } from 'redux/districts';

import { fetchDistricts, fetchSettlements } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { region, district } }) => Promise.all([
    dispatch(fetchDistricts({ region, name: district })),
    dispatch(fetchSettlements({ region, district })),
  ]),
})
@connect(state => ({
  district: getDistrict(state, state.pages.DistrictUpdatePage.district[0]),
  settlements: getSettlements(state, state.pages.DistrictUpdatePage.settlements),
}), { updateDistrict })
@withStyles(styles)
@translate()
export default class DistrictUpdatePage extends React.Component {
  render() {
    const { t, district = [], settlements = [], updateDistrict } = this.props;
    return (
      <FormPageWrapper id="update-district-page" title={t('Edit district: {{name}}', { name: district.name })} back="/districts">
        <Helmet title={t('Edit district: {{name}}', { name: district.name })} />
        <div className={styles.block}>
          <DistrictForm
            initialValues={district}
            onSubmit={values => updateDistrict(district.id, values)}
            edit
          />
        </div>
        <div id="settlements-table" className={styles.table}>
          <Table
            columns={[
              { key: 'settlements', title: t('settlements') },
              { key: 'type', title: t('type') },
              { key: 'koatuu', title: t('koatuu') },
              { key: 'mountain_group', title: t('mountain group') },
            ]}
            data={(settlements || [])
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(item => ({
                settlements: (<div className={styles.name}>
                  <name
                    id={`edit-settlements-button-${item.name}`}
                    theme="link"
                    color="red"
                    to={`/streets?settlement_name=${item.name}&settlement_id=${item.id}`}
                  >
                    {item.name}
                  </name>
                </div>),
                type: <div className={styles.name}>
                  {item.type}
                </div>,
                koatuu: <div className={styles.name}>
                  {item.koatuu}
                </div>,
                mountain_group: <div className={styles.name}>
                  <YesNo bool={item.mountain_group} />
                </div>,
              })
            )}
          />
        </div>
        <div className={styles.block}>
          <Button to={`/settlements?region=${this.props.params.region}&district=${this.props.params.district}`}>{t('Show all settlements')}</Button>
        </div>
      </FormPageWrapper>
    );
  }
}
