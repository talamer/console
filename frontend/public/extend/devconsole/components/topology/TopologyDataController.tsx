/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash';
import { LabelSelector } from '../../../../module/k8s/label-selector';

export interface resourceProps {
  kind: string;
  metadata: Array<object>;
  status: object;
  spec: {
    selector?: object;
  };
}
export interface resource {
  data: Array<resourceProps>;
}
export interface resourcesProps {
  replicationControllers: resource;
  pods: resource;
  deploymentConfigs: resource;
  services: resource;
  routes: resource;
  deployments: resource;
  replicasets: resource;
}
export interface TopologyDataProps {
  namespace: string;
  loaded: any;
  resources: resourcesProps;
  render: (props) => {};
}

export interface Node {
  id: string;
  type: string;
  name: string;
}

export interface Edge {
  source: string;
  target: string;
}
export interface Group {
  id: string;
  name: string;
  nodes: object;
}
export interface TopologyDataModelProps {
  graphData: {
    nodes: Array<Node>;
    edges: Array<Edge>;
    groups: Array<Group>;
  };
  topologyData: Object;
}

export interface TopologyDataState {
  topologyGraphData: TopologyDataModelProps;
}

class TopologyDataController extends React.Component<TopologyDataProps, TopologyDataState> {
  constructor(props) {
    super(props);
    this.state = {
      topologyGraphData: {
        graphData: { nodes: [], edges: [], groups: [] },
        topologyData: {},
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.resources, prevProps.resources) && this.props.loaded === true) {
      this.transformTopologyData();
    }
  }

  /**
   * transforms the different configs
   */
  transformTopologyData() {
    if (!this.props.loaded) {
      return false;
    }
    const topologyGraphData = {
      graphData: { nodes: [], edges: [], groups: [] },
      topologyData: {},
    };

    const allServices = _.keyBy(this.props.resources.services.data, 'metadata.name');
    const selectorsByService = _.mapValues(allServices, (service) => {
      return new LabelSelector(service.spec.selector);
    });
    this.transformData(topologyGraphData, selectorsByService, {
      target: 'DeploymentConfig',
      controller: 'ReplicationController',
    });
    this.transformData(topologyGraphData, selectorsByService, {
      target: 'Deployment',
      controller: 'ReplicaSet',
    });
    this.setState({ topologyGraphData });
  }
  /**
   * Transforms the resource objects into topology graph data
   * @param selectorsByService
   * @param resource
   */
  transformData(topologyGraphData, selectorsByService, resource) {
    const {
      replicationControllers,
      pods,
      deploymentConfigs,
      routes,
      deployments,
      replicasets,
    } = this.props.resources;
    // Get the services for this deployment config
    const allServices = _.keyBy(this.props.resources.services.data, 'metadata.name');
    // Target the deployment
    const targetDeployments =
      resource.target === 'DeploymentConfig' ? deploymentConfigs : deployments;
    const targetReplicationControllers =
      resource.target === 'DeploymentConfig' ? replicationControllers : replicasets;

    _.forEach(targetDeployments.data, (deploymentConfig) => {
      deploymentConfig.kind = resource.target;
      const dcUID = _.get(deploymentConfig, 'metadata.uid');
      // Get the current replication controller or replicaset
      const dcControllers = _.filter(targetReplicationControllers.data, (replicationController) => {
        return _.some(_.get(replicationController, 'metadata.ownerReferences'), {
          uid: dcUID,
          controller: true,
        });
      });
      const ordered = this.sortByDeploymentVersion(dcControllers, true);
      const replicationController = _.merge(_.head(ordered), {
        kind: resource.controller,
      });
      // fetch all the pods for this deployment
      const dcPods = _.filter(pods.data, (pod) => {
        return _.some(_.get(pod, 'metadata.ownerReferences'), {
          uid: _.get(replicationController, 'metadata.uid'),
          controller: true,
        });
      });

      // Get the services
      const service = {
        kind: 'Servcie',
      };
      const configTemplate = _.get(deploymentConfig, 'spec.template');
      _.each(selectorsByService, (selector, serviceName) => {
        if (selector.matches(configTemplate)) {
          _.merge(service, allServices[serviceName]);
        }
      });
      // get the route
      const route = {
        kind: 'Route',
      };
      _.forEach(routes.data, (routeConfig) => {
        if (_.get(service, 'metadata.name') === _.get(routeConfig, 'spec.to.name')) {
          _.merge(route, routeConfig);
        }
      });

      // list of resources in the
      const nodeResources = [
        _.pick(deploymentConfig, 'metadata', 'kind'),
        _.omit(replicationController, 'spec'),
        _.omit(service, 'spec'),
        _.omit(route, 'spec'),
      ];
      // populate the graph Data
      this.createGraphData(topologyGraphData, deploymentConfig);
      // add the lookup object
      topologyGraphData.topologyData[dcUID] = {
        id: dcUID,
        name: _.get(deploymentConfig, 'metadata.name'),
        type: 'workload',
        resources: _(nodeResources)
          .map((resource) => {
            resource.name = _.get(resource, 'metadata.name');
            return resource;
          })
          .value(),
        data: {
          url: 'dummy_url',
          edit_url: 'dummy_edit_url',
          donut_status: {
            pods: _.map(dcPods, (pod) => _.pick(pod, 'metadata', 'status')),
          },
        },
      };
    });
  }
  /**
   * add the node, edges and group to the graph data
   * @param deploymentConfig
   */
  createGraphData(topologyGraphData, deploymentConfig) {
    // Current Node data
    const currentNode = {
      id: deploymentConfig.metadata.uid,
      type: 'workload',
      name: deploymentConfig.metadata.name,
    };
    const { deploymentConfigs } = this.props.resources;

    if (!_.some(topologyGraphData.graphData.nodes, { id: currentNode.id })) {
      // add the node to graph
      topologyGraphData.graphData.nodes.push(currentNode);
      const labels = _.get(deploymentConfig, 'metadata.labels');
      _.forEach(labels, (label, key) => {
        // find and add the edges
        if (key === 'connects-to') {
          topologyGraphData.graphData.edges.push({
            source: currentNode.id,
            target: _.get(_.find(deploymentConfigs.data, ['metadata.name', label]), 'metadata.uid'),
          });
          return;
        }

        if (key !== 'app.kubernetes.io/part-of') {
          return;
        }
        // find and add the groups
        const groupExists = _.some(topologyGraphData.graphData.groups, {
          name: label,
        });
        if (!groupExists) {
          topologyGraphData.graphData.groups.push({
            id: this.generateUUID(),
            name: label,
            nodes: [currentNode],
          });
        } else {
          const gIndex = _.findIndex(topologyGraphData.graphData.groups, { name: label });
          topologyGraphData.graphData.groups[gIndex].nodes.push(currentNode);
        }
      });
    }
  }

  /**
   * Generate UUIDv4
   * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = ((d + Math.random() * 16) % 16) | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
  /**
   * sort the deployement version
   */
  sortByDeploymentVersion = (replicationControllers, descending) => {
    const version = 'openshift.io/deployment-config.latest-version';
    const compareDeployments = (left, right) => {
      const leftVersion = parseInt(_.get(left, version), 10);
      const rightVersion = parseInt(_.get(right, version), 10);

      // Fall back to sorting by name if right Name no deployment versions.
      let leftName, rightName;
      if (!_.isFinite(leftVersion) && !_.isFinite(rightVersion)) {
        leftName = _.get(left, 'metadata.name', '');
        rightName = _.get(right, 'metadata.name', '');
        if (descending) {
          return rightName.localeCompare(leftName);
        }
        return leftName.localeCompare(rightName);
      }

      if (!leftVersion) {
        return descending ? 1 : -1;
      }

      if (!rightVersion) {
        return descending ? -1 : 1;
      }

      if (descending) {
        return rightVersion - leftVersion;
      }
      return leftVersion - rightVersion;
    };

    return _.toArray(replicationControllers).sort(compareDeployments);
  };
  render() {
    return <div>{this.props.render({ topologyGraphData: this.state.topologyGraphData })}</div>;
  }
}

export default TopologyDataController;
