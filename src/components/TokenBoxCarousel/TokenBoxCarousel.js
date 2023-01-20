// @flow
import { TokenIconMapping } from 'components/token-icon-mapping';
import { Box } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import Carousel from "react-native-reanimated-carousel";
import { TokenBox } from '../TokenBox';


function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}


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

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize(Dimensions.get('window'));
    }
    // Add event listener
    window && window?.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window && window?.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function TokenBoxCarousel(props: TokenBoxCarouselProps) {
  const ref = useRef();
  const scrolledRef = useRef();
  const pressTimeoutRef = useRef();
  const { width: viewportWidth } = useWindowSize();

  const handlePressAction = useCallback((pressHandler) => {
    const prevIndex = ref.current?.getCurrentIndex();
    clearTimeout(pressTimeoutRef.current);

    console.log(ref.current);

    pressTimeoutRef.current = setTimeout(() => {
      if (ref.current?.getCurrentIndex() === prevIndex && !scrolledRef.current) {
        pressHandler();
      }
    }, 500);
  }, [ref, pressTimeoutRef, scrolledRef]);

  return (
    <View style={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 0, height: 230 }}>
      <Carousel
        ref={ref}
        width={viewportWidth}
        onScrollBegin={() => {
          scrolledRef.current = true;
        }}
        onScrollEnd={() => {
          scrolledRef.current = false;
        }}
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