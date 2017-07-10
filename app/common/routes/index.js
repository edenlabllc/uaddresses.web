import React from 'react';

import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';

import RolesPage from 'containers/pages/RolesPage';
import RoleCreatePage from 'containers/pages/RoleCreatePage';
import RoleUpdatePage from 'containers/pages/RoleUpdatePage';

import ClientTypePage from 'containers/pages/ClientTypePage';
import ClientTypeCreatePage from 'containers/pages/ClientTypeCreatePage';
import ClientTypeUpdatePage from 'containers/pages/ClientTypeUpdatePage';

import TokensPage from 'containers/pages/TokensPage';
import TokenCreatePage from 'containers/pages/TokenCreatePage';
import TokenDetailsPage from 'containers/pages/TokenDetailsPage';

import UsersPage from 'containers/pages/UsersPage';
import UserCreatePage from 'containers/pages/UserCreatePage';
import UserUpdatePage from 'containers/pages/UserUpdatePage';

import UserRoleCreatePage from 'containers/pages/UserRoleCreatePage';

import ClientsPage from 'containers/pages/ClientsPage';
import ClientCreatePage from 'containers/pages/ClientCreatePage';
import ClientUpdatePage from 'containers/pages/ClientUpdatePage';

import ApprovalsPage from 'containers/pages/ApprovalsPage';
import ApprovalCreatePage from 'containers/pages/ApprovalCreatePage';
import ApprovalUpdatePage from 'containers/pages/ApprovalUpdatePage';

import NotFoundPage from 'containers/pages/NotFoundPage';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <IndexRedirect to="/roles" />

          <Route path="roles">
            <IndexRoute component={RolesPage} />
            <Route path="create" component={RoleCreatePage} />
            <Route path=":id" component={RoleUpdatePage} />
          </Route>

          <Route path="client_types">
            <IndexRoute component={ClientTypePage} />
            <Route path="create" component={ClientTypeCreatePage} />
            <Route path=":id" component={ClientTypeUpdatePage} />
          </Route>

          <Route path="tokens">
            <IndexRoute component={TokensPage} />
            <Route path="create" component={TokenCreatePage} />
            <Route path=":id" component={TokenDetailsPage} />
          </Route>

          <Route path="users">
            <IndexRoute component={UsersPage} />
            <Route path="create" component={UserCreatePage} />
            <Route path=":id" component={UserUpdatePage} />
            <Route path=":id/roles/create" component={UserRoleCreatePage} />
          </Route>

          <Route path="clients">
            <IndexRoute component={ClientsPage} />
            <Route path="create" component={ClientCreatePage} />
            <Route path=":id" component={ClientUpdatePage} />
          </Route>

          <Route path="approvals">
            <IndexRoute component={ApprovalsPage} />
            <Route path="create" component={ApprovalCreatePage} />
            <Route path=":id" component={ApprovalUpdatePage} />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Route>
      </Route>
    </Route>
  );
};
