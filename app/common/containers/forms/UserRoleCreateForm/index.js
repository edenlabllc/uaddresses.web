import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';

import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import Button from '@components/Button';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';
import { Select } from '@components/Select';

import styles from './styles.scss';

const getValues = getFormValues('user-role-form');


@translate()
@withStyles(styles)
@reduxForm({
  form: 'user-role-form',
  validate: reduxFormValidate({
    role_id: {
      required: true,
    },
    client_id: {
      required: true,
    },
  }),
})
@connect(state => ({
  values: getValues(state),
}))
export default class UserRoleCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      savedValues: props.initialValues,
      onDelete: false,
    };
  }
  onSubmit(values) {
    return this.props.onSubmit(this.props.id, values).then((action) => {
      if (action.error) return action;
      this.setState({
        savedValues: values,
      });
      return action;
    });
  }
  get isChanged() {
    const { values = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.savedValues);
  }
  render() {
    const { handleSubmit, submitting, t, data } = this.props;
    const is_changed = this.isChanged;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                labelText={t('Role id')}
                name="role_id"
                component={Select}
                options={data.roles.map(i => ({
                  name: i.id,
                  title: i.name,
                }))}
              />
            </FormColumn>
            <FormColumn>
              <Field
                labelText={t('Client id')}
                name="client_id"
                component={Select}
                options={data.clients.map(i => ({
                  name: i.id,
                  title: i.name,
                }))}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormButtons>
          <Button type="submit" disabled={!is_changed}>
            { submitting ? t('Saving...') : t('Create User Role') }
          </Button>
        </FormButtons>
        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
      </Form>
    );
  }
}

