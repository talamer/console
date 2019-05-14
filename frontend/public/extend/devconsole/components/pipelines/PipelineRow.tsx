import * as React from 'react';
import { ResourceRow } from '../../../../components/factory';
import PipelineRowRun from './PipelineRowRun';
import { ResourceLink, Firehose } from '../../../../components/utils';

const PipelineRow = ({ obj: pipeline }) => {
  const firehoseResources = [
    {
      kind: 'PipelineRun',
      isList: true,
      prop: 'pipelineruns',
      namespace: pipeline.metadata.namespace,
      selector: {
        'tekton.dev/pipeline': pipeline.metadata.name,
      },
    },
  ];
  return (
    <ResourceRow obj={pipeline}>
      <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
        <ResourceLink
          kind="Pipeline"
          name={pipeline.metadata.name}
          namespace={pipeline.metadata.namespace}
          title={pipeline.metadata.uid}
        />
      </div>
      <Firehose resources={firehoseResources}>
        <PipelineRowRun />
      </Firehose>
    </ResourceRow>
  );
};

export default PipelineRow;
