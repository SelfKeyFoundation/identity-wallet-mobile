// @flow
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

import IconPassword from './svg-icons/icon-password.svg';
import IconWallet from './svg-icons/icon-wallet.svg';
import IconInfoLarge from './svg-icons/icon-info-large.svg';
import IconPasswordOk from './svg-icons/icon-password-ok.svg';
import IconSafe from './svg-icons/icon-safe.svg';
import IconId from './svg-icons/icon-id.svg';

type IconName =
  'icon-menu-settings' | 'icon-menu-qr' | 'icon-menu-tokens' |
  'icon-menu-dashboard' | 'icon-shield-info' | 'icon-shield-check' | 'icon-password-ok' |
  'icon-swap' | 'icon-password-forgot' | 'icon-password';

interface SKIconProps {
  name: IconName;
  color: string;
  size: number;
}

const svgIconMap = {
  'icon-password': IconPassword,
  'icon-wallet': IconWallet,
  'icon-info-large': IconInfoLarge,
  'icon-password-ok': IconPasswordOk,
  'icon-safe': IconSafe,
  'icon-id': IconId,
};

export function SKIcon(props: SKIconProps) {
  const SvgIcon = svgIconMap[props.name];

  if (SvgIcon) {
    return <SvgIcon />;
  }

  return (
    <Icon {...props} />
  );
}

