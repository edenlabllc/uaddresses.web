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
import StreetUpdatePage from 'containers/pages/StreetUpdatePage';

import SignInPage from 'containers/pages/SignInPage';
import NotFoundPage from 'containers/pages/NotFoundPage';

export const configureRoutes = () => (
  <Route component={App}>
    <Route component={Main}>
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
          <Route path=":id" component={StreetUpdatePage} />
        </Route>
      </Route>
    </Route>
    <Route path="sign-in" component={SignInPage} />
    <Route component={Main}>
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
