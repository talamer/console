import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import { ImportFlowForm } from './../ImportFlowForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ImportFlowForm: ', () => {
  const props = {
    activeNamespace: 'default',
    imageStreams: {
      data: [],
      perl: {
        metadata: {
          name: 'perl',
          namespace: 'openshift',
          selfLink: '/apis/image.openshift.io/v1/namespaces/openshift/imagestreams/perl',
          uid: 'd5769cb7-6729-11e9-8a33-52540024aa6d',
          resourceVersion: '1867',
          generation: 2,
          creationTimestamp: '2019-04-25T07:14:58Z',
          annotations: {
            'kubectl.kubernetes.io/last-applied-configuration':
              '{"apiVersion":"image.openshift.io/v1","kind":"ImageStream","metadata":{"annotations":{"openshift.io/display-name":"Perl"},"name":"perl","namespace":"openshift"},"spec":{"tags":[{"annotations":{"description":"Build and run Perl applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.20/README.md.\\n\\nWARNING: By selecting this tag, your application will automatically update to use the latest version of Perl available on OpenShift, including major versions updates.","iconClass":"icon-perl","openshift.io/display-name":"Perl (Latest)","openshift.io/provider-display-name":"Red Hat, Inc.","sampleRepo":"https://github.com/openshift/dancer-ex.git","supports":"perl","tags":"builder,perl"},"from":{"kind":"ImageStreamTag","name":"5.26"},"name":"latest","referencePolicy":{"type":"Local"}},{"annotations":{"description":"Build and run Perl 5.16 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.16/README.md.","iconClass":"icon-perl","openshift.io/display-name":"Perl 5.16","openshift.io/provider-display-name":"Red Hat, Inc.","sampleRepo":"https://github.com/openshift/dancer-ex.git","supports":"perl:5.16,perl","tags":"hidden,builder,perl","version":"5.16"},"from":{"kind":"DockerImage","name":"docker.io/openshift/perl-516-centos7:latest"},"name":"5.16","referencePolicy":{"type":"Local"}},{"annotations":{"description":"Build and run Perl 5.20 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.20/README.md.","iconClass":"icon-perl","openshift.io/display-name":"Perl 5.20","openshift.io/provider-display-name":"Red Hat, Inc.","sampleRepo":"https://github.com/openshift/dancer-ex.git","supports":"perl:5.20,perl","tags":"hidden,builder,perl","version":"5.20"},"from":{"kind":"DockerImage","name":"docker.io/centos/perl-520-centos7:latest"},"name":"5.20","referencePolicy":{"type":"Local"}},{"annotations":{"description":"Build and run Perl 5.24 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.24/README.md.","iconClass":"icon-perl","openshift.io/display-name":"Perl 5.24","openshift.io/provider-display-name":"Red Hat, Inc.","sampleRepo":"https://github.com/openshift/dancer-ex.git","supports":"perl:5.24,perl","tags":"builder,perl","version":"5.24"},"from":{"kind":"DockerImage","name":"docker.io/centos/perl-524-centos7:latest"},"name":"5.24","referencePolicy":{"type":"Local"}},{"annotations":{"description":"Build and run Perl 5.26 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.26/README.md.","iconClass":"icon-perl","openshift.io/display-name":"Perl 5.26","openshift.io/provider-display-name":"Red Hat, Inc.","sampleRepo":"https://github.com/openshift/dancer-ex.git","supports":"perl:5.26,perl","tags":"builder,perl","version":"5.26"},"from":{"kind":"DockerImage","name":"docker.io/centos/perl-526-centos7:latest"},"name":"5.26","referencePolicy":{"type":"Local"}}]}}\n',
            'openshift.io/display-name': 'Perl',
            'openshift.io/image.dockerRepositoryCheck': '2019-04-25T07:15:21Z',
          },
        },
        spec: {
          lookupPolicy: {
            local: false,
          },
          tags: [
            {
              name: '5.16',
              annotations: {
                description:
                  'Build and run Perl 5.16 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.16/README.md.',
                iconClass: 'icon-perl',
                'openshift.io/display-name': 'Perl 5.16',
                'openshift.io/provider-display-name': 'Red Hat, Inc.',
                sampleRepo: 'https://github.com/openshift/dancer-ex.git',
                supports: 'perl:5.16,perl',
                tags: 'hidden,builder,perl',
                version: '5.16',
              },
              from: {
                kind: 'DockerImage',
                name: 'docker.io/openshift/perl-516-centos7:latest',
              },
              generation: 2,
              importPolicy: {},
              referencePolicy: {
                type: 'Local',
              },
            },
          ],
        },
        status: {
          dockerImageRepository: '172.30.1.1:5000/openshift/perl',
          tags: [
            {
              tag: '5.16',
              items: [
                {
                  created: '2019-04-25T07:15:21Z',
                  dockerImageReference:
                    'docker.io/openshift/perl-516-centos7@sha256:e2d681b6e3b7e8eedf2fbb288c3e6587db6fd2b7a4aa55dd3a8ab032094dfa8c',
                  image: 'sha256:e2d681b6e3b7e8eedf2fbb288c3e6587db6fd2b7a4aa55dd3a8ab032094dfa8c',
                  generation: 2,
                },
              ],
            },
          ],
        },
      },
      loaded: true,
    },
  };

  function renderImportForm(args = {}) {
    const prop = { ...props, ...args };
    return shallow(<ImportFlowForm {...prop} />);
  }

  it("shouldn't render git-type", () => {
    const importFormWrapper = renderImportForm();
    expect(importFormWrapper.find("FormGroup[controlId='import-git-type']")).toHaveLength(0);
  });

  it("AppNameSelector to be present", () => {
    const importFormWrapper = renderImportForm();
    expect(importFormWrapper.find("AppNameSelector")).toHaveLength(1);
    expect(importFormWrapper.find("AppNameSelector").prop("namespace")).toBe("default");
  });

  it("Form Submit Button should be disabled", () => {
    const importFormWrapper = renderImportForm();
    expect(importFormWrapper.find("Button").at(0).prop('disabled')).toBeTruthy();
  });

  it('renders', () => {
    const importFlowForm = shallow(<ImportFlowForm {...props} />);

    expect(importFlowForm).toBeTruthy();
  });

  xit('update state on Git Repository URL input change', () => {
    const importFlowForm = mount(
      <Provider store={mockStore}>
        <ImportFlowForm {...props} />
      </Provider>,
    );

    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });

    expect(importFlowForm.state().gitRepoUrl).toBe(
      'https://github.com/vikram-raj/console/tree/import-flow',
    );
  });

  xit('detect git type', () => {
    const importFlowForm = mount(<ImportFlowForm {...props} />);
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('blur');
    expect(importFlowForm.state().gitType).toBe('github');
  });

  xit('validate URL', () => {
    const importFlowForm = mount(<ImportFlowForm {...props} />);
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('blur');
    expect(importFlowForm.state().gitRepoUrlError).toBe('');

    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'http://localhost:9000/dev/add' },
    });
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('blur');
    expect(importFlowForm.state().gitRepoUrlError).toBe('Please enter the valid git URL');
    expect(importFlowForm.state().gitTypeDetected).toBe(false);
  });

  xit('update state on name input change', () => {
    const importFlowForm = mount(<ImportFlowForm {...props} />);

    importFlowForm.find('input[data-test-id="import-name"]').simulate('change', {
      target: { value: 'node-app' },
    });

    expect(importFlowForm.state().name).toBe('node-app');
  });

  xit('form submission', () => {
    const importFlowForm = mount(<ImportFlowForm {...props} />);
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });
    importFlowForm.find('input[data-test-id="import-git-repo-url"]').simulate('blur');
    importFlowForm.find('Dropdown[data-test-id="import-application-name"]').simulate('change');
    importFlowForm.find('input[data-test-id="import-name"]').simulate('change', {
      target: { value: 'node-app' },
    });
    importFlowForm.find('Dropdown[data-test-id="import-builder-image"]').simulate('change');
    importFlowForm.find('form[data-test-id="import-form"]').simulate('submit');
    const importFormState = {
      gitType: 'github',
      gitRepoUrl: 'https://github.com/vikram-raj/console/tree/import-flow',
      applicationName: '',
      name: 'node-app',
      builderImage: '',
      gitTypeError: '',
      gitRepoUrlError: '',
      applicationNameError: 'Please select the application name',
      nameError: '',
      builderImageError: 'Please select the builder image',
      gitTypeDetected: true,
    };
    expect(importFlowForm.state()).toEqual(importFormState);
  });
});
