import styled from 'styled-components/native';

export const Grid = styled.View`
  flex-direction: column;
  flex-basis: auto;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-left: -5px;
  margin-right: -5px;
`;

export const Col = styled.View`
  flex: 1;
  flex-basis: auto;
  flex-direction: column;
  padding: 8px 5px;
`;
