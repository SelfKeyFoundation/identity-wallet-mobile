import React from 'react';

// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import {
  Grid,
  Col,
  Row,
  Explanatory,
} from 'design-system';


import { WidgetProps } from '@selfkey/rjsf-core';

const UpDownWidget = ({
  id,
  required,
  readonly,
  disabled,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  autofocus,
}: WidgetProps) => {
  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => onChange(value);
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
  onBlur(id, value);
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);
  
  return (
    <Col>
      <Explanatory>UpDown Widget</Explanatory>
    </Col>
    // <FormControl
    //   fullWidth={true}
    //   //error={!!rawErrors}
    //   required={required}
    // >
    //   <InputLabel>{label}</InputLabel>
    //   <Input
    //     id={id}
    //     autoFocus={autofocus}
    //     required={required}
    //     type="number"
    //     disabled={disabled || readonly}
    //     name={name}
    //     value={value ? value : ''}
    //     onChange={_onChange}
    //     onBlur={_onBlur}
    //     onFocus={_onFocus}
    //   />
    // </FormControl>
  );
};

export default UpDownWidget;
