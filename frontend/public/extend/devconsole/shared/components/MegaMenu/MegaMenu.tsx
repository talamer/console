/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Backdrop } from '@patternfly/react-core';
import './MegaMenu.scss';

export interface MegaMenuProps {
  children?: React.ReactNode;
  isNavOpen: boolean;
  onClose: () => void;
}

export default class MegaMenu extends React.PureComponent<MegaMenuProps> {
  private node: HTMLElement;

  private _handleClickOutside = (event: MouseEvent) => {
    if (this.node && !this.node.contains(event.target as HTMLElement)) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    if (this.props.isNavOpen) {
      document.addEventListener('click', this._handleClickOutside);
    }
  }

  componentDidUpdate() {
    if (this.props.isNavOpen) {
      document.addEventListener('click', this._handleClickOutside);
    } else {
      document.removeEventListener('click', this._handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutside);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isNavOpen && <Backdrop style={{ position: 'absolute', zIndex: 100 }} />}
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
