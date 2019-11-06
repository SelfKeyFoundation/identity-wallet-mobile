// @flow
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { SKIcon, Paragraph, ThemeContext } from '../index';

const LeftSide = styled.View`
  display: flex;
  flex-basis: 20;
  padding-top: 3;
`;

const RightSide = styled.View`
  display: flex;
  margin-left: 5;
`;

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 20px;
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
        <Paragraph>{props.children}</Paragraph>
      </RightSide>
    </Container>
  );
}
