import * as React from 'react';
import Helmet from 'react-helmet';
import { Firehose } from '../../../components/utils';
import BuildSource from '../components/source-to-image/SourceToImage';

export const SourceToImagePage: React.FC = () => {
  const title = 'Create Source-to-Image Application';
  const searchParams = new URLSearchParams(location.search);
  const imageStreamName = searchParams.get('imagestream');
  const imageStreamNamespace = searchParams.get('imagestream-ns');
  const preselectedNamespace = searchParams.get('preselected-ns');
  const resources = [
    {
      kind: 'ImageStream',
      name: imageStreamName,
      namespace: imageStreamNamespace,
      isList: false,
      prop: 'obj',
    },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="co-m-pane__body">
        <h1 className="co-m-pane__heading">{title}</h1>
        <Firehose resources={resources}>
          <BuildSource preselectedNamespace={preselectedNamespace}/>
        </Firehose>
      </div>
    </React.Fragment>
  );
};

export default SourceToImagePage;
