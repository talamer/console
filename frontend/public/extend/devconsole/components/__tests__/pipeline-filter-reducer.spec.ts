import { pipelineRunFilterReducer } from '../../utils/pipeline-filter-reducer';

const mockPipelineRuns = [
  { status: {} },
  { status: { conditions: [{}] } },
  { status: { conditions: [{ status: 'False' }] } },
  { status: { conditions: [{ status: 'True' }] } },
];

describe('Check PipelineRun Filter Reducer applied to the following:', () => {
  it('Pipelinerun with empty status object', () => {
    const reducerOutput = pipelineRunFilterReducer(mockPipelineRuns[0]);
    expect(reducerOutput).toBe('-');
  });
  it('Pipelinerun with empty conditions array', () => {
    const reducerOutput = pipelineRunFilterReducer(mockPipelineRuns[1]);
    expect(reducerOutput).toBe('-');
  });
  it('Pipelinerun with first element of condition array with status as string "False"', () => {
    const reducerOutput = pipelineRunFilterReducer(mockPipelineRuns[2]);
    expect(reducerOutput).toBe('Failed');
  });
  it('Pipelinerun with first element of condition array with status as string "True"', () => {
    const reducerOutput = pipelineRunFilterReducer(mockPipelineRuns[3]);
    expect(reducerOutput).toBe('Succeeded');
  });
});
