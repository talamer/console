/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as d3 from 'd3';
import * as ReactDOM from 'react-dom';
import {
  ViewNode,
  ViewEdge,
  ViewGraphData,
  NodeProvider,
  EdgeProvider,
  NodeProps,
  TopologyDataMap,
  TopologyDataObject,
} from './topology-types';
import SvgDefsProvider from '../../shared/components/svg/SvgDefsProvider';

interface State {
  zoomTransform?: string;
}

export interface D3ForceDirectedRendererProps {
  width: number;
  height: number;
  graph: ViewGraphData;
  topology: TopologyDataMap;
  nodeProvider: NodeProvider;
  edgeProvider: EdgeProvider;
  nodeSize: number;
  selected?: string;
  onSelect?(Node): void;
}

function getEdgeId(d: ViewEdge): string {
  if (typeof d.source === 'string') {
    return `${d.source}_${d.target}`;
  }
  return `${d.source.id}_${d.target.id}`;
}

export default class D3ForceDirectedRenderer extends React.Component<
  D3ForceDirectedRendererProps,
  State
  > {
  state = {
    zoomTransform: null,
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
      .forceSimulation(props.graph.nodes)
      .force('collide', d3.forceCollide().radius(props.nodeSize))
      .force('link', d3.forceLink(props.graph.edges).id((d: ViewNode) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(props.width / 2, props.height / 2));
  }

  componentDidMount() {
    this.zoom = d3
      .zoom()
      .scaleExtent([0.4, 5])
      .on('zoom', this.onZoom);
    this.zoom(this.$svg);

    this.simulation.on('tick', () => this.forceUpdate());
    this.simulation.restart();
  }

  componentWillUpdate(nextProps) {
    let restart = false;
    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.simulation.force('center', d3.forceCenter(nextProps.width / 2, nextProps.height / 2));
      restart = true;
    }
    if (nextProps.graph !== this.props.graph) {
      this.simulation.nodes(nextProps.graph.nodes);
      // @ts-ignore
      this.simulation.force('link').links(nextProps.graph.edges);
      this.simulation.alpha(0.2);
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
    const { nodes, edges } = this.props.graph;
    const { zoomTransform } = this.state;
    return (
      <svg height={height} width={width} ref={this.refSvg}>
        <SvgDefsProvider>
          <g transform={zoomTransform}>
            <g>
              {edges.map((edge) => {
                const data = topology[edge.id];
                const Component = edgeProvider(edge, data);
                return <Component {...edge} key={getEdgeId(edge)} data={data} />;
              })}
            </g>
            <g>
              {nodes.map((node) => {
                const Component = nodeProvider(node, topology[node.id]);
                return (
                  <ViewWrapper
                    component={Component}
                    size={nodeSize}
                    {...node}
                    node={node}
                    data={topology[node.id]}
                    key={node.id}
                    selected={node.id === selected}
                    onSelect={onSelect ? () => onSelect(node) : null}
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
