import * as _ from 'lodash-es';
import { GitData, ImageData, VisibilityData, ApplicationData } from './import-types';

const urlRegex = /^(((ssh|git|https?):\/\/[\w]+)|(git@[\w]+.[\w]+:))([\w\-._~/?#[\]!$&'()*+,;=])+$/;

export const validateGitUrl = (git: GitData, visibility: VisibilityData): GitData | null => {
  const errors = {} as GitData;
  if (!git.url) {
    errors.url = 'Required.';
  } else if (!urlRegex.test(git.url)) {
    errors.url = 'Invalid Git URL.';
  }

  if (!git.type && visibility.gitType) {
    errors.type = 'We failed to detect the git type. Please choose a git type.';
  }

  return !_.isEmpty(errors) ? errors : null;
};

export const validateName = (name: string): string | null => {
  return !name ? 'Required.' : null;
};

export const validateBuilderImage = (image: ImageData): ImageData | null => {
  const errors = {} as ImageData;
  if (!image.selected) {
    errors.selected = 'Please select a Builder Image.';
  }
  return !_.isEmpty(errors) ? errors : null;
};

export const validateApplication = (application: ApplicationData): ApplicationData | null => {
  const errors = {} as ApplicationData;
  if (!application.selectedKey) {
    errors.selectedKey = 'Required';
  }

  if (!application.name) {
    errors.name = 'Required';
  }

  return !_.isEmpty(errors) ? errors : null;
};
