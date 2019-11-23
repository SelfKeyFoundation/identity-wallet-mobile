// @flow
import styled from 'styled-components/native';
import { View, TouchableWithoutFeedback } from 'react-native';
import { SKIcon } from '../icons';
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../mobile-ui-provider';

const Container = styled.View`
  background-color: #262F39;
  flex: 1;
  flex-direction: row;
  width: 100%;
  max-height: 80px;
`;

const Col = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 13px auto 0 auto;
`;

const Row = styled.View`
  align-content: center;
`;

const TabText = styled.Text`
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.typography};
  margin-top: 8px;
  margin-bottom: 2px;
  font-family: ${({ theme }) => theme.fonts.regular };
  font-size: 10px;
`;

interface TabNavigationItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

export interface TabNavigationProps {
  options: TabNavigationItem[],
  selectedOption: string,
}

export function TabNavigationItem(props: TabNavigationItem) {
  const theme = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={() => props.onPress(props.id)}>
      <Col>
        <Row>
          <SKIcon name={props.icon} color={props.active ? theme.colors.primary : theme.colors.typography} size={20} />
        </Row>
        <Row>
          <TabText active={props.active}>{props.label}</TabText>
        </Row>
      </Col>
    </TouchableWithoutFeedback>
  );
}

export function TabNavigation(props: TabNavigationProps) {
  return (
    <Container>
      {
        props.items.map((item) => {
          return (
            <TabNavigationItem
              key={item.id}
              icon={item.icon}
              active={item.id === props.activeId}
              label={item.label}
              id={item.id}
              onPress={props.onPress}
            />
          );
        })
      }
    </Container>
  );
}
