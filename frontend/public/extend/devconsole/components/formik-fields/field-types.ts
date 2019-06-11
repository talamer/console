export interface InputFieldProps {
  type?: string;
  name: string;
  label: string;
  helpText?: string;
  required?: boolean;
  onChange?: (event) => void;
  onBlur?: (event) => void;
}

export interface DropdownFieldProps extends InputFieldProps {
  items?: object;
  selectedKey: string;
  title?: React.ReactNode;
  fullWidth?: boolean;
}
