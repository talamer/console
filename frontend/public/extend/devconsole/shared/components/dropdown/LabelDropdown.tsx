/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import * as React from 'react';
import * as fuzzy from 'fuzzysearch';

import { Dropdown, LoadingInline } from '../../../../../components/utils';
import { K8sResourceKind } from '../../../../../module/k8s';

type FirehoseList = {
  data?: K8sResourceKind[];
  [key: string]: any;
};

interface LabelDropdownState {
  items: {};
  title: React.ReactNode;
}

interface LabelDropdownProps {
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
  actionItem?: {
    actionTitle: string;
    actionKey: string;
  };
  labelSelector: string;
  labelType: string;
  loaded?: boolean;
  loadError?: string;
  placeholder?: string;
  resources?: FirehoseList[];
  selectedKey: string;
  onChange?: (name: string, key: string) => void;
}

class LabelDropdown extends React.Component<LabelDropdownProps, LabelDropdownState> {
  readonly state = {
    items: {},
    title: this.props.loaded ? (
      <span className="btn-dropdown__item--placeholder">{this.props.placeholder}</span>
    ) : (
      <LoadingInline />
    ),
  };

  autocompleteFilter(text, item) {
    return fuzzy(text, item);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.state, nextState)) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps: LabelDropdownProps) {
    const { labelSelector, resources, loaded, loadError, placeholder, allSelectorItem } = nextProps;
    if (!loaded) {
      this.setState({ title: <LoadingInline /> });
      return;
    }
    if (!this.props.loaded) {
      this.setState({
        title: <span className="btn-dropdown__item--placeholder">{placeholder}</span>,
      });
    }

    if (loadError) {
      this.setState({
        title: <span className="cos-error-title">Error Loading {placeholder}</span>,
      });
    }

    const unsortedList = {};
    _.each(resources, ({ data }) => {
      _.reduce(
        data,
        (acc, resource) => {
          if (
            this.props.labelType === 'Application' &&
            resource.metadata.labels &&
            resource.metadata.labels.hasOwnProperty(labelSelector)
          ) {
            acc[resource.metadata.labels[labelSelector]] = {
              name: resource.metadata.labels[labelSelector],
            };
          } else if (
            this.props.labelType === 'Secret' &&
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

    this.setState({ items: sortedList });
  }

  onChange = (key) => {
    const { name } = _.get(this.state, ['items', key], {});
    const { actionItem } = this.props;
    let title;
    if (actionItem && key === actionItem.actionKey) {
      title = <span className="btn-dropdown__item--placeholder">{actionItem.actionTitle}</span>;
    } else {
      title = <span>{name}</span>;
    }
    this.props.onChange(name, key);
    this.setState({ title });
  };

  render() {
    const items = {};

    _.keys(this.state.items).forEach((key) => {
      const item = this.state.items[key];
      items[key] = item.name;
    });

    return (
      <Dropdown
        className={this.props.className}
        dropDownClassName={this.props.dropDownClassName}
        menuClassName={this.props.menuClassName}
        buttonClassName={this.props.buttonClassName}
        titlePrefix={this.props.titlePrefix}
        autocompleteFilter={this.autocompleteFilter}
        actionItem={this.props.actionItem}
        items={items}
        onChange={this.onChange}
        selectedKey={this.props.selectedKey}
        title={this.props.title || this.state.title}
        autocompletePlaceholder={this.props.placeholder}
        storageKey={this.props.storageKey}
        disabled={this.props.disabled}
      />
    );
  }
}

export default LabelDropdown;
