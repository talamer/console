import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash-es';
import { Nav, NavExpandable, NavItem, NavList, PageSidebar } from '@patternfly/react-core';

import { FLAGS, featureReducerName, flagPending } from '../../../features';

import { history, stripBasePath } from '../../../components/utils';

const stripNS = href => {
    href = stripBasePath(href);
    return href.replace(/^\/?k8s\//, '').replace(/^\/?(cluster|all-namespaces|ns\/[^/]*)/, '').replace(/^\//, '');
};

const navSectionStateToProps = (state, {required}) => {
    const flags = state[featureReducerName];
    // `required` can either be a single flag or array. Cast to an array when it's a single value.
    const requiredArray = required ? _.castArray(required) : [];
    const canRender = _.every(requiredArray, flag => flags.get(flag));
  
    return {
      flags, canRender,
      activeNamespace: state.UI.get('activeNamespace'),
      location: state.UI.get('location'),
    };
  };

const NavSection = connect(navSectionStateToProps)(
    class NavSection extends React.Component {
      constructor(props) {
        super(props);
        this.toggle = e => this.toggle_(e);
        this.open = () => this.open_();
        this.state = { isOpen: false, activeChild: null };
  
        const activeChild = this.getActiveChild();
        if (activeChild) {
          this.state.activeChild = activeChild;
          this.state.isOpen = true;
        }
      }
  
      shouldComponentUpdate(nextProps, nextState) {
        const { isOpen } = this.state;
  
        if (isOpen !== nextProps.isOpen) {
          return true;
        }
  
        if (!isOpen && !nextState.isOpen) {
          return false;
        }
  
        return nextProps.location !== this.props.location || nextProps.flags !== this.props.flags;
      }
  
      getActiveChild() {
        const { activeNamespace, location, children } = this.props;
  
        if (!children) {
          return stripBasePath(location).startsWith(this.props.activePath);
        }
  
        const resourcePath = location ? stripNS(location) : '';
  
        //current bug? - we should be checking if children is a single item or .filter is undefined
        return children.filter(c => {
          if (!c) {
            return false;
          }
          if (c.props.startsWith) {
            const active = c.type.startsWith(resourcePath, c.props.startsWith, activeNamespace);
            if (active || !c.props.activePath) {
              return active;
            }
          }
          return c.type.isActive && c.type.isActive(c.props, resourcePath, activeNamespace);
        }).map(c => c.props.name)[0];
      }
  
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.location === this.props.location) {
          return;
        }
  
        const activeChild = this.getActiveChild();
        const state = {activeChild};
        if (activeChild && !prevState.activeChild) {
          state.isOpen = true;
        }
        this.setState(state);
      }
  
      open_() {
        this.setState({isOpen: true});
      }
  
      toggle_(e) {
        const { href, onClick } = this.props;
  
        if (href) {
          e && e.stopPropagation();
          history.push(href);
        }
  
        if (onClick) {
          onClick();
        }
  
        this.setState({isOpen: !this.state.isOpen});
      }
  
      render() {
        if (!this.props.canRender) {
          return null;
        }
  
        const { title, children, activeNamespace, flags } = this.props;
        const { isOpen, activeChild } = this.state;
        const isActive = !!activeChild;
  
        const Children = React.Children.map(children, c => {
          if (!c) {
            return null;
          }
          const {name, required, disallowed} = c.props;
          if (required && (flagPending(flags.get(required)) || !flags.get(required))) {
            return null;
          }
          if (disallowed && (flagPending(flags.get(disallowed)) || flags.get(disallowed))) {
            return null;
          }
          return React.cloneElement(c, {key: name, isActive: name === this.state.activeChild, activeNamespace});
        });
  
        return Children ? (
          <NavExpandable title={title} isActive={isActive} isExpanded={isOpen}>
            {Children}
          </NavExpandable>
        ) : null;
      }
    }
  );

  class NavLink extends React.PureComponent {
    static isActive() {
      throw new Error('not implemented');
    }
  
    get to() {
      throw new Error('not implemented');
    }
  
    static startsWith(resourcePath, someStrings) {
      return _.some(someStrings, s => resourcePath.startsWith(s));
    }
  
    render() {
      const { isActive, id, name, onClick } = this.props;
  
      // onClick is now handled globally by the Nav's onSelect,
      // however onClick can still be passed if desired in certain cases
  
      return (
        <NavItem isActive={isActive}>
          <Link
            id={id}
            to={this.to}
            onClick={onClick}
          >
            {name}
          </Link>
        </NavItem>
      );
    }
  }

  NavLink.defaultProps = {
    required: '',
    disallowed: '',
  };
  
  NavLink.propTypes = {
    required: PropTypes.string,
    disallowed: PropTypes.string,
  };

class HrefLink extends NavLink {
    static isActive(props, resourcePath) {
      const noNSHref = stripNS(props.href);
      return resourcePath === noNSHref || _.startsWith(resourcePath, `${noNSHref}/`);
    }
  
    get to() {
      return this.props.href;
    }
  }
  
  HrefLink.propTypes = {
    name: PropTypes.string.isRequired,
    startsWith: PropTypes.arrayOf(PropTypes.string),
    href: PropTypes.string.isRequired,
  };

export const DevConsoleNavigation = ({ isNavOpen, onNavSelect }) => {
    const PageNav = (
      <Nav aria-label="Nav" onSelect={onNavSelect}>
        <NavList>
          <NavSection title="Menu 1">
            <HrefLink href="/submenu1" name="Sub Menu 1" activePath="/submenu1/" required={FLAGS.OPENSHIFT} />
            <HrefLink href="/submenu2" name="Sub Menu 2" activePath="/submenu2/" required={FLAGS.OPENSHIFT} />
          </NavSection>
          <NavSection title="Menu 2">
            <HrefLink href="/submenu1" name="Sub Menu 1" activePath="/submenu1/" required={FLAGS.OPENSHIFT} />
            <HrefLink href="/submenu2" name="Sub Menu 2" activePath="/submenu2/" required={FLAGS.OPENSHIFT} />
          </NavSection>
          <NavSection title="Menu 3">
            <HrefLink href="/submenu1" name="Sub Menu 1" activePath="/submenu1/" required={FLAGS.OPENSHIFT} />
            <HrefLink href="/submenu2" name="Sub Menu 2" activePath="/submenu2/" required={FLAGS.OPENSHIFT} />
          </NavSection>
        </NavList>
      </Nav>
    );
    return <PageSidebar nav={PageNav} isNavOpen={isNavOpen} />;
  };


DevConsoleNavigation.propTypes = {
    isNavOpen: PropTypes.bool,
    onNavSelect: PropTypes.func,
  };
