/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import { connect } from 'react-redux';
import PerspectiveLink from '../PerspectiveLink';
import { formatNamespacedRouteForResource } from '../../../../../ui/ui-actions';
import './EmptyState.scss';
import { PageHeading } from '../../../../../components/utils';

interface StateProps {
  activeNamespace: string;
}

export interface ODCEmptyStateOwnProps {
  title: string;
}

export type ODCEmptyStateProps = StateProps & ODCEmptyStateOwnProps;

const ODCEmptyState: React.FunctionComponent<ODCEmptyStateProps> = (props: ODCEmptyStateProps) => (
  <React.Fragment>
    <PageHeading title={props.title} />
    <div className="odc-empty-state">
      <Grid gutter="md">
        <GridItem sm={6} md={6} lg={4}>
          <Card className="odc-empty-state__card">
            <CardHeader>Import from Git</CardHeader>
            <CardBody>Import code from your git repository, to be built and deployed </CardBody>
            <CardFooter>
              <PerspectiveLink className="pf-c-button pf-m-secondary" to="/import">
                Import from Git
              </PerspectiveLink>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={6} lg={4}>
          <Card className="odc-empty-state__card">
            <CardHeader>Browse Catalog</CardHeader>
            <CardBody>Browse the catalog to discover, deploy and connect to services</CardBody>
            <CardFooter>
              <PerspectiveLink className="pf-c-button pf-m-secondary" to="/catalog">
                Browse Catalog
              </PerspectiveLink>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={6} lg={4}>
          <Card className="odc-empty-state__card">
            <CardHeader>Deploy Image</CardHeader>
            <CardBody>Deploy an existing image from an image registry or image stream tag</CardBody>
            <CardFooter>
              <PerspectiveLink
                className="pf-c-button pf-m-secondary"
                to={`/deploy-image?preselected-ns=${props.activeNamespace}`}
              >
                Deploy Image
              </PerspectiveLink>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={6} lg={4}>
          <Card className="odc-empty-state__card">
            <CardHeader>Import YAML</CardHeader>
            <CardBody>Create or replace resources from their YAML or JSON definitions.</CardBody>
            <CardFooter>
              <PerspectiveLink
                className="pf-c-button pf-m-secondary"
                to={formatNamespacedRouteForResource('import', props.activeNamespace)}
              >
                Import YAML
              </PerspectiveLink>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem sm={6} md={6} lg={4}>
          <Card className="odc-empty-state__card">
            <CardHeader>Add Database</CardHeader>
            <CardBody>
              Browse the catalog to discover database services to add to your application
            </CardBody>
            <CardFooter>
              <PerspectiveLink
                className="pf-c-button pf-m-secondary"
                to="/catalog?category=databases"
              >
                Add Database
              </PerspectiveLink>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </div>
  </React.Fragment>
);

const mapStateToProps = (state): StateProps => {
  return {
    activeNamespace: state.UI.get('activeNamespace'),
  };
};

export default connect<StateProps>(mapStateToProps)(ODCEmptyState);
