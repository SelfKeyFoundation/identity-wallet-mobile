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
  DatePicker
} from 'design-system';

import { WidgetProps, utils } from "@rjsf/core/src";

const { getDisplayLabel } = utils;

export type TextWidgetProps = WidgetProps & TextFieldProps;

export function getMessage(props) {
  const rawError = props.rawErrors && props.rawErrors[0];
  // const propName = 'email';

  if (!rawError) {
    return null;
  }

  if (rawError == 'is a required property') {
    return 'This field is required';
  }

  return `Please enter a valid ${props.label.toLowerCase()}`;
}


const TextWidget = (props: TextWidgetProps) => {
  const {
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
  } = props;
  const _onChange = (value) => onChange(value === "" ? options.emptyValue : value);
  const _onBlur = (value) => onBlur(id, value);
  const _onFocus = (value) => onFocus(id, value);

  const displayLabel = getDisplayLabel(
    schema,
    uiSchema
    /* TODO: , rootSchema */
  );


  if (schema.format === 'date') {
    return (
      <DatePicker
        label={displayLabel ? label || schema.title : false}
        required={required}
        disabled={disabled || readonly}
        value={value}
        onChange={_onChange}
        error={rawErrors.length > 0}
        errorMessage={getMessage(props)}
      />
    )
  }

  return (
    <TextInput
      label={displayLabel ? label || schema.title : false}
      required={required}
      disabled={disabled || readonly}
      value={value || value === 0 ? value : ""}
      error={rawErrors.length > 0}
      errorMessage={getMessage(props)}
      onChangeText={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      placeholder={schema.description}
    />
  );
};

export default TextWidget;
