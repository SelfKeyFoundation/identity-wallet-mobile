import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../theme';

export const TableHeader = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 12px;
  font-family: ${props => Theme.fonts.bold};
`;

export const TableText = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 15px;
  font-family: ${props => Theme.fonts.regular};
`;

export const TableSmallText = styled(Text)`
  color: ${props => props.disabled ? Theme.colors.grey : Theme.colors.white};
  font-size: 14px;
  font-family: ${props => Theme.fonts.regular};
`;

export const TableSmallLink = styled(Text)`
  color: ${props => Theme.colors.primary};
  font-size: 14px;
  font-family: ${props => Theme.fonts.regular};
`;
