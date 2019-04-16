import { getActivePerspective } from '../../ui/ui-selectors';
import store from '../../redux';

// FIXME - Remove use of global redux store.
export const pathWithPerspectiveFromStore = path => {
  const activePerspective = getActivePerspective(store.getState());
  return activePerspective !== 'admin' ? `/${activePerspective}${path}` : path;
};

export const pathWithPerspective = (activePerspective, path) => {
  return activePerspective !== 'admin' ? `/${activePerspective}${path}` : path;
};
