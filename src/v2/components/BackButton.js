import { Pressable } from 'native-base';
import React from 'react';
import styled from "styled-components/native";
import { navigateBack } from '../../core/navigation';
import { SKIcon } from "../../design-system/icons";

const BackIcon = styled(SKIcon)`
  padding: 10px;
`;

export function BackButton({ onPress }) {
  return (
    <Pressable onPress={onPress || navigateBack}>
      <BackIcon name="icon-nav-ar-left" size={12} color="#fff" />
    </Pressable>
  )
}