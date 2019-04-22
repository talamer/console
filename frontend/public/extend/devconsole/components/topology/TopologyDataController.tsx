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
  loaded?: boolean;
  resources?: Array<any>;
  replicationControllers?: resource;
  pods?: resource;
  deploymentConfigs?: resource;
  routes?: resource;
  deployments?: resource;
  services?: resource;
  replicasets?: resource;
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
  shouldComponentUpdate(nextProps, nextState) {
    const sholudUpdate =
      !_.isEqual(this.props.deployments, nextProps.deployments) ||
      !_.isEqual(this.props.deploymentConfigs, nextProps.deploymentConfigs) ||
      !_.isEqual(this.props.services, nextProps.services) ||
      !_.isEqual(this.props.replicationControllers, nextProps.replicationControllers) ||
      !_.isEqual(this.props.replicasets, nextProps.replicasets) ||
      !_.isEqual(this.props.routes, nextProps.routes) ||
      !_.isEqual(this.state.topologyGraphData, nextState.topologyGraphData) ||
      !_.isEqual(this.props.namespace, nextProps.namespace);
    return sholudUpdate;
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

    const allServices = _.keyBy(this.props.services.data, 'metadata.name');
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
    console.log('Final', topologyGraphData);
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
    } = this.props;
    // Get the services for this deployment config
    const allServices = _.keyBy(this.props.services.data, 'metadata.name');
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
      const deploymentsLabels = _.find(_.get(deploymentConfig, 'metadata.labels'));
      topologyGraphData.topologyData[dcUID] = {
        id: dcUID,
        name:
          deploymentsLabels['app.kubernetes.io/name'] || _.get(deploymentConfig, 'metadata.name'),
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
            pods: _.map(dcPods, (pod) =>
              _.merge(_.pick(pod, 'metadata', 'status'), {
                id: _.get(pod, 'metadata.uid'),
                name: _.get(pod, 'metadata.name'),
                kind: 'Pod',
              }),
            ),
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
    const { metadata } = deploymentConfig;
    const currentNode = {
      id: metadata.uid,
      type: 'node',
      name: metadata.labels['app.kubernetes.io/name'] || metadata.name,
    };

    if (!_.some(topologyGraphData.graphData.nodes, { id: currentNode.id })) {
      // add the node to graph
      topologyGraphData.graphData.nodes.push(currentNode);
      const labels = _.get(deploymentConfig, 'metadata.labels');
      const edges = _.get(deploymentConfig, 'metadata.annotations');
      const totalDeployments = _.cloneDeep(_.concat(this.props.deploymentConfigs.data ,this.props.deployments.data));
      // // find and add the edges
      if (_.has(edges, "app.openshift.io/connects-to")) {
        let targetNode = _.get(_.find(totalDeployments, ['metadata.name', edges["app.openshift.io/connects-to"]]), 'metadata.uid');
        if (targetNode) {
          topologyGraphData.graphData.edges.push({
            source: currentNode.id,
            target: targetNode,
          });
        }
      }

      _.forEach(labels, (label, key) => {
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
    return (
      <React.Fragment>
        {this.props.render({ topologyGraphData: this.state.topologyGraphData })}
      </React.Fragment>
    );
  }
}

export default TopologyDataController;
