/**
 * @flow
 */

import { SKIcon } from 'design-system';
import { Theme } from 'design-system/theme';
import React from 'react';
import { Image } from 'react-native';
import credentialsImage from './assets/credentials.png';
import CryptoSvg from './assets/icon-marketplace-crypto.svg';
import LoansSvg from './assets/icon-marketplace-loans.svg';


type ImageIconProps = {
  // onPress: Function,
  size: number,
}

export function IconMarketplaceExchanges(props: ImageIconProps) {
  return (
    <CryptoSvg {...props}/>
  );
}

export function IconMarketplaceIncorporations(props) {
  return (
    <LoansSvg {...props}/>
  );
}

export function IconMarketplaceCredentials(props) {
  return (
    // <Image
    //   source={credentialsImage}
    //   style={{
    //     width: 94 * 0.5,
    //     height: 117 * 0.5,
    //   }}
    // />
    <SKIcon name="icon-payment-large" color={Theme.colors.primary} size={50} {...props}/>
  );
}
