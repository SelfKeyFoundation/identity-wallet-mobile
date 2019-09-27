import React from 'react';
import skBgImage from './sk-background.png';
import { ImageBackground } from '../ImageBackground';

export function SkBackground(props) {
  return <ImageBackground source={skBgImage} {...props} />;
}
