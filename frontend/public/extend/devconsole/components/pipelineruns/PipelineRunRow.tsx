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
import { pipelineRunFilterReducer } from '../../utils/pipeline-filter-reducer';
import { reRunPipelineRun, stopPipelineRun } from '../../utils/pipeline-actions';
import { PipelineRun } from '../../utils/pipeline-augment';

interface PipelineRunRowProps {
  obj: PipelineRun;
}

const PipelineRunRow: React.FC<PipelineRunRowProps> = (props) => {
  const pipelinerun = props.obj;
  const menuActions = [
    reRunPipelineRun(pipelinerun),
    stopPipelineRun(pipelinerun),
    Kebab.factory.Edit,
    Kebab.factory.ModifyLabels,
    Kebab.factory.ModifyAnnotations,
    Kebab.factory.Delete,
  ];
  return (
    <ResourceRow obj={pipelinerun}>
      <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4">
        <ResourceLink
          kind="PipelineRun"
          name={pipelinerun.metadata.name}
          namespace={pipelinerun.metadata.namespace}
          title={pipelinerun.metadata.name}
        />
      </div>
      <div className="col-lg-2 col-md-2 col-sm-4 col-xs-4">
        <Timestamp
          timestamp={
            pipelinerun && pipelinerun.status && pipelinerun.status.startTime
              ? pipelinerun.status.startTime
              : '-'
          }
        />
      </div>
      <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
        <StatusIcon status={pipelineRunFilterReducer(pipelinerun)} />
      </div>
      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs"> - </div>
      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs"> - </div>
      <div className="col-lg-1 col-md-1 hidden-sm hidden-xs">
        {pipelinerun &&
        pipelinerun.spec &&
        pipelinerun.spec.trigger &&
        pipelinerun.spec.trigger.type
          ? pipelinerun.spec.trigger.type
          : '-'}
      </div>
      <div className="dropdown-kebab-pf">
        <ResourceKebab actions={menuActions} kind="PipelineRun" resource={pipelinerun} />
      </div>
    </ResourceRow>
  );
};

export default PipelineRunRow;
