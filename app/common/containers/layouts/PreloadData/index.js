import React from 'react';
import { provideHooks } from 'redial';

import { fetchRegions } from 'redux/regions';

@provideHooks({
  fetch: ({ dispatch }) => Promise.all([
    dispatch(fetchRegions({}, { useCache: true })),
  ]),
})
export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return children;
  }
}
