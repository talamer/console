import * as React from 'react';
import { Helmet } from 'react-helmet';

import { AsyncComponent } from '../../../components/utils/async';
import { connectToModel } from '../../../kinds';
import { DefaultPage } from '../../../components/default-resource';
import { resourceListPages } from '../../../components/resource-pages';
import { referenceForModel } from '../../../module/k8s';
import {
  LoadingBox,
  PageHeading,
} from '../../../components/utils';

const ResourceList = connectToModel(({kindObj, mock, namespace, selector}) => {
  if (!kindObj) {
    return <LoadingBox />;
  }
  
  const componentLoader = resourceListPages.get(referenceForModel(kindObj), () => Promise.resolve(DefaultPage));
  const ns = kindObj.namespaced ? namespace : undefined;
  return <AsyncComponent loader={componentLoader} namespace={ns} selector={selector} kind={kindObj.crd ? referenceForModel(kindObj) : kindObj.kind} showTitle={false} autoFocus={false} mock={mock} />;
});


export default class CodebasePage extends React.PureComponent<CodebaseProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const {namespace, noProjectsAvailable} = this.props;
    let kind;

    // Ensure that the "kind" route parameter is a valid resource kind ID
    kind = kind ? decodeURIComponent(kind) : 'Component';
    var HeadingTitle = "View codebases in ";
    HeadingTitle += namespace ? namespace : "all projects"; 

    return <React.Fragment>
      <Helmet>
        <title>Codebase</title>
      </Helmet>
      <PageHeading detail={true} title={HeadingTitle} >
      </PageHeading>
      <ResourceList kind={kind} namespace={namespace} mock={noProjectsAvailable} />
      </React.Fragment>;
  }
}
interface CodebaseProps{
  namespace: string,
  noProjectsAvailable
}