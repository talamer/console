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
    pipelineRun.status.conditions.length === 0
  ) {
    return '-';
  }
  const condition = pipelineRun.status.conditions.find((c) => c.type === 'Succeeded');
  return !condition || !condition.status
    ? '-'
    : condition.status === 'True'
      ? 'Succeeded'
      : condition.status === 'False'
        ? 'Failed'
        : 'Running';
};
