/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { RouteProps, Redirect } from 'react-router';
import { AsyncComponent } from '../../components/utils';
import { appendActiveNamespace } from '../../components/app';

interface RedirectToNamespaceProps {
  location: {
    pathname?: string;
    search?: string;
  };
}

const RedirectToNamespace: React.FunctionComponent<RedirectToNamespaceProps> = (
  props: RedirectToNamespaceProps,
) => {
  const to = appendActiveNamespace(props.location.pathname) + props.location.search;
  return <Redirect to={to} />;
};

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
    render: (props) => <RedirectToNamespace location={props.location} />,
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
    exact: true,
    // eslint-disable-next-line react/display-name
    render: () => <Redirect to="/dev/topology" />,
  },
];

export default routes;
