import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { TokenBoxCarousel, TokenBox } from '../../components';
import styled from 'styled-components/native';
import { IconKey, IconEth } from 'design-system/svg-icons';

const Container = styled(View)`
  margin: 20px;
`;

const items = [{
  iconComponent: IconKey,
  tokenName: "SelfKey",
  tokenCode: "key",
  tokenAmount: 10,
  fiatCurrency: "usd",
  fiatAmount: 1200.44
}, {
  iconComponent: IconEth,
  tokenName: "Ethereum",
  tokenCode: "eth",
  tokenAmount: 1.5,
  fiatCurrency: "usd",
  fiatAmount: 800.44
}];
// .map(item => {
//   return (
//     <TokenBox
//       iconComponent={item.iconComponent}
//       tokenName={item.tokenName}
//       tokenCode={item.tokenCode}
//       tokenAmount={item.tokenAmount}
//       fiatCurrency={item.fiatCurrency}
//       fiatAmount={item.fiatAmount}
//     />
//   );
// });

storiesOf('components', module)
  .add('TokenBoxCarousel', () => (
    <ScreenContainer>
      <TokenBoxCarousel
        items={items}
      />
    </ScreenContainer>
  ));
