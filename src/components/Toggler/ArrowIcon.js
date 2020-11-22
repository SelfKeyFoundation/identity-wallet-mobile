import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import {
  Col,
  Grid,
  Row,
  Typography
} from 'design-system';
import ArrowDownImage from './arrow-down.png';
import ArrowUpImage from './arrow-up.png';

export function ArrowIcon(props) {
  return (
    <Image
      source={props.expanded ? ArrowUpImage : ArrowDownImage}
      style={{
        width: props.width || 20,
        height: props.height || 11
      }}
    />
  )
}