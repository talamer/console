/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Backdrop } from '@patternfly/react-core';
import './MegaMenu.scss';

export interface MegaMenuProps {
  children: React.ReactNode;
  isNavOpen: boolean;
  onNavToggle: (MouseEvent) => void;
}

export default class MegaMenu extends React.Component<MegaMenuProps> {
  constructor(props: MegaMenuProps) {
    super(props);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  public node: any;
  public navToggleButton: HTMLElement;

  public _handleClickOutside = (event: MouseEvent) => {
    if (
      this.props.isNavOpen &&
      this.node &&
      !this.node.contains(event.target) &&
      !(event.target as HTMLElement).className.includes('pf-c-button')
    ) {
      this.props.onNavToggle(event);
    }
  };

  componentWillMount() {
    document.addEventListener('mousedown', this._handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isNavOpen && <Backdrop className="backdrop" />}
        <div
          ref={(node) => (this.node = node)}
          className={`odc-mega-menu ${this.props.isNavOpen ? 'is-open' : ''}`}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
