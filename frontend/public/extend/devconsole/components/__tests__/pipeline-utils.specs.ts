import { getPipelineTasks } from '../../utils/pipeline-utils';
import { mockPipelinesJSON } from '../__mocks__/pipelines/pipeline-utils-mock';

describe('Output for task arranged should have the following ', () => {
  it('For first pipeline there should be 2 stages of length [0:[1],1:[2]]', () => {
    const stages = getPipelineTasks(mockPipelinesJSON[0].spec.tasks);
    expect(stages.length).toBe(2);
    expect(stages[0].length).toBe(1);
    expect(stages[1].length).toBe(1);
  });
  it('For second pipeline there should be 4 stages of length [0:[1],1:[2],2:[2],3:[1]', () => {
    const stages = getPipelineTasks(mockPipelinesJSON[1].spec.tasks);
    expect(stages.length).toBe(4);
    expect(stages[0].length).toBe(1);
    expect(stages[1].length).toBe(2);
    expect(stages[2].length).toBe(2);
    expect(stages[3].length).toBe(1);
  });
});
