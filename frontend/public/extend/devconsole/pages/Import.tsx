import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ImportFlow } from './../components/import/ImportFlow';
import { PageHeading } from '../../../components/utils';

const ImportPage: React.FunctionComponent = () => (
  <React.Fragment>
    <Helmet>
      <title>Import from git</title>
    </Helmet>
    <PageHeading title="Git Import" />
    <div className="co-m-pane__body">
      <ImportFlow />
    </div>
  </React.Fragment>
);

export default ImportPage;
