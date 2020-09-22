import React from 'react';

import { AddButtonProps } from '@rjsf/core/src';

// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import {
  Grid,
  Col,
  Row,
  Explanatory,
  Button
} from 'design-system';


const AddButton: React.FC<AddButtonProps> = props => (
  // <Button {...props} color="secondary">
  //   <AddIcon /> Add Item
  // </Button>
  <Col>
    <Button {...props}>Add Item</Button>
  </Col>
);

export default AddButton;
