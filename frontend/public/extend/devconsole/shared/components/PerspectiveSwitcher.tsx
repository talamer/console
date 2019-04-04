/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as openshiftIconImg from '../../../../imgs/openshift-favicon.png';
import './PerspectiveSwitcher.scss';
import { UIActions } from '../../../../ui/ui-actions';
import { connect, Dispatch } from 'react-redux';
import { getActivePerspective } from '../../../../ui/ui-selectors';
import MegaMenu from './MegaMenu/MegaMenu';
import MegaMenuItem from './MegaMenu/MegaMenuItem';
import MegaMenuSection from './MegaMenu/MegaMenuSection';
import MegaMenuNav from './MegaMenu/MegaMenuNav';

export interface PerspectiveSwitcherProps {
  isNavOpen: boolean;
  onNavToggle: (MouseEvent: MouseEvent) => void;
}

interface StateProps {
  activePerspective: string;
}

 interface DispatchProps {
  onPerspectiveChange(string): void;
}

 type Props = StateProps & DispatchProps & PerspectiveSwitcherProps;

export class PerspectiveSwitcher extends React.Component<Props> {
  constructor(props: Props) {
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
        {this.props.isNavOpen ? <div className="odc-ps__backdrop" /> : ''}
        <div className="mega-menu-wrapper" ref={(node) => (this.node = node)}>
          <MegaMenu isNavOpen={this.props.isNavOpen}>
            <MegaMenuNav onSelect={this.props.onNavToggle}>
              <MegaMenuSection>
                <MegaMenuItem
                  to="https://cloud.openshift.com"
                  title="Multi-Cluster Manager"
                  icon={openshiftIconImg}
                  externalLink
                />
                <MegaMenuItem
                  to="/k8s/cluster/projects"
                  title="Administrator"
                  icon={openshiftIconImg}
                />
                <MegaMenuItem to="/devops" title="Developer" icon={openshiftIconImg} />
              </MegaMenuSection>
            </MegaMenuNav>
          </MegaMenu>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state): StateProps => {
  return {
    activePerspective: getActivePerspective(state),
  };
};

 const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPerspectiveChange: (perspective) => {
      dispatch(UIActions.setActivePerspective(perspective));
    },
  };
};

 export default connect<StateProps, DispatchProps, PerspectiveSwitcherProps>(
  mapStateToProps,
  mapDispatchToProps,
)(PerspectiveSwitcher);
