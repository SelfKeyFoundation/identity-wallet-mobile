import styled from 'styled-components';
import React from 'react';

export const ImageBackground = ({ source, ...props}) => {

  return <img src={source} {...props} />
}
