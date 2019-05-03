import { getActivePerspective } from '../../ui/ui-selectors';
import { FLAGS } from '../../features';
import store from '../../redux';

/* eslint-disable no-unused-vars, no-undef */
export enum PerspectiveFlagMap {
  admin = FLAGS.OPENSHIFT,
  dev = FLAGS.SHOW_DEV_CONSOLE
}

// FIXME - Remove use of global redux store.
export const pathWithPerspectiveFromStore = path => {
  const activePerspective = getActivePerspective(store.getState());
  return activePerspective !== 'admin' ? `/${activePerspective}${path}` : path;
};

export const pathWithPerspective = (activePerspective, path) => {
  return activePerspective !== 'admin' ? `/${activePerspective}${path}` : path;
};
