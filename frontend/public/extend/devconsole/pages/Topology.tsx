import * as React from 'react';
import { match as RMatch } from 'react-router';
import { Firehose } from '../../../components/utils';
import TopologyDataController from '../components/topology/TopologyDataController';
import TopologyLayout from '../components/topology/TopologyLayout';

interface TopologyPageProps {
  match: RMatch<{
    ns?: string;
  }>;
}
const TopologyPage: React.SFC<TopologyPageProps> = (props) => {
  const namespace = props.match.params.ns;
  const defaultResources = [
    {
      isList: true,
      kind: 'Pod',
      namespace,
      prop: 'pods',
    },
    {
      isList: true,
      kind: 'ReplicationController',
      namespace,
      prop: 'replicationControllers',
    },
    {
      isList: true,
      kind: 'DeploymentConfig',
      namespace,
      prop: 'deploymentConfigs',
    },
    {
      isList: true,
      kind: 'Deployment',
      namespace,
      prop: 'deployments',
    },
    {
      isList: true,
      kind: 'Route',
      namespace,
      prop: 'routes',
    },
    {
      isList: true,
      kind: 'Service',
      namespace,
      prop: 'services',
    },
    {
      isList: true,
      kind: 'ReplicaSet',
      namespace,
      prop: 'replicasets',
    },
  ];
  return (
    <Firehose resources={defaultResources}>
      <TopologyDataController
        namespace={namespace}
        render={(props) => <TopologyLayout {...props} />}
      />
    </Firehose>
  );
};

export default TopologyPage;
