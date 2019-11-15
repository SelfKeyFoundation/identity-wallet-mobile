// @flow
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { SKIcon, Explanatory, ThemeContext } from '../index';

const LeftSide = styled.View`
  padding-right: 5px;
`;

const RightSide = styled.View`
  flex: 1;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

export interface AlertProps {
  icon: string;
  iconColor: string;
}

export function Alert(props: AlertProps) {
  const theme = useContext(ThemeContext);
  const iconName = props.icon || 'icon-shield-info';
  const iconColor = props.iconColor || theme.colors.typography;

  return (
    <Container>
      <LeftSide>
        <View>
          <SKIcon name={iconName} color={iconColor} size={16} />
        </View>
      </LeftSide>
      <RightSide>
        <Explanatory>{props.children}</Explanatory>
      </RightSide>
    </Container>
  );
}
