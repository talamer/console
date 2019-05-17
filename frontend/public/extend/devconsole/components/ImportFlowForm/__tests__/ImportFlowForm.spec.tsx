import * as React from 'react';
import { shallow } from 'enzyme';
import { ImportFlowForm } from './../ImportFlowForm';

describe('ImportFlowForm: ', () => {
  const props = {
    activeNamespace: 'default',
    imageStreams: {
      data: [
        {
          apiVersion: '',
          kind: '',
          metadata: {
            annotations:
            {
              'openshift.io/display-name':'Perl',
              'openshift.io/image.dockerRepositoryCheck': '2019-05-14T17:59:32Z',
              'samples.operator.openshift.io/version':'4.1.0-rc.3',
            },
            selfLink:'/apis/image.openshift.io/v1/namespaces/openshift/imagestreams/perl',
            resourceVersion:'11512',
            name:'perl',
            uid:'eea7c7af-7671-11e9-a679-0a580a810011',
            creationTimestamp:'2019-05-14T17:58:51Z',
            generation:2,
            namespace:'openshift',
            labels:{
              'samples.operator.openshift.io/managed':'true',
            },
          },
          spec:{
            lookupPolicy:{
              local:false,
            },
            tags:[
              {
                name:'5.16',
                annotations: {
                  description: 'Build and run Perl 5.16 applications on RHEL 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.16/README.md.',
                  iconClass:'icon-perl',
                  'openshift.io/display-name':'Perl 5.16',
                  'openshift.io/provider-display-name':'Red Hat, Inc.',
                  sampleRepo:'https://github.com/sclorg/dancer-ex.git',
                  supports:'perl:5.16,perl',
                  tags:'builder,perl',
                  version:'5.16',
                },
                from:{
                  kind:'DockerImage',
                  name:'registry.redhat.io/openshift3/perl-516-rhel7:latest',
                },
                generation:2,
                importPolicy:{},
                referencePolicy:{
                  type:'Local',
                },
              },
            ],
          },
          status: {
            dockerImageRepository: 'image-registry.openshift-image-registry.svc:5000/openshift/perl',
            tags: [
              {
                items: [
                  {
                    created: '2019-05-14T17:59:32Z',
                    dockerImageReference: 'registry.redhat.io/openshift3/perl-516-rhel7@sha256:8d13f434065a54ab85c2134858d5cc218c1ebb1e423d194e664e4ee4a9f4641f',
                    generation: 2,
                    image: 'sha256:8d13f434065a54ab85c2134858d5cc218c1ebb1e423d194e664e4ee4a9f4641f',
                  },
                ],
                tag: 5.16,
              },
            ],
          },
        },
      ],
      filters: {},
      kind: undefined,
      loadError: '',
      loaded: true,
      optional: undefined,
      selected: null,
    },
  };

  function renderImportForm(args = {}) {
    const prop = { ...props, ...args };
    return shallow(<ImportFlowForm {...prop} />);
  }

  it('shouldn\'t render git-type', () => {
    const importFormWrapper = renderImportForm();
    expect(importFormWrapper.find('FormGroup[controlId=\'import-git-type\']')).toHaveLength(0);
  });

  it('AppNameSelector to be present', () => {
    const importFormWrapper = renderImportForm();
    expect(importFormWrapper.find('AppNameSelector')).toHaveLength(1);
    expect(importFormWrapper.find('AppNameSelector').prop('namespace')).toBe('default');
  });

  it('Form Submit Button should be disabled', () => {
    const importFormWrapper = renderImportForm();
    expect(importFormWrapper.find('Button').at(0).prop('disabled')).toBeTruthy();
  });

  it('renders', () => {
    const importFlowForm = shallow(<ImportFlowForm {...props} />);

    expect(importFlowForm).toBeTruthy();
  });

  it('update state on Git Repository URL input change', () => {
    const importFlowForm = shallow(<ImportFlowForm {...props} />);

    importFlowForm.find('[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });

    expect(importFlowForm.state().gitRepoUrl).toBe(
      'https://github.com/vikram-raj/console/tree/import-flow',
    );
  });

  it('detect git type', () => {
    const importFlowForm = shallow(<ImportFlowForm {...props} />);
    const urlInput = importFlowForm.find('[data-test-id="import-git-repo-url"]');
    urlInput.simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });
    urlInput.simulate('blur');
    expect(importFlowForm.state().gitType).toBe('github');
  });

  it('validate URL', () => {
    const importFlowForm = shallow(<ImportFlowForm {...props} />);
    const urlInput = importFlowForm.find('[data-test-id="import-git-repo-url"]');

    urlInput.simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });
    urlInput.simulate('blur');
    expect(importFlowForm.state().gitRepoUrlError).toBe('');

    urlInput.simulate('change', {
      target: { value: 'http://localhost:9000/dev/add' },
    });
    urlInput.simulate('blur');
    expect(importFlowForm.state().gitRepoUrlError).toBe('Please enter a valid git URL.');
    expect(importFlowForm.state().gitTypeDetected).toBeUndefined();
  });

  it('update state on name input change', () => {
    const importFlowForm = shallow(<ImportFlowForm {...props} />);

    importFlowForm.find('[data-test-id="import-name"]').simulate('change', {
      target: { value: 'node-app' },
    });

    expect(importFlowForm.state().name).toBe('node-app');
  });

  it ('form submission', () => {
    const preventDefault = jest.fn();
    const importFlowForm = shallow(<ImportFlowForm {...props} />);
    importFlowForm.find('[data-test-id="import-git-repo-url"]').simulate('change', {
      target: { value: 'https://github.com/vikram-raj/console/tree/import-flow' },
    });
    importFlowForm.find('[data-test-id="import-git-repo-url"]').simulate('blur');

    importFlowForm.find('[data-test-id="import-name"]').simulate('change', {
      target: { value: 'node-app' },
    });
    importFlowForm.find('[data-test-id="builder-image-selector"]')
      .shallow().find('BuilderImageCard').simulate('change', 'perl');
    importFlowForm.find('[data-test-id="import-form"]').simulate('submit', {preventDefault});
    const importFormState = {
      application: '',
      builderImageError: '',
      gitRepoUrl: 'https://github.com/vikram-raj/console/tree/import-flow',
      gitRepoUrlError: '',
      gitSourceAnalysisName: '',
      gitSourceName: '',
      gitType: 'github',
      gitTypeError: '',
      gitUrlValidationStatus: '',
      isBuilderImageDetected: false,
      isComponentCreated: false,
      isGitSourceCreated: false,
      lastEnteredGitUrl: '',
      name: 'node-app',
      nameError: '',
      namespace: 'default',
      namespaceError: '',
      recommendedImage: '',
      selectedApplicationKey: '',
      selectedImage: 'perl',
      selectedImageTag: '5.16',
    };

    expect(importFlowForm.state()).toEqual(importFormState);
  });
});
