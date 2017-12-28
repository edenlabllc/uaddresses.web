import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import SettlementForm from 'containers/forms/SettlementForm';

import Button from '@components/Button';

import { getSettlement } from 'reducers';
import { updateSettlement, fetchSettlementById } from 'redux/settlements';
import { settlement_type } from 'helpers/dictionaries';

import styles from './styles.scss';

@translate()
@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) =>
    dispatch(fetchSettlementById(id)),
})
@connect((state, { params: { id } }) => ({
  settlement: getSettlement(state, id),
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
        <Helmet title={t('Edit settlement')} />
        <div className={styles.block}>
          <SettlementForm
            initialValues={{
              ...settlement,
              type: {
                name: Object.keys(settlement_type).filter(i =>
                  i === settlement.type),
                title: Object.values(settlement_type).filter(i =>
                  settlement_type[settlement.type] === i),
              },
            }}
            onSubmit={values => updateSettlement(settlement.id, values)}
            edit
          />
        </div>
        <div className={styles.block}>
          <Button to={`/streets?settlement_id=${settlement.id}&district_id=${settlement.district_id}&region_id=${settlement.region_id}`}>{t('Show all streets')}</Button>
        </div>
      </FormPageWrapper>
    );
  }
}
