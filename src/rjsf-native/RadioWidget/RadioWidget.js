import React from "react";

// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "@material-ui/core/FormLabel";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
import {
  Grid,
  Col,
  Row,
  Explanatory,
} from 'design-system';

import { WidgetProps } from "@rjsf/core/src";

const RadioWidget = ({
  id,
  schema,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps) => {
  const { enumOptions, enumDisabled } = options;

  const _onChange = ({}, value: any) =>
    onChange(schema.type == "boolean" ? value !== "false" : value);
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

  const row = options ? options.inline : false;

  return (
    <Col>
      <Explanatory>Radio Widget</Explanatory>
    </Col>
    // <>
    //   <FormLabel required={required} htmlFor={id}>
    //     {label || schema.title}
    //   </FormLabel>
    //   <RadioGroup
    //     value={`${value}`}
    //     row={row as boolean}
    //     onChange={_onChange}
    //     onBlur={_onBlur}
    //     onFocus={_onFocus}>
    //     {(enumOptions ).map((option: any, i: number) => {
    //       const itemDisabled =
    //         enumDisabled && (enumDisabled ).indexOf(option.value) != -1;

    //       const radio = (
    //         <FormControlLabel
    //           control={<Radio color="primary" key={i} />}
    //           label={`${option.label}`}
    //           value={`${option.value}`}
    //           key={i}
    //           disabled={disabled || itemDisabled || readonly}
    //         />
    //       );

    //       return radio;
    //     })}
    //   </RadioGroup>
    // </>
  );
};

export default RadioWidget;
