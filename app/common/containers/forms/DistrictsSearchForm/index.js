import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, submit, Field } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FieldInput from '@components/reduxForm/FieldInput';

import Button from 'components/Button';
import SearchField from '../SearchField';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm()
export default class DistrictsSearchForm extends React.Component {
  render() {
    const { t, form, dispatch, regions, location, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.main}>
            <SearchField
              name="region_id"
              placeholder={t('Enter region')}
              location={location}
              data={regions.map(i => ({
                name: i.id,
                title: i.name,
              }))}
              form={form}
              dispatch={dispatch}
              onChange={() => setTimeout(() => dispatch(submit(form)))}
            />
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.main}>
            <Field
              name="name"
              type="text"
              component={FieldInput}
              placeholder={t('Enter district name')}
            />
          </div>
          <div className={styles.secondary}>
            <Field
              name="koatuu"
              type="text"
              component={FieldInput}
              placeholder={t('Enter koatuu')}
            />
          </div>
          <div>
            <Button />
          </div>
        </div>
      </form>
    );
  }
}
