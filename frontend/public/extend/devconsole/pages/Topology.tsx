/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import ODCEmptyState from '../shared/components/EmptyState/EmptyState';
import { Firehose, StatusBox } from '../../../components/utils';
import { K8sResourceKind } from '../../../module/k8s/index';

export interface TopologyPageContentProps {
  deploymentConfigs?: FirehoseList;
  loaded?: boolean;
  loadError?: string;
}

export interface TopologyPageProps {
  match: any;
}

export const TopologyPageContent: React.FunctionComponent<TopologyPageContentProps> = (
  props: TopologyPageContentProps,
) => {
  return (
    <StatusBox
      data={props.deploymentConfigs.data}
      label="Topology"
      loaded={props.loaded}
      loadError={props.loadError}
      EmptyMsg={ODCEmptyState}
    >
      <h1>This is Topology View</h1>
    </StatusBox>
  );
};

const TopologyPage: React.FunctionComponent<TopologyPageProps> = (props: TopologyPageProps) => {
  const namespace = _.get(props.match, 'param-ns');
  const resources = [
    {
      isList: true,
      kind: 'DeploymentConfig',
      namespace,
      prop: 'deploymentConfigs',
    },
  ];
  return (
    <Firehose resources={resources} forceUpdate>
      <TopologyPageContent />
    </Firehose>
  );
};

export default TopologyPage;

type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};
