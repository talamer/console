export const pipelineFilterReducer = (pipeline): string => {
  if (!pipeline || !pipeline.spec.runs) {
    return '';
  }
  return pipeline.spec.runs[pipeline.spec.runs.length - 1].status;
};

export const pipelineRunFilterReducer = (pipelineRun): string => {
  if (!pipelineRun.status || !pipelineRun.status.conditions[0].type) {
    return '';
  }
  return pipelineRun.status.conditions[0].type;
};
