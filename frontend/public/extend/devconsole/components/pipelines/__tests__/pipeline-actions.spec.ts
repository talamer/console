/*eslint-disable no-unused-vars, no-undef */
import { stopPipelineRun, rerunPipeline } from '../../../utils/pipeline-actions';
import { actionPipelines, actionPipelineRuns } from '../../__mocks__/pipelines/pipeline-mocks';

describe('1. PipelineAction test rerunPipeline create correct labels and callbacks', () => {
  it('1. expect label to be "Trigger Last Run" when latestRun is available', () => {
    const rerunAction = rerunPipeline(actionPipelines[0], actionPipelineRuns[0]);
    const rerunResult = rerunAction();
    expect(rerunResult.label).toBe('Trigger Last Run');
    expect(rerunResult.callback).not.toBeNull();
  });
  it('2.expect label not to be "Trigger" when latestRun is unavailable', () => {
    const rerunAction = rerunPipeline(actionPipelines[1], null);
    const rerunResult = rerunAction();
    expect(rerunResult.label).not.toBe('Trigger Last Run');
    expect(rerunResult.callback).toBeNull();
  });
});

describe('2. PipelineAction test stopPipelineRun create correct labels and callbacks', () => {
  it('1. expect label to be "Stop Pipeline Run" when latest Run is running', () => {
    const stopAction = stopPipelineRun(actionPipelineRuns[1]);
    const stopResult = stopAction();
    expect(stopResult.label).toBe('Stop Pipeline Run');
    expect(stopResult.callback).not.toBeNull();
  });
  it('2.expect label not to be "Stop Pipeline Run" when latestRun is not running', () => {
    const stopAction = stopPipelineRun(actionPipelineRuns[0]);
    const stopResult = stopAction();
    expect(stopResult.label).not.toBe('Stop Pipeline Run');
    expect(stopResult.callback).toBeNull();
  });
});
