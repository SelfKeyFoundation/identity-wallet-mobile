import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';

const Container = styled(View)`
  flex: 1;
	border: 0px solid ${props => props.color || '#38C0D1'};
  border-left-width: 8px;
  border-right-width: 1px;
  border-right-color: transparent;
  border-radius: 4px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
  margin-bottom: 60px;
`;

export function StakingCard(props) {
	return (
		<Container {...props}>
      <LinearGradient
        colors={['#161A1F', '#1A2836']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 4
        }}
      >
        <View style={{ flex: 1, padding: 16 }}>
          { props.children }
        </View>
      </LinearGradient>
		</Container>
	);
}
