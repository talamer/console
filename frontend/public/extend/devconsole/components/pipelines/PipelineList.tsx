import * as React from 'react';
import { Firehose } from '../../../../components/utils';
import { List } from '../../../../components/factory';
import PipelineHeader from './PipelineHeader';
import PipelineRow from './PipelineRow';

const augmentRunsToData = (p) => {
  let newData = p.data;
  if (!p.propsReferenceForRuns || !(p.propsReferenceForRuns.length > 0)) {
    return p.data;
  }
  p.propsReferenceForRuns.forEach(
    (reference, i) => (newData[i].latestRun = getLatestRun(p[reference], 'creationTimeStamp')),
  );
  return newData;
};

const getLatestRun = (runs, field) => {
  console.log('glr', runs, field);
  if (!runs || !runs.data || !(runs.data.length > 0) || !field) {
    return {};
  }
  switch (field) {
    case 'startTime':
    case 'completionTime':
      let latestRun = runs.data[0];
      for (let i = 1; i < runs.data.length; i++) {
        latestRun =
          runs.data[i] &&
          runs.data[i].status &&
          runs.data[i].hasOwnProperty(field) &&
          runs.data[i][field] > latestRun[field]
            ? runs.data[i]
            : latestRun;
      }
      return latestRun;
    default:
      return runs.data[runs.data.length - 1];
  }
};

const PipelineAugmentRuns = (props) => {
  let newProps = Object.assign({}, props);
  newProps.data = augmentRunsToData(props);
  console.log('np', newProps);
  return <List {...newProps} Header={PipelineHeader} Row={PipelineRow} />;
};

const PipelineList = (props) => {
  let propsReferenceForRuns = [];
  const getResources = (p) => {
    let resources = [];
    if (p && p.data && p.data.length > 0) {
      p.data.forEach((pipeline, i) => {
        propsReferenceForRuns.push('PipelineRun_' + i);
        resources.push({
          kind: 'PipelineRun',
          namespace: pipeline.metadata.namespace,
          isList: true,
          prop: 'PipelineRun_' + i,
          selector: {
            'tekton.dev/pipeline': pipeline.metadata.name,
          },
        });
      });
      return resources;
    }
    return null;
  };
  let resources = getResources(props);
  return resources && resources.length > 0 ? (
    <Firehose resources={resources}>
      <PipelineAugmentRuns {...props} propsReferenceForRuns={propsReferenceForRuns} />
    </Firehose>
  ) : (
    <List {...props} Header={PipelineHeader} Row={PipelineRow} />
  );
};
export default PipelineList;
