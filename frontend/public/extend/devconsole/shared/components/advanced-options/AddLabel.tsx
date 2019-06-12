/* eslint-disable no-undef, dot-notation */
import * as React from 'react';
import * as _ from 'lodash-es';
import { AsyncComponent } from '../../../../../components/utils';

interface LabelValue {
  name: string;
  value: string;
}

interface AddLabelProps {
  onLabelAdd: (obj: LabelValue) => void;
  labels: { [name: string]: string };
  readOnly: boolean;
}

const NameValueEditorComponent = (props) => <AsyncComponent loader={() => import('../../../../../components/utils/name-value-editor').then(c => c.NameValueEditor)} {...props} />;

const AddLabel: React.FC<AddLabelProps> = ({onLabelAdd, labels, readOnly}) => {

  const _labels = _.isEmpty(labels) ? [['', '']] : _.toPairs(labels);

  return (
    <React.Fragment>
      <div className="co-section-heading">Labels</div>
      <div>Each label is applied to each created resource.</div>
      <NameValueEditorComponent
        nameValuePairs={_labels}
        updateParentData={onLabelAdd}
        useLoadingInline={true}
        readOnly={readOnly}
      />
    </React.Fragment>
  );
};

export default AddLabel;
