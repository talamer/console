/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { RouteProps, Redirect } from 'react-router';
import { AsyncComponent } from '../../components/utils';

const routes: RouteProps[] = [
  {
    path: '/dev/add',
    // eslint-disable-next-line react/display-name
    render: (props) => (
      <AsyncComponent
        {...props}
        loader={async() =>
          (await import('./pages/Import' /* webpackChunkName: "devconsole-import" */)).default
        }
      />
    ),
  },
  {
    path: '/dev/topology',
    // eslint-disable-next-line react/display-name
    render: (props) => (
      <AsyncComponent
        {...props}
        loader={async() =>
          (await import('./pages/Topology' /* webpackChunkName: "devconsole-topology" */)).default
        }
      />
    ),
  },
  {
    path: '/dev',
    // eslint-disable-next-line react/display-name
    render: () => <Redirect to="/dev/topology" />,
  },
];

export default routes;
