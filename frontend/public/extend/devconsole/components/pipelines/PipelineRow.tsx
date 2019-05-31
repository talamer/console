/*eslint-disable no-undef */
import * as React from 'react';
import { ResourceRow } from '../../../../components/factory';
import {
  Kebab,
  ResourceLink,
  StatusIcon,
  Timestamp,
  ResourceKebab,
} from '../../../../components/utils';
import { Pipeline, triggerPipeline, rerunPipeline } from '../../utils/pipeline-actions';
import { pipelineFilterReducer } from '../../utils/pipeline-filter-reducer';

interface Props {
  obj: Pipeline;
}

interface States {
  modalMode: string;
}
class PipelineRow extends React.PureComponent<Props, States> {
  constructor(props) {
    super(props);
  }
  render() {
    const pipeline = this.props.obj;
    const status = pipelineFilterReducer(pipeline);
    const menuActions = [
      triggerPipeline(pipeline, pipeline.latestRun),
      rerunPipeline(pipeline, pipeline.latestRun),
      Kebab.factory.Edit,
      Kebab.factory.ModifyLabels,
      Kebab.factory.ModifyAnnotations,
      Kebab.factory.EditEnvironment,
      Kebab.factory.Delete,
    ];
    return (
      <ResourceRow obj={pipeline}>
        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5">
          <ResourceLink
            kind="Pipeline"
            name={pipeline.metadata.name}
            namespace={pipeline.metadata.namespace}
            title={pipeline.metadata.uid}
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5">
          {pipeline.latestRun && pipeline.latestRun.metadata && pipeline.latestRun.metadata.name ? (
            <ResourceLink
              kind="PipelineRun"
              name={pipeline.latestRun.metadata.name}
              namespace={pipeline.latestRun.metadata.namespace}
            />
          ) : (
            '-'
          )}
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs">
          <StatusIcon status={status} />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3 hidden-xs">-</div>
        <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">
          <Timestamp
            timestamp={
              pipeline.latestRun &&
              pipeline.latestRun.status &&
              pipeline.latestRun.status.completionTime
                ? pipeline.latestRun.status.completionTime
                : '-'
            }
          />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-3 col-xs-2">
          <div className="dropdown-kebab-pf">
            <ResourceKebab actions={menuActions} kind="Pipeline" resource={pipeline} />
          </div>
        </div>
      </ResourceRow>
    );
  }
}

export default PipelineRow;
