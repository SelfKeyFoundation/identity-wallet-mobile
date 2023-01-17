import React, { PureComponent, useState } from 'react';
import { View } from 'react-native';

export default function LinearGradient(props) {
  const [size, setSize] = useState({
    width: 1, height: 1
  });

  const {
    start = {
      x: 0.5,
      y: 0,
    },
    end = {
      x: 0.5,
      y: 1,
    },
    locations = [],
    colors = [],
    useAngle = false,
    angle = 0,
    style,
    children,
    ...otherProps
  } = props;

  //   measure = (event) => {
  //     this.setState({
  //       width: event.nativeEvent.layout.width,
  //       height: event.nativeEvent.layout.height,
  //     });
  //     if (this.props.onLayout) {
  //       this.props.onLayout(event);
  //     }
  //   }

  const getAngle = () => {
      if (useAngle) {
          return angle + 'deg';
      }

      // Math.atan2 handles Infinity
      const angle =
          Math.atan2(
              size.width * (end.y - start.y),
              size.height * (end.x - start.x)
          ) +
          Math.PI / 2;
      return angle + 'rad';
  };

  const getColors = () => colors.map((color, index) => {
    const location = locations[index];
    let locationStyle = '';
    if (location) {
      locationStyle = ' ' + location * 100 + '%';
    }
    return color + locationStyle;
  }).join(',');

  return (
    <View
        {...otherProps}
        style={[
          style,
          { backgroundImage: `linear-gradient(${getAngle()},${getColors()})` },
        ]}
        onLayout={this.measure}
      >
        {children}
      </View>
  )
}
