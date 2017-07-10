import React from 'react';
import { provideHooks } from 'redial';

import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Icon from '@components/Icon';
import Aside from 'containers/blocks/Aside';

import { fetchUsersList } from 'redux/users';
import { fetchRoles } from 'redux/roles';
import { fetchClientsTypes } from 'redux/client-types';
import { fetchClients } from 'redux/clients';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch }) => Promise.all([
    dispatch(fetchClients({}, { useCache: true })),
    dispatch(fetchRoles({}, { useCache: true })),
    dispatch(fetchUsersList({}, { useCache: true })),
    dispatch(fetchClientsTypes({}, { useCache: true })),
  ]),
})
export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.main}>
        <main>
          <Aside />
          <div className={styles.content}>
            { children }
          </div>
        </main>
        <footer className={styles.footer}>
          <a href="http://nebo15.com" rel="noopener noreferrer" target="_blank">
            <Icon name="nebo15" />
          </a>
        </footer>
      </div>
    );
  }
}
