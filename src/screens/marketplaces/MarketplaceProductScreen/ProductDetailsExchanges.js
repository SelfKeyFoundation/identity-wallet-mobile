import React from 'react';
import { MarketplaceProductDetails, ProductOverview, ProductRequirements } from '../components';
import { ScreenContainer } from 'design-system';
import { Image } from 'react-native';

export default function ProductDetailsExchanges(props) {
  const { details } = props;
	const logoImageUri = details.logo && details.logo[0].url;
  
  return (
    <ScreenContainer>
      <MarketplaceProductDetails
        title={details.name}
        headerTitle="Exchanges"
        applyText="SignUp"
        logoComponent={
          <Image
            source={{ uri: logoImageUri }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 9,
            }}
          />
        }
        onSignUp={props.onSignUp}
        onBack={props.onBack}
        tabs={[{
            id: 'overview',
            title: 'Overview', 
            component: ProductOverview
          }, {
            id: 'requirements',
            title: 'Requirements', 
            component: () => <ProductRequirements requirements={[]} />
          }, 
        ]}
      />
    </ScreenContainer>
  )
}
