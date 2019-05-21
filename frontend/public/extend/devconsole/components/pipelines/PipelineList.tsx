/* eslint-disable no-unused-vars, no-undef  */
import * as React from 'react';
import { Firehose } from '../../../../components/utils';
import { List } from '../../../../components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';
import PipelineAugmentRuns from './PipelineAugmentRuns';
import { getResources, PropPipelineData, Resource } from '../../utils/pipeline-augment';

export interface PipelineListProps {
  data?: PropPipelineData[];
}

const PipelineList: React.FC<PipelineListProps> = (props: PipelineListProps) => {
  const { propsReferenceForRuns, resources }: Resource = getResources(props);
  return resources && resources.length > 0 ? (
    <Firehose resources={resources}>
      <PipelineAugmentRuns {...props} propsReferenceForRuns={propsReferenceForRuns} />
    </Firehose>
  ) : (
    <List {...props} Header={PipelineHeader} Row={PipelineRow} />
  );
};
export default PipelineList;
