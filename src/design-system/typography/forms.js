import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../theme';

export const FormPlaceholder = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 14px;
  font-family: ${props => Theme.fonts.regular};
`;

export const FormText = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 14px;
  font-family: ${props => Theme.fonts.regular};
`;

export const FormTextError  = styled(Text)`
  color: ${props => Theme.colors.error};
  font-size: 14px;
  font-family: ${props => Theme.fonts.regular};
`;

export const FormLabel = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 12px;
  font-family: ${props => Theme.fonts.regular};
  text-transform: uppercase;
`;

export const ErrorMessage = styled(Text)`
  color: ${props => Theme.colors.error};
  font-size: 13px;
  font-family: ${props => Theme.fonts.regular};
  line-height: 19px;
`;

export const WarningMessage = styled(Text)`
  color: ${props => Theme.colors.warning};
  font-size: 13px;
  font-family: ${props => Theme.fonts.regular};
  line-height: 19px;
`;
