/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import { NameValueEditor } from '../../../../../components/utils/name-value-editor';
import { useFormikContext, FormikValues } from '../../../../../../node_modules/formik';
import FormSection from '../section/FormSection';

const LabelSection: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const _labels = _.isEmpty(values.labels) ? [['', '']] : _.toPairs(values.labels);
  return (
    <FormSection title="Labels" subTitle="Each label is applied to each created resource." divider>
      <NameValueEditor
        nameString="Name"
        valueString="Value"
        addString="Add Label"
        allowSorting={true}
        nameValuePairs={_labels}
        updateParentData={(obj) => setFieldValue('labels', _.fromPairs(obj.nameValuePairs))}
        useLoadingInline={true}
        readOnly={false}
      />
    </FormSection>
  );
};

export default LabelSection;
