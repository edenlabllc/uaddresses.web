import React from 'react';
import { translate } from 'react-i18next';
import { reduxForm, submit, change, Field } from 'redux-form';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import FieldInput from '@components/reduxForm/FieldInput';

import Button from 'components/Button';
import { street_types } from 'helpers/dictionaries';
import SearchField from '../SearchField';
import SearchSettlementsField from '../SearchSettlementsField';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm()
export default class StreetsSearchForm extends React.Component {
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
                  dispatch(change(form, 'settlement_id', null));
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
              onChange={() => setTimeout(() => {
                dispatch(change(form, 'settlement_id', null));
                return dispatch(submit(form));
              })}
            />
          </div>
          <div className={styles.header}>
            <SearchSettlementsField
              name="settlement_id"
              placeholder={t('Enter settlement')}
              location={location}
              data={[]}
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
                placeholder={t('Street type')}
                location={location}
                data={Object.keys(street_types).map(id => ({
                  name: id,
                  title: street_types[id],
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
                placeholder={t('Enter street name')}
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
