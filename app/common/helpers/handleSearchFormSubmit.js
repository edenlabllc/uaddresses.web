import { filterParams } from 'helpers/url';

export const handleSearchFormSubmit = (data, navigation) => {
  const result = Object.keys(data).reduce((summary, key) => {
    const value = data[key];

    if (!value || typeof value === 'string') return { ...summary, [key]: value };
    return { ...summary, [key]: value.name };
  }, {});

  return filterParams(result, navigation);
};
