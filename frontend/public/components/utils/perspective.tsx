import { getActivePerspective } from '../../ui/ui-selectors';
import store from '../../redux';

// FIXME - Remove use of global redux store.
export const pathWithPerspective = path => {
  const activePerspective = getActivePerspective(store.getState());
  return activePerspective !== 'admin' ? `/${activePerspective}${path}` : path;
};
