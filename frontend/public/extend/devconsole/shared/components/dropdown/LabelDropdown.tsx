/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import * as React from 'react';
import * as fuzzy from 'fuzzysearch';

import { Dropdown, ResourceName, LoadingInline } from '../../../../../components/utils';
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
  actionItem?: {
    actionTitle: string,
    actionKey: string,
  };
  labelSelector: string;
  labelType: string;
  loaded?: boolean;
  loadError?: string;
  placeholder?: string;
  resources?: FirehoseList[];
  selectedKey: string,
  onChange?: (arg0: string, arg1: string) => void;
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
    return fuzzy(text, item.props.name);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.state, nextState)) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps: LabelDropdownProps) {
    const { labelSelector, resources, loaded, loadError, placeholder } = nextProps;
    if (!loaded) {
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
          if (resource.metadata.labels.hasOwnProperty(labelSelector)) {
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
    _.keys(unsortedList)
      .sort()
      .forEach((key) => {
        sortedList[key] = unsortedList[key];
      });
    this.setState({ items: sortedList });
  }

  onChange = (key) => {
    const { name } = _.get(this.state, ['items', key], {});
    const { labelType } = this.props;
    const { actionKey, actionTitle } = this.props.actionItem;
    let title;
    if (key === actionKey) {
      title = <span className="btn-dropdown__item--placeholder">{actionTitle}</span>;
    } else {
      title = <ResourceName kind={labelType} name={name} />;
    }
    this.props.onChange(name, key);
    this.setState({ title });
  };

  render() {
    const items = {};
    _.keys(this.state.items).forEach((key) => {
      const item = this.state.items[key];
      items[key] = <ResourceName kind={this.props.labelType} name={item.name} />;
    });

    return (
      <Dropdown
        autocompleteFilter={this.autocompleteFilter}
        actionItem={this.props.actionItem}
        items={items}
        onChange={this.onChange}
        selectedKey={this.props.selectedKey}
        title={this.state.title}
        autocompletePlaceholder={this.props.placeholder}
        dropDownClassName="dropdown--full-width"
        menuClassName="dropdown-menu--text-wrap"
      />
    );
  }
}

export default LabelDropdown;
