import React from 'react';
import { TouchableWithoutFeedback } from "react-native";
import { Col, Grid, Row } from "./grid";
import { SKIcon } from "./icons";
import { Typography } from "./typography";

export function ScreenHeader(props) {
  return (
    <Grid style={{ marginLeft: 20, marginRight: 20 }}>
      <Row alignItems="center" >
        <Col autoWidth style={{ width: 40 }}>
          <TouchableWithoutFeedback onPress={props.onBack}>
            <SKIcon name="icon-nav-ar-left" size={12} color="#fff" />
          </TouchableWithoutFeedback>
        </Col>
        <Col alignItems="center">
          <Typography fontWeight="bold" fontSize={18} lineHeight={24} color="#FFFFFF">
            {props.title}
          </Typography> 
        </Col>
        <Col autoWidth style={{width: 40 }} />
      </Row>
    </Grid>
  )
}