import Url from 'url';
import qs from 'qs';

export const createUrl = (endpoint, options) => {
  const url = Url.parse(endpoint, false);

  url.search = qs.stringify({
    ...qs.parse(url.search),
    ...options,
  });
  return Url.format(url);
};

export const filterParams = (filter, { router, location }, withClear = false) => {
  const { query: { page, ...query } } = location; // eslint-disable-line

  const newFilter = withClear ? filter : {
    ...query,
    ...filter,
  };

  const newQuery = Object.keys(newFilter).reduce((target, key) => {
    if (newFilter[key]) {
      target[key] = newFilter[key]; // eslint-disable-line
    }

    return target;
  }, {});

  router.push({
    ...location,
    query: newQuery,
  });
};
