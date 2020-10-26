import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxFormValidate } from 'react-nebo15-validate';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { Select } from '@components/Select';
import Button, { ButtonsGroup } from '@components/Button';
import FieldInput from '@components/reduxForm/FieldInput';
import Form, { FormColumn, FormRow, FormBlock, FormButtons } from '@components/Form';

import { street_types } from 'helpers/dictionaries';

const getValues = getFormValues('street-form');

@translate()
@reduxForm({
  form: 'street-form',
  validate: reduxFormValidate({
    name: {
      required: true,
    },
    type: {
      required: true,
    },
  }),
})
@connect(state => ({
  values: getValues(state),
}))
export default class SettlementForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, ...rest) {
    return this.props.onSubmit(values, ...rest).then(action => action);
  }

  getSubmitText() {
    const { submitting, dirty, t } = this.props;

    if (submitting) return t('Saving...');
    return dirty ? t('Update street') : t('Saved');
  }

  render() {
    const { handleSubmit, t, dirty } = this.props;
    const submitButtonText = this.getSubmitText();

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="name"
                component={FieldInput}
                labelText={t('street name')}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="type"
                labelText={t('Street type')}
                component={Select}
                placeholder={t('Show all streets')}
                options={Object.keys(street_types).map(id => ({
                  name: id,
                  title: street_types[id],
                }))}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormButtons>
          <ButtonsGroup>
            <Button type="submit" disabled={!dirty}>
              {submitButtonText}
            </Button>
          </ButtonsGroup>
        </FormButtons>
      </Form>
    );
  }
}
