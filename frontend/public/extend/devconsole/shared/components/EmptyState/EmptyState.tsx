/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import {
  Title,
  EmptyState,
  EmptyStateBody,
  EmptyStateSecondaryActions,
} from '@patternfly/react-core';
import { connect } from 'react-redux';
import PerspectiveLink from '../PerspectiveLink';
import { formatNamespacedRouteForResource } from '../../../../../ui/ui-actions';
import './EmptyState.scss';

interface StateProps {
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
    <EmptyStateSecondaryActions>
      <PerspectiveLink className="pf-c-button pf-m-primary" to="/git-import">
        Import from Git
      </PerspectiveLink>
      <PerspectiveLink className="pf-c-button pf-m-primary" to="/catalog">
        Browse Catalog
      </PerspectiveLink>
      <PerspectiveLink
        className="pf-c-button pf-m-primary"
        to={`/deploy-image?preselected-ns=${props.activeNamespace}`}
      >
        Deploy Image
      </PerspectiveLink>
      <PerspectiveLink
        className="pf-c-button pf-m-primary"
        to={formatNamespacedRouteForResource('import', props.activeNamespace)}
      >
        Import YAML
      </PerspectiveLink>
      <PerspectiveLink className="pf-c-button pf-m-primary" to="/catalog?category=databases">
        Add Database
      </PerspectiveLink>
    </EmptyStateSecondaryActions>
  </EmptyState>
);

const mapStateToProps = (state): StateProps => {
  return {
    activeNamespace: state.UI.get('activeNamespace'),
  };
};

export default connect<StateProps>(mapStateToProps)(ODCEmptyState);
