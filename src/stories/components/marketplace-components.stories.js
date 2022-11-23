import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScreenContainer } from 'design-system';
import { MarketplaceItem, MarketplaceProductDetails, ProductOverview, ProductRequirements } from '../../components';
import styled from 'styled-components/native';

const Container = styled(View)`
  margin: 20px;
`;

storiesOf('marketplace', module)
  .add('Marketplace Item', () => (
    <ScreenContainer>
      <MarketplaceItem
        title="DeFi Credentials"
        description="Get your DeFi Credentials and interact freely with all our DeFi platforms"
        style={{
          margin: 40
        }}
      />
    </ScreenContainer>
  ))
  .add('Product Details', () => (
    <ScreenContainer>
      <MarketplaceProductDetails
        title="DeFi Credentials"
        onSignUp={() => console.log('handle sign up')}
        onBack={() => console.log('on back')}
        tabs={[{
          id: 'overview',
          title: 'Overview', 
          component: ProductOverview
        }, {
          id: 'requirements',
          title: 'Requirements', 
          component: ProductRequirements
        }, 
        // {
        //   id: 'kyc',
        //   title: 'KYC', 
        //   component: ProductOverview
        // }
      ]}
      />
    </ScreenContainer>
  ));
