/*eslint-disable no-undef, no-unused-vars*/
import * as React from 'react';
import { connect } from 'react-redux';
import { Title, Text, TextVariants } from '@patternfly/react-core';
import { CodeIcon, CogsIcon } from '@patternfly/react-icons';
import { getActivePerspective } from '../../../../ui/ui-selectors';
import { getClusterName } from '../utils/cluster-name';
import './SideBarHeader.scss';

type SideBarHeaderProps = {
  activePerspective: string;
};

const getNameBasedOnActivePerspective = (activePerspective: string): React.ReactNode => {
  switch (activePerspective) {
    case 'dev':
      return (
        <React.Fragment>
          <CodeIcon /> Developer
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          <CogsIcon /> Administrator
        </React.Fragment>
      );
  }
};

export const SideBarHeader: React.FC<SideBarHeaderProps> = ({ activePerspective }) => (
  <div className="odc-side-bar-header">
    <Title className="odc-side-bar-header__title" size="md">
      {getNameBasedOnActivePerspective(activePerspective)}
    </Title>
    <Text className="odc-side-bar-header__description" component={TextVariants.small}>
      {/**Not Sure if this is correct way to get cluster name*/}
      Cluster: {getClusterName()}
    </Text>
  </div>
);

const mapStateToProps = (state) => {
  return {
    activePerspective: getActivePerspective(state),
  };
};
export default connect(mapStateToProps, null, null, { pure: true })(SideBarHeader);
