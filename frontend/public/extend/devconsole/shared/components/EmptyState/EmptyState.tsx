/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Title, EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { connect } from 'react-redux';
import { getActiveNamespace, getActivePerspective } from '../../../../../ui/ui-selectors';
import { PerspectiveLink } from '../PerspectiveLink';
import { formatNamespacedRouteForResource } from '../../../../../ui/ui-actions';
import './EmptyState.scss';

interface StateProps {
  activePerspective: string;
  activeNamespace: string;
}

export type ODCEmptyStateProps = StateProps;

const ODCEmptyState: React.FunctionComponent<ODCEmptyStateProps> = (props: ODCEmptyStateProps) => (
  <EmptyState className="odc-empty-state">
    <Title size="xl">Get started with your project.</Title>
    <EmptyStateBody>
      Add content to your project from the catalog of web frameworks, databases, and other
      components. You may also deploy an existing image or create resources using YAML definitions.
    </EmptyStateBody>
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        margin: '32px',
      }}
    >
      <PerspectiveLink
        className="btn btn-primary"
        activePerspective={props.activePerspective}
        to="/catalog"
      >
        Browse Catalog
      </PerspectiveLink>
      <PerspectiveLink
        className="btn btn-primary"
        activePerspective={props.activePerspective}
        to={`/deploy-image?preselected-ns=${props.activeNamespace}`}
      >
        Deploy Image
      </PerspectiveLink>
      <PerspectiveLink
        className="btn btn-primary"
        activePerspective={props.activePerspective}
        to={formatNamespacedRouteForResource('import', props.activeNamespace)}
      >
        Import YAML
      </PerspectiveLink>
    </div>
  </EmptyState>
);

const mapStateToProps = (state): StateProps => {
  return {
    activePerspective: getActivePerspective(state),
    activeNamespace: getActiveNamespace(state),
  };
};

export default connect<StateProps, {}, {}>(mapStateToProps, () => ({}))(ODCEmptyState);
