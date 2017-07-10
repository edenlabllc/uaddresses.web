import React from 'react';
import { translate } from 'react-i18next';
import { CheckboxGroup } from '@components/reduxForm/FieldCheckboxGroup';

export default translate()(({ name = 'scope', t }) => (
  <CheckboxGroup
    name={name}
    options={[
      { label: t('app:authorize'), value: 'app:authorize' },
      { label: t('some_api:read'), value: 'some_api:read' },
      { label: t('some_api:write'), value: 'some_api:write' },
      { label: t('legal_entity:read'), value: 'legal_entity:read' },
      { label: t('legal_entity:write'), value: 'legal_entity:write' },
      { label: t('employee_request:write'), value: 'employee_request:write' },
    ]}
    format={value => value.split(' ')}
    normalize={value => value.join(' ')}
  />
));
