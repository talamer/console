import * as React from 'react';
import { DetailsPage } from '../../../../components/factory';
import {
  navFactory,
} from '../../../../components/utils';
import { breadcrumbsForOwnerRefs } from '../../../../components/utils/breadcrumbs';
import DevPipelinEnvironmentComponent from './PipelineEnvironment';
import DevPipelineDetails from './PipelineDetails';
import DevPipelineRuns from './PipelineRuns';




const DevPipelineDetailsPage = props => <DetailsPage
  {...props}
  breadcrumbsFor={obj => breadcrumbsForOwnerRefs(obj).concat({
    name: 'Pipeline/' + obj.metadata.name.charAt(0).toUpperCase(),
    path: 'dev/k8s/pipeline',
  })}
    pages={[
    navFactory.details(DevPipelineDetails),
    navFactory.editYaml(),
    
    {
      href: 'Runs',
      name: 'Runs',
      component: DevPipelineRuns,
    },
    navFactory.envEditor(DevPipelinEnvironmentComponent),
  ]}
/>;

export default DevPipelineDetailsPage;