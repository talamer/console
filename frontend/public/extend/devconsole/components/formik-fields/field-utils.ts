import cx from 'classnames';

export const getValidationState = (error: string, touched: boolean, warning?: string) => {
  return cx({
    success: touched && !error,
    error: touched && error,
    warning: touched && warning,
  });
};
