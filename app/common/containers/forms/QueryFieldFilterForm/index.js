import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import { Select } from '@components/Select';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm()
export default class QueryFieldFilterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      active: '',
    };
  }
  render() {
    const { data, name, disabled, t } = this.props;
    return (
      <form>
        <div>
          <Field
            // searchable
            allowAddItem
            disabled={disabled}
            type="text"
            name={name}
            component={Select}
            emptyText={t('Not found')}
            placeholder={t('Choose {{name}}', { name: t(name) })}
            onChangeSearch={val => this.setState({ active: val })}
            options={
              data
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
