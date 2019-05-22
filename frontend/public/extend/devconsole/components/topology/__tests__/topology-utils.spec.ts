import { TransformTopologyData, getPodStatus, podStatus } from '../topology-utils';
import { resources, topologyData } from '../__mocks__/TopologyDataMocks';
import { MockResources } from '../__mocks__/TopologyResourcesMocks';

describe('TopologyUtils ', () => {
  it('should be able to create an object', () => {
    const transformTopologyData = new TransformTopologyData(resources);
    expect(transformTopologyData).toBeTruthy();
  });

  it('should have the resources object as a public member', () => {
    const transformTopologyData = new TransformTopologyData(resources);
    expect(transformTopologyData.resources).toEqual(resources);
  });

  it('should throw an error, if the invalid target deployment string is provided', () => {
    const transformTopologyData = new TransformTopologyData(resources);
    const invalidTargetDeployment = 'dconfig'; // valid values are 'deployments' or 'deploymentConfigs'
    expect(() => {
      transformTopologyData.transformDataBy(invalidTargetDeployment);
    }).toThrowError(`Invalid target deployment resource: (${invalidTargetDeployment})`);
  });

  it('should not throw an error, if the valid target deployment string is provided', () => {
    const transformTopologyData = new TransformTopologyData(resources);
    const validTargetDeployment = 'deployments'; // valid values are 'deployments' or 'deploymentConfigs'
    expect(() => {
      transformTopologyData.transformDataBy(validTargetDeployment);
    }).not.toThrowError(`Invalid target deployment resource: (${validTargetDeployment})`);
  });
  it('should return graph and topology data', () => {
    const transformTopologyData = new TransformTopologyData(resources);
    transformTopologyData.transformDataBy('deployments');
    expect(transformTopologyData.getTopologyData()).toEqual(topologyData);
  });
  it('should return graph and topology data only for the deployment kind', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deployments');
    const result = transformTopologyData.getTopologyData();

    expect(result.graph.nodes).toHaveLength(MockResources.deployments.data.length); // should contain only two deployment
    expect(Object.keys(result.topology)).toHaveLength(MockResources.deployments.data.length); // should contain only two deployment
  });

  it('should contain edges information for the deployment kind', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deployments');
    const result = transformTopologyData.getTopologyData();
    // check if edges are connected between analytics -> wit
    expect(result.graph.edges.length).toEqual(1); // should contain only one edges
    expect(result.graph.edges[0].source).toEqual(MockResources.deployments.data[0].metadata.uid); //analytics
    expect(result.graph.edges[0].target).toEqual(MockResources.deployments.data[1].metadata.uid); //wit
  });

  it('should return graph and topology data only for the deploymentConfig kind', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deploymentConfigs');
    const result = transformTopologyData.getTopologyData();

    expect(result.graph.nodes.length).toEqual(MockResources.deploymentConfigs.data.length); // should contain only two deployment
    expect(Object.keys(result.topology).length).toEqual(
      MockResources.deploymentConfigs.data.length,
    ); // should contain only two deployment
  });

  it('should not have group information if the `part-of` label is missing', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deploymentConfigs');
    const result = transformTopologyData.getTopologyData();
    expect(result.graph.groups).toHaveLength(0);
  });

  it('should match the previous snapshot', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deploymentConfigs');
    transformTopologyData.transformDataBy('deployments');
    const result = transformTopologyData.getTopologyData();
    expect(result).toMatchSnapshot();
  });

  it('should return a valid pod status', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deploymentConfigs');
    transformTopologyData.transformDataBy('deployments');
    const result = transformTopologyData.getTopologyData();
    let topologyData = result.topology;
    let keys = Object.keys(topologyData);
    let status = getPodStatus(topologyData[keys[0]].data['donutStatus'].pods[0]);
    expect(podStatus.includes(status)).toBe(true)
  });

});
