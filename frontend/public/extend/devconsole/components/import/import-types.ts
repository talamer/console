import { K8sResourceKind, ContainerPort } from '../../../../module/k8s';
import { NormalizedBuilderImages } from '../../utils/imagestream-utils';

export type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};

export interface GitImportProps {
  activeNamespace: string;
  imageStreams?: FirehoseList;
}

export interface GitImportFormProps {
  builderImages?: NormalizedBuilderImages;
}

export interface GitImportFormData {
  name: string;
  project: ProjectData;
  application: ApplicationData;
  git: GitData;
  image: ImageData;
  visibility: VisibilityData;
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
}

export interface VisibilityData {
  gitType: boolean;
}
