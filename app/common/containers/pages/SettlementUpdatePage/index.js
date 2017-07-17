import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import DistrictForm from 'containers/forms/DistrictForm';

import { getSettlement } from 'reducers';
import { updateSettlement } from 'redux/settlements';

import { fetchDistricts } from './redux';

import styles from './styles.scss';

@translate()
@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { region, id } }) => {
    console.log(region, id);
    return dispatch(fetchDistricts({ region, id }));
  },
})
@connect(state => ({
  settlement: getSettlement(state, state.pages.SettlementUpdatePage.settlement[0]),
}), { updateSettlement })
export default class SettlementUpdatePage extends React.Component {
  render() {
    const { t, settlement, updateSettlement } = this.props;
    return (
      <FormPageWrapper id="update-settlement-page" title={t('Edit settlement: {{name}}', { name: settlement.name })} back="/settlements">
        <Helmet title={t('Edit settlement: {{name}}', { name: settlement.name })} />
        <div className={styles.block}>
          {
            false && <DistrictForm
              initialValues={settlement}
              onSubmit={values => updateSettlement(settlement.id, values)}
              edit
            />
          }
        </div>
      </FormPageWrapper>
    );
  }
}
