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

export enum GitTypes {
  '' = 'Please choose Git type',
  github = 'GitHub',
  gitlab = 'GitLab',
  bitbucket = 'Bitbucket',
}
