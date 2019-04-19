/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { RouteProps, Redirect } from 'react-router';
import { AsyncComponent } from '../../components/utils';
import { NamespaceRedirect } from '../../components/app';

const routes: RouteProps[] = [
  ...(() =>
    ['/dev/add/all-namespaces', '/dev/add/ns/:ns'].map((path) => ({
      path,
      exact: true,
      // eslint-disable-next-line react/display-name
      render: (props) => (
        <AsyncComponent
          {...props}
          loader={async() =>
            (await import('./pages/Add' /* webpackChunkName: "devconsole-add" */)).default
          }
        />
      ),
    })))(),
  {
    path: '/dev/add',
    exact: true,
    // eslint-disable-next-line react/display-name
    render: (props) => <NamespaceRedirect {...props} />,
  },
  ...(() =>
    ['/dev/topology/all-namespaces', '/dev/topology/ns/:ns'].map((path) => ({
      path,
      exact: true,
      // eslint-disable-next-line react/display-name
      render: (props) => (
        <AsyncComponent
          {...props}
          loader={async() =>
            (await import('./pages/Topology' /* webpackChunkName: "devconsole-topology" */)).default
          }
        />
      ),
    })))(),
  {
    path: '/dev/topology',
    exact: true,
    // eslint-disable-next-line react/display-name
    render: (props) => <NamespaceRedirect {...props} />,
  },
  {
    path: '/dev',
    exact: true,
    // eslint-disable-next-line react/display-name
    render: () => <Redirect to="/dev/topology" />,
  },
];

export default routes;
