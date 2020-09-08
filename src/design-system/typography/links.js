import styled from 'styled-components/native';

export const Link = styled.Text`
  color: ${({ theme }) => theme.colors.primary };
  font-size: 16px;
  font-family: ${props => props.theme.fonts.regular};
`;
