import React from "react";

// import Slider from "@material-ui/core/Slider";
// import FormLabel from "@material-ui/core/FormLabel";
import {
  Grid,
  Col,
  Row,
  Explanatory,
} from 'design-system';


import { utils } from "@rjsf/core/src";
import { WidgetProps } from "@rjsf/core/src";

const { rangeSpec } = utils;

const RangeWidget = ({
  value,
  readonly,
  disabled,
  onBlur,
  onFocus,
  options,
  schema,
  onChange,
  required,
  label,
  id,
}: WidgetProps) => {
  let sliderProps = { value, label, id, ...rangeSpec(schema) };
  
  const _onChange = ({}, value: any) =>
  onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
  onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);
  
  return (
    <>
      <Col>
        <Explanatory>Range Widget</Explanatory>
      </Col>
      {
      // <FormLabel required={required} id={id}>
      //   {label}
      // </FormLabel>
      // <Slider
      //   disabled={disabled || readonly}
      //   onChange={_onChange}
      //   onBlur={_onBlur}
      //   onFocus={_onFocus}
      //   valueLabelDisplay="auto"
      //   {...sliderProps}
      // />
      }
    </>
  );
};

export default RangeWidget;
