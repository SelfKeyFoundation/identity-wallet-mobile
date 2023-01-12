// @flow
import { TokenIconMapping } from 'components/token-icon-mapping';
import { Box } from 'native-base';
import React, { useCallback, useRef } from 'react';
import { Dimensions, View } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import Carousel from "react-native-reanimated-carousel";
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

const renderItem = ({ item, key, handlePress }) => {
  return (
   <Box px={4}>
     <TokenBox
        handlePress={handlePress}
        key={key}
        iconComponent={TokenIconMapping[item.iconName] || item.iconComponent}
        tokenName={item.tokenName}
        tokenCode={item.tokenCode}
        tokenAmount={item.tokenAmount}
        fiatCurrency={item.fiatCurrency}
        fiatAmount={item.fiatAmount}
      />
   </Box>
  );
};


export function TokenBoxCarousel(props: TokenBoxCarouselProps) {
  const ref = useRef();
  const pressTimeoutRef = useRef();

  const handlePressAction = useCallback((pressHandler) => {
    const prevIndex = ref.current?.getCurrentIndex();
    clearTimeout(pressTimeoutRef.current);

    pressTimeoutRef.current = setTimeout(() => {
      if (ref.current?.getCurrentIndex() === prevIndex) {
        pressHandler();
      }
    }, 300);
  }, [ref, pressTimeoutRef]);

  return (
    <View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, height: 230 }}>
      <Carousel
        ref={ref}
        width={sliderWidth}
        height={230}
        data={props.items}
        renderItem={(props) => renderItem({ ...props, handlePress: handlePressAction})}
        loop={false}
        autoPlay={false}
      />
    </View>
  );
}

// sliderWidth={sliderWidth}
// sliderHeight={230}
// itemWidth={itemWidth}
// loop={true}
// activeSlideAlignment="center"
// inactiveSlideScale={0.85}
// inactiveSlideOpacity={0.7}