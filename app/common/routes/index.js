import React from 'react';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';
import PreloadData from 'containers/layouts/PreloadData';

import RegionsPage from 'containers/pages/RegionsPage';
import RegionUpdatePage from 'containers/pages/RegionUpdatePage';

import DistrictsPage from 'containers/pages/DistrictsPage';
import DistrictUpdatePage from 'containers/pages/DistrictUpdatePage';

import SettlementsPage from 'containers/pages/SettlementsPage';
import SettlementUpdatePage from 'containers/pages/SettlementUpdatePage';

import StreetsPage from 'containers/pages/StreetsPage';

import SignInPage from 'containers/pages/SignInPage';
import NotFoundPage from 'containers/pages/NotFoundPage';

import { getOAuthUser } from 'reducers';
import { fetchRegions } from 'redux/regions';
import { isLoginned, logout } from 'redux/session';

import { PUBLIC_INDEX_ROUTE } from 'config';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  const requireAuth = (nextState, replace, next) =>
    store.dispatch(isLoginned()).then((loginned) => {
      if (!loginned) {
        replace({ pathname: PUBLIC_INDEX_ROUTE });
        return next();
      }

      const currentState = store.getState();
      const person = getOAuthUser(currentState);

      if (person) return next();

      return store.dispatch(fetchRegions({ page_size: 0 })).then((action) => {
        if (action.error) {
          store.dispatch(logout());
          replace({ pathname: PUBLIC_INDEX_ROUTE });
        }

        return next();
      });
    });

  return (
    <Route component={App}>
      <Route component={Main} onEnter={requireAuth}>
        <Route path="/" component={PreloadData}>
          <IndexRedirect to="regions" />
          <Route path="regions">
            <IndexRoute component={RegionsPage} />
            <Route path=":id" component={RegionUpdatePage} />
          </Route>
          <Route path="districts">
            <IndexRoute component={DistrictsPage} />
            <Route path=":id" component={DistrictUpdatePage} />
          </Route>
          <Route path="settlements">
            <IndexRoute component={SettlementsPage} />
            <Route path=":id" component={SettlementUpdatePage} />
          </Route>
          <Route path="streets">
            <IndexRoute component={StreetsPage} />
          </Route>
        </Route>
      </Route>
      <Route path="sign-in" component={SignInPage} />
      <Route component={Main}>
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Route>
  );
};
