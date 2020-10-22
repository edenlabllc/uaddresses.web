export const sortData = (data = [], key = 'name') =>
  data.sort((a, b) => a[key].localeCompare(b[key]));
