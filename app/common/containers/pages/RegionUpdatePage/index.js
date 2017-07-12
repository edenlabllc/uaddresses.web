import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import RegionForm from 'containers/forms/RegionForm';
import { getRegion } from 'reducers';
import { fetchRegionByID, updateRegion } from 'redux/regions';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => Promise.all([
    dispatch(fetchRegionByID(id)),
  ]),
})
@connect((state, { params: { id } }) => ({
  ...state.pages.RegionUpdatePage,
  region: getRegion(state, id),
}), { updateRegion })
@withStyles(styles)
@translate()
export default class RegionUpdatePage extends React.Component {
  render() {
    const { t, region, updateRegion } = this.props;

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
      </FormPageWrapper>
    );
  }
}
