import * as React from 'react';
import { Firehose } from '../../../../components/utils';
import { ImageStreamModel } from '../../../../models';
import ImportFlowForm from '../ImportFlowForm/ImportFlowForm';

export const ImportFlow: React.FunctionComponent = () => {

  return (
    <Firehose resources={[{kind: ImageStreamModel.kind, prop: 'imagestreams', isList: true}]}>
      <ImportFlowForm />
    </Firehose>
  );
};
