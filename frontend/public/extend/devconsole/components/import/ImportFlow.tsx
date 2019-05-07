/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { Firehose } from '../../../../components/utils';
import { ImageStreamModel } from '../../../../models';
import ImportFlowForm from '../ImportFlowForm/ImportFlowForm';

interface ImportFlowProps {
  namespace: string;
}

export const ImportFlow: React.FunctionComponent<ImportFlowProps> = ({ namespace }) => {
  return (
    <Firehose resources={[{ kind: ImageStreamModel.kind, prop: 'imagestreams', isList: true }]}>
      <ImportFlowForm activeNamespace={namespace} />
    </Firehose>
  );
};
