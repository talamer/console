/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import { Nav, NavList, PageSidebar } from '@patternfly/react-core';
import { HrefLink, NavSection, ResourceClusterLink, ResourceNSLink } from '../../../components/nav';
import { FLAGS } from '../../../features';
import { BuildModel, PipelineModel } from '../../../models';

interface DevConsoleNavigationProps {
  isNavOpen: boolean;
  location: string;
  onNavSelect: () => void;
  onToggle: () => void;
}

const DevNavSection = NavSection as React.ComponentClass<any>;

export const PageNav = (props: DevConsoleNavigationProps) => {
  //Generic implementation of isActive functionality
  const isActive = (includes:Array<string>, position:string, excludes:Array<string>) => {
    if (includes.length < 1 || includes[0] === '') {
      return false;
    }
    let includeFlag = false;
    switch (position) {
      case 'any' : includes.map( keyword => includeFlag = includeFlag || props.location.includes(keyword));
        break;
      case 'start': includes.map( keyword => includeFlag = includeFlag || props.location.startsWith(keyword));
        break;
      default : includes.map( keyword => includeFlag = includeFlag || props.location.endsWith(keyword));
        break;
    }
    //Example call for exclude isActive(['pipeline'],'',['pipelinerun'])
    if (excludes.length <1 || excludes[0] === '') {
      return includeFlag;
    }
    let excludeFlag = false;
    excludes.map( keyword => excludeFlag = excludeFlag || props.location.includes(keyword));
    return includeFlag && !excludeFlag;
  };

  return (
    <Nav aria-label="Nav" onSelect={props.onNavSelect} onToggle={props.onToggle}>
      <NavList>
        <HrefLink href="/add" name="+Add" activePath="/dev/add" isActive={isActive(['add'],'',[''])} />
        <HrefLink
          href="/topology"
          name="Topology"
          activePath="/dev/topology"
          isActive={isActive(['topology'],'',[''])}
        />
        <ResourceNSLink
          resource="buildconfigs"
          name={BuildModel.labelPlural}
          isActive={isActive(['buildconfigs'],'',[''])}
        />
        <ResourceNSLink
          resource="pipelines"
          name={PipelineModel.labelPlural}
          isActive={isActive(['pipelines','pipelinerun'],'any',[''])}
        />
        <DevNavSection title="Advanced">
          <ResourceClusterLink resource="projects" name="Projects" required={FLAGS.OPENSHIFT} />
          <HrefLink
            href="/overview"
            name="Status"
            activePath="/overview"
            required={FLAGS.OPENSHIFT}
          />
          <HrefLink
            href="/status"
            name="Status"
            activePath="/status"
            disallowed={FLAGS.OPENSHIFT}
          />
          <ResourceNSLink resource="events" name="Events" />
          <HrefLink href="/search" name="Search" activePath="/search" />
        </DevNavSection>
      </NavList>
    </Nav>
  );
};

export const DevConsoleNavigation: React.FunctionComponent<DevConsoleNavigationProps> = (
  props: DevConsoleNavigationProps,
) => {
  return <PageSidebar nav={<PageNav {...props} />} isNavOpen={props.isNavOpen} />;
};

const mapStateToProps = (state) => {
  return {
    location: state.UI.get('location'),
  };
};

export default connect(mapStateToProps)(DevConsoleNavigation);
