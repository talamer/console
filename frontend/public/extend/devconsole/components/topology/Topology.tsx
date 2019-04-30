/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Button } from 'patternfly-react';
import { ExpandIcon, SearchPlusIcon, SearchMinusIcon } from '@patternfly/react-icons';
import { nodeProvider, edgeProvider, groupProvider } from './shape-providers';
import Graph from './Graph';
import GraphToolbar from './GraphToolbar';
import { GraphApi, TopologyDataModel } from './topology-types';
import TopologySideBar from './TopologySideBar';

type State = {
  selected?: string;
};

export interface TopologyProps {
  data: TopologyDataModel;
}

export default class Topology extends React.Component<TopologyProps, State> {
  state: State = {
    selected: null,
  };

  onSelect = (nodeId: string) => {
    this.setState(({ selected }) => {
      return { selected: !nodeId || selected === nodeId ? null : nodeId };
    });
  };

  onSidebarClose = () => {
    this.setState({ selected: null });
  };

  renderToolbar = (graphApi: GraphApi) => (
    <GraphToolbar>
      <Button onClick={graphApi.zoomIn} title="Zoom In" aria-label="Zoom In">
        <SearchPlusIcon />
      </Button>
      <Button onClick={graphApi.zoomOut} title="Zoom Out" aria-label="Zoom Out">
        <SearchMinusIcon />
      </Button>
      <Button onClick={graphApi.resetView} title="Reset Zoom" aria-label="Reset Zoom">
        <ExpandIcon />
      </Button>
    </GraphToolbar>
  );

  render() {
    const { data: { graph, topology } } = this.props;
    const { selected } = this.state;
    return (
      <React.Fragment>
        <Graph
          graph={graph}
          topology={topology}
          nodeProvider={nodeProvider}
          edgeProvider={edgeProvider}
          groupProvider={groupProvider}
          selected={selected}
          onSelect={this.onSelect}
        >
          {this.renderToolbar}
        </Graph>
        {this.state.selected ? (
          <TopologySideBar
            item={topology[selected]}
            selected={selected}
            onClose={this.onSidebarClose}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
