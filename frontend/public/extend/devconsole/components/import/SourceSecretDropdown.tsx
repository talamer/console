/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import * as _ from 'lodash-es';
import LabelDropdown from '../../shared/components/dropdown/LabelDropdown';
import { K8sResourceKind } from '../../../../module/k8s';

type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};

interface SourceSecretDropdownProps {
  dropDownClassName?: string;
  menuClassName?: string;
  namespace?: string;
  actionItem?: {
    actionTitle: string;
    actionKey: string;
  };
  allSelectorItem?: {
    allSelectorKey?: string;
    allSelectorTitle?: string;
  };
  resources?: FirehoseList[];
  selectedKey: string;
  onChange?: (name: string, key: string) => void;
}

export default class SourceSecretDropdown extends React.Component<SourceSecretDropdownProps> {
  getSortedList(resources, labelSelector, allSelectorItem) {
    const unsortedList = {};
    _.each(resources, ({ data }) => {
      _.reduce(
        data,
        (acc, resource) => {
          if (
            resource &&
            resource.hasOwnProperty(labelSelector) &&
            (resource[labelSelector] === 'kubernetes.io/basic-auth' ||
              resource[labelSelector] === 'kubernetes.io/ssh-auth')
          ) {
            acc[resource.metadata.name] = {
              name: resource.metadata.name,
            };
          }
          return acc;
        },
        unsortedList,
      );
    });

    const sortedList = {};

    if (this.props.allSelectorItem && !_.isEmpty(unsortedList)) {
      sortedList[allSelectorItem.allSelectorKey] = {
        name: allSelectorItem.allSelectorTitle,
      };
    }

    _.keys(unsortedList)
      .sort()
      .forEach((key) => {
        sortedList[key] = unsortedList[key];
      });

    return sortedList;
  }

  sortedList = {};
  
  componentWillReceiveProps(nextProps: SourceSecretDropdownProps) {
    const { resources, allSelectorItem } = nextProps;
    this.sortedList = this.getSortedList(resources, 'type', allSelectorItem);
  }

  render() {
    return (
      <LabelDropdown
        {...this.props}
        placeholder="Select Secret Name"
        sortedList={this.sortedList}
      />
    );
  }
}
