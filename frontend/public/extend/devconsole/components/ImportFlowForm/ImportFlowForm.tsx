/* eslint-disable no-undef */
import * as React from 'react';
import * as fuzzy from 'fuzzysearch';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'patternfly-react';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { Dropdown, NsDropdown, LoadingInline } from '../../../../components/utils';
import { history } from '../../../../components/utils/router';
import { GitSourceModel, GitSourceComponentModel, GitSourceAnalysisModel } from '../../models';
import { SecretModel } from '../../../../models';
import { k8sCreate, k8sKill, k8sGet, K8sResourceKind } from '../../../../module/k8s';
import { pathWithPerspective } from './../../../../../public/components/utils/perspective';
import './ImportFlowForm.scss';
import AppNameSelector from '../../shared/components/dropdown/AppNameSelector';
import BuilderImageSelector from '../import/BuilderImageSelector';
import { normalizeBuilderImages, NormalizedBuilderImages } from '../../utils/imagestream-utils';
import BuilderImageTagSelector from '../import/BuilderImageTagSelector';
import SourceSecretSelector from '../import/SourceSecretSelector';

export type FirehoseList = {
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
  selectedImage: string;
  selectedImageTag: string;
  recommendedImage: string;
  gitTypeError: string;
  namespaceError: string;
  nameError: string;
  builderImageError: string;
  gitRepoUrlError: string;
  gitRepoUrlInfo: string;
  gitSourceName: string;
  gitSourceAnalysisName: string;
  isGitSourceCreated: boolean;
  lastEnteredGitUrl: string;
  isComponentCreated: boolean;
  isBuilderImageDetected: boolean;
  gitUrlValidationStatus: string;
  isGitTypeVisible: boolean;
  sourceSecretName: string;
  selectedSourceSecret: string;
  secretAuthType: string;
  secretCredentials: {
    [key: string]: string;
  };
  showSourceSecretDropDown: boolean;
}

export interface Props {
  activeNamespace: string;
  imageStreams?: FirehoseList;
}

const initialState: State = {
  gitType: '',
  gitRepoUrl: '',
  namespace: '',
  name: '',
  application: '',
  selectedApplicationKey: '',
  selectedImage: '',
  selectedImageTag: '',
  recommendedImage: '',
  gitTypeError: '',
  gitRepoUrlError: '',
  gitRepoUrlInfo: '',
  namespaceError: '',
  nameError: '',
  builderImageError: '',
  gitSourceName: '',
  gitSourceAnalysisName: '',
  isGitSourceCreated: false,
  lastEnteredGitUrl: '',
  isComponentCreated: false,
  gitUrlValidationStatus: '',
  isBuilderImageDetected: false,
  isGitTypeVisible: false,
  selectedSourceSecret: '',
  sourceSecretName: '',
  secretAuthType: '',
  secretCredentials: {},
  showSourceSecretDropDown: false,
};

enum ErrorMessage {
  RepoNotReachable = 'The git URL is not reachable. Please enter a correct URL.',
  BranchNotFound = 'The branch could not be found. Please enter the URL with a correct branch name.',
  BuilderImageError = 'We failed to detect the builder image. Please select an appropriate image.',
  GitUrlError = 'Please enter a valid git URL.',
  GitTypeError = 'We failed to detect the git type. Please choose a git type.',
  NamespaceNotSelected = 'Please select a Namespace to continue.',
}

const getUrlErrorMessage = (errorType: ErrorMessage) =>
  ErrorMessage[errorType] || ErrorMessage.GitUrlError;

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
      selectedImage: '',
      selectedImageTag: '',
      recommendedImage: '',
      gitTypeError: '',
      namespaceError: '',
      nameError: '',
      builderImageError: '',
      gitRepoUrlError: '',
      gitRepoUrlInfo: '',
      gitSourceName: '',
      gitSourceAnalysisName: '',
      isGitSourceCreated: false,
      lastEnteredGitUrl: '',
      isComponentCreated: false,
      gitUrlValidationStatus: '',
      isBuilderImageDetected: false,
      isGitTypeVisible: false,
      selectedSourceSecret: '',
      sourceSecretName: '',
      secretAuthType: '',
      secretCredentials: {},
      showSourceSecretDropDown: false,
    };
  }
  private randomString = this.generateRandomString();
  private validateUrlPoller;
  private detectBuildtoolPoller;
  private builderImages: NormalizedBuilderImages;

  private onBrowserClose = (event) => {
    event.preventDefault();
    if (this.state.isGitSourceCreated && !this.state.isComponentCreated) {
      k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName));
      k8sKill(
        GitSourceAnalysisModel,
        this.gitSourceAnalysisParams(this.state.gitSourceAnalysisName),
      );
    }
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBrowserClose);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBrowserClose);
    if (this.state.isGitSourceCreated && !this.state.isComponentCreated) {
      k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName));
      k8sKill(
        GitSourceAnalysisModel,
        this.gitSourceAnalysisParams(this.state.gitSourceAnalysisName),
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
      this.setState({ gitTypeError: 'Please choose a git type.' });
    }
  };

  handleGitRepoUrlChange = (event) => {
    clearInterval(this.detectBuildtoolPoller);
    clearInterval(this.validateUrlPoller);
    this.setState({
      gitRepoUrl: event.target.value,
      lastEnteredGitUrl: '',
      gitRepoUrlError: '',
      gitRepoUrlInfo: '',
      gitUrlValidationStatus: '',
      isGitSourceCreated: false,
      recommendedImage: '',
      isBuilderImageDetected: false,
      builderImageError: '',
      showSourceSecretDropDown: false,
      selectedSourceSecret: '',
    });
    const urlRegex = /^(?:git|ssh|http(s)?(:\/\/)|(git@))?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    if (!urlRegex.test(event.target.value)) {
      this.setState({
        gitRepoUrlError: ErrorMessage.GitUrlError,
        gitType: '',
        gitTypeError: '',
        gitUrlValidationStatus: '',
      });
    } else {
      this.setState({ gitRepoUrlError: '' });
    }
  };

  onNamespaceChange = (namespace: string) => {
    this.setState(({ gitRepoUrlError }) => {
      const error = gitRepoUrlError !== ErrorMessage.NamespaceNotSelected ? gitRepoUrlError : '';
      return {
        namespace,
        gitRepoUrlError: error,
      };
    }, this.validateGitRepo);
  };

  onApplicationChange = (application: string, selectedKey: string) => {
    this.setState({ application, selectedApplicationKey: selectedKey });
  };

  onSourceSecretChange = (
    sourceSecret: string,
    selectedKey: string,
    authType: string,
    credentials?: { [key: string]: string },
  ) => {
    this.setState({
      sourceSecretName: sourceSecret,
      selectedSourceSecret: selectedKey,
      secretAuthType: authType,
      secretCredentials: credentials,
      gitRepoUrlInfo: '',
    });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value, nameError: '' });
  };

  onBuilderImageChange = (selectedImage: string) => {
    const recentTag = this.builderImages[selectedImage].recentTag.name;
    this.setState({ selectedImage, selectedImageTag: recentTag, isBuilderImageDetected: false });
    if (selectedImage !== '') {
      this.setState({ builderImageError: '' });
    }
  };

  onBuilderImageTagChange = (selectedImageTag: string) => {
    this.setState({ selectedImageTag });
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

  private sourceSecretBasicParams() {
    return {
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: this.state.sourceSecretName,
        namespace: this.state.namespace,
      },
      type: this.state.secretAuthType,
      data: this.state.secretCredentials,
    };
  }

  private gitSourceWithSecretParams(gitSourceName: string, gitSecretName: string) {
    return {
      kind: 'GitSource',
      apiVersion: 'devconsole.openshift.io/v1alpha1',
      metadata: {
        name: gitSourceName,
        namespace: this.state.namespace,
      },
      spec: {
        url: this.state.gitRepoUrl,
        secretRef: {
          name: gitSecretName,
        },
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
    if (!this.state.namespace) {
      this.setState({ gitRepoUrlError: ErrorMessage.NamespaceNotSelected });
      return;
    }
    if (
      this.state.lastEnteredGitUrl !== this.state.gitRepoUrl &&
      this.state.gitRepoUrlError === ''
    ) {
      k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName));
      k8sKill(
        GitSourceAnalysisModel,
        this.gitSourceAnalysisParams(this.state.gitSourceAnalysisName),
      );
      k8sCreate(
        GitSourceModel,
        this.gitSourceParams(
          `${this.state.namespace}-${this.lastSegmentUrl()}-${this.randomString}`,
        ),
      )
        .then((res) => {
          this.setState({
            isGitSourceCreated: true,
            gitSourceName: res.metadata.name,
            lastEnteredGitUrl: this.state.gitRepoUrl,
            gitRepoUrlError: '',
          });
          this.validateUrlPoller = setInterval(this.checkUrlValidationStatus, 3000);
        })
        .catch(() => {
          this.setState({
            gitRepoUrlError: ErrorMessage.GitUrlError,
            lastEnteredGitUrl: this.state.gitRepoUrl,
          });
        });
      this.setState({ gitTypeError: '' });
      if (this.detectGitType(this.state.gitRepoUrl) === '') {
        this.setState({
          gitType: this.detectGitType(this.state.gitRepoUrl),
          gitTypeError: ErrorMessage.GitTypeError,
          isGitTypeVisible: true,
        });
      } else {
        this.setState({ gitType: this.detectGitType(this.state.gitRepoUrl),
          isGitTypeVisible: false,
        });
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
      this.state.gitRepoUrlError !== '' ||
      !this.state.gitType ||
      !this.state.namespace ||
      !this.state.application ||
      !this.state.name ||
      !this.state.selectedImage ||
      (this.state.showSourceSecretDropDown && !this.state.sourceSecretName) ||
      (this.state.selectedSourceSecret === 'create-source-secret' &&
        !(this.state.secretCredentials.password || this.state.secretCredentials.sshPrivateKey))
      // this.state.gitUrlValidationStatus !== 'ok'
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
          'app.kubernetes.io/name': this.state.selectedImage,
          'app.kubernetes.io/instance': this.state.name,
          'app.kubernetes.io/version': this.state.selectedImageTag,
        },
      },
      spec: {
        buildType: this.state.selectedImage,
        gitSourceRef: this.state.gitSourceName,
        port: 8080,
        exposed: true,
      },
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.disableSubmitButton()) {
      if (this.state.selectedSourceSecret === 'create-source-secret') {
        k8sCreate(SecretModel, this.sourceSecretBasicParams()).then(() => {
          k8sCreate(
            GitSourceModel,
            this.gitSourceWithSecretParams(this.state.gitSourceName, this.state.sourceSecretName),
          )
            .then(() => {
              k8sCreate(GitSourceComponentModel, this.catalogParams()).then(
                () => {
                  this.setState({ isComponentCreated: true });
                  history.push(pathWithPerspective('dev', `/topology/ns/${this.state.namespace}`));
                },
                (err) => {
                  this.setState({ nameError: err.message });
                },
              );
            })
            .catch((err) => {
              this.setState({ nameError: err.message });
            });
        });
      } else if (
        this.state.showSourceSecretDropDown &&
        this.state.selectedSourceSecret === this.state.sourceSecretName
      ) {
        k8sCreate(
          GitSourceModel,
          this.gitSourceWithSecretParams(this.state.gitSourceName, this.state.sourceSecretName),
        )
          .then(() => {
            k8sCreate(GitSourceComponentModel, this.catalogParams()).then(
              () => {
                this.setState({ isComponentCreated: true });
                history.push(pathWithPerspective('dev', `/topology/ns/${this.state.namespace}`));
              },
              (err) => {
                this.setState({ nameError: err.message });
              },
            );
          })
          .catch((err) => {
            this.setState({ nameError: err.message });
          });
      } else {
        k8sCreate(GitSourceComponentModel, this.catalogParams()).then(
          () => {
            this.setState({ isComponentCreated: true });
            history.push(pathWithPerspective('dev', `/topology/ns/${this.state.namespace}`));
          },
          (err) => {
            this.setState({ nameError: err.message });
          },
        );
      }
    }
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.setState(initialState);
    history.goBack();
  };

  checkUrlValidationStatus = () => {
    k8sGet(GitSourceModel, this.state.gitSourceName, this.state.namespace)
      .then((res) => {
        if (res.status.connection.state === 'ok') {
          this.setState({
            gitUrlValidationStatus: res.status.connection.state,
            gitRepoUrlError: '',
            showSourceSecretDropDown: false,
          });
        } else {
          if (res.status.connection.reason === 'RepoNotReachable') {
            k8sKill(GitSourceModel, this.gitSourceParams(this.state.gitSourceName));
            this.setState({
              showSourceSecretDropDown: true,
              gitRepoUrlInfo:
                'Unable to establish connection. Check the Git URL or provide more details if a private Git Repo.',
              gitUrlValidationStatus: res.status.connection.state,
            });
          } else {
            this.setState({
              gitUrlValidationStatus: res.status.connection.state,
              gitRepoUrlError: getUrlErrorMessage(res.status.connection.reason),
            });
          }
        }
        clearInterval(this.validateUrlPoller);
      })
      .catch(() => {
        this.setState({
          gitRepoUrlError: ErrorMessage.GitUrlError,
        });
      })
      .then(() => {
        if (this.state.gitUrlValidationStatus === 'ok') {
          k8sCreate(
            GitSourceAnalysisModel,
            this.gitSourceAnalysisParams(
              `${this.state.namespace}-${this.lastSegmentUrl()}-gsa-${this.randomString}`,
            ),
          )
            .then((res) => {
              this.setState({
                gitSourceAnalysisName: res.metadata.name,
              });
              this.detectBuildtoolPoller = setInterval(this.detectBuildTool, 3000);
            })
            .catch(() => {
              this.setState({
                builderImageError: ErrorMessage.BuilderImageError,
              });
            });
        }
      });
  };

  autocompleteFilter = (text, item) => fuzzy(text, item[0]);

  detectBuildTool = () => {
    k8sGet(GitSourceAnalysisModel, this.state.gitSourceAnalysisName, this.state.namespace)
      .then((res) => {
        if (res.status.analyzed === true && !Object.keys(res.status.buildEnvStatistics).length) {
          this.setState({
            builderImageError: ErrorMessage.BuilderImageError,
          });
        } else if (
          !Object.keys(this.builderImages).includes(
            `${res.status.buildEnvStatistics.detectedBuildTypes[0].name.toLowerCase()}`,
          )
        ) {
          this.setState({
            builderImageError: `We detected '${
              res.status.buildEnvStatistics.detectedBuildTypes[0].name
            }' but there are no matching builder images, select an appropriate image.`,
          });
        } else {
          const recommendedImage = res.status.buildEnvStatistics.detectedBuildTypes[0].name.toLowerCase();
          const recentTag = this.builderImages[recommendedImage].recentTag.name;

          if (!this.state.selectedImage) {
            this.setState({
              selectedImage: recommendedImage,
              selectedImageTag: recentTag,
            });
          }
          this.setState({
            recommendedImage,
            isBuilderImageDetected: true,
            builderImageError: '',
          });
        }
        clearInterval(this.detectBuildtoolPoller);
      })
      .catch(() => {
        this.setState({
          builderImageError: ErrorMessage.BuilderImageError,
        });
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
      selectedImage,
      selectedImageTag,
      recommendedImage,
      gitTypeError,
      gitRepoUrlError,
      gitUrlValidationStatus,
      namespaceError,
      nameError,
      builderImageError,
      isGitTypeVisible,
      selectedSourceSecret,
      sourceSecretName,
      secretCredentials,
    } = this.state;

    const { imageStreams } = this.props;

    if (imageStreams && imageStreams.loaded) {
      this.builderImages = normalizeBuilderImages(imageStreams.data);
    }

    let gitTypeField, showGitValidationStatus;
    if (isGitTypeVisible) {
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

    if (this.state.isGitSourceCreated && this.state.gitUrlValidationStatus === '') {
      showGitValidationStatus = (
        <span className="odc-import-form__loader">
          <LoadingInline />
        </span>
      );
    } else if (this.state.gitUrlValidationStatus === 'ok') {
      showGitValidationStatus = <CheckCircleIcon className="odc-import-form__success-icon" />;
    }

    return (
      <Form
        data-test-id="import-form"
        onSubmit={this.handleSubmit}
        className="co-m-pane__body-group"
      >
        <div className="co-m-pane__form">
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
            <HelpBlock>{gitRepoUrlError}</HelpBlock>
          </FormGroup>
          {gitTypeField}
          <FormGroup
            controlId="import-application-name"
            className={namespaceError ? 'has-error' : ''}
          >
            <ControlLabel className="co-required">Namespace</ControlLabel>
            <NsDropdown
              selectedKey={namespace}
              onChange={this.onNamespaceChange}
              data-test-id="import-application-name"
            />
            <HelpBlock>{namespaceError}</HelpBlock>
          </FormGroup>
          {this.state.showSourceSecretDropDown ? (
          <SourceSecretSelector
            sourceSecret={sourceSecretName}
            secretCredentials={secretCredentials}
            namespace={namespace}
            selectedKey={selectedSourceSecret}
            onChange={this.onSourceSecretChange}
          />
        ) : (
          ''
        )}
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
              onChange={this.onNameChange}
              required
              type="text"
              id="import-name"
              name="name"
              data-test-id="import-name"
            />
            <HelpBlock>
              {nameError || 'Identifies the resources created for this application'}
            </HelpBlock>
          </FormGroup>
        </div>
        <BuilderImageSelector
          loadingImageStream={!imageStreams.loaded}
          loadingRecommendedImage={gitUrlValidationStatus === 'ok' && !recommendedImage && !builderImageError}
          builderImages={this.builderImages}
          builderImageError={builderImageError}
          selectedImage={selectedImage}
          recommendedImage={recommendedImage}
          onImageChange={this.onBuilderImageChange}
          data-test-id="builder-image-selector"
        />
        {selectedImage && (
          <BuilderImageTagSelector
            imageTags={this.builderImages[selectedImage].tags}
            selectedImageTag={selectedImageTag}
            selectedImageDisplayName={this.builderImages[selectedImage].displayName}
            onTagChange={this.onBuilderImageTagChange}
          />
        )}
        <div className="co-m-btn-bar">
          <Button
            type="submit"
            bsStyle="primary"
            disabled={this.disableSubmitButton()}
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

export default ImportFlowForm;
