/* eslint-disable no-undef */
import { Store } from 'react-redux';

interface StoreProps<S> {
  store?: Store<S>;
}

export function getStoreTypedComponent<T = any, P = {}, S = any>(
  component: React.ComponentClass<P, S>,
): React.ComponentClass<P & StoreProps<T>> {
  return component as any;
}

export const mockServerFlags = (SERVER_FLAGS: { kubeAPIServerURL?: string }) =>
  ((window) => {
    const windowServerFlags = JSON.stringify(window.SERVER_FLAGS);
    delete window.SERVER_FLAGS;
    Object.defineProperty(window, 'SERVER_FLAGS', {
      configurable: true,
      writable: true,
      value: JSON.parse(windowServerFlags),
    });
    if (SERVER_FLAGS) {
      Object.assign(window.SERVER_FLAGS, SERVER_FLAGS);
    }
  })(window);
