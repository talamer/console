/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Button } from 'patternfly-react';
import { ExpandIcon, SearchPlusIcon, SearchMinusIcon } from '@patternfly/react-icons';
import { nodeProvider, edgeProvider } from './shape-providers';
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
    return (
      <React.Fragment>
        <Graph
          graph={this.props.data.graph}
          topology={this.props.data.topology}
          nodeProvider={nodeProvider}
          edgeProvider={edgeProvider}
          selected={this.state.selected}
          onSelect={this.onSelect}
        >
          {this.renderToolbar}
        </Graph>
        {this.state.selected ? (
          <TopologySideBar
            item={this.props.data.topology[this.state.selected]}
            selected={this.state.selected}
            onClose={() => this.setState({selected: null})}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
