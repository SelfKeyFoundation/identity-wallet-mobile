import React from "react";

// import TextField from "@material-ui/core/TextField";
import {
  TextInput
} from 'design-system';

import { WidgetProps } from "@selfkey/rjsf-core";

const PasswordWidget = ({
  id,
  required,
  readonly,
  disabled,
  value,
  label,
  onFocus,
  onBlur,
  onChange,
  options,
  autofocus,
  schema,
  rawErrors = [],
}: WidgetProps) => {
  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  return (
    <TextInput
      id={id}
      label={label || schema.title}
      autoFocus={autofocus}
      required={required}
      disabled={disabled || readonly}
      type="password"
      value={value ? value : ""}
      error={rawErrors.length > 0}
      onFocus={_onFocus}
      onBlur={_onBlur}
      onChange={_onChange}
    />
  );
};

export default PasswordWidget;
