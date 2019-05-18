/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import * as React from 'react';
import LabelDropdown from './LabelDropdown';
import { K8sResourceKind } from '../../../../../module/k8s';

type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};

interface AppDropdownProps {
  className?: string;
  dropDownClassName?: string;
  menuClassName?: string;
  buttonClassName?: string;
  title?: React.ReactNode;
  titlePrefix?: string;
  allApplicationsKey?: string;
  storageKey?: string;
  disabled?: boolean;
  allSelectorItem?: {
    allSelectorKey?: string;
    allSelectorTitle?: string;
  };
  namespace?: string;
  actionItem?: {
    actionTitle: string;
    actionKey: string;
  };
  resources?: FirehoseList[];
  selectedKey: string;
  onChange?: (name: string, key: string) => void;
}

export default class AppDropdown extends React.Component<AppDropdownProps> {
  getSortedList = (resources, labelSelector, allSelectorItem) => {
    const unsortedList = {};
    _.each(resources, ({ data }) => {
      _.reduce(
        data,
        (acc, resource) => {
          if (resource.metadata.labels && resource.metadata.labels.hasOwnProperty(labelSelector)) {
            acc[resource.metadata.labels[labelSelector]] = {
              name: resource.metadata.labels[labelSelector],
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
  };

  sortedList = {};
  
  componentWillReceiveProps(nextProps: AppDropdownProps) {
    const { resources, allSelectorItem } = nextProps;
    this.sortedList = this.getSortedList(resources, 'app.kubernetes.io/part-of', allSelectorItem);
  }

  render() {
    return (
      <LabelDropdown
        {...this.props}
        placeholder="Select an Application"
        sortedList={this.sortedList}
      />
    );
  }
}
