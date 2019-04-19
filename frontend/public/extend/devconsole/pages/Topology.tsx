/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { match as RMatch } from 'react-router';
import ODCEmptyState from '../shared/components/EmptyState/EmptyState';
import { StatusBox, PageHeading } from '../../../components/utils';
import TopologyDataController, { RenderProps } from '../components/topology/TopologyDataController';
import Topology from '../components/topology/Topology';

export interface TopologyPageProps {
  match: RMatch<{
    ns?: string;
  }>;
}

const EmptyMsg = () => <ODCEmptyState title="Topology" />;

function renderTopology({ loaded, loadError, data }: RenderProps) {
  return (
    <StatusBox
      data={data ? data.graph.nodes : null}
      label="Topology"
      loaded={loaded}
      loadError={loadError}
      EmptyMsg={EmptyMsg}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ flexGrow: 0, flexShrink: 0 }}>
          <PageHeading title="Topology" />
        </div>
        <Topology data={data} />
      </div>
    </StatusBox>
  );
}

const TopologyPage: React.FC<TopologyPageProps> = ({ match }) => {
  const namespace = match.params.ns;

  return (
    <React.Fragment>
      <Helmet>
        <title>Topology</title>
      </Helmet>
      {namespace ? (
        <TopologyDataController namespace={namespace} render={renderTopology} />
      ) : (
        <EmptyMsg />
      )}
    </React.Fragment>
  );
};

export default TopologyPage;
