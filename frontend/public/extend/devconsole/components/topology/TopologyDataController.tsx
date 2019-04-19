/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { TopologyDataResources, TopologyDataModel } from './topology-types';
import { TransformTopologyData } from './topology-utils';
import { Firehose } from '../../../../components/utils';

export interface RenderProps {
  data?: TopologyDataModel;
  loaded: boolean;
  loadError: any;
}

export interface ControllerProps {
  loaded?: boolean;
  loadError?: any;
  resources?: TopologyDataResources;
  render(RenderProps): React.ReactNode;
}

export interface TopologyDataControllerProps {
  namespace: string;
  render(RenderProps): React.ReactNode;
}

// TODO cannot use React.FC due to typing issue
class Controller extends React.PureComponent<ControllerProps> {
  render() {
    const { render, resources, loaded, loadError } = this.props;

    return render({
      loaded,
      loadError,
      data: loaded
        ? new TransformTopologyData(resources)
          .transformDataBy('deployments')
          .transformDataBy('deploymentConfigs')
          .getTopologyData()
        : null,
    });
  }
}

export default class TopologyDataController extends React.PureComponent<
  TopologyDataControllerProps
  > {
  render() {
    const { namespace, render } = this.props;
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
        <Controller render={render} />
      </Firehose>
    );
  }
}
