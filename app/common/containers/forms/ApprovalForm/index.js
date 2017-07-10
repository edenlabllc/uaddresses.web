import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';
import FieldInput from '@components/reduxForm/FieldInput';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import Button, { ButtonsGroup } from '@components/Button';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';
import { Select } from '@components/Select';

import styles from './styles.scss';

const getValues = getFormValues('approval-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'approval-form',
  validate: reduxFormValidate({
    scope: {
      required: true,
    },
    user_id: {
      required: true,
    },
    client_id: {
      required: true,
    },
  }),
  initialValues: {
    scope: '',
  },
})
@connect(state => ({
  values: getValues(state),
}))
export default class ApprovalForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      savedValues: props.initialValues,
      onDelete: false,
    };
  }
  onSubmit(values, ...args) {
    this.setState({
      savedValues: values,
    });

    return this.props.onSubmit(values, ...args).then((action) => {
      if (action.error) return action;
      return action;
    });
  }
  onDelete() {
    return this.props.onDelete(this.state.savedValues.id);
  }
  get isChanged() {
    const { values = [] } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.savedValues);
  }
  render() {
    const { handleSubmit, submitting, onDelete, edit, t, data } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="user_id"
                labelText={t('User ID')}
                component={Select}
                options={data.users.map(i => ({
                  name: i.id,
                  title: i.email,
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
          <FormRow>
            <FormColumn>
              <Field
                name="scope"
                component={FieldInput}
                labelText={t('Enter scopes')}
                placeholder="some_api:write some_api:read"
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormButtons>
          {
            edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Update Role') : t('Saved'))
              }</Button>
              <Button color="red" onClick={() => this.setState({ onDelete: true })}>{submitting ? t('Deleting...') : t('Delete Role')
              }</Button>
            </ButtonsGroup>)
          }
          {
            !edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Save New Role') : t('Saved'))
              }</Button>
            </ButtonsGroup>)
          }
        </FormButtons>
        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
        <Confirm
          title={t('Are you sure?')}
          active={this.state.onDelete}
          theme="error"
          confirm="Ok"
          id="confirm-delete"
          onCancel={() => this.setState({ onDelete: false })}
          onConfirm={() => onDelete(this.state.savedValues.id)}
        >{ t('Are you sure want to delete this role?') }</Confirm>
      </Form>
    );
  }
}

