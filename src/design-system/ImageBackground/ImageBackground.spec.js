import React from 'react';
import { shallow } from 'enzyme';
import { ImageBackground } from './ImageBackground';

describe('mobile-ui/ImageBackground', () => {
  it('expect to render component', () => {
    shallow(<ImageBackground />);
  });
});
