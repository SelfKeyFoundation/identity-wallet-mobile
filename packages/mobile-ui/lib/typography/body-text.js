import styled from 'styled-components/native';

export const Paragraph = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
  margin-bottom: 10px;
  font-weight: ${props => {
    if (props.variant === 'h3') {
      return 'bold';
    }

    return 'normal';
  }};
`;

export const Ammount = styled.Text`
  color: ${props => props.theme.colors.primaryTint};
  font-size: 24px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const AmmountLarge = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 40px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const DefinitionTitle = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const DefinitionDescription = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const Explanatory = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 13px;
  line-height: 19px;
  font-family: ${props => props.theme.fonts.lato};
`;

export const ExplanatorySmall = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 10px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const ButtonLinkText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 13px;
  font-family: ${props => props.theme.fonts.regular};
  text-transform: uppercase;
`;
