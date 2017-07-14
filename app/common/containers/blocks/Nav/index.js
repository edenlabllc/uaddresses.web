import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from '@components/NavItem';
import Icon from '@components/Icon';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  location: state.routing,
}))
export default class Nav extends React.Component {
  componentWillReceiveProps(props) {
    if (props.isOpen) {
      document.documentElement.classList.add(styles.navIsOpen);
    } else {
      document.documentElement.classList.remove(styles.navIsOpen);
    }
  }
  render() {
    const { isOpen, t } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="regions" activeClassName={styles.active}>
            <Link id="regions-nav" to="/regions">{ t('Regions') }</Link>
          </NavItem>
          <NavItem to="districts" activeClassName={styles.active}>
            <Link id="districts-nav" to="/districts">{ t('Districts') }</Link>
          </NavItem>
          <NavItem to="settlements" activeClassName={styles.active}>
            <Link id="settlements-nav" to="/settlements">{ t('Settlements') }</Link>
          </NavItem>
        </ul>
        <ul className={styles.down}>
          <li>
            <a href="http://docs.uaddresses1.apiary.io" rel="noopener noreferrer" target="_blank">
              <Icon name="doc" />
              { t('Documentation') }
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
