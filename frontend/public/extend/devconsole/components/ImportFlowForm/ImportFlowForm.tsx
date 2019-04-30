/* eslint-disable no-undef */
import * as React from 'react';
import { connect } from 'react-redux';
import * as fuzzy from 'fuzzysearch';
import * as _ from 'lodash-es';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'patternfly-react';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { Dropdown, NsDropdown, LoadingInline } from '../../../../components/utils';
import { history } from '../../../../components/utils/router';
import { GitSourceModel, GitSourceComponentModel, GitSourceAnalysisModel } from '../../models';
import { k8sCreate, k8sKill, k8sGet, K8sResourceKind } from '../../../../module/k8s';
import { pathWithPerspective } from './../../../../../public/components/utils/perspective';
import { isBuilder } from './../../../../../public/components/image-stream';
import './ImportFlowForm.scss';
import AppNameSelector from '../../shared/components/dropdown/AppNameSelector';

type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};
export interface State {
  gitType: string;
  gitRepoUrl: string;
  namespace: string;
  name: string;
  application: string;
  selectedApplicationKey: string;
  builderImage: string;
  gitTypeError: string;
  namespaceError: string;
  nameError: string;
  builderImageError: string;
  gitRepoUrlError: string;
  gitSourceName: string;
  gitSourceAnalysisName: string;
  gitSourceCreated: boolean;
  lastEnteredGitUrl: string;
  componentCreated: boolean;
  gitUrlValidationStatus: string;
}

export interface Props {
  activeNamespace: string;
  resources?: FirehoseList;
}

const initialState: State = {
  gitType: '',
  gitRepoUrl: '',
  namespace: '',
  name: '',
  application: '',
  selectedApplicationKey: '',
  builderImage: '',
  gitTypeError: '',
  gitRepoUrlError: '',
  namespaceError: '',
  nameError: '',
  builderImageError: '',
  gitSourceName: '',
  gitSourceAnalysisName: '',
  gitSourceCreated: false,
  lastEnteredGitUrl: '',
  componentCreated: false,
  gitUrlValidationStatus: '',
};

export class ImportFlowForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gitType: '',
      gitRepoUrl: '',
      namespace: props.activeNamespace || '',
      name: '',
      application: '',
      selectedApplicationKey: '',
      builderImage: '',
      gitTypeError: '',
      namespaceError: '',
      nameError: '',
      builderImageError: '',
      gitRepoUrlError: '',
      gitSourceName: '',
      gitSourceAnalysisName: '',
      gitSourceCreated: false,
      lastEnteredGitUrl: '',
      componentCreated: false,
      gitUrlValidationStatus: '',
    };
  }
  private randomString = this.generateRandomString();
  private validateUrlPoller;
  private detectBuildtoolPoller;
  private imageStreams: { [name: string]: string[] } = {
    '': ['Select builder image', ''],
  };

  private onBrowserClose = (event) => {
    event.preventDefault();
    if (this.state.gitSourceCreated && !this.state.componentCreated) {
      k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName), {}, {});
      k8sKill(
        GitSourceAnalysisModel,
        this.gitSourceAnalysisParams(this.state.gitSourceAnalysisName),
        {},
        {},
      );
    }
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBrowserClose);
    this.setState({ namespace: this.props.activeNamespace });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBrowserClose);
    if (this.state.gitSourceCreated && !this.state.componentCreated) {
      k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName), {}, {});
      k8sKill(
        GitSourceAnalysisModel,
        this.gitSourceAnalysisParams(this.state.gitSourceAnalysisName),
        {},
        {},
      );
    }
    clearInterval(this.validateUrlPoller);
    clearInterval(this.detectBuildtoolPoller);
  }

  gitTypes = {
    '': 'Please choose Git type',
    github: 'GitHub',
    gitlab: 'GitLab',
    bitbucket: 'Bitbucket',
  };

  handleGitTypeChange = (gitType: string) => {
    this.setState({ gitType });
    if (gitType !== '') {
      this.setState({ gitTypeError: '' });
    } else {
      this.setState({ gitTypeError: 'Please choose git type' });
    }
  };

  handleGitRepoUrlChange = (event) => {
    this.setState({ gitRepoUrl: event.target.value, gitRepoUrlError: '' });
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    if (!urlRegex.test(event.target.value)) {
      this.setState({ gitRepoUrlError: 'Please enter the valid git URL', gitType: '' });
    } else {
      this.setState({ gitRepoUrlError: '' });
    }
  };

  handleNamespaceChange = (namespace: string) => {
    this.setState({ namespace });
  };

  onApplicationChange = (application: string, selectedKey: string) => {
    this.setState({ application, selectedApplicationKey: selectedKey });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value, nameError: '' });
  };

  handleBuilderImageChange = (builderImage: string) => {
    this.setState({ builderImage });
    if (builderImage !== '') {
      this.setState({ builderImageError: '' });
    }
  };

  private generateRandomString() {
    const str = Math.random()
      .toString(16)
      .substring(2, 7);
    return str + str;
  }

  private lastSegmentUrl() {
    return this.state.gitRepoUrl.substr(this.state.gitRepoUrl.lastIndexOf('/') + 1);
  }

  private gitSourceParams(gitSourceName: string) {
    return {
      kind: 'GitSource',
      apiVersion: 'devconsole.openshift.io/v1alpha1',
      metadata: {
        name: gitSourceName,
        namespace: this.state.namespace,
      },
      spec: {
        url: this.state.gitRepoUrl,
      },
    };
  }

  private gitSourceAnalysisParams(gitSourceAnalysisName: string) {
    return {
      kind: 'GitSourceAnalysis',
      apiVersion: 'devconsole.openshift.io/v1alpha1',
      metadata: {
        name: gitSourceAnalysisName,
        namespace: this.state.namespace,
      },
      spec: {
        gitSourceRef: {
          name: this.state.gitSourceName,
        },
      },
    };
  }

  validateGitRepo = (): void => {
    if (
      this.state.lastEnteredGitUrl !== this.state.gitRepoUrl &&
      this.state.gitRepoUrlError === ''
    ) {
      if (this.state.gitSourceCreated) {
        k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName));
        k8sKill(
          GitSourceAnalysisModel,
          this.gitSourceAnalysisParams(this.state.gitSourceAnalysisName),
        );
        this.setState({
          gitUrlValidationStatus: '',
          gitSourceCreated: false,
          builderImage: '',
          builderImageError: '',
        });
      }

      k8sCreate(
        GitSourceModel,
        this.gitSourceParams(
          `${this.props.activeNamespace}-${this.lastSegmentUrl()}-${this.randomString}`,
        ),
      ).then(() => {
        this.setState({
          gitSourceCreated: true,
          gitSourceName: `${this.props.activeNamespace}-${this.lastSegmentUrl()}-${
            this.randomString
          }`,
          lastEnteredGitUrl: this.state.gitRepoUrl,
        });
        this.validateUrlPoller = setInterval(this.checkUrlValidationStatus, 3000);
      });
      this.setState({ gitTypeError: '' });
      if (this.detectGitType(this.state.gitRepoUrl) === '') {
        this.setState({
          gitType: this.detectGitType(this.state.gitRepoUrl),
          gitTypeError: 'Not able to detect the git type. Please choose git type',
        });
      } else {
        this.setState({ gitType: this.detectGitType(this.state.gitRepoUrl) });
      }
    }
  };

  detectGitType = (url: string): string => {
    if (url.includes('github.com')) {
      return 'github';
    } else if (url.includes('bitbucket.org')) {
      return 'bitbucket';
    } else if (url.includes('gitlab.com')) {
      return 'gitlab';
    }
    return '';
  };

  disableSubmitButton = (): boolean => {
    return (
      !this.state.gitRepoUrl ||
      !this.state.gitType ||
      !this.state.namespace ||
      !this.state.name ||
      !this.state.builderImage ||
      this.state.gitUrlValidationStatus !== 'ok'
    );
  };

  private catalogParams = () => {
    return {
      kind: 'Component',
      apiVersion: 'devconsole.openshift.io/v1alpha1',
      metadata: {
        name: this.state.name,
        namespace: this.state.namespace,
        labels: {
          'app.kubernetes.io/part-of': this.state.application,
          'app.kubernetes.io/name': this.imageStreams[this.state.builderImage][0],
          'app.kubernetes.io/instance': this.state.name,
          'app.kubernetes.io/version': this.imageStreams[this.state.builderImage][1],
        },
      },
      spec: {
        buildType: this.imageStreams[this.state.builderImage][0],
        gitSourceRef: this.state.gitSourceName,
        port: 8080,
        exposed: true,
      },
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.namespace === '') {
      this.setState({ namespaceError: 'Please select the application name' });
    } else {
      this.setState({ namespaceError: '' });
    }

    if (this.state.builderImage === '') {
      this.setState({ builderImageError: 'Please select the builder image' });
    } else {
      this.setState({ builderImageError: '' });
    }

    if (!this.disableSubmitButton()) {
      k8sCreate(GitSourceComponentModel, this.catalogParams()).then(
        () => {
          this.setState({ componentCreated: true });
          history.push(pathWithPerspective('dev', `/topology/ns/${this.state.namespace}`));
        },
        (err) => {
          this.setState({ nameError: err.message });
        },
      );
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState(initialState);
    history.goBack();
  };

  checkUrlValidationStatus = () => {
    k8sGet(GitSourceModel, this.state.gitSourceName, this.props.activeNamespace)
      .then((res) => {
        if (res.status.connection.state === 'ok') {
          this.setState({
            gitUrlValidationStatus: res.status.connection.state,
            gitRepoUrlError: '',
          });
        } else {
          this.setState({
            gitUrlValidationStatus: res.status.connection.state,
            gitRepoUrlError: res.status.connection.reason,
          });
        }
        clearInterval(this.validateUrlPoller);
      })
      .then(() => {
        if (this.state.gitUrlValidationStatus === 'ok') {
          k8sCreate(
            GitSourceAnalysisModel,
            this.gitSourceAnalysisParams(
              `${this.props.activeNamespace}-${this.lastSegmentUrl()}-gsa-${this.randomString}`,
            ),
          ).then(() => {
            this.setState({
              gitSourceAnalysisName: `${this.props.activeNamespace}-${this.lastSegmentUrl()}-gsa-${
                this.randomString
              }`,
            });
            this.detectBuildtoolPoller = setInterval(this.detectBuildTool, 3000);
          });
        }
      });
  };

  autocompleteFilter = (text, item) => fuzzy(text, item[0]);

  detectBuildTool = () => {
    k8sGet(
      GitSourceAnalysisModel,
      this.state.gitSourceAnalysisName,
      this.props.activeNamespace,
    ).then((res) => {
      if (this.state.builderImage === '') {
        if (
          !Object.keys(this.imageStreams).includes(
            `${res.status.buildEnvStatistics.detectedBuildTypes[0].name.toLowerCase()}latest`,
          )
        ) {
          this.setState({
            builderImageError: `We detected '${
              res.status.buildEnvStatistics.detectedBuildTypes[0].name
            }' but there are no matching builder images, select an appropriate image.`,
          });
        } else {
          this.setState({
            builderImage: `${res.status.buildEnvStatistics.detectedBuildTypes[0].name.toLowerCase()}latest`,
            builderImageError: '',
          });
        }
      }
      clearInterval(this.detectBuildtoolPoller);
    });
  };

  render() {
    const {
      gitType,
      gitRepoUrl,
      namespace,
      name,
      application,
      selectedApplicationKey,
      builderImage,
      gitTypeError,
      gitRepoUrlError,
      namespaceError,
      nameError,
      builderImageError,
    } = this.state;

    const builderImages = _.filter(this.props.resources.imagestreams.data, (imagestream) => {
      return isBuilder(imagestream);
    });

    builderImages.forEach((image) => {
      image.spec.tags.forEach((tag) => {
        this.imageStreams[image.metadata.name + tag.name] = [image.metadata.name, tag.name];
      });
    });

    let gitTypeField, showGitValidationStatus, showDetectBuildToolStatus;
    if (gitType || gitTypeError) {
      gitTypeField = (
        <FormGroup controlId="import-git-type" className={gitTypeError ? 'has-error' : ''}>
          <ControlLabel className="co-required">Git Type</ControlLabel>
          <Dropdown
            dropDownClassName="dropdown--full-width"
            items={this.gitTypes}
            selectedKey={gitType}
            title={this.gitTypes[gitType]}
            onChange={this.handleGitTypeChange}
          />
          <HelpBlock>{gitTypeError}</HelpBlock>
        </FormGroup>
      );
    }

    if (this.state.gitSourceCreated && this.state.gitUrlValidationStatus === '') {
      showGitValidationStatus = (
        <span className="odc-import-form__loader">
          <LoadingInline />
        </span>
      );
    } else if (this.state.gitUrlValidationStatus === 'ok') {
      showGitValidationStatus = <CheckCircleIcon className="odc-import-form__success-icon" />;
    }

    if (
      this.state.gitUrlValidationStatus === 'ok' &&
      this.state.builderImage === '' &&
      this.state.builderImageError === ''
    ) {
      showDetectBuildToolStatus = (
        <span className="odc-import-form__loader">
          <LoadingInline />
        </span>
      );
    } else if (this.state.builderImage !== '') {
      showDetectBuildToolStatus = <CheckCircleIcon className="odc-import-form__success-icon" />;
    }

    return (
      <Form
        data-test-id="import-form"
        onSubmit={this.handleSubmit}
        className="co-m-pane__body-group co-m-pane__form"
      >
        <FormGroup controlId="import-git-repo-url" className={gitRepoUrlError ? 'has-error' : ''}>
          <ControlLabel className="co-required">Git Repository URL</ControlLabel>
          {showGitValidationStatus}
          <FormControl
            type="text"
            required
            value={gitRepoUrl}
            onChange={this.handleGitRepoUrlChange}
            onBlur={this.validateGitRepo}
            id="import-git-repo-url"
            data-test-id="import-git-repo-url"
            autoComplete="off"
            name="gitRepoUrl"
          />
          <HelpBlock>{gitRepoUrlError ? gitRepoUrlError : 'Some helper text'}</HelpBlock>
        </FormGroup>
        {gitTypeField}
        <FormGroup
          controlId="import-application-name"
          className={namespaceError ? 'has-error' : ''}
        >
          <ControlLabel className="co-required">Namespace</ControlLabel>
          <NsDropdown
            selectedKey={namespace}
            onChange={this.handleNamespaceChange}
            data-test-id="import-application-name"
          />
          <HelpBlock>
            {namespaceError ? namespaceError : 'Some help text with explanation'}
          </HelpBlock>
        </FormGroup>
        <AppNameSelector
          application={application}
          namespace={namespace}
          selectedKey={selectedApplicationKey}
          onChange={this.onApplicationChange}
        />
        <FormGroup controlId="import-name" className={nameError ? 'has-error' : ''}>
          <ControlLabel className="co-required">Name</ControlLabel>
          <FormControl
            value={name}
            onChange={this.handleNameChange}
            required
            type="text"
            id="import-name"
            name="name"
            data-test-id="import-name"
          />
          <HelpBlock>
            {nameError ? nameError : 'Identifies the resources created for this application'}
          </HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="import-builder-image"
          className={builderImageError ? 'has-error' : ''}
        >
          <ControlLabel className="co-required">Builder Image</ControlLabel>
          {showDetectBuildToolStatus}
          <Dropdown
            dropDownClassName="dropdown--full-width"
            items={this.imageStreams}
            selectedKey={builderImage}
            title={
              this.props.resources.imagestreams.loaded ? (
                this.imageStreams[builderImage][0] + this.imageStreams[builderImage][1]
              ) : (
                <LoadingInline />
              )
            }
            autocompleteFilter={this.autocompleteFilter}
            autocompletePlaceholder={'select builder image'}
            onChange={this.handleBuilderImageChange}
            data-test-id="import-builder-image"
          />
          <HelpBlock>
            {builderImageError ? builderImageError : 'Some help text with explanation'}
          </HelpBlock>
        </FormGroup>
        <div className="co-m-btn-bar">
          <Button
            type="submit"
            bsStyle="primary"
            className={this.disableSubmitButton() ? 'disabled' : ''}
          >
            Create
          </Button>
          <Button type="button" onClick={this.handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeNamespace: state.UI.get('activeNamespace'),
  };
};
export default connect(mapStateToProps)(ImportFlowForm);
