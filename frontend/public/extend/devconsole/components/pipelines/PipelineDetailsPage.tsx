/*eslint-disable no-undef, no-unused-vars */
import * as React from 'react';
import { DetailsPage, DetailsPageProps } from '../../../../components/factory';
import { Kebab, navFactory } from '../../../../components/utils';
import PipelinEnvironmentComponent from './PipelineEnvironment';
import PipelineDetails from './PipelineDetails';
import { PipelineModel, PipelineRunModel } from '../../../../models';
import PipelineRuns from './PipelineRuns';
import { k8sGet, k8sList } from '../../../../module/k8s';
import { triggerPipeline, rerunPipeline } from '../../utils/pipeline-actions';
import { getLatestRun } from '../../utils/pipeline-augment';

interface PipelineDetailsPageStates {
  menuActions: Function[];
}

class PipelineDetailsPage extends React.Component<DetailsPageProps, PipelineDetailsPageStates> {
  constructor(props) {
    super(props);
    this.state = { menuActions: [] };
  }
  componentDidMount() {
    k8sGet(PipelineModel, this.props.name, this.props.namespace).then((res) => {
      k8sList(PipelineRunModel, {
        labelSelector: { 'tekton.dev/pipeline': res.metadata.name },
      }).then((listres) => {
        this.setState({
          menuActions: [
            triggerPipeline(res, getLatestRun({ data: listres }, 'creationTimestamp'), 'pipelines'),
            rerunPipeline(res, getLatestRun({ data: listres }, 'creationTimestamp'), 'pipelines'),
            Kebab.factory.Edit,
            Kebab.factory.ModifyLabels,
            Kebab.factory.ModifyAnnotations,
            Kebab.factory.Delete,
          ],
        });
      });
    });
  }
  render() {
    return (
      <DetailsPage
        {...this.props}
        menuActions={this.state.menuActions}
        pages={[
          navFactory.details(PipelineDetails),
          navFactory.editYaml(),

          {
            href: 'Runs',
            name: 'Pipeline Runs',
            component: PipelineRuns,
          },
          navFactory.envEditor(PipelinEnvironmentComponent),
        ]}
      />
    );
  }
}

export default PipelineDetailsPage;
