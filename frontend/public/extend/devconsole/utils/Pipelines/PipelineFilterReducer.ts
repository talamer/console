const DevPipelineStatus = (pipeline): string => {
    if (!pipeline || !pipeline.spec.runs) {
      return '';
    }
    return pipeline.spec.runs[pipeline.spec.runs.length-1].status;
};
  
const DevpipelineFilterReducer = (pipeline): string => {
    const status = DevPipelineStatus(pipeline);
    return status;
};
export default DevpipelineFilterReducer;