import React from 'react';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Aside from 'containers/blocks/Aside';

import styles from './styles.scss';

@translate()
@withStyles(styles)
export default class App extends React.Component {
  render() {
    const { children, t } = this.props;
    return (
      <div className={styles.main}>
        <main>
          <Aside />
          <div className={styles.content}>
            { children }
          </div>
        </main>
        <footer className={styles.footer}>
          &copy; {new Date().getFullYear()} {t('All rights reserved')}
        </footer>
      </div>
    );
  }
}
