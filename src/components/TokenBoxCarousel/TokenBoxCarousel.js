// @flow
import { TokenIconMapping } from 'components/token-icon-mapping';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TokenBox } from '../TokenBox';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
	const value = (percentage * viewportWidth) / 100;
	return Math.round(value);
}

// const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(90);
const itemHorizontalMargin = -20;
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export interface TokenBoxCarouselProps {
	items: any[];
}

const renderItem = ({ item }) => {
	return (
		<TokenBox
			iconComponent={TokenIconMapping[item.iconName] || item.iconComponent}
			tokenName={item.tokenName}
			tokenCode={item.tokenCode}
			tokenAmount={item.tokenAmount}
			fiatCurrency={item.fiatCurrency}
			fiatAmount={item.fiatAmount}
		/>
	);
};

export function TokenBoxCarousel(props: TokenBoxCarouselProps) {
	return (
		<View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, height: 230 }}>
			<Carousel
				data={props.items}
				renderItem={renderItem}
				sliderWidth={sliderWidth}
				sliderHeight={230}
				itemWidth={itemWidth}
				loop={true}
				activeSlideAlignment="center"
				inactiveSlideScale={0.85}
				inactiveSlideOpacity={0.7}
			/>
		</View>
	);
}
