import styled from 'styled-components/native';

export const TableHeader = styled.Text`
  color: ${props => props.theme.colors.typography};
  font-size: 12px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const TableText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 15px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const TableSmallText = styled.Text`
  color: ${props => props.disabled ? props.theme.colors.grey : props.theme.colors.white};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
`;

export const TableSmallLink = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 14px;
  font-family: ${props => props.theme.fonts.regular};
`;
