import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, submit, change, Field } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FieldInput from '@components/reduxForm/FieldInput';

import Button from 'components/Button';
import { settlement_type } from 'helpers/dictionaries';
import SearchField from '../SearchField';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm()
export default class SettlementsSearchForm extends React.Component {
  render() {
    const {
      t,
      form,
      dispatch,
      regions,
      districts,
      location,
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.header}>
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
              onChange={() =>
                setTimeout(() => {
                  dispatch(change(form, 'district_id', null));
                  return dispatch(submit(form));
                })
              }
            />
          </div>
          <div className={styles.header}>
            <SearchField
              name="district_id"
              placeholder={t('Enter district')}
              disabled={!districts.length}
              location={location}
              data={districts.map(i => ({
                name: i.id,
                title: i.district,
              }))}
              form={form}
              dispatch={dispatch}
              onChange={() => setTimeout(() => dispatch(submit(form)))}
            />
          </div>
        </div>
        <div className={styles.delimiter} />
        <div className={styles.container}>
          <div className={styles.footer}>
            <div className={styles['item-select']}>
              <SearchField
                searchable={false}
                name="type"
                placeholder={t('settlement type')}
                location={location}
                data={Object.keys(settlement_type).map(id => ({
                  name: id,
                  title: settlement_type[id],
                }))}
                form={form}
                dispatch={dispatch}
                onChange={() => setTimeout(() => dispatch(submit(form)))}
              />
            </div>
            <div className={styles.item}>
              <Field
                name="name"
                type="text"
                component={FieldInput}
                placeholder={t('Enter settlement name')}
              />
            </div>
            <div className={styles.item}>
              <Field
                name="koatuu"
                type="text"
                component={FieldInput}
                placeholder={t('Enter koatuu')}
              />
            </div>
          </div>
          <div>
            <Button />
          </div>
        </div>
      </form>
    );
  }
}
