import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';

import FieldInput from '@components/reduxForm/FieldInput';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@reduxForm({
  enableReinitialize: true,
})
export default class FieldFilterForm extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      t,
      name,
      submitBtn,
      label,
      placeholder,
      disabled,
    } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            name={name}
            type="text"
            component={FieldInput}
            labelText={label}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
        {
          submitBtn && (
            <div>
              <button className={styles.button} disabled={disabled || submitting} type="submit">
                { t('Search') }
              </button>
            </div>
          )
        }
      </form>
    );
  }
}
