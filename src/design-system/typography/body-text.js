import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Theme } from '../theme';

export const Paragraph = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  margin-bottom: 10px;
  line-height: 24px;
  font-weight: ${props => {
    if (props.variant === 'h3') {
      return 'bold';
    }

    return 'normal';
  }};
`;

export const Ammount = styled(Text)`
  color: ${props => Theme.colors.primaryTint};
  font-size: 24px;
  font-family: ${props => Theme.fonts.bold};
`;

export const AmmountLarge = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 40px;
  font-family: ${props => Theme.fonts.regular};
`;

export const DefinitionTitle = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 16px;
  font-family: ${props => Theme.fonts.regular};
`;

export const DefinitionDescription = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 16px;
  font-family: ${props => Theme.fonts.regular};
`;

export const Explanatory = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 13px;
  line-height: 19px;
  font-family: ${props => Theme.fonts.lato};
`;

export const ExplanatoryWhite = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 13px;
  line-height: 19px;
  font-family: ${props => Theme.fonts.lato};
`;

export const LabelText = styled(Text)`
  color: ${props => Theme.colors.white};
  font-size: 12px;
  line-height: 22px;
  font-family: ${props => Theme.fonts.lato};
`;

export const ExplanatorySmall = styled(Text)`
  color: ${props => Theme.colors.typography};
  font-size: 10px;
  font-family: ${props => Theme.fonts.regular};
`;

export const ButtonLinkText = styled(Text)`
  color: ${props => Theme.colors.primary};
  font-size: 13px;
  font-family: ${props => Theme.fonts.regular};
  text-transform: uppercase;
`;
