/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Modal } from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';
import './PerspectiveSwitcher.scss';
import * as openshiftIconImg from '../../../../imgs/openshift-favicon.png';
import { UIActions } from '../../../../ui/ui-actions';
import { connect } from 'react-redux';

export interface PerspectiveSwitcherProps {
  isNavOpen: boolean;
  activePerspective: string;
  onNavToggle: (MouseEvent) => void;
  onChangePerspective: (string) => void;
}

export const PerspectiveSwitcher: React.FunctionComponent<PerspectiveSwitcherProps> = (
  props: PerspectiveSwitcherProps,
) => (
  <Modal
    isLarge
    title=""
    isOpen={props.isNavOpen}
    onClose={props.onNavToggle}
    className="devops-perspective-switcher"
  >
    <nav className="pf-c-nav">
      <ul className="pf-c-nav__simple-list">
        <li className="pf-c-nav__item">
          <NavLink
            to="/k8s/cluster/projects"
            onClick={(e) => {
              props.onChangePerspective('admin');
              props.onNavToggle(e);
            }}
            className="pf-c-nav__link"
            isActive={() => props.activePerspective === 'admin'}
            activeClassName="pf-m-current"
          >
            <img
              src={openshiftIconImg}
              alt="Admin Console"
              className="devops-perspective-switcher__openshift-logo"
            />{' '}
            Administrator
          </NavLink>
        </li>
        <li className="pf-c-nav__item">
          <NavLink
            to="/dev"
            onClick={(e) => {
              props.onChangePerspective('dev');
              props.onNavToggle(e);
            }}
            className="pf-c-nav__link"
            activeClassName="pf-m-current"
          >
            <img
              src={openshiftIconImg}
              alt="Dev Console"
              className="devops-perspective-switcher__openshift-logo"
            />{' '}
            Developer
          </NavLink>
        </li>
      </ul>
    </nav>
  </Modal>
);

const mapStateToProps = (state) => {
  return {
    activePerspective: state.UI.get('activePerspective'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePerspective: (perspective) => {
      dispatch(UIActions.setActivePerspective(perspective));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PerspectiveSwitcher);
