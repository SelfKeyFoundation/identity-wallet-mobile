import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { TokenDetails } from '../../components';
import styled from 'styled-components/native';
import { IconKey, IconEth } from 'design-system/svg-icons';

const Container = styled(View)`
  margin: 20px;
`;

storiesOf('components', module)
  .add('TokenDetails', () => (
    <ScreenContainer>
      <Container>
        <TokenDetails
          iconComponent={IconKey}
          tokenName="SelfKey"
          tokenCode="key"
          tokenAmount={85262.781}
          fiatCurrency="usd"
          fiatAmount={951.44}
          lastPrice={0.0020}
          lastPriceCurrency="usd"
          tokenContract="0xDF8e950e8b90bA07Cc104C70BA28E5812f75A042"
          // tokenContract="0x4cc19356f2…3296e7"
        />
      </Container>
    </ScreenContainer>
  ));
