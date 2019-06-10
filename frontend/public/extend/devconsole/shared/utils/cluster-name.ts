/* eslint-disable no-undef */
declare global {
  interface Window {
    SERVER_FLAGS: {
      kubeAPIServerURL: string;
    };
  }
}

export function getClusterName() {
  const server = window.SERVER_FLAGS.kubeAPIServerURL;
  const url = new URL(server);
  return url.host.replace(/\./g, '-');
}
