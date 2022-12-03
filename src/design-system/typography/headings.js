import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../theme';


export const H1 = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 24px;
  font-family: ${({ theme, fontWeight = 'regular'}) => Theme.fonts[fontWeight]};
`;

export const H2 = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 20px;
  font-family: ${({ theme, fontWeight = 'bold'}) => Theme.fonts[fontWeight]};
`;

export const H3 = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 16px;
  font-family: ${({ theme, fontWeight = 'bold'}) => Theme.fonts[fontWeight]};
`;

export const H4 = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 14px;
  font-family: ${({ theme, fontWeight = 'regular'}) => Theme.fonts[fontWeight]};
`;