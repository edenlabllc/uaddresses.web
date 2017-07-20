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
  const newFilter = withClear ? { ...filter } : {
    ...location.query,
    ...filter,
  };

  const query = Object.keys(newFilter).reduce((target, key) => {
    if (newFilter[key]) {
      target[key] = newFilter[key]; // eslint-disable-line
    }

    return target;
  }, { });

  router.push({
    ...location,
    query,
  });
};
