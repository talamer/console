import * as yup from 'yup';

const urlRegex = /^(((ssh|git|https?):\/\/[\w]+)|(git@[\w]+.[\w]+:))([\w\-._~/?#[\]!$&'()*+,;=])+$/;

export const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  project: yup.object().shape({
    name: yup.string().required('Required'),
  }),
  application: yup.object().shape({
    name: yup.string().required('Required'),
    selectedKey: yup.string().required('Required'),
  }),
  image: yup.object().shape({
    selected: yup.string().required('Required'),
    tag: yup.string().required('Required'),
  }),
  git: yup.object().shape({
    url: yup
      .string()
      .matches(urlRegex, 'Invalid Git URL')
      .required('Required'),
    type: yup.string().when('showGitType', {
      is: true,
      then: yup.string().required('We failed to detect the git type. Please choose a git type.'),
    }),
    showGitType: yup.boolean(),
  }),
});

export const detectGitType = (url: string): string => {
  if (!urlRegex.test(url)) {
    return;
  }
  if (url.includes('github.com')) {
    return 'github';
  } else if (url.includes('bitbucket.org')) {
    return 'bitbucket';
  } else if (url.includes('gitlab.com')) {
    return 'gitlab';
  }
  return '';
};
