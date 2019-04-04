import * as React from 'react';
import './MegaMenu.scss';

interface MegaMenuProps {
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
        <div
          ref={(node) => (this.node = node)}
          className={this.props.isNavOpen ? 'odc-mega-menu__expanded' : 'odc-mega-menu__collapsed'}
        >
          {this.props.children}
        </div>
        {this.props.isNavOpen ? <div className="odc-ps__backdrop" /> : ''}
      </React.Fragment>
    );
  }
}
