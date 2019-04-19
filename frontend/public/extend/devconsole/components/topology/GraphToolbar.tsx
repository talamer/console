/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import './GraphToolbar.scss';

export interface GraphToolbarProps {
  children: React.ReactNode;
}

const GraphToolbar: React.FC<GraphToolbarProps> = ({ children }: GraphToolbarProps) => (
  <div className="odc-graph-toolbar">{children}</div>
);

export default GraphToolbar;
