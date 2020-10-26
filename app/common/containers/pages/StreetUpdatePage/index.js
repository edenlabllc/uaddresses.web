import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import StreetForm from 'containers/forms/StreetForm';

import { getStreet } from 'reducers';
import { updateStreet, fetchStreetByID } from 'redux/streets';
import { street_types } from 'helpers/dictionaries';

@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) =>
    dispatch(fetchStreetByID(id)),
})
@connect((state, { params: { id } }) => ({
  street: getStreet(state, id),
}), { updateStreet })
export default class StreetUpdatePage extends React.Component {
  render() {
    const { t, street, updateStreet } = this.props;
    return (
      <FormPageWrapper
        id="update-street-page"
        title={t('Edit street')}
        back="/streets"
      >
        <Helmet title={t('Edit street')} />
        <StreetForm
          initialValues={{
            name: street.name,
            type: {
              name: Object.keys(street_types).find(i =>
                i === street.type),
              title: Object.values(street_types).find(i =>
                street_types[street.type] === i),
            },
          }}
          onSubmit={({ type, ...rest }) => {
            const data = {
              ...rest,
              type: type.name,
            };

            return updateStreet(street.id, data);
          }}
          edit
        />
      </FormPageWrapper>
    );
  }
}
