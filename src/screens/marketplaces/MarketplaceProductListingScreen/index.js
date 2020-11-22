/**
 * List the products for a given category
 */
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components';
import { ScreenContainer, Typography, Box, ScreenHeader } from 'design-system';
import { navigate, navigateBack, Routes } from 'core/navigation';
import { IconMarketplaceCredentials, IconMarketplaceExchanges, IconMarketplaceIncorporations } from '../components/icons';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { mkpOperations, mkpSelectors } from '../mkpSlice';

// const categories = [
// 	{
// 		id: 'difi',
// 		title: 'DeFi Credentials',
// 		description: 'Get your DeFi Credentials and interact freely with all our DeFi platforms',
// 		icon: IconMarketplaceCredentials,
// 	},
// 	{
// 		id: 'exchanges',
// 		title: 'Crypto Exchanges',
// 		description:
// 			'Compare exchange accounts and instantly sign up for a verified account without waiting for limits',
// 		icon: IconMarketplaceExchanges,
//   },
//   {
// 		id: 'incorporations',
// 		title: 'Incorporations',
// 		description:
// 			'Compare exchange accounts and instantly sign up for a verified account without waiting for limits',
// 		icon: IconMarketplaceIncorporations,
// 	},
// ];

export default function MarketplaceProductListingScreen(props) {
	const dispatch = useDispatch();
	const categoryId = props.navigation.getParam('categoryId');
	// const [products, setProducts] = useState([]);
	const category = useSelector(mkpSelectors.getProductListCategory);
	const items = useSelector(mkpSelectors.getProductListItems);
	
	const title = category && category.title;

	useEffect(() => {
		if (categoryId === 'keyfi') {
			// redirect to product details
			navigate(Routes.MARKETPLACE_PRODUCT, {
				sku: 'keyfi_kyc',
				categoryId: 'keyfi',
			});
		} else {
			dispatch(mkpOperations.fetchProductList(categoryId));
		}
	}, [categoryId]);
	
	// debugger;

	return (
		<ScreenContainer>
			<Box marginTop={15}>
				<ScreenHeader
					title={title}
					onBack={navigateBack}
				/>
			</Box>
      <ScrollView>
        {items.map(product => {
					return (
            <ProductCard
							data={product}
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                marginBottom: 10,
              }}
              onPress={() => {
								navigate(Routes.MARKETPLACE_PRODUCT, {
									sku: product.sku,
									categoryId,
									product,
								})
							}}
            />
          );
        })}
      </ScrollView>
		</ScreenContainer>
	);
}
