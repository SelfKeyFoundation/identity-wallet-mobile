import React, { useContext } from 'react';
import styled from 'styled-components/native';
import {
  Row,
  Col,
  H2,
  Explanatory,
  Grid,
} from '@selfkey/mobile-ui';

const BigNumber = styled(H2)`
  color: ${props => props.theme.colors.typography};
`;

export function ImportMessage(props) {

  return (
    <Grid>
      <Row>
        <Col paddingTop={0}>
          <Explanatory>
            To import an existing wallet from the SelfKey Desktop Application follow this steps:
          </Explanatory>
        </Col>
      </Row>
      <Row>
        <Col autoWidth>
          <BigNumber>1</BigNumber>
        </Col>
        <Col>
          <Explanatory>
            In the desktop application, open the menu, and click on Export Wallet link
          </Explanatory>
        </Col>
      </Row>
      <Row alignItems="center">
        <Col autoWidth>
          <BigNumber>2</BigNumber>
        </Col>
        <Col>
          <Explanatory>
            Scan the QR code displayed by the desktop app
          </Explanatory>
        </Col>
      </Row>
    </Grid>
  )
}