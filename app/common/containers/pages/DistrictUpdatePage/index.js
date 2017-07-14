import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import DistrictForm from 'containers/forms/DistrictForm';
import { getDistrict } from 'reducers';
import { updateDistrict } from 'redux/districts';
import { fetchDistricts } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { region, district } }) => {
    console.log(district);
    return dispatch(fetchDistricts({ region, district }));
  },
})
@connect((state, { params: { id } }) => ({
  ...state.pages.DistrictsPage,
  district: getDistrict(state, id),
}), { updateDistrict })
@withStyles(styles)
@translate()
export default class DistrictUpdatePage extends React.Component {
  render() {
    const { t, district, updateDistrict } = this.props;
    console.log('district', district);

    return (
      <FormPageWrapper id="update-region-page" title={t('Edit district: {{name}}', { name: district.name })} back="/districts">
        <Helmet title={t('Edit district: {{name}}', { name: district.name })} />
        <div className={styles.block}>
          <DistrictForm
            initialValues={district}
            onSubmit={values => updateDistrict(district.id, values)}
            edit
          />
        </div>
      </FormPageWrapper>
    );
  }
}
