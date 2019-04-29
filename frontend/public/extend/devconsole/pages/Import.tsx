import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { ImportFlow } from './../components/import/ImportFlow';
import { PageHeading } from '../../../components/utils';

const ImportPage: React.FunctionComponent = () => (
  <PageSection variant={PageSectionVariants.light}>
    <Helmet>
      <title>Import from git</title>
    </Helmet>
    <PageHeading title="Git Import" />
    <div className="co-m-pane__body">
      <ImportFlow />
    </div>
  </PageSection>
);

export default ImportPage;
