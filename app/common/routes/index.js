import React from 'react';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import RegionsPage from 'containers/pages/RegionsPage';
// import RegionCreatePage from 'containers/pages/RegionCreatePage';
import RegionUpdatePage from 'containers/pages/RegionUpdatePage';

import DistrictsPage from 'containers/pages/DistrictsPage';
import DistrictUpdatePage from 'containers/pages/DistrictUpdatePage';

import SettlementsPage from 'containers/pages/SettlementsPage';
import SettlementUpdatePage from 'containers/pages/SettlementUpdatePage';
// import DistrictUpdatePage from 'containers/pages/DistrictUpdatePage';

import StreetsPage from 'containers/pages/StreetsPage';

import SignInPage from 'containers/pages/SignInPage';
import NotFoundPage from 'containers/pages/NotFoundPage';

import { getOAuthUser } from 'reducers';
import { fetchRegions } from 'redux/regions';
import { isLoginned, logout } from 'redux/session';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  const requireAuth = (nextState, replace, next) =>
    store.dispatch(isLoginned()).then((loginned) => {
      if (!loginned) {
        replace({ pathname: '/sign-in' });
        return next();
      }

      const currentState = store.getState();
      const person = getOAuthUser(currentState);

      if (person) return next();

      return store.dispatch(fetchRegions()).then((action) => {
        if (action.error) {
          store.dispatch(logout());
          replace({ pathname: '/sign-in' });
        }

        return next();
      });
    });

  return (
    <Route component={App}>
      <Route component={Main} onEnter={requireAuth}>
        <Route path="/">
          <IndexRedirect to="/regions" />
          <Route path="regions">
            <IndexRoute component={RegionsPage} />
            <Route path=":id/:region" component={RegionUpdatePage} />
          </Route>
          <Route path="districts">
            <IndexRoute component={DistrictsPage} />
            <Route path=":region/:district" component={DistrictUpdatePage} />
          </Route>
          <Route path="settlements">
            <IndexRoute component={SettlementsPage} />
            <Route path=":name" component={SettlementUpdatePage} />
          </Route>
          <Route path="streets">
            <IndexRoute component={StreetsPage} />
          </Route>
        </Route>
      </Route>

      <Route path="sign-in" component={SignInPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
};
