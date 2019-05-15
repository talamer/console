export const pipelineFilterReducer = (pipeline): string => {
  if (!pipeline || !pipeline.spec.runs) {
    return '';
  }
  return pipeline.spec.runs[pipeline.spec.runs.length - 1].status;
};

export const pipelineRunFilterReducer = (pipelineRun): string => {
  if (
    !pipelineRun ||
    !pipelineRun.status ||
    !pipelineRun.status.conditions ||
    !pipelineRun.status.conditions[0] ||
    !pipelineRun.status.conditions[0].status
  ) {
    return '-';
  }
  if (pipelineRun.status.conditions[0].status === 'True') {
    return 'Succeeded';
  }
  return 'Failed';
};
