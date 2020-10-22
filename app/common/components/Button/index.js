import React from 'react';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

@withStyles(styles)
@translate()
export default class Button extends React.Component {
  render() {
    const { t, title } = this.props;

    return (
      <button className={styles.button} type="submit">
        {title || t('Search')}
      </button>
    );
  }
}
