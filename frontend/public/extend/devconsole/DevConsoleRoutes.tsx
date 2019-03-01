import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { getActiveNamespace } from '../../ui/ui-actions';
import { ALL_NAMESPACES_KEY } from '../../const';
import HomePage from './pages/Home';
import ImportPage from './pages/Import';
import TopologyPage from './pages/Topology';
import ViewCodebase from './pages/ViewCodebase';



// Ensure a *const* function wrapper for each namespaced Component so that react router doesn't recreate them
const Memoized = new Map();
function NamespaceFromURL(Component) {
  let C = Memoized.get(Component);
  if (!C) {
    C = function NamespaceInjector(props) {
      return <Component namespace={props.match.params.ns} {...props} />;
    };
    Memoized.set(Component, C);
  }
  return C;
}

const appendActiveNamespace = pathname => {
  const basePath = pathname.replace(/\/$/, '');
  const activeNamespace = getActiveNamespace();
  return activeNamespace === ALL_NAMESPACES_KEY ? `${basePath}/all-namespaces` : `${basePath}/ns/${activeNamespace}`;
};

const NamespaceRedirect = ({location: {pathname}}) => {
  const to = appendActiveNamespace(pathname) + location.search;
  return <Redirect to={to} />;
};

const DevConsoleRoutes: React.SFC = () => (
  <Switch>
    <Route path='/devconsole/import' component={ImportPage} />

    <Route path="/devconsole/codebases/all-namespaces" exact component={NamespaceFromURL(ViewCodebase)} />
    <Route path="/devconsole/codebases/ns/:ns" exact component={NamespaceFromURL(ViewCodebase)} />
    <Route path="/devconsole/codebases" exact component={NamespaceRedirect} />

    <Route path='/devconsole/topology' component={TopologyPage} />
    <Route path='/devconsole' component={HomePage} />
  </Switch>
);

export default DevConsoleRoutes;
