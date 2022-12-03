/**
 * @flow
 */

import React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import {
  Col,
  Grid,
  Row,
  Typography
} from 'design-system';
import ArrowDownImage from './arrow-down.png';
import ArrowUpImage from './arrow-up.png';

const HeaderContainer = styled(Grid)`
	border: 0px solid ${props => '#38C0D1'};
  border-left-width: 8px;
  border-right-width: 1px;
  border-right-color: transparent;
  border-radius: 4px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
  background: #2A3540;
  padding: 16px 24px;
  z-index: 1;
`;


const OptionIndex = styled(View)`
  background: #3B4B59;
  border: 1px solid #495B70;
  width: 25px;
  height: 25px;
  border-radius: 100px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ItemBody = styled(View)`
  border: 1px solid #303C49;
  margin-top: -20px;
  border-radius: 4px;
  padding: 30px 16px;
  z-index: 0;
`;

type TogglerItem = {
  title: string;
  body: any;
}

type TogglerProps = {
  items: TogglerItem[]
}

export function Toggler(props: TogglerProps) {
  return (
    <Grid>
    {
      props.items.map((option, idx) => {
        const isActive = option.id === props.activeItemId;

        return (
          <Row>
            <Col>
              <HeaderContainer>
                <Row alignItems="center" justifyContent="center">
                  <Col autoWidth paddingRight={8}>
                    <OptionIndex>
                      <Typography color="#93B0C1" fontSize={14} fontWeight="bold">{ idx + 1 }</Typography>
                    </OptionIndex>
                  </Col>
                  <Col>
                    <Typography fontSize={18}>
                      { option.title }
                    </Typography>
                  </Col>
                  <Col autoWidth>
                    <Image
                      source={isActive ? ArrowUpImage : ArrowDownImage}
                      style={{
                        width: 20,
                        height: 11
                      }}
                    />
                  </Col>
                </Row>
              </HeaderContainer>
              { isActive && <ItemBody>
                {
                  option.body
                }
              </ItemBody> }
            </Col>
          </Row>
        )
      })
    }
    </Grid>
  );
}
