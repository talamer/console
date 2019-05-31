import * as React from 'react';
import * as cx from 'classnames';

export type NumberInputProps = React.HTMLProps<HTMLInputElement> & {
  /**
   * The max value.
   */
  max?: number;
  /**
   * The min value.
   */
  min?: number;
  /**
   * The step increment. Defaults to 1.
   */
  step?: number;
  /**
   * The number of digits to the right of the decimal point.
   * Use a scale of 0 for integer values.
   */
  scale?: number;
  /**
   * The controlled input value.
   */
  value?: number | string;
  /**
   * Callback when input state changes.
   */
  onChange(value: number);
};

interface State {
  value: number | string;
}

export default class NumberSpinner extends React.Component<NumberInputProps, State> {
  state: State = {
    value: '',
  };

  static getDerivedStateFromProps(props: NumberInputProps, state: State): State {
    if (props.value !== state.value) {
      return { value: props.value };
    }
    return state;
  }

  private inputRef = React.createRef<HTMLInputElement>();

  private onKeyDown = (e) => {
    const { onKeyDown } = this.props;

    onKeyDown && onKeyDown(e);

    if (!e.isDefaultPrevented()) {
      const keyCode = e.keyCode;
      if (keyCode === 38) {
        this.step(e, 1);
      } else if (keyCode === 40) {
        this.step(e, -1);
      }
    }
  };

  private onStepUp = (e) => {
    this.inputRef.current.focus();
    this.step(e, 1);
  };

  private onStepDown = (e) => {
    this.inputRef.current.focus();
    this.step(e, -1);
  };

  private step(e, direction) {
    // prevent browser from stepping the input value
    e.preventDefault();

    const { step = 1, placeholder } = this.props;
    let { value } = this.state;

    // if no value, step from placeholder
    if (value == null || value === '') {
      value = placeholder;
    }

    // ensure value is a number
    value = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(value)) {
      value = 0;
    }

    let newValue = value;
    const remainder = value % step;
    if (remainder > 0.0001 && remainder < step - 0.0001) {
      // snap to step
      newValue += direction < 0 ? -remainder : step - remainder;
    } else {
      newValue += step * direction;
    }
    this.notifyChange(String(newValue), true);
  }

  private onBlur = (e) => {
    const { onBlur } = this.props;
    onBlur && onBlur(e);
    this.notifyChange(e.currentTarget.value, true);
  };

  private onChange = (e) => {
    this.notifyChange(e.currentTarget.value);
  };

  private notifyChange = (v, clamp?) => {
    const { value, onChange } = this.props;
    if (clamp) {
      const newValue = this.clamp(v);
      if (!isNaN(newValue) && newValue !== value && onChange) {
        onChange(newValue);
      } else {
        this.setState({ value });
      }
    } else {
      // newValue = clamp ? newValue : v;
      if (v !== this.state.value) {
        this.setState({ value: v });
      }
    }
  };

  private clamp(value) {
    const { scale } = this.props;
    let { min, max } = this.props;

    if (value == null || isNaN(value)) {
      return value;
    }

    let number;
    if (scale == null) {
      number = value;
    } else {
      const scaleFactor = 10 ** scale;
      number = Math.floor(parseFloat(value) * scaleFactor) / scaleFactor;
      if (min != null) {
        min = Math.floor(min * scaleFactor) / scaleFactor;
      }
      if (max != null) {
        max = Math.floor(max * scaleFactor) / scaleFactor;
      }
    }

    // clamp min value
    if (min != null) {
      number = parseFloat(number) < min ? min : number;
    }

    // clamp max value
    if (max != null) {
      number = parseFloat(number) > max ? max : number;
    }

    return String(number);
  }

  render() {
    const {
      disabled,
      className,
      // deconstruct remainder of params to avoid setting them on input
      max,
      min,
      step,
      scale,
      ...inputProps
    } = this.props;
    const { value } = this.state;

    return (
      <div>
        <i
          role="presentation"
          className={cx('fa fa-minus-square co-m-number-spinner__down-icon', { disabled })}
          onMouseDown={!disabled ? this.onStepDown : undefined}
        />
        <input
          ref={this.inputRef}
          type="number"
          className={cx(className, 'co-m-number-spinner__input')}
          {...inputProps}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          value={value}
          disabled={disabled}
        />
        <i
          role="presentation"
          className={cx('fa fa-plus-square co-m-number-spinner__up-icon', { disabled })}
          onMouseDown={!disabled ? this.onStepUp : undefined}
        />
      </div>
    );
  }
}
