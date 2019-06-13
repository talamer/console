/* eslint-disable no-unused-vars, no-undef */
import { K8sResourceKind, ContainerPort } from '../../../../module/k8s';

export type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};
export interface GitImportFormData {
  name: string;
  project: ProjectData;
  application: ApplicationData;
  git: GitData;
  image: ImageData;
  route: RouteData;
  build: BuildData;
  deployment: DeploymentData;
}

export interface ApplicationData {
  name: string;
  selectedKey: string;
}

export interface ImageData {
  selected: string;
  recommended: string;
  tag: string;
  ports: ContainerPort[];
}

export interface ProjectData {
  name: string;
}

export interface GitData {
  url: string;
  type: string;
  ref: string;
  dir: string;
  showGitType: boolean;
}

export interface RouteData {
  create: boolean;
}

export interface BuildData {
  triggers: {
    webhook: Boolean;
    image: Boolean;
    config: Boolean;
  };
  env: Array<NameValuePair | NameValueFromPair>;
}

export interface DeploymentData {
  triggers: {
    image: Boolean;
    config: Boolean;
  };
  replicas: number;
  env: Array<NameValuePair | NameValueFromPair>;
}

export interface NameValuePair {
  name: string;
  value: string;
}

export interface NameValueFromPair {
  name: string;
  valueForm: ConfigMapKeyRef | SecretKeyRef;
}
export interface ConfigMapKeyRef {
  configMapKeyRef: {
    key: string;
    name: string;
  };
}

export interface SecretKeyRef {
  secretKeyRef: {
    key: string;
    name: string;
  };
}

export enum GitTypes {
  '' = 'Please choose Git type',
  github = 'GitHub',
  gitlab = 'GitLab',
  bitbucket = 'Bitbucket',
}
