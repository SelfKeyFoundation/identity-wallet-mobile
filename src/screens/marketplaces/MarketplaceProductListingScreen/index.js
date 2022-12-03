/**
 * List the products for a given category
 */
import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../components';
import { ScreenContainer, Typography, Box, ScreenHeader, Button } from 'design-system';
import { navigate, navigateBack, Routes } from 'core/navigation';
import {
	IconMarketplaceCredentials,
	IconMarketplaceExchanges,
	IconMarketplaceIncorporations,
} from '../components/icons';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { mkpOperations, mkpSelectors } from '../mkpSlice';
import { getNavigationParam } from '../../../v2/screen-utils';

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

function PassportsPLP(props) {
	// const dispatch = useDispatch();
	const categoryId = getNavigationParam(props, 'categoryId');
	// props.navigation.getParam('categoryId');
	// const [products, setProducts] = useState([]);
	const category = useSelector(mkpSelectors.getProductListCategory);
	const allItems = useSelector(mkpSelectors.getProductListItems);
	const [activeTab, setActiveTab] = useState('passports');
	const title = category && category.title;

	const passports = allItems.filter(p => p.data.showInPassportApp);
	const residencies = allItems.filter(p => p.data.showInResidencyApp);
	const items = activeTab === 'passports' ? passports : residencies;

	console.log(allItems);
	
	return (
		<ScreenContainer>
			<Box marginTop={15}>
				<ScreenHeader title={title} onBack={navigateBack} />
			</Box>
			<Box>
				<Box row marginBottom={60} paddingLeft={22} paddingRight={22}>
					<Box col>
						<Button
							onPress={() => setActiveTab('passports')}
							type={activeTab === 'passports' ? 'shell-primary' : 'shell-secondary'}
						>
							Passports
						</Button>
					</Box>
					<Box col>
						<Button
							onPress={() => setActiveTab('residencies')}
							type={activeTab === 'residencies' ? 'shell-primary' : 'shell-secondary'}
						>
							Residencies
						</Button>
					</Box>
				</Box>
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
								});
							}}
						/>
					);
				})}
			</ScrollView>
		</ScreenContainer>
	);
}

function SharedPLP(props) {
	const categoryId = getNavigationParam(props, 'categoryId');
	// const [products, setProducts] = useState([]);
	const category = useSelector(mkpSelectors.getProductListCategory);
	const items = useSelector(mkpSelectors.getProductListItems);
	const title = category && category.title;

	return (
		<ScreenContainer>
			<Box marginTop={15}>
				<ScreenHeader title={title} onBack={navigateBack} />
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
								});
							}}
						/>
					);
				})}
			</ScrollView>
		</ScreenContainer>
	);
}

export default function MarketplaceProductListingScreen(props) {
	const categoryId = getNavigationParam(props, 'categoryId');
	const dispatch = useDispatch();

	useEffect(() => {
		if (categoryId === 'keyfi') {
			// redirect to product details
			navigate(Routes.MARKETPLACE_PRODUCT, {
				sku: 'keyfi_kyc',
				categoryId: 'keyfi',
			});
		} else if (categoryId === 'idk') {
			// redirect to product details
			navigate(Routes.MARKETPLACE_PRODUCT, {
				sku: 'idk',
				categoryId: 'idk',
			});
		} else {
			dispatch(mkpOperations.fetchProductList(categoryId));
		}
	}, [categoryId]);

	if (categoryId === 'passports') {
		return <PassportsPLP {...props} />;
	}

	return <SharedPLP {...props} />;
}
