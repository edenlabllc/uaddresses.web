import React from 'react';
import { connect } from 'react-redux';
import { Field, change, reset } from 'redux-form';
import { translate } from 'react-i18next';
import { Select } from '@components/Select';
import { debounce } from 'lodash';

import { getSettlements } from 'reducers';
import { getSettlementInfo } from 'helpers/getSettlementInfo';
import { fetchSettlementsSearch } from 'containers/pages/StreetsPage/redux';

@translate()
@connect(
  state => ({
    ...state.pages.StreetsPage,
    settlements: getSettlements(state, state.pages.StreetsPage.settlements),
  }),
  { reset }
)
export default class SearchSettlementsField extends React.Component {
  onSearch(value, props) {
    const { dispatch, location, name, form, onChange } = props;
    const { district_id, region_id } = location.query;

    if (!value && location.query[name]) {
      dispatch(change(form, name, ''));
      onChange();
    } else {
      dispatch(fetchSettlementsSearch({ name: value, district_id, region_id }));
    }
  }

  render() {
    const {
      t,
      name,
      disabled,
      onChange,
      placeholder,
      searchable = true,
    } = this.props;

    return (
      <Field
        disabled={disabled}
        searchable={searchable}
        type="text"
        name={name}
        format={(value) => {
          if (value && value.title) {
            const { title = '' } = value;
            return {
              ...value,
              title: title.replace(/ \(.+?\)/g, ''),
            };
          }
          return {};
        }}
        component={Select}
        emptyText={t('Not found')}
        placeholder={placeholder}
        onChangeSearch={debounce(
          value => this.onSearch(value, this.props),
          500
        )}
        onChange={() => {
          this.onSearch('', this.props);
          onChange();
        }}
        options={this.props.settlements.map((item) => {
          const settlementInfo = getSettlementInfo(item);
          return {
            name: item.id,
            title: `${settlementInfo}`,
          };
        })}
      />
    );
  }
}
