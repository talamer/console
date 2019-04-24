/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { match as RMatch } from 'react-router';
import ODCEmptyState from '../shared/components/EmptyState/EmptyState';
import { Firehose, StatusBox } from '../../../components/utils';
import { K8sResourceKind } from '../../../module/k8s/index';
import TopologyDataController from '../components/topology/TopologyDataController';
import TopologyLayout from '../components/topology/TopologyLayout';

type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};

export interface TopologyPageContentProps {
  deploymentConfigs?: FirehoseList;
  loaded?: boolean;
  loadError?: string;
}

export interface TopologyPageProps {
  match: RMatch<{
    ns?: string;
  }>;
}

const EmptyMsg = () => <ODCEmptyState title="Topology" />

export const TopologyPageContent: React.FunctionComponent<TopologyPageContentProps> = (
  props: TopologyPageContentProps,
) => {
  return (
    <StatusBox
      data={props.deploymentConfigs.data}
      label="Topology"
      loaded={props.loaded}
      loadError={props.loadError}
      EmptyMsg={EmptyMsg}
    >
      <h1>This is Topology View</h1>
    </StatusBox>
  );
};

const TopologyPage: React.FunctionComponent<TopologyPageProps> = (props: TopologyPageProps) => {
  const namespace = props.match.params.ns;
  const resources = [
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
    <Firehose resources={resources} forceUpdate>
    <TopologyDataController
        namespace={namespace}
        render={(props) => <TopologyLayout {...props} />}
      />
    </Firehose>
  );
};

export default TopologyPage;
