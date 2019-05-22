/* eslint-disable no-undef  */
import * as React from 'react';
import { List } from '../../../../components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';
import { PipelineListProps } from './PipelineList';
import { augmentRunsToData } from '../../utils/pipeline-augment';

export interface PipelineAugmentRunsProps extends PipelineListProps {
  propsReferenceForRuns?: string[];
}

const PipelineAugmentRuns: React.FC<PipelineAugmentRunsProps> = (
  props: PipelineAugmentRunsProps,
) => {
  const newProps = Object.assign({}, props);
  newProps.data = augmentRunsToData(props);
  return <List {...props} data={augmentRunsToData(props)} Header={PipelineHeader} Row={PipelineRow} />;
};

export default PipelineAugmentRuns;
