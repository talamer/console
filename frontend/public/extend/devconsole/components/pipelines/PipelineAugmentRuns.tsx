import * as React from 'react';
import { List } from '../../../../components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';
import { augmentRunsToData, PipelineAugmentRunsProps } from '../../utils/pipeline-augment';

const PipelineAugmentRuns = (props: PipelineAugmentRunsProps) => {
  const newProps = Object.assign({}, props);
  newProps.data = augmentRunsToData(props);
  return <List {...newProps} Header={PipelineHeader} Row={PipelineRow} />;
};

export default PipelineAugmentRuns;
