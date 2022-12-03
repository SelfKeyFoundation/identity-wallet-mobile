import React from 'react';
import { MarketplaceItem } from '../components';
import { ScreenContainer, Typography, Box } from 'design-system';
import { navigate, Routes } from 'core/navigation';
import {
	IconMarketplaceCredentials,
	IconMarketplaceExchanges,
	IconMarketplaceIncorporations,
	IconMarketplacePassports,
} from '../components/icons';
import { ScrollView } from 'react-native';
import { mkpSelectors } from '../mkpSlice';
import { useSelector } from 'react-redux';

const CategoryIconMap = {
	keyfi: IconMarketplaceCredentials,
	idk: IconMarketplaceIncorporations,
	exchanges: IconMarketplaceExchanges,
	incorporations: IconMarketplaceIncorporations,
	passports: IconMarketplacePassports,
};

export default function MarketplaceCategoriesScreen(props) {
	const categories = useSelector(mkpSelectors.getCategories);

	return (
		<ScreenContainer>
			<Box marginTop={15}>
				{/* <Typography color="#fff" fontSize={19} textAlign="center" fontWeight="bold">
					Marketplace
				</Typography> */}
			</Box>
			<ScrollView>
				{categories.map(category => {
					return (
						<MarketplaceItem
							title={category.title}
							description={category.description}
							iconComponent={CategoryIconMap[category.id]}
							style={{
								marginLeft: 20,
								marginRight: 20,
								marginTop: 20,
								marginBottom: 10,
							}}
							onPress={() => {
								navigate(Routes.MARKETPLACE_PRODUCT_LISTING, { categoryId: category.id });
							}}
						/>
					);
				})}
			</ScrollView>
		</ScreenContainer>
	);
}
