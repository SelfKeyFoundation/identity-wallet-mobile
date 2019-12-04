
// @flow
import React from 'react';
import { Dimensions, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

// const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(90);
const itemHorizontalMargin = -20;
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export interface TokenBoxCarouselProps {
  items: any[]
}

const renderItem = ({ item }) => item;

export function TokenBoxCarousel(props: TokenBoxCarouselProps) {
  return (
    <View>
      <Carousel
        data={props.items}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        loop={true}
        activeSlideAlignment="center"
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.7}
      />
    </View>
  );
}
