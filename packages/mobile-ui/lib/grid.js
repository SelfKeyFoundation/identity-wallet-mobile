import styled from 'styled-components/native';

export const Grid = styled.View`
  flex-direction: column;
  flex-basis: auto;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-left: -5px;
  margin-right: -5px;
  margin-top: ${props => props.marginTop ? `${props.marginTop}px` : 0};
  margin-bottom: ${props => props.marginBottom ? `${props.marginBottom}px` : 0};
  align-items: ${props => props.alignBottom ? 'flex-end' : 'flex-start'}
`;

export const Col = styled.View`
  flex: ${props => props.autoWidth ? 0 : 1};
  flex-basis: auto;
  flex-direction: column;
  padding: 8px 5px;
`;
