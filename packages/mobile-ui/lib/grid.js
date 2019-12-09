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
`;
// align-items: ${props => {
//   if (props.alignBottom) {
//     return 'flex-end';
//   }

//   return props.alignItems ? props.alignItems : 'flex-start';
// }};

export const Col = styled.View`
  flex: ${props => props.autoWidth ? 0 : 1};
  flex-basis: auto;
  flex-direction: column;
  padding: ${props => {
    let left = props.noPadding ? '0px' : '5px'
    let right= props.noPadding ? '0px' : '5px';
    let top = props.noPadding ? '0px' : '8px';
    let bottom = props.noPadding ? '0px' : '8px';

    if (props.paddingLeft) {
      left = `${props.paddingLeft}px`;
    }

    if (props.paddingRight) {
      left = `${props.paddingRight}px`;
    }

    return `${top} ${right} ${bottom} ${left}`;
  }};
  margin-top: ${props => props.marginTop ? `${props.marginTop}px` : 0};
  margin-bottom: ${props => props.marginBottom ? `${props.marginBottom}px` : 0};
`;

// align-items: ${props => props.alignItems ? props.alignItems : 'flex-start'};
