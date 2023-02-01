// @flow
import styled from 'styled-components/native';
import { View, TouchableWithoutFeedback, Text, TouchableHighlight } from 'react-native';
import { SKIcon } from '../icons';
import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../mobile-ui-provider';
import { Pressable } from 'native-base';

const Container = styled(View)`
  background-color: #161A1F;
  flex: 1;
  flex-direction: row;
  width: 100%;
  max-height: 80px;
`;

const Col = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 13px auto 0 auto;
`;

const Row = styled(View)`
  align-content: center;
`;

const TabText = styled(Text)`
  color: ${({ theme, active }) => active ? '#2DA1F8' : '#485668'};
  margin-top: 8px;
  margin-bottom: 2px;
  font-family: ${({ theme }) => theme.fonts.regular };
  font-size: 10px;
`;

interface TabNavigationItemProps {
  id: string;
  label: string;
  icon: string;
  active: boolean;
}

export interface TabNavigationProps {
  options: TabNavigationItem[],
  selectedOption: string,
}

export function TabNavigationItem(props: TabNavigationItemProps) {
  const theme = useContext(ThemeContext);

  return (
    <Pressable onPress={() => props.onPress(props.id)} style={{ flex: 1  }}>
      <Col>
        <Row>
          <SKIcon name={props.icon} color={props.active ? '#2DA1F8' : theme.colors.typography} size={20} />
        </Row>
        <Row>
          <TabText active={props.active}>{props.label}</TabText>
        </Row>
      </Col>
    </Pressable>
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
