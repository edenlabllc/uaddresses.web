import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import Nav from 'containers/blocks/Nav';
import Gamburger from 'containers/blocks/Gamburger';

import { toggleMenu } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => state.blocks.Aside, { toggleMenu })
export default class Aside extends React.Component {

  render() {
    const { active, toggleMenu, t } = this.props;
    return (
      <aside className={styles.aside}>
        { /* eslint-disable jsx-a11y/anchor-has-content */ }
        <Link className={styles.logo} to="/">{t('UAddresses')}</Link>
        <hr className={styles.line} />

        <Nav isOpen={active} />

        <div className={styles['menu-control']}>
          <Gamburger isOpen={active} onToggle={toggleMenu} />
        </div>
      </aside>
    );
  }
}
