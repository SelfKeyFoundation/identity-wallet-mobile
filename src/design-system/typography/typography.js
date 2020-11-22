import React from 'react';
// import {Text} from 'react-native';
import styled from 'styled-components/native';

// export * from './links';
// export * from './lists';
// export * from './headings';
import { Paragraph } from './body-text';
// export * from './tables';
// export * from './forms';

export type TypographyProps = {
  variant: 'paragraph'  
}

const VariantMap = {
  paragraph: Paragraph,
}

export const DefaultText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  font-family: ${({ theme, fontWeight = 'regular'}) => theme.fonts[fontWeight]};
  line-height: 24px;
`;

const textStyleProps = ['lineHeight', 'fontSize', 'color', 'textAlign', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];

export function Typography(props: TypographyProps) {
  const { variant } = props;
  let style = {};

  const TextComponent = VariantMap[variant] || DefaultText;

  textStyleProps.forEach((key) => {
    if (props[key]) {
      style[key] = props[key]
    }
  });

  // Style override
  if (props.style) {
    style = {
      ...style,
      ...props.style,
    }
  }

  return (
    <TextComponent style={style} fontWeight={props.fontWeight}>
      { props.children }
    </TextComponent>
  )
}
