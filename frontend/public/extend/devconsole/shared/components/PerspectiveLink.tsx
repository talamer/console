import * as React from 'react';
import { LinkProps, Link } from 'react-router-dom';
import { getActivePerspective } from '../../../../ui/ui-selectors';
import { connect } from 'react-redux';

interface StateProps {
  activePerspective: string;
}

type PerspectiveLinkProps = StateProps & LinkProps;

export const PerspectiveLink: React.FunctionComponent<PerspectiveLinkProps> = (
  props: PerspectiveLinkProps,
) => {
  const _pathWithPerspective = (activePerspective, path) => {
    return activePerspective !== 'admin' ? `/${activePerspective}${path}` : path;
  };
  return (
    <Link {...props} to={_pathWithPerspective(props.activePerspective, props.to)}>
      {props.children}
    </Link>
  );
};

const mapStateToProps = (state): StateProps => {
  return {
    activePerspective: getActivePerspective(state),
  };
};

export default connect<StateProps, {}, LinkProps>(mapStateToProps)(PerspectiveLink);
