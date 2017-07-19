import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import SettlementForm from 'containers/forms/SettlementForm';

import { getSettlement } from 'reducers';
import { updateSettlement } from 'redux/settlements';

import { fetchSettlement } from './redux';

import styles from './styles.scss';

// const street_types = {
//   STREET: 'вулиця',
//   SQUARE: 'площа',
//   RIVER_SIDE: 'набережна',
//   PASS: 'провулок',
//   MICRODISTRICT: 'мікрорайон',
//   MAIDAN: 'майдан',
//   HIGHWAY: 'шосе',
//   BOULEVARD: 'бульвар',
//   BLIND_STREET: 'тупик',
//   AVENUE: 'проспект',
//   ASCENT: 'узвіз',
// };

const settlement_type = {
  VILLAGE: 'село',
  TOWNSHIP: 'селище міського типу',
  SETTLEMENT: 'селище',
  CITY: 'місто',
};

@translate()
@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { name } }) =>
    dispatch(fetchSettlement({ name })),
})
@connect(state => ({
  settlement: getSettlement(state, state.pages.SettlementUpdatePage.settlement[0]),
}), { updateSettlement })
export default class SettlementUpdatePage extends React.Component {
  render() {
    const { t, settlement, updateSettlement } = this.props;
    return (
      <FormPageWrapper
        id="update-settlement-page"
        title={t('Edit settlement')}
        back="/settlements"
      >
        <Helmet title={t('Edit settlement: {{name}}', { name: settlement.name })} />
        <div className={styles.block}>
          <SettlementForm
            initialValues={{
              ...settlement,
              type: {
                name: Object.keys(settlement_type).filter(i =>
                  settlement_type[i] === settlement.type),
                title: Object.values(settlement_type).filter(i =>
                  settlement_type[settlement.type] === i),
              },
            }}
            onSubmit={values => updateSettlement(settlement.id, values)}
            edit
          />
        </div>
      </FormPageWrapper>
    );
  }
}
