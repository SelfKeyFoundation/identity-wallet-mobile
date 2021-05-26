import React from 'react';
import { IconKey, IconEth, IconTokens, IconBNB } from 'design-system/svg-icons';
import { Image } from 'react-native';

export const TokenIconMapping = {
	key: IconKey,
	eth: IconEth,
	tokens: IconTokens,
	bnb: (props) => (
		<Image
			source={IconBNB}
			resizeMode="contain"
			style={{
				alignSelf: 'stretch',
        ...props,
			}}
		/>
	),
};