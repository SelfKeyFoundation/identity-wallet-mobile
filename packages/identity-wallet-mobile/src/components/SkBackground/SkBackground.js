import React from 'react';
import skBgImage from './sk-background.png';
import { ImageBackground } from 'design-system';

export function SkBackground(props) {
  return <ImageBackground source={skBgImage} {...props} />;
}
