import * as React from 'react';
import { NamespaceBar } from '../../../../../public/components/namespace';

export interface TopologyLayoutProps {
  namespace: any;
  pods: object;
  deploymentConfigs: any;
  routes: any;
  services: any;
  replicationControllers: Object;
}

const TopologyLayout: React.SFC<any> = (props: any) => {
  console.log('Props', props);
  const { namespace, pods, deploymentConfigs, routes, services, replicationControllers } = props;

  return (
    <div>
      <NamespaceBar/>
      <h1>Deployments in {namespace}</h1>
      <ul>{deploymentConfigs.data.map((pod) => <li key={pod.metadata.uid}>{pod.metadata.name}</li>)}</ul>
      <h1>routes in {namespace}</h1>
      <ul>{routes.data.map((route) => <li key={route.metadata.uid}><a target="_blank" href={'http://'+route.spec.host}>{route.spec.host}</a></li>)}</ul>
      <h1>Services in {namespace}</h1>
      <ul>{services.data.map((service) => <li key={service.metadata.uid}>{service.metadata.name}</li>)}</ul>
    </div>
  );
};

export default TopologyLayout;
