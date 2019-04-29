import { TransformTopologyData } from '../topology-utils';
import { resources, topologyData } from '../__mocks__/TopologyDataMocks';

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
});
