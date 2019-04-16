/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Firehose } from '../../../../components/utils';

export interface TopologyDataProps {
  namespace: string;
  children: React.ReactNode;
}

const TopologyDataController: React.SFC<TopologyDataProps> = (props: TopologyDataProps) => {
  const { namespace } = props;
  if (namespace) {
    const resources = [
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
    ];

    const childrenWithProps = React.Children.map(props.children, (child: React.ReactChild) =>
      React.cloneElement(child as React.ReactElement<any>, { ...props }),
    );

    return <Firehose resources={resources}>{childrenWithProps}</Firehose>;
  }
  return <h1>TopologyDataController {namespace}</h1>;
};

export default TopologyDataController;
