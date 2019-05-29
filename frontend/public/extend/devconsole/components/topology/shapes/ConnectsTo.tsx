import * as React from 'react';
import { EdgeProps } from '../topology-types';
import BaseEdge from './BaseEdge';

type ConnectsToProps = EdgeProps;

const ConnectsTo: React.FC<ConnectsToProps> = ({ source, target, nodeSize }) => (
  <BaseEdge source={source} target={target} targetArrow={true} sourceArrow={false} nodeSize={nodeSize} />
);

export default ConnectsTo;
