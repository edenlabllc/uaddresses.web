import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';

import { getRegions } from 'reducers';
import { fetchRegions } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchRegions(query)),
})
@connect(state => ({
  ...state.pages.RegionsPage,
  regions: getRegions(state, state.pages.RegionsPage.regions),
}))
export default class RegionsPage extends React.Component {
  render() {
    const { regions = [], t } = this.props;

    return (
      <div id="regions-page">
        <Helmet title={t('Regions')} />
        <H1>{ t('Regions') }</H1>
        <div id="regions-table" className={styles.table}>
          <Table
            columns={[
              { key: 'name', title: t('Regions name') },
              { key: 'koatuu', title: t('Koatuu') },
              { key: 'edit', title: t('Action') },
            ]}
            data={(regions || [])
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(item => ({
                ...item,
                name: (<div className={styles.name}>
                  <Button
                    id={`edit-regions-button-${item.id}`}
                    theme="link"
                    color="red"
                    to={`/regions/${item.id}`}
                  >
                    {item.name}
                  </Button>
                </div>),
                edit: (<Button
                  id={`edit-region-button-${item.id}`}
                  theme="link"
                  to={`/regions/${item.id}`}
                >
                  { t('Edit') }
                </Button>),
              }))
            }
          />
        </div>
        {
          false && <div className={styles.block}>
            <Button to="/regions/create">{t('Create new region')}</Button>
          </div>
        }
      </div>
    );
  }
}
