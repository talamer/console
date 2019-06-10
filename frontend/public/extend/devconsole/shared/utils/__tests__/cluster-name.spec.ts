/* eslint-disable no-unused-vars, no-undef */
import { getClusterName } from '../cluster-name';
import { mockServerFlags } from '../../../utils/test-utils';

describe('cluster-name: getClusterName', () => {
  it('should get Cluster name', () => {
    mockServerFlags({kubeAPIServerURL: 'https://api.rohit32.devcluster.openshift.com:6443'});
    expect(getClusterName()).toBe('api-rohit32-devcluster-openshift-com:6443');
  });
});
