// eslint-disable-next-line no-unused-vars
import { K8sKind } from '../../../module/k8s';

export const GitSourceModel: K8sKind = {
  label: 'GitSource',
  labelPlural: 'GitSources',
  apiGroup: 'devconsole.openshift.io',
  crd: true,
  apiVersion: 'v1alpha1',
  path: 'gitsources',
  plural: 'gitsources',
  abbr: 'GS',
  namespaced: true,
  kind: 'GitSource',
};

export const GitSourceComponentModel: K8sKind = {
  label: 'Component',
  labelPlural: 'Components',
  apiGroup: 'devconsole.openshift.io',
  crd: true,
  apiVersion: 'v1alpha1',
  path: 'components',
  plural: 'components',
  abbr: 'C',
  namespaced: true,
  kind: 'Component',
};

export const GitSourceAnalysisModel: K8sKind = {
  label: 'GitSourceAnalysis',
  labelPlural: 'GitSourceAnalyses',
  apiGroup: 'devconsole.openshift.io',
  crd: true,
  apiVersion: 'v1alpha1',
  path: 'gitsourceanalyses',
  plural: 'gitsourceanalyses',
  abbr: 'GSA',
  namespaced: true,
  kind: 'GitSourceAnalysis',
};
