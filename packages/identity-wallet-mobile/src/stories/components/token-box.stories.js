import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { TokenBox } from '../../components';
import styled from 'styled-components/native';
import { IconKey, IconEth } from 'design-system/svg-icons';

const Container = styled.View`
  margin: 20px;
`;

storiesOf('components', module)
  .add('TokenBox', () => (
    <ScreenContainer>
      <Container>
        <TokenBox
          iconComponent={IconKey}
          tokenName="SelfKey"
          tokenCode="key"
          tokenAmount={0}
          fiatCurrency="usd"
          fiatAmount={951.44}
        />
      </Container>
      <Container>
        <TokenBox
          iconComponent={IconKey}
          tokenName="SelfKey"
          tokenCode="key"
          tokenAmount={0.100}
          fiatCurrency="usd"
          fiatAmount={951.44}
        />
      </Container>
      <Container>
        <TokenBox
          iconComponent={IconEth}
          tokenName="Ethereum"
          tokenCode="eth"
          tokenAmount={85262.781}
          fiatCurrency="usd"
          fiatAmount={951.44}
        />
      </Container>
    </ScreenContainer>
  ));
