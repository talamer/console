/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { ResourceNSLink } from '../../../components/nav';

interface ConditionalResourceNSLinkProps {
  flags: any;
  resource: string;
  activeNamespace: string;
  isActive: boolean;
  required: string;
  name: string;
}

export const ConditionalResourceNSLink = ({
  flags,
  resource,
  activeNamespace,
  isActive,
  required,
  name,
}: ConditionalResourceNSLinkProps) => {
  if (!flags.get(required)) {
    return null;
  }
  return (
    <ResourceNSLink
      resource={resource}
      name={name}
      activeNamespace={activeNamespace}
      isActive={isActive}
    />
  );
};
