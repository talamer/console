/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as d3 from 'd3';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash-es';
import {
  ViewNode,
  ViewEdge,
  NodeProvider,
  EdgeProvider,
  NodeProps,
  TopologyDataMap,
  TopologyDataObject,
  GraphModel,
  Edge,
} from './topology-types';
import SvgDefsProvider from '../../shared/components/svg/SvgDefsProvider';

interface State {
  zoomTransform?: string;
  nodesById: {
    [id: string]: ViewNode;
  };
  nodes: string[];
  edgesById: {
    [id: string]: ViewEdge;
  };
  edges: string[];
  graph: GraphModel;
}

export interface D3ForceDirectedRendererProps {
  width: number;
  height: number;
  graph: GraphModel;
  topology: TopologyDataMap;
  nodeProvider: NodeProvider;
  edgeProvider: EdgeProvider;
  nodeSize: number;
  selected?: string;
  onSelect?(string): void;
}

function getEdgeId(d: Edge): string {
  return d.id || `${d.source}_${d.target}`;
}

export default class D3ForceDirectedRenderer extends React.Component<
  D3ForceDirectedRendererProps,
  State
  > {
  state: State = {
    zoomTransform: null,
    nodesById: {},
    nodes: [],
    edgesById: {},
    edges: [],
    graph: null,
  };

  private $svg: d3.Selection<SVGSVGElement, null, null, undefined>;
  private zoom: d3.ZoomBehavior<Element, {}>;
  private simulation: d3.Simulation<{}, undefined>;

  refSvg = (node: SVGSVGElement) => {
    this.$svg = d3.select(node);
  };

  constructor(props) {
    super(props);

    this.simulation = d3
      .forceSimulation()
      .force('collide', d3.forceCollide().radius(props.nodeSize))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(props.width / 2, props.height / 2));
  }

  static getDerivedStateFromProps(
    nextProps: D3ForceDirectedRendererProps,
    prevState: State,
  ): State {
    if (nextProps.graph === prevState.graph) {
      // do not re-compute state if graph has not changed
      return prevState;
    }

    const { nodes, edges, nodesById, edgesById } = prevState;

    // Not the most efficient checks but ensures that if the nodes and edges are the same,
    // then we re-use the old state.
    // If nodes or edges change, re-create the state but re-use the old positions of the nodes.

    let newNodesById = nodesById;
    let newNodes = nextProps.graph.nodes.map((d) => d.id);
    if (_.isEqual(newNodes, nodes)) {
      newNodes = nodes;
    } else {
      newNodesById = nextProps.graph.nodes.reduce(
        (acc, d) => {
          acc[d.id] = {
            x: nextProps.width / 2,
            y: nextProps.height / 2,
            ...nodesById[d.id],
            id: d.id,
            type: d.type,
            size: nextProps.nodeSize,
          };
          return acc;
        },
        {} as { [id: string]: ViewNode },
      );
    }

    let newEdgesById = edgesById;
    let newEdges = nextProps.graph.edges.map((d) => getEdgeId(d));
    if (newNodes === nodes && _.isEqual(newEdges, edges)) {
      newEdges = edges;
    } else {
      newEdgesById = nextProps.graph.edges.reduce(
        (acc, d) => {
          const id = getEdgeId(d);
          acc[id] = {
            ...edgesById[id],
            id,
            type: d.type,
            source: newNodesById[d.source],
            target: newNodesById[d.target],
          };
          return acc;
        },
        {} as { [id: string]: ViewEdge },
      );
    }

    return {
      ...prevState,
      graph: nextProps.graph,
      nodesById: newNodesById,
      nodes: newNodes,
      edgesById: newEdgesById,
      edges: newEdges,
    };
  }

  componentDidMount() {
    this.zoom = d3
      .zoom()
      .scaleExtent([0.4, 5])
      .on('zoom', this.onZoom);
    this.zoom(this.$svg);

    this.simulation
      .nodes(this.state.nodes.map((d) => this.state.nodesById[d]))
      .force(
        'link',
        d3
          .forceLink(this.state.edges.map((d) => this.state.edgesById[d]))
          .id((d: ViewNode) => d.id),
      )
      .on('tick', () => this.forceUpdate())
      .restart();
  }

  componentDidUpdate(prevProps: D3ForceDirectedRendererProps, prevState: State) {
    let restart = false;
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      this.simulation.force('center', d3.forceCenter(this.props.width / 2, this.props.height / 2));
      restart = true;
    }
    if (prevState.nodes !== this.state.nodes || prevState.edges !== this.state.edges) {
      this.simulation
        .nodes(this.state.nodes.map((d) => this.state.nodesById[d]))
        .force(
          'link',
          d3
            .forceLink(this.state.edges.map((d) => this.state.edgesById[d]))
            .id((d: ViewNode) => d.id),
        )
        .alpha(0.2);
      restart = true;
    }
    if (restart) {
      this.simulation.restart();
    }
  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  onZoom = () => {
    this.setState({ zoomTransform: d3.event.transform });
  };

  onNodeEnter = ($node: NodeSelection) => {
    $node.call(
      d3
        .drag()
        .on('start', (d) => this.dragstarted(d))
        .on('drag', (d) => this.dragged(d))
        .on('end', (d) => this.dragended(d)),
    );
  };

  private dragCount: number = 0;
  dragstarted = (d) => {
    d3.event.sourceEvent.stopPropagation();
    if (this.dragCount) {
      this.dragCount++;
    }
    d.fx = d.x;
    d.fy = d.y;
  };

  dragged = (d) => {
    if (!this.dragCount && (Math.abs(d.fx - d3.event.x) > 5 || Math.abs(d.fy - d3.event.y) > 5)) {
      this.dragCount++;
      this.simulation.alphaTarget(0.1).restart();
    }
    if (this.dragCount) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
  };

  dragended = (d) => {
    if (this.dragCount) {
      --this.dragCount;
      if (!this.dragCount) {
        this.simulation.alphaTarget(0);
      }
    }
    d.fx = null;
    d.fy = null;
  };

  api() {
    // eslint-disable-next-line consistent-this
    const self = this;
    return {
      zoomIn() {
        self.zoom.scaleBy(self.$svg, 1.5);
      },
      zoomOut() {
        self.zoom.scaleBy(self.$svg, 0.75);
      },
      resetView() {
        self.zoom.transform(self.$svg, d3.zoomIdentity);
      },
    };
  }

  render() {
    const {
      width,
      height,
      nodeProvider,
      edgeProvider,
      nodeSize,
      selected,
      onSelect,
      topology,
    } = this.props;
    const { nodes, edges, nodesById, edgesById, zoomTransform } = this.state;
    return (
      <svg height={height} width={width} ref={this.refSvg}>
        <SvgDefsProvider>
          <g transform={zoomTransform}>
            <g>
              {edges.map((edgeId) => {
                const data = topology[edgeId];
                const viewEdge = edgesById[edgeId];
                const Component = edgeProvider(viewEdge.type);
                return <Component {...viewEdge} key={edgeId} data={data} />;
              })}
            </g>
            <g>
              {nodes.map((nodeId) => {
                const data = topology[nodeId];
                const viewNode = nodesById[nodeId];
                const Component = nodeProvider(viewNode.type);
                return (
                  <ViewWrapper
                    component={Component}
                    size={nodeSize}
                    {...viewNode}
                    node={viewNode}
                    data={data}
                    key={nodeId}
                    selected={nodeId === selected}
                    onSelect={onSelect ? () => onSelect(nodeId) : null}
                    onEnter={this.onNodeEnter}
                  />
                );
              })}
            </g>
          </g>
        </SvgDefsProvider>
      </svg>
    );
  }
}

type NodeSelection = d3.Selection<Element, ViewNode, null, undefined>;

type ViewWrapperProps = NodeProps & {
  component: React.ComponentType<NodeProps>;
  onEnter(NodeSelection): void;
  node: ViewNode;
  data: TopologyDataObject;
};

class ViewWrapper extends React.Component<ViewWrapperProps> {
  private $node: NodeSelection;

  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.$node = d3.select(ReactDOM.findDOMNode(this)).datum(this.props.node);
    this.props.onEnter && this.props.onEnter(this.$node);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.node !== this.props.node) {
      // we need to update the data so that d3 apis get the correct new node
      this.$node.datum(this.props.node);
    }
  }

  render() {
    const { component: Component, onEnter, node, ...other } = this.props;
    return <Component {...other} />;
  }
}
