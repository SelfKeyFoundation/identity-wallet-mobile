import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from '@selfkey/mobile-ui';
import { TokensEmptyAlert } from '../../components';
import styled from 'styled-components/native';

const Container = styled.View`
  margin: 20px;
`;

storiesOf('components', module)
  .add('TokenEmptyAlert', () => (
    <ScreenContainer>
      <Container>
        <TokensEmptyAlert />
      </Container>
    </ScreenContainer>
  ));
