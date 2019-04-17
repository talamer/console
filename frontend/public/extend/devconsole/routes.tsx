/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { RouteProps, Redirect } from 'react-router';
import { AsyncComponent } from '../../components/utils';
import { getActiveNamespace } from '../../ui/ui-actions';
import { ALL_NAMESPACES_KEY } from '../../const';

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
    path: '/dev/k8s/pipelines',
    // eslint-disable-next-line react/display-name
    render: () => (  
      getRedirection('/dev/k8s/pipelines')
    ),
    exact:true
  },
  {
    path: '/dev/k8s/pipelines/ns/:ns',
    // eslint-disable-next-line react/display-name
    render: (props) => (
        <AsyncComponent
          {...props}
          namespace = {getNamespace()}
          loader={async() =>
            (await import('./pages/Pipelines' /* webpackChunkName: "devconsole-codebases" */)).default
          }
        />
    ),
  },
  {
    path: '/dev/k8s/pipelines/all-namespaces',
    // eslint-disable-next-line react/display-name
    render: (props) => (
      <AsyncComponent
        {...props}
        loader={async() =>
          (await import('./pages/Pipelines' /* webpackChunkName: "devconsole-codebases" */)).default
        }
      />
    ),
  },
  {
    path: '/dev',
    // eslint-disable-next-line react/display-name
    render: (props) => (
      <AsyncComponent
        {...props}
        loader={async() =>
          (await import('./pages/Home' /* webpackChunkName: "devconsole-home" */)).default
        }
      />
    ),
  },
];
const getRedirection = (basePath) => {
  var namespace = getNamespace();
  if(namespace){
    var path =  basePath + "/ns/" + namespace 
    return <Redirect to = {path} />
  } 
    return <Redirect to ={ basePath + "/all-namespaces"} />

}
const getNamespace = () => {
  var activeNamespace = getActiveNamespace();
  return activeNamespace != ALL_NAMESPACES_KEY? activeNamespace : ''
}

export default routes;
