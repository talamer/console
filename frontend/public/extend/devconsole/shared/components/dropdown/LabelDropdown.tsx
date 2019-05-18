/* eslint-disable no-unused-vars, no-undef */
import * as _ from 'lodash-es';
import * as React from 'react';
import * as fuzzy from 'fuzzysearch';

import { Dropdown, LoadingInline } from '../../../../../components/utils';

interface LabelDropdownState {
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
  actionItem?: {
    actionTitle: string;
    actionKey: string;
  };
  loaded?: boolean;
  loadError?: string;
  placeholder?: string;
  selectedKey: string;
  sortedList: {};
  onChange?: (name: string, key: string) => void;
}

class LabelDropdown extends React.Component<LabelDropdownProps, LabelDropdownState> {
  readonly state = {
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
    const { loaded, loadError, placeholder } = nextProps;
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

    _.keys(this.props.sortedList).forEach((key) => {
      const item = this.props.sortedList[key];
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
