import { TransformTopologyData } from '../topology-utils';
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

    expect(result.graph.nodes.length).toEqual(MockResources.deployments.data.length); // should contain only two deployment
    expect(Object.keys(result.topology).length).toEqual(MockResources.deployments.data.length); // should contain only two deployment
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
    // deploymentConfig doesnt contain group
    expect(result.graph.groups.length).toEqual(0);
  });

  it('should transform by both deployments and deploymentConfigs', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deployments');
    transformTopologyData.transformDataBy('deploymentConfigs');
    const result = transformTopologyData.getTopologyData();
    // should contain a group
    expect(result.graph.groups.length).toEqual(1);
    // should contain one edges
    expect(result.graph.edges.length).toEqual(1);
    expect(result.graph.nodes.length).toEqual(3);
  });

  it('should throw error when invalid connects-to is provided', () => {
    const mockData = JSON.parse(JSON.stringify(MockResources));
    mockData.deployments.data[0].metadata.annotations['app.openshift.io/connects-to'] = 'wit'; // should always contain json string
    const transformTopologyData = new TransformTopologyData(mockData);

    expect(() => {
      transformTopologyData.transformDataBy('deployments');
      transformTopologyData.transformDataBy('deploymentConfigs');
      transformTopologyData.getTopologyData();
    }).toThrowError('Invalid connects-to annotation provided');
  });

  it('topology data should contain workload objects', () => {
    const transformTopologyData = new TransformTopologyData(MockResources);
    transformTopologyData.transformDataBy('deployments');
    transformTopologyData.transformDataBy('deploymentConfigs');
    const result = transformTopologyData.getTopologyData();
    const nodeIds = Object.keys(result.topology);
    expect(nodeIds.length).toEqual(result.graph.nodes.length)
    expect(result.topology[nodeIds[0]].type).toBe('workload');
    expect(Object.keys(result.topology[nodeIds[0]])).toContain('data');
    expect(Object.keys(result.topology[nodeIds[0]].data)).toEqual(['builderImage','donutStatus']);
  });
});
