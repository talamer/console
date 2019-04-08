/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { LinkProps, Link } from 'react-router-dom';
import { getActivePerspective } from '../../../../ui/ui-selectors';
import { connect } from 'react-redux';
import { pathWithPerspective } from '../../../../components/utils/perspective';

interface StateProps {
  activePerspective: string;
}

export type PerspectiveLinkProps = StateProps & LinkProps;

export const PerspectiveLink: React.FunctionComponent<PerspectiveLinkProps> = (
  props: PerspectiveLinkProps,
) => {
  const { activePerspective, to, ...linkProps } = props;
  return (
    <Link {...linkProps} to={pathWithPerspective(activePerspective, to)}>
      {props.children}
    </Link>
  );
};

const mapStateToProps = (state): StateProps => {
  return {
    activePerspective: getActivePerspective(state),
  };
};

export default connect<StateProps, {}, LinkProps>(
  mapStateToProps,
  () => ({}),
)(PerspectiveLink);
