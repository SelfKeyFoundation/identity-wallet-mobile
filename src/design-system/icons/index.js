// @flow
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon.ttf');

type IconName =
  'icon-menu-settings' | 'icon-menu-qr' | 'icon-menu-tokens' |
  'icon-menu-dashboard' | 'icon-shield-info' | 'icon-shield-check' | 'icon-password-ok' |
  'icon-swap' | 'icon-password-forgot' | 'icon-password';

interface SKIconProps {
  name: IconName;
  color: string;
  size: number;
}

export function SKIcon(props: SKIconProps) {
  return (
    <Icon {...props} />
  );
}

