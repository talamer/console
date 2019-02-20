import * as React from 'react';
import { RouteProps } from 'react-router';
import { AsyncComponent } from '../../components/utils';

const routes: RouteProps[] = [
  {
    path: '/devconsole/import',
    component: () => (
      <AsyncComponent
        loader={async() =>
          (await import('./pages/Import' /* webpackChunkName: "devconsole-import" */))
            .default
        }
      />
    ),
  },
  {
    path: '/devconsole/codebases',
    component: () => (
      <AsyncComponent
        loader={async() =>
          (await import('./pages/Codebases' /* webpackChunkName: "devconsole-codebases" */))
            .default
        }
      />
    ),
  },
  {
    path: '/devconsole/topology',
    component: () => (
      <AsyncComponent
        loader={async() =>
          (await import('./pages/Topology' /* webpackChunkName: "devconsole-topology" */))
            .default
        }
      />
    ),
  },
  {
    path: '/devconsole',
    component: () => (
      <AsyncComponent
        loader={async() =>
          (await import('./pages/Home' /* webpackChunkName: "devconsole-home" */))
            .default
        }
      />
    ),
  },
];

export default routes;
