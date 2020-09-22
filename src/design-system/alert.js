// @flow
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { useContext } from 'react';
import { SKIcon, Explanatory, ThemeContext, ErrorMessage } from './index';

const LeftSide = styled.View`
  padding-right: 5px;
  padding-top: 2px;
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
  let iconName = props.icon || 'icon-shield-info';
  let iconColor = props.iconColor || props.color || theme.colors.typography;
  let TextComponent = Explanatory;

  if (props.type === 'error') {
    iconName = 'icon-err-warning';
    iconColor = theme.colors.error;
    TextComponent = ErrorMessage;
  }

  return (
    <Container>
      { props.noIcon ? null : <LeftSide>
        <View>
          <SKIcon name={iconName} color={iconColor} size={16} />
        </View>
      </LeftSide> }
      <RightSide>
        <TextComponent style={{ color: props.color || theme.colors.typography }}>{props.children}</TextComponent>
      </RightSide>
    </Container>
  );
}