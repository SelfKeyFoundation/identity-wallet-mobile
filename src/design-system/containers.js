import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import styled from 'styled-components/native';

const ContainerCentered = styled(View)`
  background-color: ${props => props.theme.colors.baseDark};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScreenContainer = styled(SafeAreaView)`
  background-color: ${props => props.theme.colors.baseDark};
  flex: 1;
`;

const ContainerRegular = styled(View)`
  background-color: ${props => props.theme.colors.baseDark};
  margin: ${(props) => props.withMargin ? '35px' : 0};
  flex: 1;
`;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});

export const Container = (props) => {
  const InnerContainer = props.centered ? ContainerCentered : ContainerRegular;
  const innerContent = <InnerContainer {...props} />;

  if (props.scrollable) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer} style={{ flex: 1 }}>
        { innerContent }
      </ScrollView>
    );
  }

  return innerContent;
};




