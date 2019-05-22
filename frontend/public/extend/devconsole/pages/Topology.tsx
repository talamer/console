/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { match as RMatch } from 'react-router';
import ODCEmptyState from '../shared/components/EmptyState/EmptyState';
import { StatusBox } from '../../../components/utils';
import TopologyDataController, { RenderProps } from '../components/topology/TopologyDataController';
import Topology from '../components/topology/Topology';
import { connect } from 'react-redux';
import { getActiveApplication } from '../../../ui/ui-selectors';

export interface TopologyPageProps {
  match: RMatch<{
    ns?: string;
  }>;
  activeApplication: string;
}

const EmptyMsg = () => <ODCEmptyState title="Topology" />;

export function renderTopology({ loaded, loadError, data }: RenderProps) {
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
        <Topology data={data} />
      </div>
    </StatusBox>
  );
}

const TopologyPage: React.FC<TopologyPageProps> = ({ match, activeApplication }) => {
  const namespace = match.params.ns;

  return (
    <React.Fragment>
      <Helmet>
        <title>Topology</title>
      </Helmet>
      {namespace ? (
        <TopologyDataController application={activeApplication} namespace={namespace} render={renderTopology} />
      ) : (
        <EmptyMsg />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    activeApplication: getActiveApplication(state),
  };
}

export default connect(mapStateToProps)(TopologyPage);
