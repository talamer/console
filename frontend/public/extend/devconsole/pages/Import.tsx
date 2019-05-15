/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { match as RMatch } from 'react-router';
import { Helmet } from 'react-helmet';
import { PageHeading, Firehose } from '../../../components/utils';
import { ImageStreamModel } from '../../../models';
import ImportFlowForm from '../components/ImportFlowForm/ImportFlowForm';

export interface ImportPageProps {
  match: RMatch<{ ns?: string }>;
}

const ImportPage: React.FunctionComponent<ImportPageProps> = ({ match }) => {
  const namespace = match.params.ns;
  return (
    <React.Fragment>
      <Helmet>
        <title>Import from git</title>
      </Helmet>
      <PageHeading title="Git Import" />
      <div className="co-m-pane__body">
        <Firehose resources={[{ kind: ImageStreamModel.kind, prop: 'imageStreams', isList: true }]}>
          <ImportFlowForm activeNamespace={namespace} />
        </Firehose>
      </div>
    </React.Fragment>
  );
};

export default ImportPage;
