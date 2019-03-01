import * as React from 'react';
import { Nav, NavList, PageSidebar} from '@patternfly/react-core';
import { HrefLink, NavSection } from '../../../components/nav';
// import { FLAGS } from '../../../features';

interface IProps {
  isNavOpen :boolean,
  onNavSelect:() => void,
  onToggle:() => void
};

const DevNavSection = NavSection as any;

export default class DevConsoleNavigation extends React.Component<IProps> {

  constructor(props:any) {
    super(props)
  }

  public PageNav(onNavSelect : any) {
    return (
      <Nav aria-label="Nav" onSelect={onNavSelect} onToggle={this.props.onToggle}>
        <NavList>
          <DevNavSection title="Menu1">
            <HrefLink href="/devconsole/submenu1" name="Sub Menu 1" activePath="/devconsole/submenu1/" />
            <HrefLink href="/devconsole/submenu2" name="Sub Menu 2" activePath="/devconsole/submenu2/" />
          </DevNavSection>
          <DevNavSection title="Menu 2">
            <HrefLink href="/devconsole/submenu-1" name="Sub Menu 1" activePath="/devconsole/submenu-1/" />
            <HrefLink href="/devconsole/submenu-2" name="Sub Menu 2" activePath="/devconsole/submenu-2/" />
          </DevNavSection>
          <DevNavSection title="Menu 3">
            <HrefLink href="/devconsole/submenu_1" name="Sub Menu 1" activePath="/devconsole/submenu_1/" />
            <HrefLink href="/devconsole/submenu_2" name="Sub Menu 2" activePath="/devconsole/submenu_2/" />
          </DevNavSection>
        </NavList>
      </Nav>
    )
  }

  public render() {
    return <PageSidebar nav={this.PageNav(this.props.onNavSelect)} isNavOpen={this.props.isNavOpen} />;
    }
  };
