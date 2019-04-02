/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Modal } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import './PerspectiveSwitcher.scss';
import * as openshiftIconImg from '../../../../imgs/openshift-favicon.png';
import { connectToFlags, FLAGS, flagPending } from '../../../../features';

export interface PerspectiveSwitcherProps {
  isNavOpen: boolean,
  flags: {[_: string]: boolean},
  onNavToggle: (MouseEvent) => void,
}

class PerspectiveSwitcher extends React.Component<PerspectiveSwitcherProps> {
  
  devconsoleItem() {
    if (!this.props.flags[FLAGS.SHOW_DEV_CONSOLE]) {
      return null;
    }
    return (
      <li className="pf-c-nav__item">
        <NavLink
          to="/devops"
          onClick={this.props.onNavToggle}
          className="pf-c-nav__link"
          activeClassName="pf-m-current"
        >
          <img src={openshiftIconImg} alt="DevOps Console" className="devops-perspective-switcher__openshift-logo"/>  DevOps Console
        </NavLink>
      </li>
    );
  }
  render() {
    const devConsoleEnabled = this.props.flags[FLAGS.SHOW_DEV_CONSOLE];
    if (flagPending(devConsoleEnabled) || !devConsoleEnabled) {
      return null;
    }
    return (
      <Modal
        isLarge
        title=""
        isOpen={this.props.isNavOpen}
        onClose={this.props.onNavToggle}
        className="devops-perspective-switcher">
        <nav className="pf-c-nav">
          <ul className="pf-c-nav__simple-list">
            {this.devconsoleItem()}
            <li className="pf-c-nav__item">
              <NavLink
                to="/k8s/cluster/projects"
                onClick={this.props.onNavToggle}
                className="pf-c-nav__link"
                isActive={(match, { pathname }):boolean => !pathname.startsWith('/devops')}
                activeClassName="pf-m-current"
              >
                <img src={openshiftIconImg} alt="Admin Console" className="devops-perspective-switcher__openshift-logo"/> Admin Console
              </NavLink>
            </li>
          </ul>
        </nav>
      </Modal>
    );
  }
} 

export default connectToFlags(FLAGS.SHOW_DEV_CONSOLE)(PerspectiveSwitcher);
