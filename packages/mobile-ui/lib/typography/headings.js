import styled from 'styled-components/native';

export const H1 = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const H2 = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const H3 = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const H4 = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
`;

