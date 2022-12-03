import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../theme';

export const Link = styled(Text)`
  color: ${({ theme }) => Theme.colors.primary };
  font-size: 16px;
  font-family: ${props => Theme.fonts.regular};
`;
