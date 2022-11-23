import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import _ from 'lodash';

export const Grid = styled(View)`
	flex-direction: column;
	flex-basis: auto;
	margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
	margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}px` : 0)};
`;

export const Row = styled(View)`
	flex-direction: row;
	margin-left: -5px;
	margin-right: -5px;
	margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
	margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}px` : 0)};
	align-items: ${props => {
		if (props.alignBottom) {
			return 'flex-end';
		}

		return props.alignItems ? props.alignItems : 'flex-start';
	}};
	justify-content: ${props => {
		return props.justifyContent ? props.justifyContent : 'flex-start';
	}};
`;
// align-items: ${props => {
//   if (props.alignBottom) {
//     return 'flex-end';
//   }

//   return props.alignItems ? props.alignItems : 'flex-start';
// }};

export const Col = styled(View)`
	flex: ${props => (props.autoWidth ? 0 : 1)};
	flex-basis: auto;
	flex-direction: column;
	padding: ${props => {
		let left = props.noPadding ? '0px' : '5px';
		let right = props.noPadding ? '0px' : '5px';
		let top = props.noPadding ? '0px' : '8px';
		let bottom = props.noPadding ? '0px' : '8px';

		if (props.paddingLeft !== undefined) {
			left = `${props.paddingLeft}px`;
		}

		if (props.paddingRight !== undefined) {
			right = `${props.paddingRight}px`;
		}

		if (props.paddingTop !== undefined) {
			top = `${props.paddingTop}px`;
		}

		if (props.paddingBottom !== undefined) {
			bottom = `${props.paddingBottom}px`;
		}

		return `${top} ${right} ${bottom} ${left}`;
	}};
	margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : 0)};
	margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}px` : 0)};
`;

// align-items: ${props => props.alignItems ? props.alignItems : 'flex-start'};

// const getPropValue = (propKey, suffix = '', defaultValue = null) => props => props[propKey] ? `${props[propKey]}${suffix}` : defaultValue;

const boxStyleProps = _.flatten([
	'marginBottom',
	'marginTop',
	'marginLeft',
	'marginRight',
	'paddingLeft',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'backgroundColor',
	'borderRadius',
	'margin',
	'padding',
	'flex',
	'flexDirection',
	'alignItems',
	'justifyContent',
	'flexWrap',
	'display',
	'borderWidth',
	'borderColor',
	'width',
	'height',
	[
		'borderBottom',
		'borderTop',
		'borderLeft',
		'borderRight',
	].map(opt => [
		`${opt}Width`,
		`${opt}Color`,
		`${opt}Style`,
	])
]);

export function Box(props: CSSStyleDeclaration) {
	let style = {};

	if (props.col) {
		style.flex = 1;
		style.flexBasis = 'auto';
		style.flexDirection = 'column';
		if (!props.noPadding) {
			style.paddingLeft = 5;
			style.paddingRight = 5;
			style.paddingTop = 8;
			style.paddingBottom = 8;
		}
	}
	
	if (props.row) {
		style.flex = 1;
		style.flexBasis = 'auto';
		style.flexDirection = 'row';
		if (!props.noMargin) {
			style.marginLeft = -5;
			style.marginRight = -5;
		}
	}

	boxStyleProps.forEach(key => {
		if (props[key]) {
			style[key] = props[key];
		}
	});
	
	if (props.autoWidth) {
		style.flex = 0;
	}

	// Style override
	if (props.style) {
		style = {
			...style,
			...props.style,
		};
	}
	
	const content = <View style={style}>{props.children}</View>;
	
	if (props.onPress) {
		return (
			<TouchableWithoutFeedback onPress={props.onPress}>
				{ content }
			</TouchableWithoutFeedback>
		)
	}

	return content;
}

// export const Box = styled(View)`
//   margin-top: ${getPropValue('marginTop', 'px')};
//   margin-bottom: ${getPropValue('marginBottom', 'px')};
//   margin-left: ${getPropValue('marginLeft', 'px')};
//   margin-right: ${getPropValue('marginRight', 'px')};
//   flex: ${getPropValue('flex')};
// `;
