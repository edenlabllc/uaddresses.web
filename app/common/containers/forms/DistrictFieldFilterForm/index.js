import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import { Select } from '@components/Select';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  form: 'district-filter-form',
})
export default class DistrictFieldFilterForm extends React.Component {
  state = {
    active: '',
  };

  render() {
    const { regions, t } = this.props;
    return (
      <form>
        <div>
          <Field
            searchable
            type="text"
            name="region"
            labelText={t('List of districts')}
            component={Select}
            emptyText={t('Not found')}
            placeholder={t('Choose region')}
            allowAddItem
            onChangeSearch={val => this.setState({ active: val })}
            options={
              regions
                .filter(i => new RegExp(this.state.active).test(i.name) === true)
                .map(i => ({
                  name: i.id,
                  title: i.name,
                }))
            }
          />
        </div>
      </form>
    );
  }
}
