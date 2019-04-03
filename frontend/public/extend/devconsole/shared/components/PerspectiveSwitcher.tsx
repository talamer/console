/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as openshiftIconImg from '../../../../imgs/openshift-favicon.png';
import MegaMenu from './MegaMenu/MegaMenu';
import MegaMenuItem from './MegaMenu/MegaMenuItem';
import MegaMenuSection from './MegaMenu/MegaMenuSection';
import MegaMenuNav from './MegaMenu/MegaMenuNav';

export interface PerspectiveSwitcherProps {
  isNavOpen: boolean,
  onNavToggle: (MouseEvent) => void,
}

const PerspectiveSwitcher: React.FunctionComponent<PerspectiveSwitcherProps> = (props: PerspectiveSwitcherProps) => (
  <MegaMenu isNavOpen={props.isNavOpen}>
    <MegaMenuNav onSelect={props.onNavToggle}>
      <MegaMenuSection>
        <MegaMenuItem to="https://cloud.openshift.com" title="Multi-Cluster Manager" icon={openshiftIconImg} externalLink/>
        <MegaMenuItem to="/k8s/cluster/projects" title="Administrator" icon={openshiftIconImg}/>
        <MegaMenuItem to="/devops" title="Developer" icon={openshiftIconImg}/>
      </MegaMenuSection>
    </MegaMenuNav>
  </MegaMenu>
);

export default PerspectiveSwitcher;
