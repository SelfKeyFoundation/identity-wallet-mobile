import React from "react";

// import TextField, {
//   StandardTextFieldProps as TextFieldProps,
// } from "@material-ui/core/TextField";

import {
  ScreenContainer,
  Modal,
  Button,
  SKIcon,
  Grid,
  Col,
  Row,
  Alert,
  ThemeContext,
  Paragraph,
  Explanatory,
  Link,
  DefinitionTitle,
  ExplanatorySmall,
  FormLabel,
  TextInput,
  H3,
  FormattedNumber,
} from '@selfkey/mobile-ui';

import { WidgetProps, utils } from "@selfkey/rjsf-core";

const { getDisplayLabel } = utils;

export type TextWidgetProps = WidgetProps & TextFieldProps;

const TextWidget = ({
  id,
  required,
  readonly,
  disabled,
  type,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
  options,
  schema,
  uiSchema,
  rawErrors = [],
  formContext,
  ...textFieldProps
}: TextWidgetProps) => {
  const _onChange = (value) => onChange(value === "" ? options.emptyValue : value);
  const _onBlur = (value) => onBlur(id, value);
  const _onFocus = (value) => onFocus(id, value);

  const displayLabel = getDisplayLabel(
    schema,
    uiSchema
    /* TODO: , rootSchema */
  );

  return (
    <TextInput
      label={displayLabel ? label || schema.title : false}
      required={required}
      disabled={disabled || readonly}
      value={value || value === 0 ? value : ""}
      error={rawErrors.length > 0}
      onChangeText={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
    />
  );
};

export default TextWidget;
