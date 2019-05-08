/* eslint-disable no-unused-vars, no-undef */
interface ConditionalResourceProps {
  flags: any;
  required?: string;
  disallowed?: string;
  children: any;
}

export const ConditionalResource = ({
  flags,
  required,
  disallowed,
  children,
}: ConditionalResourceProps) => {
  if (!flags.get(required) || flags.get(disallowed || !children)) {
    return null;
  }
  return children;
};
