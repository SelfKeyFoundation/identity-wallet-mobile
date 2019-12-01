import React from  'react';
import styled from 'styled-components/native';
import { Paragraph } from './body-text';

const ListConatiner = styled.View`
  padding-left: 10px;
`;

export const List = (props) => {
  return (
    <ListConatiner>
      { props.children }
    </ListConatiner>
  );
};

export const ListItem = styled(Paragraph)`
  margin-bottom: 10px;
  flex: 1;
`;
