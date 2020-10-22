/* eslint-disable */
import React from 'react';
import { isEqual } from 'lodash';
import { Field, change } from 'redux-form';
import { translate } from 'react-i18next';
import { Select } from '@components/Select';

@translate()
export default class SearchField extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { data } = this.props;
    if (Array.isArray(data) && data.length) {
      this.setState({ data });
    }
  }

  componentDidUpdate(prevProps) {
    if (isEqual(prevProps.data, this.props.data)) return null;

    const { data } = this.props;
    this.setState({ data });
  }

  onSearch(value) {
    const { data, form, name, location, onChange, dispatch } = this.props;

    if (!value && location.query[name]) {
      dispatch(change(form, name, ''));
      onChange();
    }

    const result = data.filter(i =>
      i.title.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({ data: result });
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
        component={Select}
        emptyText={t('Not found')}
        placeholder={placeholder}
        onChangeSearch={v => this.onSearch(v)}
        onChange={() => {
          this.onSearch('');
          onChange();
        }}
        options={this.state.data}
      />
    );
  }
}
