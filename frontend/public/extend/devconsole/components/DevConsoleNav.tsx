import * as React from 'react';
import { Nav, NavItem, NavList, PageSidebar, NavExpandable } from '@patternfly/react-core';

interface IProps {
  isNavOpen :boolean,
  onNavSelect:() => void,
  onToggle:() => void
}

export default class DevConsoleNavigation extends React.Component<IProps> {

  constructor(props:any) {
    super(props)
  }

  public PageNav = (path : string) => (
    <Nav aria-label="Nav" onSelect={this.props.onNavSelect} onToggle={this.props.onToggle}>
      <NavList>
        <NavExpandable title="Menu 1"  groupId="grp-1" >
          <NavItem to={path +"/submenu1"} groupId="grp-1" itemId="grp-1_itm-1">
            Sub Menu 1
          </NavItem>
        </NavExpandable>
        <NavExpandable title="Menu 2"  groupId="grp-2" >
          <NavItem to={path +"/submenu1"} groupId="grp-2" itemId="grp-2_itm-1">
            Sub Menu 2
          </NavItem>
        </NavExpandable>
        <NavExpandable title="Menu 3"  groupId="grp-3" >
          <NavItem to={path +"/submenu1"} groupId="grp-3" itemId="grp-3_itm-1">
            Sub Menu 3
          </NavItem>
        </NavExpandable>
      </NavList>
    </Nav>
  )
  public render() {    
    return <PageSidebar nav={this.PageNav("/devconsole")} isNavOpen={this.props.isNavOpen} />;
    }
  };
