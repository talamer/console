/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { RouteProps, Redirect } from 'react-router';
import { AsyncComponent } from '../../components/utils';
import { getActiveNamespace } from '../../ui/ui-actions';
import { ALL_NAMESPACES_KEY } from '../../const';

const routes: RouteProps[] = [
  {
    path: '/devops/import',
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
    path: '/devops/codebases',
    // eslint-disable-next-line react/display-name
    render: () => (  
      getRedirection('/devconsole/codebases')
    ),
    exact:true
  },
  {
    path: '/devconsole/codebases/ns/:ns',
    // eslint-disable-next-line react/display-name
    render: (props) => (
        <AsyncComponent
          {...props}
          namespace = {getNamespace()}
          loader={async() =>
            (await import('./pages/ViewCodebase.jsx' /* webpackChunkName: "devconsole-codebases" */)).default
          }
        />
    ),
  },
  {
    path: '/devconsole/codebases/all-namespaces',
    // eslint-disable-next-line react/display-name
    render: (props) => (
      <AsyncComponent
        {...props}
        loader={async() =>
          (await import('./pages/ViewCodebase.jsx' /* webpackChunkName: "devconsole-codebases" */)).default
        }
      />
    ),
  },
  {
    path: '/devops/topology',
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
    path: '/devops',
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
    return <Redirect to = "/devconsole/codebases/all-namespaces" />

}
const getNamespace = () => {
  var activeNamespace = getActiveNamespace();
  return activeNamespace != ALL_NAMESPACES_KEY? activeNamespace : ''
}
export default routes;
